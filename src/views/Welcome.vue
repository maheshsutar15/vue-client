<template>
  <div class="container">
    <b-tabs content-class="mt-3">
      <b-tab title="Login" active>
        <LoginForm > </LoginForm>
      </b-tab>
      <b-tab title="Register">
        <RegisterForm> </RegisterForm>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'Welcome',
  components: {
    LoginForm,
    RegisterForm
  },
}
</script>
