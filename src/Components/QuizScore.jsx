import React from 'react'
import { Header, Divider } from 'semantic-ui-react'

function QuizScore(props) {
  return (
    <Header as="h2" icon textAlign="center">
      <Divider horizontal>
        Thanks for playing!
      </Divider>
      <br />
      {props.quizScore}
      <br />
      <Header.Subheader>
        Score from previous quiz. 
      </Header.Subheader>
      <br />
    </Header>
  )
}

export default QuizScore
