<template>
  <div class="container" v-if="sensors">
    <b-card 
      v-for="sensor in sensors"
      v-bind:key="sensor._id"
      v-bind:title="sensor.uid"
      v-bind:sub-title="sensor.name"
      class="card"
    >
    <DeleteIcon class="action-btn" v-on:click="deleteNode(sensor.uid)"/>
      <b-card-text >
        <table class="table">
          <tr>
            <td></td>
            <th > Red </th>
            <th > Yellow </th>
            <th > Blue </th>
          </tr>
          <tr v-if="sensor.supply">
            <th> Mains </th>
            <td > {{ sensor.supply.mains.r  || 0  }}</td>
            <td > {{ sensor.supply.mains.y  || 0  }}</td>
            <td > {{ sensor.supply.mains.b  || 0  }}</td>
          </tr>
          <tr v-if="sensor.supply">
            <th> AMF </th>
            <td > {{ sensor.supply.amf.r  || 0  }}</td>
            <td > {{ sensor.supply.amf.y  || 0  }}</td>
            <td > {{ sensor.supply.amf.b  || 0  }}</td>
          </tr>
          <tr v-if="sensor.supply">
            <th> Stabilizer </th>
            <td > {{ sensor.supply.stabilizer.r  || 0  }}</td>
            <td > {{ sensor.supply.stabilizer.y  || 0  }}</td>
            <td > {{ sensor.supply.stabilizer.b  || 0  }}</td>
          </tr>
        </table>
        <h5> DG </h5>
        <table class="table">
          <tr>
            <th> Power </th>
            <td v-if="sensor.dg"> {{ sensor.dg.power || 0  }}</td>
          </tr>
          <tr>
            <th> Up Time </th>
            <td> {{ sensor.dg.upTime || 0  }}</td>
          </tr>
          <tr>
            <th> Fuel Consumption </th>
            <td>{{ sensor.dg.fuelConsumption || 0  }}</td>
          </tr>
        </table>
        <h5> Freezer </h5>
        <table class="table">
          <tr>
            <th> Power </th>
            <td v-if="sensor.freezer">{{ sensor.freezer.power || 0  }}</td>
          </tr>
          <tr>
            <th>Temperature</th>
            <td>{{ sensor.freezer.temperature || 0  }}</td>
          </tr>
        </table>
        <b-alert v-bind:variant="(sensor.stat) ? 'success' : 'danger'" show>
        Status {{ (sensor.stat ? 'OK' : 'NOT OK') || 0  }}
        </b-alert>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
  name: 'Cards',
  components: {
    DeleteIcon,
  },
  props: {
    sensors: Array
  },
  data() {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    async deleteNode(uid) {
      let resp = await fetch(process.env.VUE_APP_HOST + '/node/' + uid, {
        method: "DELETE"
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
  text-align: left;
}
.action-btn {
  color: darkred;
}
</style>
