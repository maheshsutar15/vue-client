const fetchNode = async (state, uid) => {
  return new Promise( (resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/server/node/search/${uid}`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
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

export default fetchNode
