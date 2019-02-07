import React from 'react';
import { Button, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { quizGenres, quizDifficulties } from '../Assets/types';

function QuizSelectors(props) {
  const { pageState } = props;
  return (
    <div className="Home-body-section">
      <br />
      <label>Number of questions:</label>
      <Input onChange={props.changeNumOfQuestions} fluid placeholder="10" />

      <br />
      <label>Choose a genre: </label>
      <Dropdown
        onChange={props.changeGenre}
        placeholder="General Knowledge"
        fluid
        search
        selection
        options={quizGenres}
      />

      <br />
      <label>Choose a difficulty: </label>
      <Dropdown
        onChange={props.changeDifficulty}
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
        <Button onClick={props.createQuiz} primary>
          {' '}
          Generate Quiz{' '}
        </Button>
      </Link>
      <br />
      <br />
    </div>
  );
}

export default QuizSelectors;
