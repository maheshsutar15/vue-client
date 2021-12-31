<template>
  <div>
    <h1>Trend for {{ uid }} </h1>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="loading"/>
    <div v-else>
      <div class="row no-print">
        <div class="col-md-6">
          <VueJsonToCsv
              class="col-md-6"
              :json-data="chartData"
              :csv-title="`${this.uid}.data`"
              :labels="{ date: {title: 'Datetime'}, co2: { title: 'CO2' }, temperature: { title: 'Temperature' }, humidity: { title: 'Humidity' } }"
              >
              <b-button
                  variant="primary"
                  v-b-tooltip.hover title="Download CSV"
                  >
                  <DownloadIcon/>
              </b-button>
          </VueJsonToCsv>
        </div>
        <div class="col-md-6" >
            <b-button variant="primary" title="Print Chart" @click="print()">
              <PrintIcon/>
          </b-button>
        </div>
      </div>
      <div class="print">
      <highcharts :options="chartOptions"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import PrintIcon from 'vue-material-design-icons/Printer.vue'
import {Chart} from 'highcharts-vue'

export default {
  name: 'GraphHigh',
  components: {
    highcharts: Chart,
    VueJsonToCsv,
    PrintIcon,
    DownloadIcon
  },
  async mounted() {
    this.loading = true
    this.$store.dispatch('fetchTrend', {
      uid: this.uid,
      from: this.from,
      to: this.to
    })
      .then( readings => {

        const csvData = []

        let co2 = []
        let humidity = []
        let temperature = []

        for(let reading of readings) {
          let date = new Date(reading.datetime).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
          csvData.push({
            date: date,
            co2: parseFloat(reading.co2 || 0),
            temperature: parseFloat(reading.temperature || 0),
            humidity: parseFloat(reading.humidity || 0)
          })

          co2.push([
            Date.parse(new Date(reading.datetime)),
            parseFloat(reading.co2) || 0
          ])

          temperature.push([
            Date.parse(new Date(reading.datetime)),
            parseFloat(reading.temperature) || 0
          ])

          humidity.push([
            Date.parse(new Date(reading.datetime)),
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
          minorTickInterval:10,
          minTickInterval:10,
          title: {
            text: "Timestamps",
          }
        },
        tooltip: {
          xDateFormat: '%B, %d %Y %H:%M:%S',
        },
        time: {
          timezoneOffset: -330
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
  },
  methods: {
    print() {
      window.print()
    }
  }
}
</script>

<style scoped>
@media print {
  .no-print { display: none; }

  .print {
    display: block;
    transform: translateY(400px) rotate(90deg) scale(1.25);
    filter: grayscale(1);
  }
}

</style>
