import _ from 'lodash'
import retry from 'async-retry'
import { API, graphqlOperation } from 'aws-amplify'
import {
  ListQuizzes,
  QNewQuiz,
  QNewAnswer,
  QNewQuestion,
  ListQuestions,
  ListQuizQuestions,
} from './ApiActions'
import 'babel-polyfill'

export async function listAllQuiz(callback) {
  const { data } = await API.graphql(graphqlOperation(ListQuizzes))
  callback(data)
}

export async function listQuizQuestions(quizId, callback) {
  const { data } = await API.graphql(
    graphqlOperation(ListQuizQuestions, { quizID: quizId })
  )
  return data
}

export function countQuizWithGenre(genre, quizzes) {
  let count = 0
  quizzes.forEach(quiz => {
    if (quiz.text.includes(genre)) {
      count += 1
    }
  })
  return count
}

export async function createNewQuiz(genre, number, difficulty) {
  const quizTitle = `${genre}-${difficulty}-quiz${number}`
  const resp = await GqlRetry(QNewQuiz, { title: quizTitle })

  // Create the quiz 
  return resp.data.createQuiz.id
}

export async function listQuestions() {
  const { data } = await API.graphql(graphqlOperation(ListQuestions))
  return data.listQuestions.items
}

export async function addQuestionsToQuiz(questions, quizId) {
  for (const question of questions) {
    const formattedQuestion = transformQuestion(question, quizId);
    await submitQuestionToQuiz(formattedQuestion, quizId)
  }
}

async function submitQuestionToQuiz(formattedQuestion, quizId) {
  const newQ = await GqlRetry(QNewQuestion, {
    text: formattedQuestion.questionText,
    quizId: quizId,
  })
  _.map(
    [
      formattedQuestion.answerText1,
      formattedQuestion.answerText2,
      formattedQuestion.answerText3,
      formattedQuestion.answerText4,
    ],
    (ans, idx) => {
      if (ans === null) return
      GqlRetry(QNewAnswer, {
        questionId: newQ.data.createQuestion.id,
        text: ans,
        correct: formattedQuestion.correctAnswer === 'answerText' + (idx + 1),
      })
    }
  )
}

function transformQuestion(question, quizId) {
  return {
    quizId: quizId,
    quizTitle: 'Test Quiz',
    questionText: question.question,
    answerText1: question.correct_answer,
    answerText2: question.incorrect_answers[0],
    answerText3: question.incorrect_answers[1],
    answerText4: question.incorrect_answers[2],
    correctAnswer: question.correct_answer,
  }
}

const GqlRetry = async (query, variables) => {
  return await retry(
    async bail => {
      // console.log('Sending GraphQL operation', {query: query, vars: variables});
      const response = await API.graphql(graphqlOperation(query, variables))
      // console.log('GraphQL result', {result: response, query: query, vars: variables})
      return response
    },
    {
      retries: 3,
    }
  )
}
