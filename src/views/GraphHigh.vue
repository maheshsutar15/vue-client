<template>
  <div>
    <h1>Trend for {{ uid }} </h1>
    <div>
      <table v-if="node">
        <tbody>
          <tr>
            <th>Parameter</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
          <tr v-if="node.isTemperature">
            <td>Temperature</td>
            <td>{{ node.temperatureRange.min }}</td>
            <td>{{ node.temperatureRange.max }}</td>
          </tr>
          <tr v-if="node.isHumidity">
            <td>Humidity</td>
            <td>{{ node.humidityRange.min }}</td>
            <td>{{ node.humidityRange.max }}</td>
          </tr>
          <tr v-if="node.isCO2">
            <td>CO2</td>
            <td>{{ node.co2Range.min }}</td>
            <td>{{ node.co2Range.max }}</td>
          </tr>
        </tbody>
      </table>
      Showing From
      <b>{{ formateDate(from) }}</b>
      to
      <b>{{ formateDate(to) }}</b>
    </div>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="loading"/>
      <div v-else>
        <div class="row no-print">
          <div class="col-md-4">
            <b-button
                variant="primary"
                v-b-tooltip.hover
                :href="`/server/node/csv/${uid}/${from}/${to}`"
                title="Download CSV"
                >
                <DownloadIcon/>
            </b-button>
          </div>
          <div class="col-md-4">
            <b-button
                variant="primary"
                v-b-tooltip.hover
                @click="goToTable()"
                title="Go to table"
                >
                <TableIcon/>
            </b-button>
          </div>
          <div class="col-md-4" >
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
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import PrintIcon from 'vue-material-design-icons/Printer.vue'
import TableIcon from 'vue-material-design-icons/Table.vue'
import {Chart} from 'highcharts-vue'

export default {
  name: 'GraphHigh',
  components: {
    highcharts: Chart,
    PrintIcon,
    TableIcon,
    DownloadIcon
  },
  async mounted() {
    this.loading = true
    this.$store.dispatch('fetchNode', this.uid)
      .then(data => {
        this.node = data
      })
    this.$store.dispatch('fetchTrend', {
      uid: this.uid,
      from: this.from,
      to: this.to
    })
      .then(this.constructData)
    this.loading = false
  },
  data() {
    return {
      uid: this.$route.params.uid,
      node: null,
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
        series: [ ]
      }
    }
  },
  methods: {
    formateDate(date) {
      let unx = Date.parse(date)
      unx = unx - (330*60*1000)
      return new Date(unx).toLocaleString()
    },
    goToTable() {
      this.$router.push({
        name: 'NodeTable',
        params: {
          uid: this.uid,
          from: this.from,
          to: this.to,
        }
      })
    },
    print() {
      window.print()
    },
    constructData (readings) {
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

      let idx = 0
      if (this.node.isCO2) {
        this.chartOptions.series.push({
          name: 'CO2',
          data: []
        })
        this.chartOptions.series[idx].data.push(...co2)
        idx++
      }
      if (this.node.isTemperature) {
        this.chartOptions.series.push({
          name: 'Temperature',
          data: []
        })
        this.chartOptions.series[idx].data.push(...temperature)
        idx++
      }
      if (this.node.isHumidity) {
        this.chartOptions.series.push({
          name: 'Humidity',
          data: []
        })
        this.chartOptions.series[idx].data.push(...humidity)
      }
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
