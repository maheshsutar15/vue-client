<template>
  <b-form >
    <b-form-group label="UID: " label-for="node_uid" description="Please enter uid" >
      <b-form-input id="node_uid" v-model="addNodeForm.uid" placeholder="Enter UID"></b-form-input>
    </b-form-group>
    <b-form-group label="Location: " label-for="node_loc" description="Please enter Location" >
      <b-form-input id="node_loc" v-model="addNodeForm.loc" placeholder="Enter Location"></b-form-input>
    </b-form-group>
    <b-form-group label="Machine: " label-for="node_mac" description="Please enter Machine name" >
      <b-form-input id="node_mac" v-model="addNodeForm.mac" placeholder="Enter Machine"></b-form-input>
    </b-form-group>

    <b-form-group label="CO2 Range: " label-for="node_co2r" description="Please enter CO2 Range" >
      <b-form-input class="range" type="number" id="node_co2n" v-model="addNodeForm.co2n" placeholder="Enter CO2 Min"></b-form-input>
      <b-form-input class="range" type="number" id="node_co2x" v-model="addNodeForm.co2x" placeholder="Enter CO2 Max"></b-form-input>
    </b-form-group>

    <b-form-group label="Pressure Range: " label-for="node_pressurer" description="Please enter Pressure Range" >
      <b-form-input class="range" type="number" id="node_pressuren" v-model="addNodeForm.pressuren" placeholder="Enter Pressure Min"></b-form-input>
      <b-form-input class="range" type="number" id="node_pressurex" v-model="addNodeForm.pressurex" placeholder="Enter Pressure Max"></b-form-input>
    </b-form-group>

    <b-form-group label="Humidity Range: " label-for="node_humidityr" description="Please enter Pressure Range" >
      <b-form-input class="range" type="number" id="node_humidityn" v-model="addNodeForm.humidityn" placeholder="Enter Humidity Min"></b-form-input>
      <b-form-input class="range" type="number" id="node_humidityx" v-model="addNodeForm.humidityx" placeholder="Enter Humidity Max"></b-form-input>
    </b-form-group>

    <b-form-group label="Temperature Range: " label-for="node_temperaturer" description="Please enter Temperature Range" >
      <b-form-input class="range" type="number" id="node_temperaturen" v-model="addNodeForm.temperaturen" placeholder="Enter Temperature Min"></b-form-input>
      <b-form-input class="range" type="number" id="node_temperaturex" v-model="addNodeForm.temperaturex" placeholder="Enter Temperature Max"></b-form-input>
    </b-form-group>
    <b-button @click="addNode()" variant="primary">Add Node</b-button>

  </b-form>
</template>

<script>

export default {
  name: 'Form',
  methods: {
    async addNode() {
      let node = {
        uid: this.addNodeForm.uid,
        location: this.addNodeForm.loc,
        machineName: this.addNodeForm.mac,
        co2Range: {
          min: this.addNodeForm.co2n,
          max: this.addNodeForm.co2x
        },
        temperatureRange: {
          min: this.addNodeForm.temperaturen,
          max: this.addNodeForm.temperaturex
        },
        pressureRange: {
          min: this.addNodeForm.pressuren,
          max: this.addNodeForm.pressurex
        },
        humidityRange: {
          min: this.addNodeForm.humidityn,
          max: this.addNodeForm.humidityx
        }
      }
      this.$store.dispatch('addNode', node)
        .then(() => {
          this.$bvModal.msgBoxOk('Node Added')
            .then(() => {
              this.$bvModal.hide('nodeForm')
              this.$store.dispatch('fetchSensors', 1)
            })
        })
        .catch((msg) => this.$bvModal.msgBoxOk('Could not Add node: ' + msg)) 
    }
  },
  data() {
    return {
      addNodeForm: {
        uid: '',
        loc: '',
        mac: '',
        co2n: 0,
        co2x: 100,
        temperaturen: 0,
        temperaturex: 100,
        pressuren: 0,
        pressurex: 100,
        humidityn: 0,
        humidityx: 100,
      }
    }
  }
}

</script>

<style>
.container {
  height: 200px;
  display: block;
}
.range {
  width: 48%;
  float: left;
  margin-left: 2px;
}
</style>
