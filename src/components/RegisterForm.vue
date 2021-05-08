<template>
  <div class="container">
    <h1> Register New User </h1>
    <b-form> <!-- @submit="registerUser()"-->
      <b-form-group label="Username: " label-for="reg_username" description="Please enter unique username." >
        <b-form-input v-model="regUserForm.username" id="reg_username" placeholder="Enter username" >
        </b-form-input>
      </b-form-group>
        <b-form-group label="Email: " label-for="reg_email" description="Please enter valid email" >
          <b-form-input id="reg_email" v-model="regUserForm.email" placeholder="Enter your email" type="email" >
          </b-form-input>
        </b-form-group>
          <b-form-group label="Password: " label-for="reg_pwd" description="Please enter strong password" >
            <b-form-input id="reg_pwd" v-model="regUserForm.password" type="password" placeholder="Your password here" >
            </b-form-input>
          </b-form-group>
            <b-form-group label="Institute" label-for="reg_institute" description="This should be consistent with your other users" >
              <b-form-input id="reg_institute" v-model="regUserForm.institute" placeholder="The name of your institue" >
              </b-form-input>
            </b-form-group>
              <b-form-group label="Role/Designation" label-for="reg_designation" description="The role you want to assign the user." >
                <b-form-select id="reg_designation" v-model="regUserForm.designation" :options="designationOptions" >
                </b-form-select>
              </b-form-group>
                <b-button @click="registerUser()" variant="primary">Create User</b-button>
    </b-form>
  </div>
</template>

<script>

// import axios from 'axios'

export default {
  name: 'RegisterForm',
  methods: {
    async registerUser() {
      let usr = {
        username: this.regUserForm.username,
        password: this.regUserForm.password,
        email: this.regUserForm.email,
        institute: this.regUserForm.institute,
        designation: this.regUserForm.designation
      }
      // axios.post(process.env.VUE_APP_HOST + '/user/register', usr, {
      //     headers: {
      //       'Content-Type': 'text/plain',
      //       'Accept': '*/*'
      //     }
      // }).then(r => {
      //   console.log(r.data)
      //   alert(r)
      // }).catch(e => {
      //   alert(e)
      // })

//       let resp = await fetch(process.env.VUE_APP_HOST + '/user/register', {
//         headers: {"Content-Type": "application/json"},
//         mode: 'cors',
//         cache: 'default',
//         method: 'POST',
//         body: "" + JSON.stringify(usr) + ""
//       })
//       if(resp.status == 200) {
//         const cred = await resp.json();
//         console.log(cred)
//       } else {
//         alert("Invalid Username or password.")
//       }

      fetch(process.env.VUE_APP_HOST + '/user/register', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(usr)
      }).then(r => {
        alert(r.status)
        r.json()
      }).then(d => {
        console.log(d)
        alert(d)
      }).catch(e => {
        alert(e)
      })

    }
  },
  data() {
    return {
      regUserForm: {
        username: '',
        password: '',
        email: '',
        institute: '',
        designation: null
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
}
  </script>

  <style></style>
