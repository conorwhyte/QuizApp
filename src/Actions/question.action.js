export const ADD_QUESTION_ACTION = 'QUIZ::ADD_QUESTION'
export const ADD_QUIZ_QUESTIONS = 'QUIZ::ADD_QUIZ_QUESTIONS'
export const ADD_STORED_QUESTIONS = 'QUIZ::ADD_STORED_QUESTIONS'
export const ADD_QUIZ_ID = 'QUIZ::ADD_QUIZ_ID'
export const ADD_QUIZ_SCORE = 'QUIZ::ADD_QUIZ_SCORE'

export const addQuizQuestions = questions => ({
  type: ADD_QUIZ_QUESTIONS,
  questions: questions,
})

export const addStoredQuestions = questions => ({
  type: ADD_STORED_QUESTIONS,
  questions: questions,
})

export const addQuizId = quizId => ({
  type: ADD_QUIZ_ID,
  quizId,
})

export const addQuizScore = quizScore => ({
  type: ADD_QUIZ_SCORE,
  quizScore,
})