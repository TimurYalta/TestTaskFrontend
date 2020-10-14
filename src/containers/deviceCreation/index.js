import React from 'react';
import {bindActionCreators} from 'redux';
import {loadTypes, addType, addDevice} from '../../modules/deviceStorage/deviceActions';
import {push} from 'connected-react-router';
import {connect} from 'react-redux';
import TypeCreationForm from './TypeCreationForm';
import {routes} from '../../constants';
import '../../index.css';
import './styles.css';

class DeviceCreationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      port: '',
      type: '',
      typeCreationMode: false
    };
  }

  componentDidMount() {
    this.props.loadTypes();
  }

  onChange = (field) => {
    return (e) => {
      const stateObj = {...this.state};
      stateObj[field] = e.target.value;
      this.setState(stateObj);
    };
  }

  saveType = (name, type) => {
    this.props.addType(type, name);
    this.setState({typeCreationMode: false});
  }

  submitDeviceCreation = () => {
    const {name, type, ip, port} = this.state;
    const data = {
      name, type, ip, port: parseInt(port)
    };
    this.props.addDevice(data);
    this.props.goToDevices();
  }

  render() {
    return <div className={'container'}>
      <h1>Device creation form</h1>
      <div className={'form'}>
        <div>
          <label>
            Device name:
          </label>
          <input type="text" onChange={this.onChange('name')}/>
        </div>
        <div>
          <label>
            IP:
          </label>
          <input type="text" onChange={this.onChange('ip')}/>
        </div>
        <div>
          <label>
            Port:
          </label>
          <input type="text" onChange={this.onChange('port')}/>
        </div>
        <div>
          <label>
            Device type:
          </label>
          <select onChange={this.onChange('type')}>
            <option value=''/>
            {this.props.types.map(
              (el, i) => {
                return <option key={i} value={el.type}>{el.name}</option>;
              }
            )}
          </select>
        </div>
        <button
          onClick={this.submitDeviceCreation}
        >
          Save device
        </button>
      </div>
      <div>
        {!this.state.typeCreationMode &&
        <button onClick={() => this.setState({typeCreationMode: true})}>
          Add device type
        </button>}
        {this.state.typeCreationMode &&
        <TypeCreationForm
          cancelTypeCreation={() => this.setState({typeCreationMode: false})}
          saveType={this.saveType}
        />
        }
      </div>
    </div>;
  }
}

const mapStateToProps = ({devices}) => ({
  types: devices.deviceTypes
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadTypes,
      addDevice,
      addType,
      goToDevices: () => push(routes.DEVICE_LIST)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceCreationForm);
