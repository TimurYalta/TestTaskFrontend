import React, { useState } from 'react'

const TypeCreationForm = (props) => {
  const [typeData, setTypeData] = useState({
    type: '',
    name: ''
  })
  const saveType = () => {
    props.saveType(typeData.name, typeData.type)
  }
  return <div>
    <label>Type</label>
    <input onChange={(e) => {
      setTypeData({ ...typeData, type: e.target.value })
    }}/>
    <label>Name</label>
    <input onChange={(e) => {
      setTypeData({ ...typeData, name: e.target.value })
    }}/>
    <button onClick={props.cancelTypeCreation}>Cancel</button>
    <button onClick={saveType}>Submit</button>
  </div>
}

export default TypeCreationForm