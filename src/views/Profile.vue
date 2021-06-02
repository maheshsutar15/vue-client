<template>
  <div class="container mt-3 outer">
    <h1>Profile</h1>
    <div class="container inner">
      <table v-if="!!user" cell-spacing="5">
        <tr>
          <td>Username</td>
          <td>{{ user.username }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <td>Institute</td>
          <td>{{ user.institute }}</td>
        </tr>
        <tr>
          <td>Designation</td>
          <td>{{ user.designation }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.$store.dispatch('fetchProfile')
    .then(user => this.user = user)
    console.log(this.user)
  }
}
</script>

<style>
.inner {
  border: 1px solid black;
  border-radius: 8px;
}
table {
  margin: auto;
  text-align: left;
}
td {
  margin: 10px 10px;
}
</style>
