import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/actions'
import { 
  getJWT,
  setJWT,
  purgeJWT,
  getLocalDesignation,
  setLocalDesignation,
  purgeLocalDesignation
} from '@/common/jwt.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sensors: null,
    accessToken: getJWT(),
    loggedIn: !!getJWT(),
    designation: getLocalDesignation(),
    loading: true
  },
  mutations: {
    loaded(state) {
      state.loading = false
    },
    loading(state) {
      state.loading = true
    },
    updateSensors(state, newSensorList) {
      state.sensors = newSensorList
    },
    setToken(state, token) {
      setJWT(token)
      state.accessToken = token
    },
    setLoggedIn(state, status_) {
      state.loggedIn = status_
    },
    setDesignation(state, des) {
      state.designation = des
      setLocalDesignation(des)
    },
    purgeToken(state) {
      state.accessToken = null
      purgeJWT()
    },
    purgeDesignation(state) {
      state.designation = null
      purgeLocalDesignation()
    }

  },
  actions: actions,
  modules: {
  },
  getters: {
    getSensors: state => state.sensors,
    getAccessToken: state => state.accessToken,
    getDesignation: state => state.designation,
    getLogInStatus: state => state.loggedIn,
    isLoading: state => state.loading
  }
})
