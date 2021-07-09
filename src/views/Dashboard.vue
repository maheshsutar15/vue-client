<template>
  <div>
    <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
      <AddNodeForm > </AddNodeForm>
    </b-modal>
    <div class="row">
      <table>
        <tr>
          <td>
            <div>
              <b-button
                  variant="outline-primary"
                  @click="$bvModal.show('nodeForm')"
                  style="float: left; margin-right: 10px"
                  >
                  <PlusIcon class="addnode"/>
                  Add Node
              </b-button>
            </div>
            <div >
              <b-button
                  variant="outline-primary"
                  @click="goToTrend()"
                  style="float: left;"
                  >
                  <ChartLine class="addnode"/>
                  See trend
              </b-button>
            </div>
          </td>
          <td>
            <div style="float: right; text-align: right; font-size: 10pt;">
              <strong>
                {{ ip }}
              </strong>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="!sensors || loading"></vue-loaders-ball-beat>
    <div class="container" v-if="sensors && !loading">
      <b-card
          v-for="sensor in sensors"
          v-bind:key="sensor._id"
          v-bind:title="'UID: ' + sensor.uid"
          v-bind:sub-title="sensor.name"
          class="card drk"
          >
          <hr>
          <b-card-text >
            <table>
              <tr>
                <td>
                  Machine
                </td>
            <td class="value" >
              {{ sensor.machineName }}
            </td>
              </tr>
        <tr>
          <td>
            Location
          </td>
          <td class="value">
            {{ sensor.location }}
          </td>
        </tr>
        <tr>
          <td>Temperature</td>
          <td
              class="value"
              :class="{
                       ok : checkOK(sensor.temperatureRange, sensor.readings.temperature),
                       notok : !checkOK(sensor.temperatureRange, sensor.readings.temperature)}"
              >
              {{ sensor.readings.temperature || '-' }} &deg;C
          </td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td
              class="value"
              :class="{
                       ok : checkOK(sensor.humidityRange, sensor.readings.humidity),
                       notok : !checkOK(sensor.humidityRange, sensor.readings.humidity)}"
              >
              {{ sensor.readings.humidity || '-' }} %
          </td>
        </tr>
        <tr>
          <td>CO<sub>2</sub></td>
          <td
              class="value"
              :class="{
                       ok : checkOK(sensor.co2Range, sensor.readings.co2),
                       notok : !checkOK(sensor.co2Range, sensor.readings.co2)}"
              >
              {{ sensor.readings.co2 || '-'}} %
          </td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td
              class="value"
              :class="{
                       ok : checkOK(sensor.pressureRange, sensor.readings.pressure),
                       notok : !checkOK(sensor.pressureRange, sensor.readings.pressure)}"
              >
              {{ sensor.readings.pressure || '-' }} bar
          </td>
        </tr>
        <tr>
          <td>Battery</td>
          <td class="value" :style="{ok : true}">
            <!-- {{ sensor.readings.battery }} % -->
            <BatteryFull v-if="parseInt(sensor.readings.battery) >= 90" class="ok" />
            <BatteryHalf class="notbad" v-else-if="parseInt(sensor.readings.battery) >= 20 && parseInt(sensor.readings.battery ) < 90"/>
            <BatteryLow class="notok" v-else/>
          </td>
        </tr>
            </table>
            <hr>
            <table>

              <tr>
                <td @click="deleteNode(sensor.uid)">
                  <DeleteIcon title="Delete Node" class="action-btn delete" />
                </td>
                <td class="value" @click="sendCSV(sensor.uid)">
                  <DownloadIcon title="Get the Node readings in CSV" class="action-btn download" />
                </td>
                <!-- <td class="value"> -->
                <!--   <ChartLine title="See Node Trend" class="action-btn chart" @click="goToTrend(sensor.uid)"/> -->
                <!-- </td> -->
              </tr>
            </table>
            <hr>
            <div>
              Last Updated at: {{ sensor.readings.timestamp }}
            </div>
          </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>

import AddNodeForm from '@/components/AddNode.vue'

import PlusIcon from 'vue-material-design-icons/PlusCircle.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ChartLine from 'vue-material-design-icons/ChartLine.vue';
import DownloadIcon from  'vue-material-design-icons/Download.vue'
import BatteryFull from 'vue-material-design-icons/Battery.vue';
import BatteryHalf from 'vue-material-design-icons/Battery50.vue';
import BatteryLow from 'vue-material-design-icons/BatteryLow.vue';

import 'vue-loaders/dist/vue-loaders.css';

import { mapGetters, mapActions } from 'vuex';
import { checkSensors, sendNotification } from '@/common/notifcation.service';

export default {
  name: 'Cards',
  components: {
    ChartLine,
    DeleteIcon,
    PlusIcon,
    AddNodeForm,
    DownloadIcon,
    BatteryFull,
    BatteryHalf,
    BatteryLow
  },
  data() {
    return {
      fetchSensors: null,
      ip: window.location.host
    }
  },
  async mounted() {
    if(this.$store.getters.getAccessToken == null) {
      this.$bvModal.msgBoxOk('Please Login')
      this.$router.push('/')
    }
    navigator.serviceWorker.register('sw.js')
    this.fetchSensors = setInterval(
      () => {
        if(this.$store.getters.getLogInStatus) {
          this.$store.dispatch('fetchSensors', 0)
        }
        checkSensors(this.$store.getters.getSensors, this.$store.getters.getFaulties)
          .then(newFaulties=> {
            this.$store.commit('setFaulties', newFaulties)
            sendNotification(newFaulties)
          })
          .catch(() => {})
      }
      , 3000)
    await window.Notification.requestPermission()
  },
  computed: {
    ...mapGetters({sensors: 'getSensors', loading: 'isLoading'}),
    ...mapActions('notifications', ['add']),
  },
  methods: {
    async sendCSV(uid) {
      try {
        const resp = await fetch(process.env.VUE_APP_HOST + `/node/getcsv/${uid}`)
        const data = await resp.json()
        if(data) {
          this.$bvModal.msgBoxOk(data.msg)
        }
      }
      catch (err) {
        this.$bvModal.msgBoxOk(err.message)
      }

    },
    close() {
      this.$bvModal.hide('nodeForm');
    },
    goToTrend() {
  this.$router.push({name: 'Trends'})
    },
    checkOK(range, val) {
      // const diff = diff
      return (range.min <= val && val <= range.max)
    },
    async deleteNode(uid) {
      this.$bvModal.msgBoxConfirm("Are you sure you want to delete the node "+ uid)
        .then(confirmation => {
          if(confirmation) {
            this.$store.dispatch('deleteNode', uid)
              .then(() => {
                this.$bvModal.msgBoxOk('Successfully Deleted ' + uid)
                  .then(() => {

                  })
                this.$store.dispatch('fetchSensors', 1)
              })
              .catch(() => this.$bvModal.msgBoxOk('Could not delete ' + uid))
          }
        })
        .catch(e => {
          this.message = e.message
          this.$bvModal.msgBoxOk(e.message)
        })
    }
  }
}

</script>

<style scoped>
td {
  font-size: 13pt;
}
.container {
  min-height: 200px;
}
.card {
  width: 14rem;
  float: left;
  margin: 8px 8px;
  padding: 15px 2px;
  padding-left: 10px;
}

.full_neu {
  border-radius: 15px;
  box-shadow: inset -3px -3px 5px rgba(255, 255, 255, 0.2), inset 3px 3px 15px rgba(0, 0, 0, 0.3);
  background-color: #efefef;
  border: none;
}

.shadow_neu {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.drk {
  background-color: #111111dd;
  color: #fefefe;
  box-shadow: 6px 6px 35px rgba(128, 128, 128, .8);
  border-radius: 15px;
}

.card-body {
  padding: 5px 5px;
}

table {
  width: 95%;
}

table.card {
  width: 95%;
  text-align: left;
}

.delete {
  color: #fd4433;
}

.chart {
  color: skyblue;
}

.ok {
  color: #689D6A;
  color: lime;
}

.notok {
  color: #CC241D;
  color: red;
}

.long {
  height: 100%;
}

td {
  text-align: left;
}

tr.separator {
  border-top: 2px white inset;
  padding-bottom: 0px;
}

.container {
  height: auto;
}

.value {
  font-weight: bold;
  text-align: right;
  text-transform: capitalize;
}

.notbad {
  color: orange;
}

.project_title {
  font-size: 12pt;
  text-align: center;
}

.download {
  color: #fff;
}

</style>
