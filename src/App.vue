<template>
  <div id="app">
    <LoginPage @setAccessToken="setAccessToken" @logout="logout" :token="accessToken"/>
    <Cards v-bind:sensors="sensors" @refresh="fetchData" v-if="accessToken != ''"/>
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
  },
  data () {
    return {
      sensors: null,
      accessToken: null,
      loggedIn: false
    }
  },
  created () {
    this.getAccessToken()
    // const updateLoop = 
    if(this.loggedIn) {
      this.fetchData()
      setInterval(() => {
        this.fetchData()
        console.log("Updating...")
      }, 30000)
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    async fetchData () {
      const res = await fetch(process.env.VUE_APP_HOST + '/node');
      let sensorsList = await res.json();
      for(let i = 0; i < sensorsList.length; i++) {
        let readResp = await fetch(process.env.VUE_APP_HOST + '/node/readings/' + sensorsList[i].uid)
        let readings = await readResp.json()
        sensorsList[i] = Object.assign({}, sensorsList[i], readings)
      }
      this.sensors = sensorsList;
    },
    async getAccessToken() {
      this.accessToken  = localStorage.getItem('accessToken')
      if(this.accessToken) {
        this.loggedIn = true;
      }
    },
    async setAccessToken(tok) {
      localStorage.setItem('accessToken', tok)
      this.accessToken  = localStorage.getItem('accessToken')
      this.fetchData()
      setInterval(() => {
        this.fetchData()
        console.log("Updating...")
      }, 30000)
    },
    async logout() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
      this.loggedIn = false
      window.location.reload()
    }
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
