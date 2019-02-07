import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function QuizSelectors(props) {
  const { pageState, quizItems } = props;
  return (
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
        <Button onClick={props.createQuiz} primary>
          {' '}
          Start Quiz{' '}
        </Button>
      </Link>
      <br />
    </div>
  );
}

export default QuizSelectors;
