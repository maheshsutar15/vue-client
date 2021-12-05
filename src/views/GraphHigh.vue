<template>
  <div>
    <h1>Trend for {{ uid }} </h1>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="loading"/>
    <div v-else>
      <VueJsonToCsv
          :json-data="chartData"
          :csv-title="`${this.uid}.data`"
          :labels="{ date: {title: 'Datetime'}, co2: { title: 'CO2' }, temperature: { title: 'Temperature' }, humidity: { title: 'Humidity' } }"
          >
          <b-button variant="primary">
            <DownloadIcon/>
            Download
          </b-button>
      </VueJsonToCsv>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import {Chart} from 'highcharts-vue'

export default {
  name: 'GraphHigh',
  components: {
    highcharts: Chart,
    VueJsonToCsv,
    DownloadIcon
  },
  created() {
    this.loading = true
  },
  async mounted() {
    this.$store.dispatch('fetchTrend', this.uid)
      .then( reading => {

        const fromDate = Date.parse(this.from)
        const toDate = Date.parse(this.to)
        const filteredReadings = reading.filter(reading => {
          const dt = Date.parse(reading.datetime)
          const cond = dt >= fromDate && dt <= toDate
          return cond
        })
        const csvData = []

        let co2 = []
        let humidity = []
        // let pressure = []
        let temperature = []

        for(let reading of filteredReadings) {
          let date = new Date(reading.datetime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
          csvData.push({
            date: date,
            co2: parseFloat(reading.co2 || 0),
            temperature: parseFloat(reading.temperature || 0),
            humidity: parseFloat(reading.humidity || 0)
          })

          co2.push([
            date,
            parseFloat(reading.co2) || 0
          ])

          temperature.push([
            date,
            parseFloat(reading.temperature) || 0
          ])

          humidity.push([
            date,
            parseFloat(reading.humidity) || 0
          ])

        }

        this.chartData.push(...csvData)

        this.chartOptions.series[0].data.push(...temperature)
        this.chartOptions.series[1].data.push(...humidity)
        this.chartOptions.series[2].data.push(...co2)

      })
     this.loading = false
  },
  data() {
    return {
      uid: this.$route.params.uid,
      from: this.$route.params.from,
      to: this.$route.params.to,
      loading: true,
      chartData: [],
      chartOptions: {
        credits: false,
        title: {
          text: 'Trend for node'
        },
        yAxis: {
          title: {
            text: "Readings",
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%Y-%b-%e}'
          },
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
        ]
      }
    }
  }
}
</script>
