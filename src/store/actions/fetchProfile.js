const fetchProfile = async (state) => {
  return new Promise( resolve => {
    fetch(process.env.VUE_APP_HOST + `/user/about`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        resolve(data.user)
      })
      .catch(e => {
        alert(e)
      })
  })
}

export default fetchProfile
