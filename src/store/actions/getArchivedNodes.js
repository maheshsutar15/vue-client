const getArchived = async (state) => {
  return new Promise( (resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/server/node/archived`, {
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

export default getArchived
