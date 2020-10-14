import {combineReducers} from 'redux';

import devices from './deviceStorage/deviceReducer';

export default combineReducers({
  devices
});
