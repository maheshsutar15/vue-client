<template>
  <div class="container">
    <h1> Login </h1>
    <bForm> <!-- v-if="show"> -->
      <b-form-group label="Username:" label-for="uname">
        <b-form-input 
                                      id="uname"
                                      v-model="form.uname"
                                      placeholder="Enter username"
                                      required>

        </b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="pwd">
        <b-form-input 
                                     id="pwd"
                                     v-model="form.pwd"
                                     placeholder="Enter Password"
                                     type="password"
                                     required>
        </b-form-input>
      </b-form-group>
      <b-button v-on:click="login()" variant="primary">Submit </b-button>
    </bForm>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  methods: {
    async login() {
      const cred = {
        username: this.form.uname,
        password: this.form.pwd
      }
      let resp = await fetch(process.env.VUE_APP_HOST + '/user/login', {
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        cache: 'default',
        method: 'POST',
        body: "" + JSON.stringify(cred) + ""
      })
      if(resp.status == 200) {
        const cred = await resp.json();
        this.$emit('login', cred);
      } else {
        alert("Invalid Username or password.")
      }
    }
  },
  data() {
    return {
      show: true,
      form: {
        uname: '',
        pwd: ''
      }
    }
  },
}
  </script>

  <style>
  h1 {
    text-align: center;
  }
  .container {
    margin: 10px auto;
    padding: 10px;
    text-align: left;
  }

  </style>
