<template>
  <div class="container" v-if="!token">
    <h1> Login </h1>
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
    <b-navbar type="dark" variant="warning">
      <b-navbar-brand href="#">Atechno Embedded Solutions Pvt Ltd</b-navbar-brand>
      <b-navbar-nav class="ml-auto operations">
        <HumanIcon title="Add User" @click="$bvModal.show('regForm')"/> 
        <LogoutIcon title="Logout" v-on:click="logout()"/>
      </b-navbar-nav>
    </b-navbar>
    <div>
      <b-modal  id='regForm' title="Add new user" hide-footer>
        <b-form @submit="registerUser()" v-if="this.designation == 'admin'">
          <b-form-group 
                                         label="Username: "
                                         label-for="reg_username"
                                         description="Please enter unique username."

                                         >
                                         <b-form-input
                                         id="reg_username"
                                         v-model="regUserForm.username"
                                         placeholder="Enter username"
                                         >
                                         </b-form-input>
          </b-form-group>
            <b-form-group
                                         label="Email: "
                                         label-for="reg_email"
                                         description="Please enter valid email"
                                         >
                                         <b-form-input
                                         id="reg_email"
                                         v-model="regUserForm.email"
                                         placeholder="Enter your email"
                                         type="email"
                                         >
                                         </b-form-input>
            </b-form-group>
              <b-form-group
                                         label="Password: "
                                         label-for="reg_pwd"
                                         description="Please enter strong password"
                                         >
                                         <b-form-input
                                         id="reg_pwd"
                                         v-model="regUserForm.password"
                                         type="password"
                                         placeholder="Your password here"
                                         >
                                         </b-form-input>
              </b-form-group>
                <b-form-group
                                         label="Institute"
                                         label-for="reg_institute"
                                         description="This should be consistent with your other users"
                                         >
                                         <b-form-input
                                         id="reg_institute"
                                         v-model="regUserForm.institute"
                                         placeholder="The name of your institue"
                                         >
                                         </b-form-input>
                </b-form-group>
                  <b-form-group
                                         label="Role/Designation"
                                         label-for="reg_designation"
                                         description="The role you want to assign the user."
                                         >
                                         <b-form-select
                                         id="reg_designation"
                                         v-model="regUserForm.designation"
                                         :options="designationOptions"
                                         >

                                         </b-form-select>
                  </b-form-group>
                    <b-button type="submit" variant="primary">Create User</b-button>
        </b-form>
        <div v-else>
          <b-alert show variant="warning">Only admins can add new users.</b-alert>
        </div>
      </b-modal>
    </div>
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
    token: String,
    designation: String
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
        { value: 'maintenance', text: 'Maintenance Staff' }
      ]
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
