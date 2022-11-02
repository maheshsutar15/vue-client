const fetchLogs = async (state) => {
  return new Promise( (resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/server/activities`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        resolve(data.updates)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export default fetchLogs
