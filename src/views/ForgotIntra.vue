<template>
  <div class="container">
    <h1>Forgot Password</h1>
    <bForm v-if="!done">
    <bFormGroup label="Username: " label-for="uname">
    <bFormInput id="uname" v-model="uname" placeholder="Enter username" required></bFormInput>
    </bFormGroup>
    <bButton v-on:click="goToReset()">Submit</bButton>
    </bForm>
    <div v-if="done">
      <p>
      A reset link has been sent to your registered email Id
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Forgot',
  data() {
    return {
      done: false,
      uname: ''
    }
  },
  methods: {
    async goToReset() {
      this.$router.push({ name: 'Reset' })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 10px auto;
  padding: 10px;
  text-align: left;
}
h1 {
  text-align: center;
}

</style>
