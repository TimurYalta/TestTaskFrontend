import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  loadDevices,
  setId,
  deleteDevice
} from '../../modules/deviceStorage/deviceActions';
import DeviceItem from './DeviceItem';
import '../../index.css';
import './styles.css';

class Devices extends React.Component {
  editDevice = (id) => {
    this.props.setId(id);
    this.props.goToDevice();
  }

  deleteDevice = (id) => {
    this.props.deleteDevice(id);
  }

  componentDidMount() {
    this.props.loadDevices();
  }

  render() {
    const {props} = this;
    return <div className={'container'}>
      <div className={'deviceItem deviceItemHeader'}>
        <div>Name</div>
        <div>Type</div>
        <div>IP</div>
        <div>Port</div>
        <div>Actions</div>
      </div>
      {props.devices.map((dev) => (
        <DeviceItem
          key={dev.id}
          editItem={this.editDevice}
          deleteItem={this.deleteDevice}
          {...dev}
        />
      ))}
    </div>;
  }
}


const mapStateToProps = ({devices}) => ({
  devices: devices.devices
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadDevices,
      setId,
      deleteDevice,
      goToDevice: () => push('/device-info')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Devices);


