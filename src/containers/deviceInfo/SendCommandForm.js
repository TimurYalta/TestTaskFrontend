import React, { useState } from 'react'

const SendCommandForm = (props) => {
  const [command, setCommand] = useState('')
  const sendCommand = () => {
    props.submitCommand(command)
  }
  return <div>
    <label>Command</label>
    <input onChange={(e) => {
      setCommand(e.target.value)
    }}/>
    <button onClick={props.cancelCommand}>Cancel</button>
    <button onClick={sendCommand}>Submit</button>
  </div>
}

export default SendCommandForm