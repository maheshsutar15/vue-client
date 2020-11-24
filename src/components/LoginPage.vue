<template>
  <div class="container" v-if="!token">
    <h1> Login </h1>
    <p>{{ token }}</p>
    <b-form v-if="show">
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
    </b-form>
  </div>
  <div v-else>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Frontend</b-navbar-brand>
      <b-navbar-nav class="ml-auto operations">
        <HumanIcon title="Add User" href="/k"/> 
        <LogoutIcon title="Logout" v-on:click="logout()"/>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import HumanIcon from 'vue-material-design-icons/HumanMale.vue'; 

export default {
  name: 'LoginPage',
  components: {
    LogoutIcon,
    HumanIcon
  },
  props: {
    token: String
  },
  methods: {
    async login() {
      const cred = {
        username: this.form.uname,
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
        const cred = await resp.json();
        this.$emit('loginUser', cred);
      } else {
        alert("Invalid Username or password.")
      }
    },
    async logout() {
      const confirmation = confirm("Are you sure you want to logout?")
      if(confirmation) this.$emit('logout')
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
.operations {
  margin: 0 5px;
}
</style>
