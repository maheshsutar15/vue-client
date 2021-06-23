<template>
  <div id="app">
    <TitleBar  />
    <div class="container">
      <router-view></router-view>
    </div>
   <!-- TODO: <footer>copyright © &copyright; 2021 colorcode.is</footer> -->
  </div>
</template>

<script>

import TitleBar from './components/TitleBar.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
  },
  data () {
    return {
    }
  },
  async created () {
    // console.log(window.location.pathname === '/pas')
    if(this.$store.getters.getLogInStatus === true) {
      this.$router.push({name: 'Dashboard'})
    }

  }
}
</script>

<style>
/*
html, #app {
  background-color: #efefef;
}
*/

html, #app {
  background-color: #ddd;

}

hr {
  border-color: white;
}
/*
*/

#app {
  text-align: center;
  margin-top: 0px;
}
.container {
  margin-top: 40px;
}
</style>
