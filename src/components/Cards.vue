<template >
  <div>
    <div>
      <b-modal class="long" id="modifyForm" title="Modify Node" hide-footer>
        <ModifyNodeForm :sensor="currentNode"/>
      </b-modal>
    </div>
    <div class="container">
      <b-card
          v-for="sensor in sensors"
          v-bind:key="sensor._id"
          v-bind:title="'UID: ' + sensor.uid"
          v-bind:sub-title="sensor.name"
          class="card drk"
          >

          Offline since {{ checkOffline(sensor) }} hrs
          <!-- <strong v-if="checkOffline(sensor) "> -->
        <!-- </strong> -->

        <hr>
        <!-- {{ sensor }} -->
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
            <tr v-if="sensor.isTemperature">
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
            <tr v-if="sensor.isHumidity">
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
            <tr v-if="sensor.isCO2">
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
            <!-- <tr> -->
            <!--   <td>Pressure</td> -->
            <!--   <td -->
            <!--       class="value" -->
            <!--       :class="{ -->
            <!--                ok : checkOK(sensor.pressureRange, sensor.readings.pressure), -->
            <!--                notok : !checkOK(sensor.pressureRange, sensor.readings.pressure)}" -->
            <!--       > -->
            <!--       {{ sensor.readings.pressure || '-' }} bar -->
            <!--   </td> -->
            <!-- </tr> -->
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
              <!-- <td class="value" > -->
              <!--   <DownloadIcon :href="`${server}/node/getcsv/${sensor.uid}`" title="Get the Node readings in CSV" class="action-btn download" /> -->
              <!-- </td> -->
              <td class="value" >
                <Pencil @click="showModify(sensor)" title="Edit the node" class="action-btn" />
              </td>
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

import ModifyNodeForm from '@/components/ModifyNode.vue'

import DeleteIcon from 'vue-material-design-icons/Delete.vue';
//import DownloadIcon from  'vue-material-design-icons/Download.vue';
import BatteryFull from 'vue-material-design-icons/Battery.vue';
import BatteryLow from 'vue-material-design-icons/BatteryLow.vue';
import BatteryHalf from 'vue-material-design-icons/Battery50.vue';
import Pencil from 'vue-material-design-icons/Pencil.vue';

export default {
  name: 'Cards',
  props: [ 'sensors', ],
  data() {
    return {
      server: process.env.VUE_APP_HOST,
      currentNode: null
    }
  },
  components: {
    DeleteIcon,
    //DownloadIcon,
    BatteryFull,
    BatteryHalf,
    ModifyNodeForm,
    BatteryLow,
    Pencil
  },
  methods: {
    showModify(node) {
      this.currentNode = node
      this.$bvModal.show('modifyForm')
      //this.$bvModal.hide('modForm')
    },
    checkOK(range, val) {
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
    },
    checkOffline(sensor) {
      const dt = sensor.readings.timestamp
      const dateDiff_hrs = Math.floor((new Date() - dt) / 1000 / 3600 ) ;
      return dateDiff_hrs
    }

  }
}

</script>

<style>

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

.ok {
  color: #689D6A;
  color: lime;
}

.long {
  height: 100%;
}

.notok {
  color: #CC241D;
  color: red;
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


</style>
