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
  for(let i = 0; i < sensorsList.length; i++) {
    const res = await fetch(process.env.VUE_APP_HOST + `/node/readings/${sensorsList[i].uid}`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })

    const readings = await res.json()

    sensorsList[i].readings = {
      temperature: readings.temperature,
      humidity: readings.humidity,
      co2: readings.co2,
      battery: readings.battery,
      timestamp: new Date(readings.datetime)
    }
  }
  state.commit('updateSensors', sensorsList)
  state.commit('loaded')

}
export default fetchSensors;
