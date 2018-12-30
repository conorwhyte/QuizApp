import React, { Component } from 'react';
import * as AppActions from '../Actions/AppActions'; 
import { Link } from 'react-router-dom'; 

import 'semantic-ui-css/semantic.min.css';
import './Home.scss';

import QuizIcon from '../Assets/quizIcon.png';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import retry from 'async-retry';
import _ from 'lodash';

import { listAllQuiz } from '../Actions/CreateQuiz';
import { withAuthenticator } from 'aws-amplify-react'; 
import { Header, Button, Image, Input, Select, Divider, Dropdown, Form, Grid, Segment } from 'semantic-ui-react'
import aws_exports from '../aws-exports'; // specify the location of aws-exports.js file on your project

import 'babel-polyfill';

Amplify.configure(aws_exports);

class Home extends Component {
  constructor() {
    super(); 
    
    this.state = {
      numQuestions: 10,
      quizCategory: 9,
      quizDifficulty: 'medium',
      quizType: 'multiple',
      quizItems: [],
    };
  }

  handleChange(e) {
    const user = e.target.value;
    AppActions.changeUser(user);
  }

  componentDidMount() {
    listAllQuiz(this.listAllQuizCallback);
  }

  listAllQuizCallback = (data) => {
    const allQuizzes = data.listQuizzes.items;
    const quizItems = allQuizzes.map((item) => {
      return {text: item.title, value: item.title};
    });
    this.setState({quizItems})
  }
   
  render() {
    const genre = [{text: 'General knowledge', value: 'General knowledge'}];
    const pageState = this.state;
    const { quizItems } = this.state;
    return (
      <div className="Home-body">
        <Header as='h2' icon textAlign='center'>
          <Image src={QuizIcon} />
          <br />
          Trivia zone
          <Header.Subheader>Choose a genre, a difficulty to generate a quiz. Or choose a pre-generated quiz.</Header.Subheader>
        </Header>
        <br />
          <Segment placeholder textAlign='center'>
              <div className='Home-body-section'>
                <br />
                <label>Number of questions:</label>
                <Input fluid placeholder='10' />

                <br />
                <label>Choose a genre: </label>
                <Dropdown placeholder='Quiz1' fluid search selection options={genre} />
                
                <br />
                <label>Choose a difficulty: </label>
                <Dropdown placeholder='Quiz1' fluid search selection options={genre} />

                <br />
                <br />
                <Link
                  to={{
                    pathname: '/quiz',
                    search: `?category=${pageState.quizCategory}`,
                    state: { ...pageState },
                  }}> 
                  <Button onClick={this.createQuiz} primary> Generate Quiz </Button> 
                </Link>
                <br /> 
                <br />
              </div>
          <Divider horizontal>Or choose an existing quiz</Divider>
          <div className='Home-body-section'> 
            <br />
            <label>Already created quizzes: </label>
            <Dropdown placeholder='Quiz1' fluid search selection options={quizItems} />
            
            <br />
            <br />
            <Link
              to={{
                pathname: '/quiz',
                search: `?category=${pageState.quizCategory}`,
                state: { ...pageState },
              }}> 
              <Button onClick={this.createQuiz} primary> Start Quiz </Button> 
            </Link>
            <br />
          </div>
        </Segment>
      </div>
    );
  }
}

// export default Home;
export default withAuthenticator(Home, { includeGreetings: true});

