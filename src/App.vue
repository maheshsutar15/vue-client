<template>
  <div id="app">
    
    <LoginPage @loginUser="loginUser" @logout="logout" :token="accessToken" :designation="designation"/>
    <Cards v-bind:sensors="sensors" @refresh="fetchData" v-if="accessToken != ''" :token="accessToken"/>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import Cards from './components/Cards.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    Cards,
  },
  data () {
    return {
      sensors: null,
      accessToken: null,
      loggedIn: false,
      designation: null
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
      const res = await fetch(process.env.VUE_APP_HOST + '/node', {
        headers: new Headers({
          'Authorization': 'Bearer '+this.accessToken
        })
      });
      let sensorsList = await res.json();
      for(let i = 0; i < sensorsList.length; i++) {
        let readResp = await fetch(process.env.VUE_APP_HOST + '/node/readings/' + sensorsList[i].uid, {
          headers: new Headers({
            'Authorization': 'Bearer '+this.accessToken
          })
        })
        let readings = await readResp.json()
        sensorsList[i] = Object.assign({}, sensorsList[i], readings)
      }
      this.sensors = sensorsList;
    },
    async getAccessToken() {
      this.accessToken  = localStorage.getItem('accessToken')
      this.designation = localStorage.getItem('designation')
      if(this.accessToken) {
        this.loggedIn = true;
      }
    },
    async loginUser(cred) {
      localStorage.setItem('accessToken', cred.accessToken)
      this.accessToken  = localStorage.getItem('accessToken')
      localStorage.setItem('designation', cred.designation)
      this.designation = localStorage.getItem('designation')
      this.fetchData()
      setInterval(() => {
        this.fetchData()
        console.log("Updating...")
      }, 30000)
    },
    async logout() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
      this.designation = null
      localStorage.removeItem('designation')
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
    margin-top: 0px;
  }
  </style>
