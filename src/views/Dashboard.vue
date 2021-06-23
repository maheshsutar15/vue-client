<template>
  <div>
    <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
      <AddNodeForm > </AddNodeForm>
    </b-modal>
    <div class="row">
      <table>
        <tr>
          <div>
            <b-button
                variant="outline-primary"
                @click="$bvModal.show('nodeForm')"
                style="float: left;"
                >
                <PlusIcon class="addnode"/>
                Add New Node
            </b-button>
          </div>
          <div style="float: right; text-align: right;">
            <strong>
              {{ ip }}
            </strong>
          </div>
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
              {{ sensor.readings.co2 || '-'}} ppm
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
          <td @click="deleteNode(sensor.uid)">
            <DeleteIcon title="Delete Node" class="action-btn delete" />
          </td>
          <td>
            <ChartLine title="See Node Trend" class="action-btn chart" @click="goToTrend(sensor.uid)"/>
          </td>
        </tr>
            </table>
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
import 'vue-loaders/dist/vue-loaders.css';

import { mapGetters } from 'vuex'

export default {
  name: 'Cards',
  components: {
    ChartLine,
    DeleteIcon,
    PlusIcon,
    AddNodeForm,
  },
  data() {
    return {
      fetchSensors: null,
      ip: window.location.host
    }
  },
  mounted() {
    if(this.$store.getters.getAccessToken == null) {
      this.$bvModal.msgBoxOk('Please Login')
      this.$router.push('/')
    }
    this.fetchSensors = setInterval(
      () => {
        if(this.$store.getters.getLogInStatus) {
          this.$store.dispatch('fetchSensors', 0)
        }
      }
      , 3000)
  },
  computed: {
    ...mapGetters({sensors: 'getSensors', loading: 'isLoading'})
  },
  methods: {
    close() {
      this.$bvModal.hide('nodeForm');
    },
    goToTrend(uid) {
      this.$router.push({name: 'Trend', params: {uid: uid}})
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
  box-shadow: 4px 4px 25px rgba(128, 128, 128, .7);
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
  color: blue;
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

.value {
  font-weight: bold;
  text-align: right;
  text-transform: capitalize;
}

</style>
