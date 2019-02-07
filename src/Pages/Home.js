import React, { Component } from 'react';
import * as AppActions from '../Actions/AppActions';
import { quizGenres } from '../Assets/types';
import QuizSelectors from '../Components/QuizSelectors';
import ExistingQuiz from '../Components/ExistingQuiz';
import QuizHeader from '../Components/Header';
import Amplify from 'aws-amplify';
import _ from 'lodash';
import { listAllQuiz, countQuizWithGenre } from '../Actions/CreateQuiz';
import { withAuthenticator } from 'aws-amplify-react';
import { Divider, Segment } from 'semantic-ui-react';
import aws_exports from '../aws-exports'; // specify the location of aws-exports.js file on your project

import 'semantic-ui-css/semantic.min.css';
import './Home.scss';
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
        <QuizHeader />
        <br />
        <Segment placeholder textAlign="center">
          <QuizSelectors
            createQuiz={this.createQuiz}
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
    );
  }
}

export default withAuthenticator(Home, { includeGreetings: true });
