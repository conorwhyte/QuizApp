import React from 'react';
import { Image, Header } from 'semantic-ui-react';
import QuizIcon from '../Assets/quizIcon.png';

function QuizHeader() {
  return (
    <Header as="h2" icon textAlign="center">
      <Image src={QuizIcon} />
      <br />
      Trivia zone
      <Header.Subheader>
        Choose a genre, a difficulty to generate a quiz. Or choose a
        pre-generated quiz.
      </Header.Subheader>
    </Header>
  );
}

export default QuizHeader;
