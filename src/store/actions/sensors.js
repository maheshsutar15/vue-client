const fetchSensors = async (state, redraw) => {
  if(redraw) {
    state.commit('loading')
  }
  const res = await fetch(process.env.VUE_APP_HOST + '/node', {
    headers: new Headers({
      'Authorization': 'Bearer '+state.getters.getAccessToken
    })
  });
  let sensorsList = await res.json();
  state.commit('updateSensors', sensorsList)
  state.commit('loaded')
}
export default fetchSensors;
