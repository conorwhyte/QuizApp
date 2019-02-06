import React from 'react';
import { Button, Input, Dropdown, } from 'semantic-ui-react';

function QuizSelectors() {

    return (
<div className='Home-body-section'>
                <br />
                <label>Number of questions:</label>
                <Input onChange={this.changeNumOfQuestions} fluid placeholder='10' />

                <br />
                <label>Choose a genre: </label>
                <Dropdown onChange={this.changeGenre} placeholder='General Knowledge' fluid search selection options={quizGenres} />
                
                <br />
                <label>Choose a difficulty: </label>
                <Dropdown onChange={this.changeDifficulty} placeholder='Medium' fluid search selection options={quizDifficulties} />

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
    );
}

export default QuizSelectors;