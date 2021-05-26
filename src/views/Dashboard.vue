<template>
  <div class="container" v-if="sensors">
    <div class="row">
          <b-button
            variant="outline-primary"
            @click="$bvModal.show('nodeForm')"
            >
            <PlusIcon class="addnode"/>
            Add New Node
          </b-button>
    </div>
      <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
        <AddNodeForm > </AddNodeForm>
      </b-modal>
      <hr>
      <b-card 
      v-for="sensor in sensors"
      v-bind:key="sensor._id"
      v-bind:title="sensor.uid"
      v-bind:sub-title="sensor.name"
      class="card"
      >
      <hr>
      <!-- <b-modal class='long' :id="'trend' + sensor.uid" title='Trend' hide-footer> -->
      <!--   <h3>{{ sensor.uid }}</h3> -->
      <!--   <Trend :uid="sensor.uid" > </Trend> -->
      <!-- </b-modal> -->
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
              :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature) }"
              >
              {{ sensor.readings.temperature || 0 }}
            </td>
          </tr>
        <tr>
          <td>Humidity</td>
          <td 
              class="value"
              :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature) }"
              >
              {{ sensor.readings.humidity }}
          </td>
        </tr>
        <tr>
          <td>CO<sub>2</sub></td>
          <td
            class="value"
            :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature) }"
            >
            {{ sensor.readings.co2 }}
          </td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td
            class="value"
            :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature) }"
            >
            {{ sensor.readings.pressure }}
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
</template>

<script>

import AddNodeForm from '@/components/AddNode.vue'

import PlusIcon from 'vue-material-design-icons/PlusCircle.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ChartLine from 'vue-material-design-icons/ChartLine.vue'
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
      fetchSensors: null
    }
  },
  mounted() {
    console.log(this.$store.getters.getAccessToken)
    if(this.$store.getters.getAccessToken == null) {
      alert("Please Login First")
      this.$router.push('/')
    }
    this.fetchSensors = setTimeout(
      () => {
        this.$store.dispatch('fetchSensors')
      }
    )
    // this.$store
  },
  computed: {
    ...mapGetters({sensors: 'getSensors'})

  },
  methods: {
    goToTrend(uid) {
      this.$router.push('/trend/'+uid)
    },
    checkOK(range, val) {
      return (range.min <= val && val <= range.max)
    },
    async deleteNode(uid) {
      const sure = confirm("Are you sure you want to delete the node "+ uid)
      if(sure) {
        this.$store.dispatch('deleteNode', uid)
      }
    }
  }
}

  </script>

  <style scoped>
  .container {
    height: 200px;
  }
  .card {
    width: 13rem;
    float: left;
    margin: 8px 8px;
  }
  table {
    width: 100%;
    text-align: left;
  }

  .delete {
    color: #fd4433;
  }

  .chart {
    color: blue;
  }

  .ok {
    color: green
  }
  
  .info {
    text-transform: capitalize;
  }

  .notok {
    color: red;
  }

  .long {
    height: 100%;
  }

  .value {
    font-weight: bold;
  }
  </style>
