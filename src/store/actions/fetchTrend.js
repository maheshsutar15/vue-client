const fetchTrend = async (state, uid) => {
      const res = await fetch(process.env.VUE_APP_HOST + `/node/readings/all/${this.uid}`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })


}
export default fetchTrend
