<template>
  <div class="cont">
    <h1> Get Graphical Trend for Node</h1>
    <div>
      <bForm>
      <b-form-group label="UID: " label-for="uid">
        <b-form-input
            id="uid"
            v-model="uid"
            placeholder="Enter UID"
            required>

        </b-form-input>
      </b-form-group>
      <b-form-group label="Start Date:" label-for="start">
        <b-form-input
            id="start"
            v-model="start"
            placeholder="Enter start Date"
            type="date"
            required>

        </b-form-input>
      </b-form-group>
      <b-form-group label="End Date:" label-for="end">
        <b-form-input
            id="end"
            v-model="end"
            placeholder="enter end date"
            type="date"
            required>

        </b-form-input>
      </b-form-group>

      <b-button v-on:click="watchTrend()" variant="primary">Submit </b-button>
      </bForm>
    </div>
    <!-- <Trend v-if="dataready" class="constrained" :start="start" :end="end"></Trend> -->
  </div>
</template>

<script>

export default {
  name: 'Trends',
  data() {
    return {
      uid: "",
      start: new Date().toString(),
      end: new Date().toString()
    }
  },
  methods: {
    watchTrend() {
      this.$router.push({name: 'GraphHigh', params: { uid: this.uid, from : this.start, to: this.end }})
    }
  }
}
</script>

<style scoped>
.cont {
  height: 400px !important;
}
</style>
