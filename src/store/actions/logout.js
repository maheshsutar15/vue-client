const logout = (state) => {

  return new Promise(res => {
    clearInterval(window.appInterval)
    state.commit('purgeToken')
    state.commit('purgeDesignation')
    state.commit('setLoggedIn', false)
    res()
  })
}
export default logout;
