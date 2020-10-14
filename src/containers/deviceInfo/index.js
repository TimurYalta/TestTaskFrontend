import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  clearChosen,
  loadDeviceData,
  sendCommandToDevice
} from '../../modules/deviceStorage/deviceActions'
import SendCommandForm from './SendCommandForm'
import CommandHistory from './CommandHistory'

class DeviceInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      commandMode: false
    }
  }

  componentDidMount() {
    this.props.loadDeviceData(this.props.id)
  }

  submitCommand = (command) => {
    this.props.sendCommandToDevice(this.props.id, command)
    this.setState({ commandMode: false })
  }

  render() {
    const { props } = this
    return (<div>
      <h1>{`Device ${props.device.name} info`}</h1>
      <h2>General info</h2>
      <div>{`Name: `}<b>{props.device.name}</b></div>
      <div>{`Device type:`}<b>{props.device.type}</b></div>
      <div>{`IP address: `}<b>{props.device.ip}</b></div>
      <div>{`Port: `}<b>{props.device.port}</b></div>
      {props.chosenDeviceState && <div>
        <h2>{`State:`}</h2>
        <table>
          <thead>
          <tr>
            <th>Online</th>
            <th>Status</th>
            <th>Last error</th>
            <th>Last updated</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{props.chosenDeviceState.online}</td>
            <td>{props.chosenDeviceState.status}</td>
            <td>{props.chosenDeviceState.last_error}</td>
            <td>{props.chosenDeviceState.last_sync_date}</td>
          </tr>
          </tbody>
        </table>
      </div>
      }
      {props.chosenDeviceCommandHistory.length > 0 &&
      <CommandHistory
        submitCommand={this.submitCommand}
        commandHistory={props.chosenDeviceCommandHistory}
      />
      }
      <div>
        {!this.state.commandMode &&
        <button
          onClick={() => this.setState({ commandMode: true })}
        >
          Send command to the device
        </button>
        }

        {this.state.commandMode &&
        <SendCommandForm
          submitCommand={this.submitCommand}
          cancelCommand={() => {
            this.setState({ commandMode: false })
          }}
        />}
      </div>
    </div>)
  }
}

const mapStateToProps = ({ devices }) => ({
  id: devices.id,
  device: devices.chosenDevice,
  chosenDeviceState: devices.chosenDeviceState,
  chosenDeviceCommandHistory: devices.chosenDeviceCommandHistory
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearChosen,
      loadDeviceData,
      sendCommandToDevice,
      goToDevice: () => push('/device_info')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInfo)


