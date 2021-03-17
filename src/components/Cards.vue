<template>
  <div class="container" v-if="sensors">
    <br>
    <b-button
      variant="outline-primary"
      @click="$bvModal.show('nodeForm')"
      >
      Add Node
    </b-button>
      <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
        <Form :token="this.token"> </Form>
      </b-modal>
      <br>
      <b-card 
      v-for="sensor in sensors"
      v-bind:key="sensor._id"
      v-bind:title="sensor.uid"
      v-bind:sub-title="sensor.name"
      class="card"
      >
      <DeleteIcon class="action-btn" v-on:click="deleteNode(sensor.uid)"/>
      <h5>{{ sensor.location }}</h5>
      <h5>{{ sensor.machineName }}</h5>
      <b-card-text >
        <table>
          <tr>
            <td>Temperature</td>
            <td
              class="value"
              :class="{ok : checkOK(sensor.temperatureRange, sensor.readings.temperature) }"
              >
              {{ sensor.readings.temperature }}
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
        </table>
      </b-card-text>
      </b-card>
  </div>
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import Form from './Form.vue'

export default {
  name: 'Cards',
  components: {
    DeleteIcon,
    Form
  },
  props: {
    sensors: Array,
    token: String
  },
  data() {
    return {
    }
  },

  methods: {
    checkOK(range, val) {
      return (range.min <= val && val <= range.max)
    },
    async deleteNode(uid) {
      const sure = confirm("Are you sure you want to delete the node "+ uid)
      if(sure) {
        let resp = await fetch(process.env.VUE_APP_HOST + '/node/' + uid, {
          method: "DELETE",
          headers: new Headers({
            "Authorization": "Bearer " + this.token
          })
        });
        let msg = await resp.json();
        if(msg.message == "Deleted Successfully") {
          this.$emit('refresh');
        } else {
          alert("Could not delete");
        }
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
    width: 20rem;
    float: left;
    margin: 5px 5px;
  }
  table {
    width: 100%;
    text-align: left;
  }
  .action-btn {
    color: darkred;
  }

  .ok {
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
