import React, { Component } from 'react'
import { quizGenres } from '../Assets/types'
import QuizSelectors from '../Components/QuizSelectors'
import ExistingQuiz from '../Components/ExistingQuiz'
import QuizHeader from '../Components/Header'
import Amplify from 'aws-amplify'
import { listAllQuiz, countQuizWithGenre, listQuestions } from '../Actions/CreateQuiz'
import { withAuthenticator } from 'aws-amplify-react'
import { Divider, Segment } from 'semantic-ui-react'
import aws_exports from '../aws-exports' // specify the location of aws-exports.js file on your project
import { addQuestion, addQuizQuestions } from '../Actions/question.action'
import { connect } from 'react-redux'
import axios from 'axios';

import 'semantic-ui-css/semantic.min.css'
import './Home.scss'
import 'babel-polyfill'

Amplify.configure(aws_exports)

const mapStateToProps = state => ({
  quiz: state,
  quizQuestions: state.quiz.quizQuestions,
  storedQuestions: state.quiz.storedQuestions,
})

const triviaAPIString = (genre, numQuestions, type, difficulty) => {
  const prefix = 'https://opentdb.com/api.php?';
  const amount = `amount=${numQuestions}`;
  const category = `&category=${genre}`;
  const quizDifficulty = `&difficulty=${difficulty}`;
  const quizType = `&type=${type}`;
 
  return prefix + amount + category + quizDifficulty + quizType;
}

const checkIntersectionOfArrays = (data, storedQuestions) => {
  // Change the second data within filter to be storedQuestions
  return data.filter( item => {
    return -1 === storedQuestions.map(x => x.question).indexOf(item.question)
  })
}

const mapDispatchToProps = dispatch => {
  return {
    addQuestionToQuiz: question => {
      dispatch(addQuestion(question))
    },
    addQuestionsToQuiz: questions => {
      dispatch(addQuizQuestions(questions))
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
    const { quizQuestions } = this.props
    if ( quizQuestions.length === 10 ) {
      this.props.history.push("/quiz")
    } 
  }

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

  pullDownQuestions = () => {
    const { quizCategory, numQuestions, quizDifficulty, quizType } = this.state
    const { addQuestionsToQuiz, storedQuestions } = this.props
    const apiEndpoint = triviaAPIString(quizCategory, numQuestions, quizType, quizDifficulty)
    axios.get(apiEndpoint).then((output) => {
      const { results } = output.data;
      const uniqueQuestions = checkIntersectionOfArrays(results, storedQuestions);
      addQuestionsToQuiz(uniqueQuestions)
    })
  }
 
  render() {
    const pageState = this.state
    const { quizItems } = this.state
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
