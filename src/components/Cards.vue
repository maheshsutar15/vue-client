<template>
  <div class="container">
    <div class="card" style="width: 18rem; float: left; margin: 5px 5px;">
      <div class="card-body">
        <h4 class="card-title" id="uid">UID: </h4>
        <h6 class="card-subtitle mb-2 text-muted"></h6>
        <table class="table table-striped table-hover">
          <tr>
            <td>Temperature</td>
            <td id="temperature">  &deg;</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td id="humidity"></td>
          </tr>
          <tr>
            <td>CO2</td>
            <td id="co2"> ppm</td>
          </tr>
        </table>
        <div class="alert alert-success" role="alert">
        Status OK
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
name: 'LoginPage',
        props: {
name: []
        }
}

</script>

<style scoped>
.container {
border: 1px black solid
}
</style>
