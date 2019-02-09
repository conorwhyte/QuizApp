import React, { Component } from 'react'
import { quizGenres } from '../Assets/types'
import QuizSelectors from '../Components/QuizSelectors'
import ExistingQuiz from '../Components/ExistingQuiz'
import QuizHeader from '../Components/Header'
import { GetQuestions } from '../Actions/GetQuestions'
import Amplify from 'aws-amplify'
import { listAllQuiz, countQuizWithGenre, listQuestions } from '../Actions/CreateQuiz'
import { withAuthenticator } from 'aws-amplify-react'
import { Divider, Segment } from 'semantic-ui-react'
import aws_exports from '../aws-exports' // specify the location of aws-exports.js file on your project
import { addQuestion } from '../Actions/question.action'
import { connect, dispatch } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import './Home.scss'
import 'babel-polyfill'

Amplify.configure(aws_exports)

const mapStateToProps = state => ({
  quiz: state,
})

const mapDispatchToProps = dispatch => {
  return {
    addQuestionToQuiz: question => {
      dispatch(addQuestion(question))
    },
  }
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      numQuestions: 10,
      quizCategory: 9,
      quizDifficulty: 'medium',
      quizType: 'multiple',
      quizItems: [],
    }
  }

  handleChange(e) {
    const user = e.target.value
  }

  // componentDidMount() {
  //   listAllQuiz(this.listAllQuizCallback);
  // }

  listAllQuizCallback = data => {
    const allQuizzes = data.listQuizzes.items
    const quizItems = allQuizzes.map(item => {
      return { text: item.title, value: item.title }
    })

    this.setState({ quizItems })
  }

  changeGenre = (event, data) => {
    const { quizItems } = this.state
    const genreTitle = quizGenres.filter(quiz => {
      if (quiz.value === data.value) {
        return quiz.text
      }
    })
    const { text } = genreTitle[0]
    const numberOfQuizzes = countQuizWithGenre(text, quizItems)
    this.setState({
      quizCategory: data.value,
      numberOfQuizzes,
      quizCategoryTitle: text,
    })
  }

  changeDifficulty = (event, data) => {
    this.setState({ quizDifficulty: data.value })
  }

  changeNumOfQuestions = (event, data) => {
    this.setState({ numQuestions: data.value })
  }

  addItemToStore = questions => {
    const { addQuestionToQuiz } = this.props
    questions.results.forEach(value => {
      addQuestionToQuiz({
        question: value.question,
        correct_answer: value.correct_answer,
        incorrect_answers: value.incorrect_answers,
      })
    })

    // listQuestions().then(data => console.log('DC', data))
  }

  pullDownQuestions = () => {
    const { quizCategory, numQuestions, quizDifficulty, quizType } = this.state
    GetQuestions(
      quizCategory,
      numQuestions,
      quizDifficulty,
      quizType,
      this.addItemToStore
    )
  }

  render() {
    const pageState = this.state
    const { quizItems } = this.state
    const { quiz } = this.props

    return (
      <div className="Home-body">
        <QuizHeader />
        <br />
        <Segment placeholder textAlign="center">
          <QuizSelectors
            createQuiz={this.pullDownQuestions}
            changeNumOfQuestions={this.changeNumOfQuestions}
            pageState={pageState}
          />
          <Divider horizontal>Or choose an existing quiz</Divider>
          <ExistingQuiz
            pageState={pageState}
            quizItems={quizItems}
            createQuiz={this.createQuiz}
          />
        </Segment>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
// )(withAuthenticator(Home, { includeGreetings: true }))
