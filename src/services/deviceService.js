import axios from 'axios'
import { API_ADDRESS } from '../constants'

export async function getDevices() {
  try {
    const devices = await axios.get(API_ADDRESS + '/devices')
    return devices.data.data
  } catch (err) {
    return []
  }
}

export async function getDevice(id) {
  try {
    const device = await axios.get(API_ADDRESS + '/devices/' + id)
    return device.data.data
  } catch (err) {
    return {}
  }
}

export async function getState(id) {
  try {
    const state = await axios.get(API_ADDRESS + '/state/' + id)
    return state.data.data
  } catch (err) {
    return {}
  }
}

export async function getDeviceCommandHistory(id) {
  try {
    const history = await axios.get(API_ADDRESS + '/commands/' + id)
    return history.data.data
  } catch (err) {
    return []
  }
}

export async function sendCommand(id, command) {
  try {
    const request = await axios.post(API_ADDRESS + '/commands/send/' + id, { command })
    return Promise.resolve()
  } catch (err) {
    return Promise.reject()
  }
}

export async function getTypes() {
  try {
    const types = await axios.get(API_ADDRESS + '/types')
    return types.data.data
  } catch (err) {
    return []
  }
}

export async function createDevice(data) {
  try {
    const request = await axios.post(API_ADDRESS + '/devices/create/', data)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject()
  }
}

export async function removeDevice(id) {
  try {
    const request = await axios.get(API_ADDRESS + '/devices/remove/' + id)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject()
  }
}

export async function createType(type, name) {
  try {
    const request = await axios.post(API_ADDRESS + '/types/create/', { type, name })
    return Promise.resolve()
  } catch (err) {
    return Promise.reject()
  }
}