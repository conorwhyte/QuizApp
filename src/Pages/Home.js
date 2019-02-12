import React, { Component } from 'react'
import { quizGenres } from '../Assets/types'
import QuizSelectors from '../Components/QuizSelectors'
import ExistingQuiz from '../Components/ExistingQuiz'
import QuizHeader from '../Components/QuizHeader'
import QuizScore from '../Components/QuizScore'
import Amplify from 'aws-amplify'
import {
  listAllQuiz,
  countQuizWithGenre,
  listQuestions,
  createNewQuiz,
} from '../Actions/CreateQuiz'
import { withAuthenticator } from 'aws-amplify-react'
import { Divider, Segment } from 'semantic-ui-react'
import aws_exports from '../aws-exports' // specify the location of aws-exports.js file on your project
import { addQuestion, addQuizQuestions, addQuizId } from '../Actions/question.action'
import { connect } from 'react-redux'
import axios from 'axios'
import { checkIntersectionOfArrays, triviaAPIString, getQuizGenre } from '../Utils/formatter'

import 'semantic-ui-css/semantic.min.css'
import './Home.scss'
import 'babel-polyfill'

Amplify.configure(aws_exports)

const mapStateToProps = state => ({
  quiz: state,
  quizQuestions: state.quiz.quizQuestions,
  storedQuestions: state.quiz.storedQuestions,
  quizScore: state.quiz.quizScore,
})

const mapDispatchToProps = dispatch => {
  return {
    addQuestionToQuiz: question => {
      dispatch(addQuestion(question))
    },
    addQuestionsToQuiz: questions => {
      dispatch(addQuizQuestions(questions))
    },
    addCurrentQuizId: quizId => {
      dispatch(addQuizId(quizId))
    }
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

  componentDidMount() {
    // For now list all the questions, don't filter
    listQuestions().then(data => data)
  }

  componentDidUpdate = () => {
    const { quizQuestions, addCurrentQuizId } = this.props
    const { quizDifficulty, quizCategory } = this.state
    if (quizQuestions.length === 10) {
      const { text } = getQuizGenre(quizCategory)
      createNewQuiz(text, 0 ,quizDifficulty).then( quizId => {
        addCurrentQuizId(quizId);
      })
      this.props.history.push('/quiz')
    }
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

  pullDownQuestions = () => {
    const { quizCategory, numQuestions, quizDifficulty, quizType } = this.state
    const { addQuestionsToQuiz, storedQuestions } = this.props
    const apiEndpoint = triviaAPIString(
      quizCategory,
      numQuestions,
      quizType,
      quizDifficulty
    )
    axios.get(apiEndpoint).then(output => {
      const { results } = output.data
      const uniqueQuestions = checkIntersectionOfArrays(
        results,
        storedQuestions
      )
      addQuestionsToQuiz(uniqueQuestions)
    })
  }

  render() {
    const pageState = this.state
    const { quizItems } = this.state
    const { quizScore } = this.props
    
    return (
      <div className="Home-body">
        <QuizHeader />
        <br />
        { quizScore !== '' && <QuizScore quizScore={quizScore} /> }
        <Segment placeholder textAlign="center">
          <QuizSelectors
            changeGenre={this.changeGenre}
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
