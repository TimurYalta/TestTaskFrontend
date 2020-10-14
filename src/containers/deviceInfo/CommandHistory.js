import React from 'react';
import './styles.css';

const CommandHistory = (props) => {
  return <div>
    <h2>Command history</h2>
    <div className={'commandHistory'}>
      <table>
        <thead>
          <tr><th>Command</th><th>Date</th><th></th></tr>
        </thead>
        <tbody>
          {props.commandHistory.map(
            (el, i) => {
              return <tr key={i}>
                <td>{el.command}</td>
                <td>{el.date}</td>
                <td>
                  <button onClick={() => props.submitCommand(el.command)}>
                  Send again
                  </button>
                </td>
              </tr>;
            })
          }
        </tbody>
      </table>
    </div>
  </div>;
};
export default CommandHistory;
