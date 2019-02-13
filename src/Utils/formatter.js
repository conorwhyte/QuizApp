import { quizGenres } from '../Assets/types'

export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const checkIntersectionOfArrays = (data, storedQuestions) => {
  // Change the second data within filter to be storedQuestions
  return data.filter(item => {
    return -1 === storedQuestions.map(x => x.text).indexOf(item.question)
  })
}

export const triviaAPIString = (genre, numQuestions, type, difficulty) => {
  const prefix = 'https://opentdb.com/api.php?'
  const amount = `amount=${numQuestions}`
  const category = `&category=${genre}`
  const quizDifficulty = `&difficulty=${difficulty}`
  const quizType = `&type=${type}`

  return prefix + amount + category + quizDifficulty + quizType
}

export const decodeHTML = html => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
}

export const getQuizGenre = quizCategoryNumber => {
  return quizGenres.filter(quiz => {
    if (quiz.value === quizCategoryNumber) {
      return quiz.text
    }
  })[0]
}