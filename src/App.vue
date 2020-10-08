<template>
  <div id="app">
    <LoginPage/>
    <Cards />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import Cards from './components/Cards.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    Cards
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
