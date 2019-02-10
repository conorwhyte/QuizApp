export const ADD_QUESTION_ACTION = 'QUIZ::ADD_QUESTION'
export const ADD_QUIZ_QUESTIONS = 'QUIZ::ADD_QUIZ_QUESTIONS'
export const ADD_STORED_QUESTIONS = 'QUIZ::ADD_STORED_QUESTIONS'

export const addQuizQuestions = questions => ({
  type: ADD_QUIZ_QUESTIONS,
  questions: questions,
})

export const addStoredQuestions = questions => ({
  type: ADD_STORED_QUESTIONS,
  questions: questions,
})