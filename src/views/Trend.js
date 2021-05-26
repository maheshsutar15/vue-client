import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['options', 'token', 'uid'],
  async mounted() {

    this.$store.dispatch('fetchTrend', this.$route.params.uid)
    const readings = await res.json()
    const co2 = readings.map(r => r.co2)
    const humidity = readings.map(r => r.humidity)
    const pressure = readings.map(r => r.pressure)
    const temperature = readings.map(r => r.temperature)
    const datetime = readings.map(r => r.datetime)

    let chartdata = {
      labels: datetime,
      datasets: [
        {
          label: 'CO2',
          data: co2
        },
        {
          label: 'Pressure',
          backgroundColor: '#00000024',
          data: pressure
        },
        {
          label: 'Temperature',
          backgroundColor: '#ff00ff24',
          data: temperature
        },
        {
          label: 'Humidity',
          backgroundColor: '#8f422100',
          data: humidity
        },
      ]
    }
    this.renderChart(chartdata, this.options)
  },
}
