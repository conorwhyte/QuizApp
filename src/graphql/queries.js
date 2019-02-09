// eslint-disable
// this is an auto generated file. This will be overwritten

export const getQuestion = `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
    id
    text
    tags
    links
    answers {
      items {
        id
        text
        correct
        version
      }
      nextToken
    }
    version
  }
}
`
export const listQuestions = `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      tags
      links
      answers {
        nextToken
      }
      version
    }
    nextToken
  }
}
`
export const getAnswer = `query GetAnswer($id: ID!) {
  getAnswer(id: $id) {
    id
    text
    correct
    question {
      id
      text
      tags
      links
      answers {
        nextToken
      }
      version
    }
    version
  }
}
`
export const listAnswers = `query ListAnswers(
  $filter: ModelAnswerFilterInput
  $limit: Int
  $nextToken: String
) {
  listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      correct
      question {
        id
        text
        tags
        links
        version
      }
      version
    }
    nextToken
  }
}
`
export const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
    id
    title
    questions {
      items {
        id
        text
        tags
        links
        version
      }
      nextToken
    }
    version
  }
}
`
export const listQuizzes = `query ListQuizzes(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizzes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      questions {
        nextToken
      }
      version
    }
    nextToken
  }
}
`
