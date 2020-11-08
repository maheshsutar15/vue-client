<template>
  <div id="app">
    <LoginPage @setAccessToken="setAccessToken" v-if="!accessToken"/>
    <Cards v-bind:sensors="sensors" @refresh="fetchData"/>
    <b-button
       variant="outline-primary"
       v-on:click="addNode()"
       >
       Add Node
    </b-button>
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
      accessToken: null
    }
  },
  created () {
    this.fetchData()
    this.getAccessToken()
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
    },
    async setAccessToken(tok) {
      localStorage.setItem('accessToken', tok)
      this.accessToken  = localStorage.getItem('accessToken')
    },
    async addNode() {
      const uid = prompt('Enter UID')
      if(!uid) {
        alert("could not add")
        return;
      }
      const location = prompt('Enter Location')
      if(!location) {
        alert("could not add")
        return
      }
      var node = {
        "uid": uid,
        "location": location,
        "name": location,
        "supply": {
          "mains": {
            "r": "0",
            "y": "0",
            "b": "0"
          },
          "amf": {
            "r": "0",
            "y": "0",
            "b": "0"
          },
          "stabilizer": {
            "r": "0",
            "y": "0",
            "b": "0"
          }
        }
      }
      console.log(JSON.stringify(node))
      const res = await fetch(process.env.VUE_APP_HOST + '/node/add', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(node)
      })
      const newNode = await res.json()
      console.log(newNode)
      this.fetchData()
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
