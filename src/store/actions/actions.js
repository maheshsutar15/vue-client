import login from './login'
import register from './register'
import fetchSensors from './sensors'
import logout from './logout'
import addNode from './addNode'
import deleteNode from './deleteNode'
import fetchTrend from './fetchTrend'
import fetchProfile from './fetchProfile'

const updateSensors = (state, newSensorList) => {
  state.commit('updateSensors', newSensorList)
}
const setToken = (state, token) => {
  state.commit('setToken', token)
}
const setLoggedIn = (state, status_) => {
  state.commit('setLoggedIn', status_)
}
const setDesignation = (state, des) => {
  state.commit('setDesignation', des)
}
const purgeToken = (state) => {
  state.commit('purgeToken')
}

export default  {
  updateSensors,
  setToken,
  purgeToken,
  setLoggedIn,
  setDesignation,
  login,
  register,
  fetchSensors,
  logout,
  addNode,
  deleteNode,
  fetchTrend,
  fetchProfile 
}
