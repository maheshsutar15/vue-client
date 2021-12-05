import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['options', 'from', 'to'],
  async mounted() {

    this.$store.dispatch('fetchTrend', this.$route.params.uid)
      .then( reading => {
        // reading = data
        console.log(this.$route.params.uid)
        console.log(this.from, this.to)

        // Filter Readings
        const fromDate = Date.parse(this.from)
        const toDate = Date.parse(this.to)
        const filteredReadings = reading.filter(reading => {
          const dt = Date.parse(reading.datetime)
          return dt >= fromDate && dt <= toDate
        })

        const co2 = filteredReadings.map(r => r.co2)
        const humidity = filteredReadings.map(r => r.humidity)
        const temperature = filteredReadings.map(r => r.temperature)
        const datetime = filteredReadings.map(r => new Date(r.datetime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))

        let chartdata = {
          labels: datetime,
          datasets: [
            {
              label: 'CO2',
              data: co2,
            },
            // {
            //   label: 'Pressure',
            //   backgroundColor: '#00000024',
            //   color: '#ff0000',
            //   data: pressure
            // },
            {
              label: 'Temperature',
              backgroundColor: '#ff00ff24',
              data: temperature
            },
            {
              label: 'Humidity',
              backgroundColor: '#8f422100',
              data: humidity
            }
          ]
        }
        this.renderChart(chartdata, this.options)
      })
  },
}
