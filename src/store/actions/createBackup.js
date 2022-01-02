const createBackup = async () => {
  return new Promise( (resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + '/server' + `/backup/create`, {
      // headers: new Headers({
      //   'Authorization': 'Bearer '+state.getters.getAccessToken
      // })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        resolve(data.msg)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export default createBackup 
