<template >
  <div>
    <div class="container" v-if="sensors.length > 0 && !loading">
      <div class="card-container">

        <b-card v-for="sensor in sensors" :key="sensor._id" class="card drk" :class="{
          green: checkOK(sensor.temperatureRange, sensor.reading.temperature) || checkOK(sensor.humidityRange, sensor.reading.humidity) || checkOK(sensor.co2Range, sensor.reading.co2),
          red: !checkOK(sensor.temperatureRange, sensor.reading.temperature) || !checkOK(sensor.humidityRange, sensor.reading.humidity) || !checkOK(sensor.co2Range, sensor.reading.co2)
        }
        ">
          <section class="sky">
            <div class="cloud-1 green"></div>
            <div class="cloud-2"></div>
            <div class="cloud-3"></div>
            <div class="sun sunClose">
              <div class="Circle3" :class="{
                circle3_green: checkOK(sensor.temperatureRange, sensor.reading.temperature) || checkOK(sensor.humidityRange, sensor.reading.humidity) || checkOK(sensor.co2Range, sensor.reading.co2),
                circle3_red: !checkOK(sensor.temperatureRange, sensor.reading.temperature) || !checkOK(sensor.humidityRange, sensor.reading.humidity) || !checkOK(sensor.co2Range, sensor.reading.co2)
              }
              "></div>

              <div class="Circle2" :class="{
                circle2_green: checkOK(sensor.temperatureRange, sensor.reading.temperature) || checkOK(sensor.humidityRange, sensor.reading.humidity) || checkOK(sensor.co2Range, sensor.reading.co2),
                circle2_red: !checkOK(sensor.temperatureRange, sensor.reading.temperature) || !checkOK(sensor.humidityRange, sensor.reading.humidity) || !checkOK(sensor.co2Range, sensor.reading.co2)
              }
              "></div>

              <div class="Circle1" :class="{
                circle1_green: checkOK(sensor.temperatureRange, sensor.reading.temperature) || checkOK(sensor.humidityRange, sensor.reading.humidity) || checkOK(sensor.co2Range, sensor.reading.co2),
                circle1_red: !checkOK(sensor.temperatureRange, sensor.reading.temperature) || !checkOK(sensor.humidityRange, sensor.reading.humidity) || !checkOK(sensor.co2Range, sensor.reading.co2)
              }
              "></div>
            </div>
          </section>
          <b-card-title class="copyable" @click="copyUID(sensor.uid)">UID: {{ sensor.uid }}</b-card-title>
          <b-card-sub-title>{{ sensor.reading.user }}</b-card-sub-title>
          <hr>
          <b-card-text>

            <table>
              <tr>
                <td>
                  Machine
                </td>
                <td class="value">
                  {{ sensor.machineName }}
                </td>
              </tr>
              <tr>
                <td class="LocationName">
                  Location
                </td>
                <td class="value LocationName">
                  {{ sensor.location }}
                </td>
              </tr>
              <tr>
                <td class="sublocationName">
                  Sub-location
                </td>
                <td class="value sublocationName">
                  {{ sensor.sublocation || "" }}
                </td>
              </tr>
              <tr v-if="sensor.isTemperature">
                <td class="boldColor">Temperature</td>
                <td class="value" :class="{
                  ok: checkOK(sensor.temperatureRange, sensor.reading.temperature),
                  notok: !checkOK(sensor.temperatureRange, sensor.reading.temperature)
                }">
                  {{ sensor.reading.temperature || '-' }} &deg;C
                </td>
              </tr>
              <tr v-if="sensor.isHumidity">
                <td class="boldColor">Humidity</td>
                <td class="value" :class="{
                  ok: checkOK(sensor.humidityRange, sensor.reading.humidity),
                  notok: !checkOK(sensor.humidityRange, sensor.reading.humidity)
                }">
                  {{ sensor.reading.humidity || '-' }} %
                </td>
              </tr>
              <tr v-if="sensor.isCO2">
                <td class="boldColor">CO<sub>2</sub></td>
                <td class="value" :class="{
                  ok: checkOK(sensor.co2Range, sensor.reading.co2),
                  notok: !checkOK(sensor.co2Range, sensor.reading.co2)
                }">
                  {{ sensor.reading.co2 || '-' }} %
                </td>
              </tr>
              <tr>
                <td class="batteryName boldColor">Battery</td>
                <td class="value" :style="{ ok: true }">
                  <BatteryFull title="Battery Full" v-if="parseInt(sensor.reading.battery) >= 90"
                    class="ok batterysymbol" />
                  <BatteryHalf title="Battery Normal" class="notbad"
                    v-else-if="parseInt(sensor.reading.battery) >= 20 && parseInt(sensor.reading.battery) < 90" />
                  <BatteryLow title="Battery Critical" class="notok" v-else />
                </td>
              </tr>
            </table>
            <hr>
            <table>

              <tr>
                <td @click="deleteNode(sensor.uid)">
                  <DeleteIcon title="Delete Node" class="action-btn delete" />
                </td>
                <td class="value">
                  <Pencil @click="showModify(sensor)" title="Edit the node" class="action-btn" />
                </td>
              </tr>
            </table>
            <hr>
          </b-card-text>
          <template class="c-footer" #footer>
            <div>
              Last Updated at: {{ formatDate(sensor.reading.datetime) }},
              <br>
              {{ checkOffline(sensor) }} ago
            </div>

          </template>
        </b-card>


      </div>
    </div>
    <div v-else>
      <h3>No nodes in this category</h3>
    </div>
    <b-modal class="long" ref="modifyForm" id="modifyForm" title="Modify Node" hide-footer>
      <ModifyNodeForm :sensor="currentNode" />
    </b-modal>
  </div>
</template>

<script>
import '@/CSSS/dashboardCard.css'
import '@/CSSS/responsive1.css'
import '@/store/actions/glanceColorChange.js'
import ModifyNodeForm from '@/components/ModifyNode.vue'

import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import 'vue-loaders/dist/vue-loaders.css';
import BatteryFull from 'vue-material-design-icons/Battery.vue';
import BatteryLow from 'vue-material-design-icons/BatteryLow.vue';
import BatteryHalf from 'vue-material-design-icons/Battery50.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Cards',
  props: ['sensors',],
  data() {
    return {
      server: process.env.VUE_APP_HOST,
      currentNode: null
    }
  },
  components: {
    DeleteIcon,
    BatteryFull,
    BatteryHalf,
    ModifyNodeForm,
    BatteryLow,
    Pencil
  },
  computed: {
    ...mapGetters({ loading: 'isLoading' })
  },
  methods: {
    copyUID(uid) {
      try {
        navigator.clipboard.writeText(uid.trim())
        this.$bvToast.toast('UID copied to the clipboard')
      } catch (e) {
        this.$bvToast.toast('Cannot copy UID: Permission Denied')
      }
    },
    showModify(node) {
      if (this.$store.getters.getPrivilege > 2) {
        this.$bvToast.toast('You are not authorized to perform this action')
        return
      }
      this.currentNode = node
      this.$refs['modifyForm'].show()
    },
    checkOK(range, val) {
      return (range.min <= val && val <= range.max)
    },
    async deleteNode(uid) {
      if (this.$store.getters.getPrivilege > 2) {
        this.$bvToast.toast('You are not authorized to perform this action')
        return
      }
      this.$bvModal.msgBoxConfirm("Are you sure you want to delete the node " + uid)
        .then(confirmation => {
          if (confirmation) {
            this.$store.dispatch('archiveNode', uid)
              .then(() => {
                this.$bvToast.toast('Successfully Deleted ' + uid)
                this.$store.dispatch('fetchSensors', 1)
              })
              .catch(() => this.$bvToast.toast('Could not delete ' + uid))
          }
        })
        .catch(e => {
          this.message = e.message
          this.$bvToast.toast(e.message)
        })
    },
    checkOffline(sensor) {
      const dt = Date.parse(sensor.reading.datetime)
      const dateDiff_hrs = Math.floor((new Date() - dt) / 1000 / 3600);
      if (dateDiff_hrs > 24) {
        return Math.floor(dateDiff_hrs / 24) + " days"
      }
      return dateDiff_hrs + " hrs"
    },
    formatDate(date) {
      return new Date(date).toLocaleString('en-IN')
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
  padding: 15px 2px;
  padding-left: 10px;
  height: auto;
}

.card-footer {
  border-top: none;
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

  color: #fefefe;

  border-radius: 24px;
  overflow: hidden;

  box-shadow: 2px -2px 11px 0px rgba(0, 0, 0, 0.45), 0px 25px 20px -20px rgba(0, 0, 0, 0.45);
}


.card-container .card-body {
  flex: 0 1 auto;
  margin-top: auto;
}

.card-container .card-footer {
  margin-bottom: auto;
}


.sky {
  margin-top: -21px;


  width: 100%;
}

.sky>div {
  margin: 0 auto;
  border-radius: 24px;

}

.cloud-1 {
  width: 100%;
  height: 50px;
  background: #a3efff;
  display: block;
}

.cloud-2 {
  width: 75%;
  height: 50px;
  background: white;
  margin-top: -30px !important;
  display: block;
  box-shadow: #101113;
}

.cloud-3 {
  width: 60%;
  height: 35px;
  background: #D0F4FC;
  margin-top: -15px !important;
  display: block;
}

.sun {
  width: 80px;
  height: 80px;
  border-radius: 50% !important;
  margin-top: -60px !important;
  position: inherit;
  animation: enlarge;
  animation-duration: 5s;
  animation-iteration-count: infinite;

}



@keyframes enlarge {
  50% {
    transform: scale(0.9);
  }
}




.boldColor {
  font-weight: 400;
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
  color: #bd1c0e;
}

.ok {
  color: #006c00;
}

.long {
  height: 100%;
}

.notok {

  color: rgb(201, 23, 23);
}

td {
  text-align: left;
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

.download {
  color: #fff;
}

.copyable {
  cursor: pointer;
}
</style>
