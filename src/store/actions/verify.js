const verify = async (_state, form) => {
  return new Promise((resolve, reject) => {
    const cred = {
      username: form.uname,
      code: form.code,
      password: form.pwd
    }
    let code
    fetch(process.env.VUE_APP_HOST + '/server/user/verify', {
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify(cred) + ""
    })
      .then(resp => {
        code = resp.code
        return resp.json()
      })
      .then(data => {
        console.log({data})
        if(code === 201) {
          resolve(data.message)
        } else {
          reject(data.message)
        }
      }).catch((err) => {
        reject(err.message)
      })
  })
}
export default verify;
