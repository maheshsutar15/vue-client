const deleteBackup = async (_state, bkp) => {
  console.log(bkp)
  return new Promise( (resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/backup/delete/${bkp}`, {
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

export default deleteBackup
