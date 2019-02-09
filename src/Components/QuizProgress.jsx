import React from 'react'
import { Progress } from 'semantic-ui-react'

function QuizProgress(props) {
  return (
    <header>
      <Progress percent={props.progressPercent} progress />
      <br />
      <br />
    </header>
  )
}

export default QuizProgress
