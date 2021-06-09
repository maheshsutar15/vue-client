<template>
  <div>
    <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
      <AddNodeForm > </AddNodeForm>
    </b-modal>
    <div class="row">
      <b-button
          variant="outline-primary"
          @click="$bvModal.show('nodeForm')"
          >
          <PlusIcon class="addnode"/>
          Add New Node
      </b-button>
    </div>
    <hr>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="!sensors || loading"></vue-loaders-ball-beat>
    <div class="container" v-if="sensors && !loading">
      <b-card 
                           v-for="sensor in sensors"
                           v-bind:key="sensor._id"
                           v-bind:title="sensor.uid"
                           v-bind:sub-title="sensor.name"
                           class="card"
                           >
                           <hr>
                           <b-card-text >
                             <table>
                               <tr>
                                 <td>
                                   <strong class="info">{{ sensor.machineName }}</strong>
                                 </td>
        <td>
          <strong class="info">{{ sensor.location }}</strong>
        </td>
                               </tr>
                               <tr>
                                 <td>Temperature</td>
                                 <td
                                     class="value"
                                     :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature),
                                              notok : !checkOK(sensor.temperatureRange, sensor.readings.temperature)}"
                                     >
                                     {{ sensor.readings.temperature || '-' }} &deg;C
                                 </td>
                               </tr>
                               <!-- <tr> -->
                               <!--   <td>Humidity</td> -->
                               <!--   <td --> 
                               <!--       class="value" -->
                               <!--       :class="{ok : checkOK(sensor.humidityRange, sensor.readings.humidity), -->
                               <!--                notok : !checkOK(sensor.humidityRange, sensor.readings.humidity)}" -->
                               <!--       > -->
                               <!--       {{ sensor.readings.humidity || '-' }} -->
                               <!--   </td> -->
                               <!-- </tr> -->
                               <tr>
                                 <td>CO<sub>2</sub></td>
                                 <td
                                     class="value"
                                     :class="{ok : checkOK(sensor.co2Range, sensor.readings.co2),
                                              notok : !checkOK(sensor.co2Range, sensor.readings.co2)}"
                                     >
                                     {{ sensor.readings.co2 || '-'}} ppm
                                 </td>
                               </tr>
                               <tr>
                                 <td>Pressure</td>
                                 <td
                                     class="value"
                                     :class="{ok : checkOK(sensor.pressureRange, sensor.readings.pressure),
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
  font-size: 11pt;
}
.container {
  height: 200px;
}
.card {
  width: 12rem;
  float: left;
  margin: 8px 8px;
}

.card-body {
  padding: 5px 5px;
}

table {
  width: 90%;
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
}

.info {
  text-transform: capitalize;
}

.notok {
  color: #CC241D;
}

.long {
  height: 100%;
}

.value {
  font-weight: bold;
  text-align: center;
}
</style>
