// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
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
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
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
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
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
export const onCreateAnswer = `subscription OnCreateAnswer {
  onCreateAnswer {
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
export const onUpdateAnswer = `subscription OnUpdateAnswer {
  onUpdateAnswer {
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
export const onDeleteAnswer = `subscription OnDeleteAnswer {
  onDeleteAnswer {
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
export const onCreateQuiz = `subscription OnCreateQuiz {
  onCreateQuiz {
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
export const onUpdateQuiz = `subscription OnUpdateQuiz {
  onUpdateQuiz {
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
export const onDeleteQuiz = `subscription OnDeleteQuiz {
  onDeleteQuiz {
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
