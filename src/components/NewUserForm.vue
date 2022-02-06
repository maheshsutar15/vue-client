<template>
  <div class="container" @keydown.enter="login">
    <h1> Login </h1>
    <bForm variant="dark">
    <b-form-group id="f2" label="Username:" label-for="usname">
      <b-form-input
                                    id="usname"
                                    v-model.trim="form.usname"
                                    placeholder="Enter username"
                                    required>

      </b-form-input>
    </b-form-group>
    <b-form-group label="OTP" label-for="otp">
      <b-form-input
                                   id="otp"
                                   v-model.trim="form.code"
                                   placeholder="Enter OTP"
                                   type="password"
                                   required>
      </b-form-input>
    </b-form-group>
    <b-form-group label="Set new password" label-for="passwd">
      <b-form-input
                                   id="passwd"
                                   v-model.trim="form.passwd"
                                   placeholder="Enter Password"
                                   type="password"
                                   required>
      </b-form-input>
    </b-form-group>
    <b-form-group label="Set new password" label-for="cpasswd">
      <b-form-input
                                   id="cpasswd"
                                   v-model.trim="cpasswd"
                                   placeholder="Confirm Password"
                                   type="password"
                                   v-on:keyup="checkMatch()"
                                   required>
      </b-form-input>
    </b-form-group>
        <small class="red" v-if="nomatch">
      <li>
        Passwords do not match
      </li>
    </small>

    <b-button v-on:click="login()" variant="primary">Submit </b-button>
    </bForm>
  </div>
</template>

<script>
export default {
  name: 'NewUserForm',
  methods: {
    async login() {
      const uname = this.form.usname
      const pwd = this.form.passwd
      const code = this.form.code
      this.$store.dispatch('verify', {
        uname,
        code,
        pwd
      })
        .then((msg) => {
          this.$bvToast.toast(msg)
          this.$router.push({ name: 'Welcome' })
        })
        .catch((e) => {
          this.$bvToast.toast(e)
          this.form = {
            usname: '',
            code: '',
            passwd: ''
          }
          this.cpasswd = ''
        })
    },
    redirectToForgot() {
      this.$router.push({ name: 'Forgot' })
    },
    checkMatch() {
      if(this.form.passwd !== this.cpasswd) {
        this.nomatch = true
      } else {
        this.nomatch = false
      }
    }
  },
  data() {
    return {
      show: true,
      form: {
        usname: '',
        code: '',
        passwd: ''
      },
      nomatch: '',
      cpasswd: ''
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

.red {
  color: #dd1111;
}

.link {
  color: blue;
}
</style>
