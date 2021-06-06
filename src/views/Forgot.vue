<template>
  <div class="container">
    <h1>Forgot Password</h1>
    <bForm v-if="!done">
    <bFormGroup label="Username: " label-for="uname">
    <bFormInput id="uname" v-model="uname" placeholder="Enter username" required></bFormInput>
    </bFormGroup>
    <bButton v-on:click="sendResetLink()">Submit</bButton>
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
    async sendResetLink() {
      const uname = this.uname
      this.$store.dispatch('sendResetLink', uname)
        .then((isDone) => this.done = isDone)
        .catch((e) => console.log(e))
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
