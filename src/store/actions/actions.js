import login from './login'
import register from './register'
import fetchSensors from './sensors'
import logout from './logout'
import addNode from './addNode'
import modifyNode from './modifyNode'
import deleteNode from './deleteNode'
import fetchTrend from './fetchTrend'
import fetchProfile from './fetchProfile'
import sendResetLink from './sendResetLink'
import resetPassword from './resetPassword'
import deleteUser from './deleteUser'
import fetchLogs from './fetchLogs'

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
  modifyNode,
  deleteNode,
  fetchTrend,
  sendResetLink,
  fetchProfile,
  fetchLogs,
  deleteUser,
  resetPassword
}
