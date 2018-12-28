import React, { Component } from 'react';
import * as AppActions from '../Actions/AppActions'; 
import { Link } from 'react-router-dom'; 

import 'semantic-ui-css/semantic.min.css';
import './Home.scss';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'; 
import { Header, Form, Button, Input, Select} from 'semantic-ui-react'
import aws_exports from '../aws-exports'; // specify the location of aws-exports.js file on your project

Amplify.configure(aws_exports);

class Home extends Component {
  constructor() {
    super(); 
    
    this.state = {
      numQuestions: 10,
      quizCategory: 9,
      quizDifficulty: 'medium',
      quizType: 'multiple',
    };
  }

  handleChange(e) {
    const user = e.target.value;
    AppActions.changeUser(user);
  }
  
  render() {
    const genre = [{text: 'General knowledge', value: 'General knowledge'}];
    const pageState = this.state;
    return (
      <div className="Home-body">
        <Header size='large'>Welcome to the quiz app.</Header>
        <Form>
            <Form.Group>
              <Form.Field control={Input} label='Num. of Questions' placeholder='10' />
            </Form.Group>
            
            <Form.Group>
              <Form.Field control={Select} label='Pick a category: ' options={genre} placeholder='General' />
            </Form.Group>

            <Form.Group>
              <Form.Field control={Select} label='Pick a difficulty: ' options={genre} placeholder='Medium' />
            </Form.Group>

            <Link
              to={{
                pathname: '/quiz',
                search: `?category=${pageState.quizCategory}`,
                state: { ...pageState },
              }}>
              <Form.Field control={Button}>Submit</Form.Field>
            </Link>
        </Form>
      </div>
    );
  }
}

export default Home;
// export default withAuthenticator(Home, { includeGreetings: true});

