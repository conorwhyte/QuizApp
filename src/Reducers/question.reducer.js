import { ADD_QUIZ_QUESTIONS, ADD_STORED_QUESTIONS } from '../Actions/question.action'

const initialState = {
  quizReady: false,
  quizQuestions: [],
  storedQuestions: [],
}

function insertItems(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 0, action.questions)
  return newArray
}

function concatArrays(array, action) {
  let newArray = array.slice()
  return newArray.concat(action.questions)
}

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUIZ_QUESTIONS:
      return { 
        ...state, 
        quizQuestions: concatArrays(state.quizQuestions, action),
      }
    case ADD_STORED_QUESTIONS: 
      return { 
        ...state, 
        storedQuestions: action.questions,
      }
    default:
      return state
  }
}

export default quiz
