import {
  createDevice, createType, getDevice,
  getDeviceCommandHistory,
  getDevices,
  getState, getTypes,
  removeDevice,
  sendCommand
} from '../../services/deviceService';
import {
  CLEAR_CHOSEN_DEVICE,
  GET_DEVICE_COMMAND_HISTORY,
  GET_DEVICE_STATUS,
  GET_DEVICES, GET_FULL_DEVICE_INFO, GET_TYPES, SELECT_DEVICE,
  SET_CHOSEN_DEVICE_ID,
  SET_LOADING
} from './deviceActionTypes';

/**
 * TODO: REFACTOR WITH ASYNC/AWAIT
 */

export const deleteDevice = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    removeDevice(id)
      .then(() => {
        getDevices().then((res) => {
          dispatch({
            type: GET_DEVICES,
            payload: res
          });
        });
      });
  };
};


export const sendCommandToDevice = (id, command) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    sendCommand(id, command)
      .then(() => {
        getDeviceCommandHistory(id)
          .then(
            (history) => {
              dispatch({type: GET_DEVICE_COMMAND_HISTORY, payload: history});
              getState(id)
                .then((state) => {
                  dispatch({type: GET_DEVICE_STATUS, payload: state});
                });
            }
          );
      });
  };
};


export const setId = (id) => {
  return (dispatch) => {
    dispatch({type: SET_CHOSEN_DEVICE_ID, payload: id});
  };
};
export const clearChosen = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_CHOSEN_DEVICE});
  };
};

export const addDevice = (data) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING});
    createDevice(data)
      .then(() => {
        getDevices()
          .then((devs) => {
            dispatch({
              type: GET_DEVICES,
              payload: devs
            });
          }
          );
      });
  };
};


export const loadDeviceData = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    getDevice(id)
      .then((device) => {
        return getState(id)
          .then((state) => {
            return getDeviceCommandHistory(id)
              .then((commandHistory) => {
                dispatch({
                  type: GET_FULL_DEVICE_INFO,
                  payload: {
                    device,
                    state,
                    commandHistory
                  }
                });
              });
          }
          );
      });
  };
};

export const loadTypes = () => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    getTypes()
      .then(
        (types) => {
          dispatch({
            type: GET_TYPES,
            payload: types
          });
        }
      );
  };
};

export const addType = (type, name) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    createType(type, name)
      .then(
        () => {
          getTypes()
            .then(
              (types) => {
                dispatch({
                  type: GET_TYPES,
                  payload: types
                });
              }
            );
        }
      );
  };
};

export const loadDevices = () => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    getDevices().then((res) => {
      dispatch({
        type: GET_DEVICES,
        payload: res
      });
    });
  };
};

export const loadChosenDevice = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });
    console.log(213);
    getDevice(id)
      .then((res) => {
        dispatch({
          type: SELECT_DEVICE,
          payload: res
        });
      });
  };
};

export const loadChosenDeviceStatus = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });

    getState(id)
      .then((res) => {
        dispatch({
          type: GET_DEVICE_STATUS,
          payload: res
        });
      });
  };
};


export const loadChosenDeviceCommandHistory = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_LOADING
    });

    getDeviceCommandHistory(id)
      .then((res) => {
        dispatch({
          type: GET_DEVICE_COMMAND_HISTORY,
          payload: res
        });
      });
  };
};
