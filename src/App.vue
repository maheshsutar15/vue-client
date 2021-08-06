<template>
  <div id="app">
    <TitleBar  />
    <div class="container">
      <router-view></router-view>
    </div>
    <footer class="main">
      Copyright &copy; 2021 ATES OPL.
      All Rights Reserved.
    </footer>
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
    console.log(window.location.pathname ); //=== '/passwordreset')
    if(this.$store.getters.getLogInStatus === true) {
      this.$router.push({name: 'Dashboard'})
    }
  }
}
</script>

<style>
html, #app {
  background-color: #fff;
}

/*
html, #app {
background-color: #ddd;

}
 */

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

footer.main {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 4px 10px;
  height: 30px;
  background-color: #ccc;
  text-align: left;
}
</style>
