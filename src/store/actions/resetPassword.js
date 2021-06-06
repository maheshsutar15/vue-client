const resetPwd = async (_state, data) => {
  return new Promise((resolve, reject) => {
    const cred = {
      token: data.token,
      password: data.pwd
    }
    fetch(process.env.VUE_APP_HOST + '/user/resetpwd', {
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify(cred) + ""
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.newUser) {
          resolve(true)
        }
      }).catch((err) => {
        alert(err.message)
        reject(err.message)
      })
  })
}
export default resetPwd;
