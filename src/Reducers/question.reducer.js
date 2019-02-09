import { ADD_QUESTION_ACTION } from '../Actions/question.action'

const initialState = {
  potentialQuestions: {
    questions: [],
  },
}

function insertItem(array, action) {
  let newArray = array.slice()
  newArray.splice(action.index, 0, {
    question: action.question,
    correct_answer: action.correct_answer,
    incorrect_answers: action.incorrect_answers,
  })
  return newArray
}

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION_ACTION:
      return {
        ...state,
        potentialQuestions: {
          ...state.potentialQuestions,
          questions: insertItem(state.potentialQuestions.questions, action),
        },
      }
    default:
      return state
  }
}

export default quiz
