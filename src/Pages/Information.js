

import React, { Component } from 'react';
import { parse } from 'query-string';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GetQuestions } from '../Actions/GetQuestions';
import { withAuthenticator } from 'aws-amplify-react'; 
import { Segment, Form, Card, Dimmer, Loader} from 'semantic-ui-react'
import aws_exports from '../aws-exports'; // specify the location of aws-exports.js file on your project

import './Information.scss'; 
import 'semantic-ui-css/semantic.min.css';

Amplify.configure(aws_exports);

class Information extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      question: 'test', 
      answers: [],
      index: 0,
      showAlert: false,
      numberOfQuestionsCorrect: 0,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const quizCategory = parse(location.search).category;
    const { numQuestions, quizDifficulty, quizType } = location.state;

    GetQuestions(quizCategory, numQuestions, quizDifficulty, quizType, this.populateQuestions);
  }

  populateQuestions = (jsonResponse) => {
    const { index } = this.state;
    const results = jsonResponse.results;
    const question = jsonResponse.results[index].question;
    const answers = jsonResponse.results[index].incorrect_answers;
    answers.push(jsonResponse.results[index].correct_answer)
    this.setState(prevState => ({
      results,
      question, 
      answers,
    }));
  }

  checkAnswer = (data) => {
    const { results, index } = this.state; 
    const chosenAnswer = data.header;
    const { correct_answer } = results[index];
    return correct_answer === chosenAnswer;
  }

  showFinishedRound = () => {
    const { numberOfQuestionsCorrect } = this.state;
    alert(`${numberOfQuestionsCorrect}/10`);
  }

  submitAndPopulate = (event, data) => {
    const isCorrect = this.checkAnswer(data);

    this.setState(prevState => ({
      showAlert: true,
      isCorrect, 
      index: prevState.index + 1,
      numberOfQuestionsCorrect: isCorrect ? 
        prevState.numberOfQuestionsCorrect +1 
        : prevState.numberOfQuestionsCorrect,
    })); 

    setTimeout(() => { //Start the timer
      // Move onto the next question
      const { results, index } = this.state;
      if (index <= 9) {
        const question = results[index].question;
        const answers = results[index].incorrect_answers;
        answers.push(results[index].correct_answer)
        this.setState(prevState => ({
          question, 
          answers,
          showAlert: false,
        }));
      } else {
        this.showFinishedRound();
      }
    }, 1500)
  }

  decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  showAlert = () => {
    const { isCorrect, results, index } = this.state;
    const alertText = isCorrect ? 'CORRECT' : `Incorrect! The right answer is ${results[index-1].correct_answer}`;
    return (
      <Segment inverted color={isCorrect ? 'green' : 'red'}> {alertText} </Segment>
    );
  }

  render() {
    const { question, answers, index } = this.state; 
    const decodeQuestion = this.decodeHTML(question);

    return (
      <div className="Quiz-body">
        { question === 'test' && 
          <Dimmer active>
            <Loader indeterminate>Preparing Quiz</Loader>
          </Dimmer> 
        }
        <header> 
          {`${index+1}/10`}
          <br />
          <br />
        </header>
        <Form>
          <Form.Group grouped>
            <Segment size={'big'} className="inverted aligned">{decodeQuestion}</Segment>
            <br />
          </Form.Group>
          { answers.map((answer, index) => (
              <Card fluid 
                    color='green' 
                    header={this.decodeHTML(answer)} 
                    key={`Checkbox${index}`}
                    className={'backgroundRed'}
                    onClick={this.submitAndPopulate} 
              />
          ))}
          {
            this.state.showAlert && this.showAlert()
          }
        </Form>
      </div>
    );
  }
}

export default withAuthenticator(Information);
