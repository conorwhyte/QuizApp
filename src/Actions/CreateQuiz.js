import _ from 'lodash';
import retry from 'async-retry';
import { API, graphqlOperation } from 'aws-amplify';
import { ListQuizzes, QNewQuiz, QNewAnswer, QNewQuestion } from './ApiActions';
import AppStore from '../Store/AppStore';
import * as AppActions from '../Actions/AppActions'; 
import 'babel-polyfill';

export async function listAllQuiz(callback) {
    const { data } = await API.graphql(graphqlOperation(ListQuizzes));
    callback(data);
}

export async function createNewQuiz() {
    const date = new Date();
    const currentTime = date.getTime();
    const quizTitle = `Quiz-${currentTime}`;s
    const resp = await GqlRetry(QNewQuiz, {title: quizTitle});
    quizId = resp.data.createQuiz.id;

    AppActions.setQuizId(quizId);
}

export async function checkQuestions(pulledQuestions) {
    const { data } = await API.graphql(graphqlOperation(ListQuestions));
    const arrayOfQuestions = data.listQuestions.items;
    
    pulledQuestions.forEach((currentPulledQuestion) => {
        let addQuestionToQuiz = true;
        arrayOfQuestions.forEach((question) => {
            if (currentPulledQuestion.question === question.text) {
                addQuestionToQuiz = false;
                return;
            } 
        });

        if (addQuestionToQuiz) {
            // Add question 
            const quizParameters = {
                quizId: 'testId',
                quizTitle: 'testQuiz',
                questionText: currentPulledQuestion.question,
                answerText1: currentPulledQuestion.correct_answer,
                answerText2: currentPulledQuestion.incorrect_answers[0],
                answerText3: currentPulledQuestion.incorrect_answers[1],
                answerText4: currentPulledQuestion.incorrect_answers[2],
                correctAnswer: currentPulledQuestion.correct_answer,
              };
            // submitNewQuestion(quizParameters);
        }
    });
}

async function submitNewQuestion(input) {
    const quizId = AppStore.getQuizId();
    const newQ = await GqlRetry(QNewQuestion, {
        text: input.questionText,
        quizId: quizId,
    })
    _.map(
        [input.answerText1, input.answerText2, input.answerText3, input.answerText4],
        (ans, idx) => {
            if (ans === null) return
            GqlRetry(QNewAnswer, {
                questionId: newQ.data.createQuestion.id,
                text: ans,
                correct: input.correctAnswer === 'answerText' + (idx+1),
            })
        }
    )
}

const GqlRetry = async (query, variables) => {
    return await retry(
        async bail => {
            console.log('Sending GraphQL operation', {query: query, vars: variables});
            const response = await API.graphql(graphqlOperation(query, variables))
            console.log('GraphQL result', {result: response, query: query, vars: variables})
            return response
        },
        {
            retries: 3,
        }
    )
};