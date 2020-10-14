import React from 'react'

const CommandHistory = (props) => {
  return <div>
    <h2>Command history</h2>
    {props.commandHistory.map(
      (el, i) => {
        return <div key={i}>
          <div>{el.command}</div>
          <div>{el.date}</div>
          <div>
            <button onClick={() => props.submitCommand(el.command)}>
              Send again
            </button>
          </div>
        </div>
      })
    }
  </div>
}
export default CommandHistory