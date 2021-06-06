const fetchTrend = async (state, uid) => {
  return new Promise((resolve, reject) => {
    console.log(uid)

    fetch(process.env.VUE_APP_HOST + `/node/readings/all/${uid}`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })

}
export default fetchTrend
