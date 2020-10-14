import React from 'react'

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const DeviceItem = (props) => {

  return <div style={style}>
    <div>{props.name}</div>
    <div>{props.type}</div>
    <div>{props.ip}</div>
    <div>{props.port}</div>
    <div>
      <button onClick={() => {
        props.editItem(props.id)
      }}>
        Info
      </button>
      <button onClick={() => {
        props.deleteItem(props.id)
      }}>
        Delete
      </button>
    </div>
  </div>
}


export default DeviceItem