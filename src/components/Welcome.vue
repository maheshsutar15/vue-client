<template>
     <div class="container">
      <b-tabs content-class="mt-3">
        <b-tab title="Login" active>
          <LoginForm @login="login"> </LoginForm>
        </b-tab>
        <b-tab title="Register">
          <RegisterForm> </RegisterForm>
        </b-tab>
      </b-tabs>
    </div>
</template>

<script>

import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

export default {
  name: 'Welcome',
  components: {
    LoginForm,
    RegisterForm
  },
  methods: {
    async login(cred) {
      this.$emit('loginUser', cred)
    }
  },
  data() {
    return {
            form: {
        uname: '',
        pwd: ''
      },
    }
  }
}
</script>
