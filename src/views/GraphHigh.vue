<template>
  <div>
    <h1>Trend for {{ uid }} </h1>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="loading"></vue-loaders-ball-beat>

    <highcharts :options="chartOptions" v-else></highcharts>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'
export default {
  name: 'GraphHigh',
  components: {
    highcharts: Chart
  },
  async mounted() {
    this.$store.dispatch('fetchTrend', this.$route.params.uid)
      .then( readings => {
        console.log(this.from, this.to)

        const fromDate = Date.parse(this.from)
        const toDate = Date.parse(this.to)
        const filteredReadings = readings.filter(reading => {
          const dt = Date.parse(reading.datetime)
          const cond = dt >= fromDate && dt <= toDate
          console.log(cond)
          return cond
        })

        let co2 = []
        let humidity = []
        let pressure = []
        let temperature = []

        console.log(filteredReadings)

        for(let reading of filteredReadings) {
          let date = new Date(reading.datetime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
          console.log(reading)

          co2.push([
            date,
            parseFloat(reading.co2)
          ])

          temperature.push([
            date,
            parseFloat(reading.temperature)
          ])

          pressure.push([
            date,
            parseFloat(reading.pressure)
          ])

          humidity.push([
            date,
            parseFloat(reading.humidity)
          ])

        }

        console.log({
          temperature,
          co2,
          pressure,
          humidity
        })

        this.chartOptions.series[0].data.push(...temperature)
        this.chartOptions.series[1].data.push(...humidity)
        this.chartOptions.series[2].data.push(...co2)
        this.chartOptions.series[3].data.push(...pressure)

        this.loading = false
      })
  },
  data() {
    return {
      uid: this.$route.params.uid,
      from: this.$route.params.from,
      to: this.$route.params.to,
      loading: true,
      chartOptions: {
        title: {
          text: 'Trend for node'
        },
        yAxis: {
          title: {
            text: "Readings",
          }
        },
        xAxis: {
          title: {
            text: "Timestamps",
          }
        },
        series: [
          {
            name: 'Temperature',
            data: []
          },
          {
            name: 'Humdity',
            data: []
          },
          {
            name: 'CO2',
            data: []
          },
          {
            name: 'Pressure',
            data: []
          },

        ]
      }
    }
  }
}
</script>
