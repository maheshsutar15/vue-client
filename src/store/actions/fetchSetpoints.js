const fetchSetpoint = async (_state, uid) => {
  return new Promise((resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/server/write/setpoints/${uid}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default',
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })

}
export default fetchSetpoint
