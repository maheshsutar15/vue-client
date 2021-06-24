<template>
  <div class="container mt-3 outer box">
    <h1>About Us</h1>
    <hr>
    <img src="../assets/logo.png" alt="ATES" width="200px" height="200px"/>
    <p>
Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</p>
{{token}}
    <!-- <table> -->
    <!--   <tr> -->
    <!--     <td>Parameter</td> -->
    <!--     <td>Value</td> -->
    <!--   </tr> -->
    <!-- </table> -->
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      token: this.$route.params.token
    }

  }
}
</script>

<style scoped>
.box {
  height: 100%;
  text-align: center;
}
table {
  text-align: center;
}
p {
  margin: 10px;
}
</style>
