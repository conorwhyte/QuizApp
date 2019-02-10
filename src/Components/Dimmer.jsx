import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function Placeholder() {
  return (
    <Dimmer active>
      <Loader indeterminate>Preparing Quiz</Loader>
    </Dimmer>
  )
}

export default Placeholder
