export const QNewQuiz = `
mutation (
  $title: String!,
  ) {
  createQuiz(input: {
    title: $title
  })
  {
   id
   title
  }
}`

export const QNewQuestion = `
mutation (
  $text: String!,
  $quizId: ID,
  ) {
  createQuestion(input: {
    text: $text,
    quizQuestionsId: $quizId
  })
  {
   id
   text
   }
}`

export const QNewAnswer = `
mutation (
  $text: String,
  $correct: Boolean,
  $questionId: ID
  ) {
  createAnswer(input: {
    text: $text,
    correct: $correct,
    answerQuestionId: $questionId
  })
  {
   id
   }
}`

export const ListQuestions = `
query ListQuestion {
    listQuestions {
      items {
        id
        text
      }
    }
  }`

export const ListQuizzes = `
query MyQuizzes {
    listQuizzes(limit: 25) {
        nextToken
        items {
            id
            title
        }
    }
}`

export const ListQuizQuestions = `
query MyQuestions ($quizID: ID!){
    getQuiz(id: $quizID) {
        questions (limit: 50) {
            items {
                id
                tags
                text
                links
                answers {
                    items { id text correct }
                }
            }
        }
    }
}`
