import React, { Component } from 'react';
import * as AppActions from '../Actions/AppActions';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './Home.scss';

import QuizIcon from '../Assets/quizIcon.png';
import { quizGenres, quizDifficulties } from '../Assets/types';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import retry from 'async-retry';
import _ from 'lodash';

import { listAllQuiz, countQuizWithGenre } from '../Actions/CreateQuiz';
import { withAuthenticator } from 'aws-amplify-react';
import {
  Header,
  Button,
  Image,
  Input,
  Select,
  Divider,
  Dropdown,
  Form,
  Grid,
  Segment,
} from 'semantic-ui-react';
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

  listAllQuizCallback = data => {
    const allQuizzes = data.listQuizzes.items;
    const quizItems = allQuizzes.map(item => {
      return { text: item.title, value: item.title };
    });

    this.setState({ quizItems });
  };

  changeGenre = (event, data) => {
    const { quizItems } = this.state;
    const genreTitle = quizGenres.filter(quiz => {
      if (quiz.value === data.value) {
        return quiz.text;
      }
    });
    const { text } = genreTitle[0];
    const numberOfQuizzes = countQuizWithGenre(text, quizItems);
    this.setState({
      quizCategory: data.value,
      numberOfQuizzes,
      quizCategoryTitle: text,
    });
  };

  changeDifficulty = (event, data) => {
    this.setState({ quizDifficulty: data.value });
  };

  changeNumOfQuestions = (event, data) => {
    this.setState({ numQuestions: data.value });
  };

  render() {
    const pageState = this.state;
    const { quizItems } = this.state;
    return (
      <div className="Home-body">
        <Header as="h2" icon textAlign="center">
          <Image src={QuizIcon} />
          <br />
          Trivia zone
          <Header.Subheader>
            Choose a genre, a difficulty to generate a quiz. Or choose a
            pre-generated quiz.
          </Header.Subheader>
        </Header>
        <br />
        <Segment placeholder textAlign="center">
          <div className="Home-body-section">
            <br />
            <label>Number of questions:</label>
            <Input
              onChange={this.changeNumOfQuestions}
              fluid
              placeholder="10"
            />

            <br />
            <label>Choose a genre: </label>
            <Dropdown
              onChange={this.changeGenre}
              placeholder="General Knowledge"
              fluid
              search
              selection
              options={quizGenres}
            />

            <br />
            <label>Choose a difficulty: </label>
            <Dropdown
              onChange={this.changeDifficulty}
              placeholder="Medium"
              fluid
              search
              selection
              options={quizDifficulties}
            />

            <br />
            <br />
            <Link
              to={{
                pathname: '/quiz',
                search: `?category=${pageState.quizCategory}`,
                state: { ...pageState },
              }}
            >
              <Button onClick={this.createQuiz} primary>
                {' '}
                Generate Quiz{' '}
              </Button>
            </Link>
            <br />
            <br />
          </div>
          <Divider horizontal>Or choose an existing quiz</Divider>
          <div className="Home-body-section">
            <br />
            <label>Already created quizzes: </label>
            <Dropdown
              placeholder="Quiz1"
              fluid
              search
              selection
              options={quizItems}
            />

            <br />
            <br />
            <Link
              to={{
                pathname: '/quiz',
                search: `?category=${pageState.quizCategory}`,
                state: { ...pageState },
              }}
            >
              <Button onClick={this.createQuiz} primary>
                {' '}
                Start Quiz{' '}
              </Button>
            </Link>
            <br />
          </div>
        </Segment>
      </div>
    );
  }
}

export default withAuthenticator(Home, { includeGreetings: true });
