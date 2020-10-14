import React from 'react';
import './styles.css';


const DeviceItem = (props) => {
  return <div className={'deviceItem'}>
    <div>{props.name}</div>
    <div>{props.type}</div>
    <div>{props.ip}</div>
    <div>{props.port}</div>
    <div>
      <button onClick={() => {
        props.editItem(props.id);
      }}>
        Info
      </button>
      <button onClick={() => {
        props.deleteItem(props.id);
      }}>
        Delete
      </button>
    </div>
  </div>;
};

export default DeviceItem;
