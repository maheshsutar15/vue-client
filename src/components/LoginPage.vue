<template>
  <div class="container">
    <h1> Login </h1>
    <b-form v-if="show">
      <b-form-group label="Email:" label-for="email">
        <b-form-input 
                                   id="email"
                                   v-model="form.email"
                                   placeholder="Enter Email"
                                   required>

        </b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="pwd">
        <b-form-input 
                                     id="pwd"
                                     v-model="form.pwd"
                                     placeholder="Enter Password"
                                     required>
        </b-form-input>
      </b-form-group>
      <b-button v-on:click="login()" variant="primary">Submit </b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  props: {
    token: String
  },
  methods: {
    async login() {
      const cred = {
        username: this.form.email,
        password: this.form.pwd
      }
      console.log(JSON.stringify(cred))
      let resp = await fetch(process.env.VUE_APP_HOST + '/user/login', {
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        cache: 'default',
        method: 'POST',
        body: "" + JSON.stringify(cred) + ""
      })
      if(resp.status == 200) {
        const token = await resp.json();
        this.$emit('setAccessToken', token.accessToken)
      } else {
        alert("Invalid Username or password.")
      }
    }
  },
  data() {
    return {
      show: true,
      form: {
        email: '',
        pwd: ''
      }
    }
  }
};

</script>


<style scoped>
h1 {
  text-align: center;
}
.container {
  margin: 10px auto;
  padding: 10px;
  text-align: left;
}
</style>
