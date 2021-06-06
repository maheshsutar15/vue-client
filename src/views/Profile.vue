<template>
  <div class="container mt-3 outer">
    <h1>Profile</h1>
    <hr>
    <div class="container">
      <div v-if="!!user" >
        <div class="detail">
          <h3>Username</h3>
          <h5>{{ user.username }}</h5>
        </div>
        <div class="detail">
          <h3>Email</h3>
          <h5>{{ user.email }}</h5>
        </div>
        <div class="detail">
          <h3>Institue</h3>
          <h5>{{ user.institute }}</h5>
        </div>
        <div class="detail">
          <h3>Desigation</h3>
          <h5>{{ user.designation }}</h5>
        </div>
      </div>
      <div v-else>
        Please log in first
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    if(this.$store.getters.getLogInStatus) {
      this.$store.dispatch('fetchProfile')
        .then(user => {
          this.user = user
        })
    }
  }
}
</script>

<style>
.detail {
  margin: 2px 2px;
  display: inline;
}

h3, h5 {
  text-align: left;
}
</style>
