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
      <div class="row">
        <b-form-group class="col-md-6" label="Start Date and Time:" label-for="start">
          <b-form-input
              id="start"
              v-model="start"
              placeholder="Enter start Date"
              type="datetime-local"
              required>

          </b-form-input>
        </b-form-group>
        <b-form-group class="col-md-6" label="End Date and Time:" label-for="end">
          <b-form-input
              id="end"
              v-model="end"
              placeholder="enter end date"
              type="datetime-local"
              required>

          </b-form-input>
        </b-form-group>
      </div>
      <b-button v-on:click="watchTrend()" variant="primary">Watch Trend </b-button>
      </bForm>
    </div>
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
      console.log(this.start, this.end)
      let from = this.start + ':00.000Z'
      let to = this.end + ':00.000Z'
      this.$router.push({name: 'GraphHigh', params: { uid: this.uid, from : from, to: to}})
    }
  }
}
</script>

<style scoped>
.cont {
  height: 400px !important;
}
</style>
