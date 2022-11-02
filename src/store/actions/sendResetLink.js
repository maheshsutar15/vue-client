const sendLink = async (_state, uname) => {
  return new Promise((resolve, reject) => {
    const cred = {
      username: uname,
    }
    fetch(process.env.VUE_APP_HOST + '/server/user/forgot', {
      headers: {"Content-Type": "application/json"},
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify(cred) + ""
    })
      .then(resp => resp.json())
      .then(data => {
        console.log({data})
        resolve(true)
      }).catch((err) => {
        alert(err.message)
        reject(err.message)
      })
  })
}
export default sendLink;
