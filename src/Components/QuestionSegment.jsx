import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

function QuestionSegment(props) {
  return (
    <Form.Group grouped>
      <Segment size={'big'} className="inverted aligned">
        {props.header}
      </Segment>
      <br />
    </Form.Group>
  )
}

export default QuestionSegment
