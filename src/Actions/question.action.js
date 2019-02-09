export const ADD_QUESTION_ACTION = 'QUIZ::ADD_QUESTION'

export const addQuestion = quiz => ({
  type: ADD_QUESTION_ACTION,
  question: quiz.question,
  correct_answer: quiz.correct_answer,
  incorrect_answers: quiz.incorrect_answers,
})
