<template>
  <div class="container">
    <b-card 
      v-for="sensor in sensors"
      v-bind:key="sensor._id"
      v-bind:title="sensor.uid"
      v-bind:sub-title="sensor.location + ' ' + sensor.machine"
      class="card"
    >
      <b-card-text >
        <table class="table">
          <tr>
            <td></td>
            <th > Red </th>
            <th > Yellow </th>
            <th > Blue </th>
          </tr>
          <tr>
            <th> Mains </th>
            <td > {{ sensor.mains.red  }}</td>
            <td > {{ sensor.mains.yellow  }}</td>
            <td > {{ sensor.mains.blue  }}</td>
          </tr>
          <tr>
            <th> AMF </th>
            <td > {{ sensor.amf.red  }}</td>
            <td > {{ sensor.amf.yellow  }}</td>
            <td > {{ sensor.amf.blue  }}</td>
          </tr>
          <tr>
            <th> Stabilizer </th>
            <td > {{ sensor.stab.red  }}</td>
            <td > {{ sensor.stab.yellow  }}</td>
            <td > {{ sensor.stab.blue  }}</td>
          </tr>
        </table>
        <h5> DG </h5>
        <table class="table">
          <tr>
            <th> Power </th>
            <td> 0</td>
          </tr>
          <tr>
            <th> Up Time </th>
            <td>0</td>
          </tr>
          <tr>
            <th> Fuel Consumption </th>
            <td>0</td>
          </tr>
        </table>
        <h5> Freezer </h5>
        <table class="table">
          <tr>
            <th> Power </th>
            <td> 0</td>
          </tr>
          <tr>
            <th>Temperature</th>
            <td>0</td>
          </tr>
        </table>
        <div class="alert alert-danger" role="alert">
        Status OK
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  props: {
    //sensors: Array
  },
  data() {
    return { 
      sensors: [
        {
           _id: '1',
           uid: '100001',
           location: "lab1",
           machine: "freezer",
           temp: "22",
           mains: {
            red: "0",
            yellow: "0",
            blue: "0"
           },
           amf: {
             red: "0",
             yellow: "0",
             blue: "0"
           },
           stab: {
            red: "1",
            yellow: "0",
            blue: "0"
           }
        },
      ]
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
</style>
