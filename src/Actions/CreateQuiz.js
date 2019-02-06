import _ from 'lodash';
import retry from 'async-retry';
import { API, graphqlOperation } from 'aws-amplify';
import {
  ListQuizzes,
  QNewQuiz,
  QNewAnswer,
  QNewQuestion,
  ListQuestions,
  ListQuizQuestions,
} from './ApiActions';
import AppStore from '../Store/AppStore';
import * as AppActions from '../Actions/AppActions';
import 'babel-polyfill';

export async function listAllQuiz(callback) {
  const { data } = await API.graphql(graphqlOperation(ListQuizzes));
  callback(data);
}

export async function listQuizQuestions(quizId, callback) {
  const { data } = await API.graphql(
    graphqlOperation(ListQuizQuestions, { quizID: quizId })
  );
  callback(data);
}

export function countQuizWithGenre(genre, quizzes) {
  let count = 0;
  quizzes.forEach(quiz => {
    if (quiz.text.includes(genre)) {
      count += 1;
    }
  });
  return count;
}

export async function createNewQuiz(genre, number, difficulty, results) {
  const quizTitle = `${genre}-${difficulty}-quiz${number}`;
  const resp = await GqlRetry(QNewQuiz, { title: quizTitle });
  const quizId = resp.data.createQuiz.id;

  AppActions.setQuizId({ id: quizId, title: quizTitle });

  await checkQuestions(results);
}

export async function checkQuestions(pulledQuestions) {
  const { data } = await API.graphql(graphqlOperation(ListQuestions));
  const arrayOfQuestions = data.listQuestions.items;
  const quiz = AppStore.getQuizId();

  pulledQuestions.forEach((currentPulledQuestion, index) => {
    let addQuestionToQuiz = true;
    arrayOfQuestions.forEach(question => {
      if (currentPulledQuestion.question === question.text) {
        addQuestionToQuiz = false;
        return;
      }
    });

    if (addQuestionToQuiz) {
      const quizParameters = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        questionText: currentPulledQuestion.question,
        answerText1: currentPulledQuestion.correct_answer,
        answerText2: currentPulledQuestion.incorrect_answers[0],
        answerText3: currentPulledQuestion.incorrect_answers[1],
        answerText4: currentPulledQuestion.incorrect_answers[2],
        correctAnswer: currentPulledQuestion.correct_answer,
      };
      submitNewQuestion(quizParameters);
    }
  });
}

let countForAnswers = 0;
async function submitNewQuestion(input) {
  const quizId = AppStore.getQuizId().id;
  const newQ = await GqlRetry(QNewQuestion, {
    text: input.questionText,
    quizId: quizId,
  });
  _.map(
    [
      input.answerText1,
      input.answerText2,
      input.answerText3,
      input.answerText4,
    ],
    (ans, idx) => {
      if (ans === null) return;
      console.log('CONR', countForAnswers);
      countForAnswers += 1;
      GqlRetry(QNewAnswer, {
        questionId: newQ.data.createQuestion.id,
        text: ans,
        correct: input.correctAnswer === 'answerText' + (idx + 1),
      });
    }
  );
}

const GqlRetry = async (query, variables) => {
  return await retry(
    async bail => {
      // console.log('Sending GraphQL operation', {query: query, vars: variables});
      const response = await API.graphql(graphqlOperation(query, variables));
      // console.log('GraphQL result', {result: response, query: query, vars: variables})
      return response;
    },
    {
      retries: 3,
    }
  );
};
