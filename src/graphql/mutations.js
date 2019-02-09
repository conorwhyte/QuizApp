// eslint-disable
// this is an auto generated file. This will be overwritten

export const createQuestion = `mutation CreateQuestion($input: CreateQuestionInput!) {
  createQuestion(input: $input) {
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
export const updateQuestion = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
  updateQuestion(input: $input) {
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
export const deleteQuestion = `mutation DeleteQuestion($input: DeleteQuestionInput!) {
  deleteQuestion(input: $input) {
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
export const createAnswer = `mutation CreateAnswer($input: CreateAnswerInput!) {
  createAnswer(input: $input) {
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
export const updateAnswer = `mutation UpdateAnswer($input: UpdateAnswerInput!) {
  updateAnswer(input: $input) {
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
export const deleteAnswer = `mutation DeleteAnswer($input: DeleteAnswerInput!) {
  deleteAnswer(input: $input) {
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
export const createQuiz = `mutation CreateQuiz($input: CreateQuizInput!) {
  createQuiz(input: $input) {
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
export const updateQuiz = `mutation UpdateQuiz($input: UpdateQuizInput!) {
  updateQuiz(input: $input) {
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
export const deleteQuiz = `mutation DeleteQuiz($input: DeleteQuizInput!) {
  deleteQuiz(input: $input) {
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
