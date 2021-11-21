<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script>

import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Welcome',
  components: {
    LoginForm,
  },
  async created () {
    if(this.$store.getters.getLogInStatus === true) {
      this.$router.push({name: 'Dashboard'})
    }
  }
}
</script>
