const fetchSensors = async (state) => {
  const res = await fetch(process.env.VUE_APP_HOST + '/node', {
    headers: new Headers({
      'Authorization': 'Bearer '+state.getters.getAccessToken
    })
  });
  console.log(state)
  let sensorsList = await res.json();
  for(let i = 0; i < sensorsList.length; i++) {
    const res = await fetch(process.env.VUE_APP_HOST + `/node/readings/${sensorsList[i].uid}`, {
      headers: new Headers({
        'Authorization': 'Bearer '+state.getters.getAccessToken
      })
    })

    const readings = await res.json()

    sensorsList[i].readings = {
      co2: readings.co2,
      pressure: readings.pressure,
      humidity: readings.humidity,
      temperature: readings.temperature
    }
  }
  state.commit('updateSensors', sensorsList)

}
export default fetchSensors;
