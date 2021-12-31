<template>
  <div class="container">
    <b-tabs>
      <b-tab title="Login">
        <LoginForm />
      </b-tab>
      <b-tab title="Register">
        <NewUserForm />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue'
import NewUserForm from '@/components/NewUserForm.vue'

export default {
  name: 'Welcome',
  components: {
    LoginForm,
    NewUserForm
  },
  async created () {
    if(this.$store.getters.getLogInStatus === true) {
      this.$router.push({name: 'Dashboard'})
    }
  }
}
</script>
