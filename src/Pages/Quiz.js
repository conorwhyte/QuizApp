import React, { Component } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import QuizProgress from '../Components/QuizProgress'
import QuestionSegment from '../Components/QuestionSegment'
import Placeholder from '../Components/Dimmer';
import { Segment, Form, Card, Dimmer, Loader } from 'semantic-ui-react'
import aws_exports from '../aws-exports' // specify the location of aws-exports.js file on your project
import {
  addQuestionsToQuiz,
} from '../Actions/CreateQuiz'
import { addQuizScore } from '../Actions/question.action'
import { connect } from 'react-redux'
import { shuffleArray, decodeHTML } from '../Utils/formatter'

import './Quiz.scss'
import 'semantic-ui-css/semantic.min.css'

Amplify.configure(aws_exports)

const mapStateToProps = state => {
  return {
    quizQuestions: state.quiz.quizQuestions,
    quizId: state.quiz.quizId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCompletedQuizScore: quizScore => {
      dispatch(addQuizScore(quizScore))
    },
  }
}

class Quiz extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: 'test',
      answers: [],
      index: 0,
      showAlert: false,
      showSpinner: false,
      numberOfQuestionsCorrect: 0,
    }
  }

  componentDidMount = () => {
    const { quizQuestions } = this.props
    this.formatQuestions(quizQuestions)
  }

  formatQuestions = data => {
    const results = data.map(item => {
      let answers = item.incorrect_answers
      answers.push(item.correct_answer)
      return {
        question: item.question,
        answers,
        correct_answer: item.correct_answer,
      }
    })

    const question = results[0].question
    const answers = shuffleArray(results[0].answers)
    this.setState({
      results,
      question,
      answers,
    })
  }

  checkAnswer = data => {
    const { results, index } = this.state
    const chosenAnswer = data.header
    const { correct_answer } = results[index]
    return decodeHTML(correct_answer) === chosenAnswer
  }

  showFinishedRound = () => {
    const { addCompletedQuizScore, history, quizQuestions, quizId } = this.props
    const { numberOfQuestionsCorrect } = this.state
    addCompletedQuizScore(`${numberOfQuestionsCorrect}/10`)

    this.setState({showSpinner: true})
    // Store the quiz questions in the quiz API
    addQuestionsToQuiz(quizQuestions, quizId).then(() => {
      // Once the quiz is created we can go back to the home page
      history.push('/')
    })
  }

  submitAndPopulate = (event, data) => {
    const isCorrect = this.checkAnswer(data)

    this.setState(prevState => ({
      showAlert: true,
      isCorrect,
      index: prevState.index + 1,
      numberOfQuestionsCorrect: isCorrect
        ? prevState.numberOfQuestionsCorrect + 1
        : prevState.numberOfQuestionsCorrect,
    }))

    setTimeout(() => {
      const { results, index } = this.state
      if (index <= 9) {
        const question = results[index].question
        const answers = shuffleArray(results[index].answers)
        this.setState({
          question,
          answers,
          showAlert: false,
        })
      } else {
        this.showFinishedRound()
      }
    }, 1500)
  }

  showAlert = () => {
    const { isCorrect, results, index } = this.state
    const alertText = isCorrect
      ? 'CORRECT'
      : `Incorrect! The right answer is ${results[index - 1].correct_answer}`
    return (
      <Segment inverted color={isCorrect ? 'green' : 'red'}>
        {alertText}
      </Segment>
    )
  }

  render() {
    const { question, answers, index, showAlert, showSpinner } = this.state
    const decodeQuestion = decodeHTML(question)
    const progressPercent = index * 10

    return (
      <div className="Quiz-body">
        {(question === 'test' || showSpinner)  && <Placeholder />}
        <Form>
          <QuizProgress progressPercent={progressPercent} />
          <QuestionSegment header={decodeQuestion} />

          {answers.map((answer, index) => (
            <Card
              fluid
              color="green"
              header={decodeHTML(answer)}
              key={`Checkbox${index}`}
              className={'backgroundRed'}
              onClick={this.submitAndPopulate}
            />
          ))}
          { showAlert && this.showAlert() }
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
