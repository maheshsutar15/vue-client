<template>
  <div id="app">
    <TitleBar  /> 
    <router-view></router-view>
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
    if(this.$store.getters.getLogInStatus === true) {
      this.$router.push({name: 'Dashboard'})
    }

  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
}
</style>
