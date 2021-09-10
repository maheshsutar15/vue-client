<template>
    <b-form >
      <b-form-group label="UID: " label-for="node_uid" description="Please enter uid" >
        <b-form-input id="node_uid" v-model="modifyNodeForm.uid" placeholder="Enter UID"></b-form-input>
      </b-form-group>
      <b-form-group label="Location: " label-for="node_loc" description="Please enter Location" >
        <b-form-input id="node_loc" v-model="modifyNodeForm.loc" placeholder="Enter Location"></b-form-input>
      </b-form-group>
      <b-form-group label="Machine: " label-for="node_mac" description="Please enter Machine name" >
        <b-form-input id="node_mac" v-model="modifyNodeForm.mac" placeholder="Enter Machine"></b-form-input>
      </b-form-group>

      <b-form-checkbox id="_isTemp" v-model="isTemp" name="checkbox1" >
                                        Temperature
      </b-form-checkbox>

        <b-form-group v-if="isTemp" label="Temperature Range: " label-for="node_temperaturer" description="Please enter Temperature Range" >
          <b-form-input class="range" type="number" id="node_temperaturen" v-model="modifyNodeForm.temperaturen" placeholder="Enter Temperature Min"></b-form-input>
          <b-form-input class="range" type="number" id="node_temperaturex" v-model="modifyNodeForm.temperaturex" placeholder="Enter Temperature Max"></b-form-input>
        </b-form-group>

        <b-form-checkbox
            id="_isHum" v-model="isHum" name="checkbox2"
                                        >
                                        Humidity
        </b-form-checkbox>

          <b-form-group v-if="isHum" label="Humidity Range: " label-for="node_humidityr" description="Please enter Pressure Range" >
            <b-form-input class="range" type="number" id="node_humidityn" v-model="modifyNodeForm.humidityn" placeholder="Enter Humidity Min"></b-form-input>
            <b-form-input class="range" type="number" id="node_humidityx" v-model="modifyNodeForm.humidityx" placeholder="Enter Humidity Max"></b-form-input>
          </b-form-group>

          <b-form-checkbox
              id="_isCO2" v-model="isCO2" name="checkbox3"
                                          >
                                          CO<sub>2</sub>
          </b-form-checkbox>

          <b-form-group v-if="isCO2" label="CO2 Range: " label-for="node_co2r" description="Please enter CO2 Range" >
            <b-form-input class="range" type="number" id="node_co2n" v-model="modifyNodeForm.co2n" placeholder="Enter CO2 Min"></b-form-input>
            <b-form-input class="range" type="number" id="node_co2x" v-model="modifyNodeForm.co2x" placeholder="Enter CO2 Max"></b-form-input>
          </b-form-group>
          <hr>

          <b-button @click="modifyNode()" variant="primary">Update Node</b-button>

    </b-form>
</template>

<script>
export default {
  name: 'ModifyNodeForm',
  props: ['sensor'],
  methods: {
    async modifyNode() {
      let node = {
        uid: this.modifyNodeForm.uid,
        location: this.modifyNodeForm.loc,
        machineName: this.modifyNodeForm.mac,
        co2Range: {
          min: this.modifyNodeForm.co2n,
          max: this.modifyNodeForm.co2x
        },
        temperatureRange: {
          min: this.modifyNodeForm.temperaturen,
          max: this.modifyNodeForm.temperaturex
        },
        pressureRange: {
          min: this.modifyNodeForm.pressuren,
          max: this.modifyNodeForm.pressurex
        },
        humidityRange: {
          min: this.modifyNodeForm.humidityn,
          max: this.modifyNodeForm.humidityx
        },
        isTemp: this.isTemp,
        isHum: this.isHum,
        isCO2: this.isCO2
      }
      this.$store.dispatch('modifyNode', node)
        .then(() => {
          this.$bvModal.msgBoxOk('Node Modified')
            .then(() => {
              this.$bvModal.hide('nodeForm')
              this.$store.dispatch('fetchSensors', 1)
            })
        })
        .catch((msg) => this.$bvModal.msgBoxOk('Could not modified node: ' + msg))
    }
  },
  data() {
    return {
      modifyNodeForm: {
        uid: this.sensor.uid,
        loc: this.sensor.location,
        mac: this.sensor.machineName,
        co2n: parseFloat(this.sensor.co2Range.min),
        co2x: parseFloat(this.sensor.co2Range.max),
        temperaturen: parseFloat(this.sensor.temperatureRange.min),
        temperaturex: parseFloat(this.sensor.temperatureRange.min),
        humidityn: parseFloat(this.sensor.humidityRange.min),
        humidityx: parseFloat(this.sensor.humidityRange.min),
      },
      isTemp: this.sensor.isTemp,
      isHum: this.sensor.isHum,
      isCO2: this.sensor.isCO2
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
