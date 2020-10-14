import React from 'react'
import { bindActionCreators } from 'redux'
import { loadTypes, addType, addDevice } from '../../modules/deviceStorage/deviceActions'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import TypeCreationForm from './TypeCreationForm'


class DeviceCreationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      ip: '',
      port: '',
      type: '',
      typeCreationMode: false
    }
  }

  componentDidMount() {
    this.props.loadTypes()
  }

  onChange = (field) => {
    return (e) => {
      const stateObj = { ...this.state }
      stateObj[field] = e.target.value
      this.setState(stateObj)
    }
  }

  saveType = (name, type) => {
    this.props.addType(type, name)
    this.setState({ typeCreationMode: false })
  }

  submitDeviceCreation = () => {
    const { name, type, ip, port } = this.state
    const data = {
      name, type, ip, port: parseInt(port)
    }
    this.props.addDevice(data)
    this.props.goToDevices()
  }

  render() {
    return <div>
      <h1>Device creation form</h1>
      <label>
        Device name:
        <input type="text" onChange={this.onChange('name')}/>
      </label>
      <br/>
      <label>
        IP:
        <input type="text" onChange={this.onChange('ip')}/>
      </label>
      <br/>
      <label>
        Port:
        <input type="text" onChange={this.onChange('port')}/>
      </label>
      <br/>
      <label>
        Device type:
        <select defaultValue={this.props.types[0]} onChange={this.onChange('type')}>
          {this.props.types.map(
            (el, i) => {
              return <option key={i} value={el.type}>{el.name}</option>
            }
          )}
        </select>
      </label>
      <br/>
      <button
        onClick={this.submitDeviceCreation}
      >
        Save device
      </button>
      <br/>

      {!this.state.typeCreationMode &&
      <button onClick={() => this.setState({ typeCreationMode: true })}>
        Add Type
      </button>}
      {this.state.typeCreationMode &&
      <TypeCreationForm
        cancelTypeCreation={() => this.setState({ typeCreationMode: false })}
        saveType={this.saveType}
      />
      }
    </div>
  }
}

const mapStateToProps = ({ devices }) => ({
  types: devices.deviceTypes
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadTypes,
      addDevice,
      addType,
      goToDevices: () => push('/devices')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceCreationForm)
