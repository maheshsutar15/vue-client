<template>
  <div class="container">
    <h1> Login </h1>
    <bForm variant="dark">
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

    <a class="link" @click="redirectToForgot()">Forgot Password?</a>
    <hr>
    <b-button v-on:click="login()" variant="primary">Submit </b-button>
    </bForm>
    <bModal ref="resp" title="Server Response" hide-footer>
    <AlertBox :message="message"></AlertBox>
    </bModal>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue'

export default {
  name: 'LoginForm',
  components: {
    AlertBox
  },
  methods: {
    async login() {
      const uname = this.form.uname
      const pwd = this.form.pwd
      this.$store.dispatch('login', {
        uname,
        pwd
      })
        .then(() => this.$router.push({ name: "Dashboard" }))
        .catch((e) => {
          this.message = e
          this.$refs['resp'].show()
          this.form = {
            uname: '',
            pwd: ''
          }
        })
    },
    redirectToForgot() {
      if(process.env.VUE_APP_ENV === 'intranet') {
        this.$router.push({ name: 'ForgotIntra' })
      } else {
        this.$router.push({ name: 'Forgot' })
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
      message: ''
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


.link {
  color: blue;
}
</style>
