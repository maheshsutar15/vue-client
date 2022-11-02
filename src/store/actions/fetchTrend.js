const fetchTrend = async (state, {uid, from, to}) => {
  return new Promise((resolve, reject) => {
    fetch(process.env.VUE_APP_HOST + `/server/node/readings/all/`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken,
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default',
      method: 'POST',
      body: "" + JSON.stringify({ uid, to, from }) + ""
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data.length)
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })

}
export default fetchTrend
