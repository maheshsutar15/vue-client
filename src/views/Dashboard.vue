<template>
  <div>
    <b-modal class='long' id="nodeForm" title="Add new Node" hide-footer>
      <AddNodeForm > </AddNodeForm>
    </b-modal>
    <div class="row">
      <div class="col-md-2">
        <b-button
            variant="outline-primary"
            @click="$bvModal.show('nodeForm')"
            style="float: left; margin-right: 10px"
            >
            <PlusIcon class="addnode"/>
            Add Node
        </b-button>
      </div>
      <div class="col-md-2">
        <b-button
            variant="outline-primary"
            @click="goToTrend()"
            style="float: left;"
            >
            <ChartLine class="addnode"/>
            See trend
        </b-button>
      </div>
      <div class="col-md-8">
        <div style="float: right; text-align: right; font-size: 10pt;">
          <strong>
            {{ ip }}
          </strong>
        </div>
      </div>
    </div>
    <div class="summary">
      <b>Summary</b>  <br>
      {{ faultyNodes && faultyNodes.length }} Faulty nodes <br>
      {{ healthyNodes && healthyNodes.length }} Healthy nodes
    </div>
    <hr>
    <b-tabs>
      <b-tab title="Faulty">
        <Cards v-if="sensors && !loading" :sensors="faultyNodes"/>
      </b-tab>
      <b-tab title="Healthy">
        <Cards v-if="sensors && !loading" :sensors="healthyNodes"/>
      </b-tab>
    </b-tabs>
    <vue-loaders-ball-beat color="grey" scale="1" v-if="!sensors || loading"></vue-loaders-ball-beat>
  </div>
</template>

<script>

import Cards from '@/components/Cards'
import AddNodeForm from '@/components/AddNode.vue'
import 'vue-loaders/dist/vue-loaders.css';
import PlusIcon from 'vue-material-design-icons/PlusCircle.vue';
import ChartLine from 'vue-material-design-icons/ChartLine.vue';

import { mapGetters, mapActions } from 'vuex';
import { sendNotification } from '@/common/notifcation.service';

export default {
  name: 'Dashboard',
  components: {
    Cards,
    AddNodeForm,
    PlusIcon,
    ChartLine
  },
  data() {
    return {
      fetchSensors: null,
      ip: window.location.host,
      server: process.env.VUE_APP_HOST,
      healthyNodes: [],
      faultyNodes: [],
    }
  },
  async mounted() {
    if(this.$store.getters.getAccessToken == null) {
      this.$bvModal.msgBoxOk('Please Login')
      this.$router.push('/')
    }
    // navigator.serviceWorker.register('sw.js')
    this.fetchSensors = setInterval(
      () => {
        if(this.$store.getters.getSensors.length == 0) {
          if(this.$store.getters.getLogInStatus) {
            this.$store.dispatch('fetchSensors', 0)
          }
          return
        }
        if (this.$store.getters.getSensors.length != 0) {

          this.healthyNodes = this.$store.getters.getSensors.filter((node) => {
            const co2_ok = this.applyLogic(node.isCO2, this.checkOK(node.co2Range, node.reading.co2))
            const temp_ok = this.applyLogic(node.isTemperature, this.checkOK(node.temperatureRange, node.reading.temperature))
            const hum_ok = this.applyLogic(node.isHumidity, this.checkOK(node.humidityRange, node.reading.humidity))
            return co2_ok && temp_ok && hum_ok
          })
            .sort((a, b) => { return Date.parse(b.reading.datetime) - Date.parse(a.reading.datetime) })
          this.faultyNodes = this.$store.getters.getSensors.filter((node) => {
            const co2_ok = this.applyLogic(node.isCO2, this.checkOK(node.co2Range, node.reading.co2))
            const temp_ok = this.applyLogic(node.isTemperature, this.checkOK(node.temperatureRange, node.reading.temperature))
            const hum_ok = this.applyLogic(node.isHumidity, this.checkOK(node.humidityRange, node.reading.humidity))
            return !(co2_ok && temp_ok && hum_ok)
          })
            .sort((a, b) => { return Date.parse(b.reading.datetime) - Date.parse(a.reading.datetime) })
        }

        this.$store.commit('setFaulties', this.faultyNodes)
        console.log(this.faultyNodes)
        if(this.$store.getters.getLogInStatus) {
          this.$store.dispatch('fetchSensors', 0)
        }
        return
      }
      , 3000)

    const appIn2 = setInterval(() => {
        const notifBody = sendNotification(this.faultyNodes)
        console.log(notifBody)
        this.$notification.show('There are few faulty nodes', {
          body: notifBody
        }, {})
    }, 30 * 60 * 1000)

    console.log(this.$store.getters.getFaulties.length)
    window.appInterval = this.fetchSensors
    window.notificationInterval = appIn2
    // await window.Notification.requestPermission()
  },
  computed: {
    ...mapGetters({sensors: 'getSensors', loading: 'isLoading'}),
    ...mapActions('notifications', ['add']),
  },
  methods: {
    applyLogic(a, b) {
      return (a && b) || !a;
    },
    goToTrend() {
      this.$router.push({name: 'Trends'})
    },
    checkOK(range, val) {
      return (range.min <= val && val <= range.max)
    },
    async deleteNode(uid) {
      this.$bvModal.msgBoxConfirm("Are you sure you want to delete the node "+ uid)
        .then(confirmation => {
          if(confirmation) {
            this.$store.dispatch('deleteNode', uid)
              .then(() => {
                this.$bvModal.msgBoxOk('Successfully Deleted ' + uid)
                  .then(() => {

                  })
                this.$store.dispatch('fetchSensors', 1)
              })
              .catch(() => this.$bvModal.msgBoxOk('Could not delete ' + uid))
          }
        })
        .catch(e => {
          this.message = e.message
          this.$bvModal.msgBoxOk(e.message)
        })
    }
  }
}

</script>

<style scoped>
td {
  font-size: 13pt;
}

.container {
  min-height: 200px;
  height: auto;
}

.chart {
  color: skyblue;
}

.long {
  height: 100%;
}


tr.separator {
  border-top: 2px white inset;
  padding-bottom: 0px;
}

.project_title {
  font-size: 12pt;
  text-align: center;
}
.summary {
  text-align: left;
}

</style>
