<template>
  <div>
    <b-navbar type="dark" class="titlebar">
      <b-navbar-brand href="#">Atechno Embedded Solutions Pvt Ltd</b-navbar-brand>
      <b-navbar-nav class="ml-auto operations" v-if="!!token">
        <HumanIcon class="ico" title="Add User" @click="$bvModal.show('regForm')"/> 
        <LogoutIcon class="ico" title="Logout" v-on:click="logout()"/>
      </b-navbar-nav>
    </b-navbar>
    <div class="container" v-if="!token">
  <b-tabs content-class="mt-3" v-if="!token">
    <b-tab title="Login" active>
      <LoginForm @login="login"> </LoginForm>
   </b-tab>
    <b-tab title="Register">
      <RegisterForm> </RegisterForm>
   </b-tab>
  </b-tabs>
    </div>
  <div v-else>
    <div>
      <b-modal  id='regForm' title="Add new user" hide-footer>
        <RegisterForm class="full_height" v-if="this.designation == 'admin'"></RegisterForm>
        <div v-else>
          <b-alert show variant="warning">Only admins can add new users.</b-alert>
        </div>
      </b-modal>
    </div>
  </div>
  </div>
</template>

<script>

import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

import LogoutIcon from 'vue-material-design-icons/Logout.vue';
import HumanIcon from 'vue-material-design-icons/HumanMale.vue'; 

export default {
  name: 'TitleBar',
  components: {
    LoginForm,
    RegisterForm,
    LogoutIcon,
    HumanIcon
  },
  props: {
    token: String,
    designation: String
  },
  methods: {
    async login(cred) {
      this.$emit('loginUser', cred)
    },
    async logout() {
      const confirmation = confirm("Are you sure you want to logout?")
      if(confirmation) this.$emit('logout')
    },
    async registerUser() {
      let usr = {
        username: this.regUserForm.username,
        password: this.regUserForm.password,
        email: this.regUserForm.email,
        institute: this.regUserForm.institute,
        designation: this.regUserForm.designation
      }
      let resp = await fetch(process.env.VUE_APP_HOST + '/user/register', {
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        cache: 'default',
        method: 'POST',
        body: "" + JSON.stringify(usr) + ""
      })
      if(resp.status == 200) {
        alert("User added")
      } else {
        alert("there was an error adding user.")
      }
    }
  },
  data() {
    return {
      show: true,
      form: {
        uname: '',
        pwd: ''
      },
      regUserForm: {
        username: '',
        password: '',
        email: '',
        institute: '',
        designation:  null
      },
      designationOptions: [
        { text: 'Please select an Option', value: null, disabled: true },
        { value: 'admin', text: 'Administrative User' },
        { value: 'user', text: 'Normal User' },
        { value: 'maintenance', text: 'Maintenance Staff' },
        { value: 'maintenance', text: 'Observer' }
      ]
    }
  }
};

</script>


  <style scoped>
  .operations {
    margin: 0 5px;
  }

  .titlebar {
    background-color: #539;
  }

  .ico {
    color: white;
  }
  .full_height {
    height: 100%;
  }
  </style>
