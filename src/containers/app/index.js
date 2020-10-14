import React from 'react'
import { Route, Link } from 'react-router-dom'
import { routes } from '../../constants'
import Devices from '../devices'
import DeviceInfo from '../deviceInfo'
import DeviceCreationForm from '../deviceCreation'

const App = () => (
  <div>
    <header>
      <Link to={routes.ADD_DEVICE}>Add device</Link>
      <Link to={routes.DEVICE_LIST}>Devices</Link>
    </header>
    <main>
      <Route exact path={routes.ADD_DEVICE} component={DeviceCreationForm}/>
      <Route exact path={routes.DEVICE_LIST} component={Devices}/>
      <Route exact path={routes.DEVICE_INFO} component={DeviceInfo}/>
    </main>
  </div>
)

export default App
