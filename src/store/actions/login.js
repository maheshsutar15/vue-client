const login = async (state, form) => {
  return new Promise((resolve, reject) => {
    const cred = {
      username: form.uname,
      password: form.pwd
    }
    fetch(process.env.VUE_APP_HOST + '/user/login', {
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify(cred) + ""
    })
      .then(resp => resp.json())
      .then(data => {
        console.log({data})
        if(data.message) {
          reject(data.message)
        } else {
          state.commit('setToken', data.accessToken)
          state.commit('setLoggedIn', true)
          state.commit('setDesignation', data.designation)
          resolve()
        }
      }).catch((err) => {

        reject(err.message)
      })
  })
}
export default login;
