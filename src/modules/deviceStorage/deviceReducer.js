import {
  CLEAR_CHOSEN_DEVICE, GET_DEVICE_COMMAND_HISTORY,
  GET_DEVICE_STATUS, GET_DEVICES, GET_FULL_DEVICE_INFO,
  GET_TYPES,
  SELECT_DEVICE,
  SET_CHOSEN_DEVICE_ID, SET_IDLE,
  SET_LOADING
} from './deviceActionTypes'

const initialState = {
  id: '',
  isLoading: false,
  devices: [],
  chosenDevice: {},
  chosenDeviceState: {},
  chosenDeviceCommandHistory: [],
  deviceTypes: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        deviceTypes: action.payload
      }
    case SET_CHOSEN_DEVICE_ID:
      return {
        ...state,
        id: action.payload
      }
    case SELECT_DEVICE:
      return {
        ...state,
        chosenDevice: action.payload,
        isLoading: false
      }

    case CLEAR_CHOSEN_DEVICE:
      return {
        ...state,
        chosenDeviceState: {},
        chosenDeviceCommandHistory: [],
        chosenDevice: {}
      }

    case SET_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_DEVICE_STATUS:
      return {
        ...state,
        chosenDeviceState: action.payload
      }
    case SET_IDLE:
      return {
        ...state,
        isLoading: false
      }

    case  GET_DEVICES:
      return {
        ...state,
        isLoading: false,
        devices: action.payload
      }
    case GET_FULL_DEVICE_INFO:
      return {
        ...state,
        chosenDevice: action.payload.device,
        chosenDeviceState: action.payload.state,
        chosenDeviceCommandHistory: action.payload.commandHistory
      }
    case GET_DEVICE_COMMAND_HISTORY:
      return {
        ...state,
        isLoading: false,
        chosenDeviceCommandHistory: action.payload
      }
    default:
      return state
  }
}