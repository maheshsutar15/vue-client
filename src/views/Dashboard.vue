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
          <a :href="`http://${ip}`" target="_blank">
            <strong>
              {{ ip }}
            </strong>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="summary"> -->
    <!--   <b>Summary</b>  <br> -->
    <!--   {{ faultyNodes && faultyNodes.length }} Faulty nodes <br> -->
    <!--   {{ healthyNodes && healthyNodes.length }} Healthy nodes -->
    <!-- </div> -->
    <hr>
    <b-tabs>
      <b-tab>
        <template #title>
          Faulty
          <b-badge>{{ faultyNodes && faultyNodes.length }}</b-badge>
        </template>
        <Cards v-if="sensors && !loading" :sensors="faultyNodes"/>
      </b-tab>
      <b-tab>
        <template #title>
          Healthy
          <b-badge>{{ healthyNodes && healthyNodes.length }}</b-badge>
        </template>
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
      notificationService: null,
      ip: window.location.host,
      server: process.env.VUE_APP_HOST,
      healthyNodes: [],
      faultyNodes: [],
    }
  },
  async mounted() {
    if(this.$store.getters.getAccessToken == null) {
      this.$bvToast.toast('Please Login')
      this.$router.push('/')
    }
    this.$store.commit('loading')
    this.fetchSensors = setInterval(
      () => {
        if (this.$route.name !== 'Dashboard') {
          return
        }
        if(this.$store.getters.getLogInStatus) {
          this.$store.dispatch('fetchSensors', 0)
        }
        if (this.$store.getters.getSensors.length != 0) {

          this.healthyNodes = this.$store.getters.getSensors.filter((node) => {
            const co2_ok = this.applyLogic(node.isCO2, this.checkOK(node.co2Range, node.reading.co2))
            const temp_ok = this.applyLogic(node.isTemperature, this.checkOK(node.temperatureRange, node.reading.temperature))
            const hum_ok = this.applyLogic(node.isHumidity, this.checkOK(node.humidityRange, node.reading.humidity))
            return co2_ok && temp_ok && hum_ok
          })
            .sort((a, b) => { return ('' + a.uid).localeCompare(b.uid) })
          this.faultyNodes = this.$store.getters.getSensors.filter((node) => {
            const co2_ok = this.applyLogic(node.isCO2, this.checkOK(node.co2Range, node.reading.co2))
            const temp_ok = this.applyLogic(node.isTemperature, this.checkOK(node.temperatureRange, node.reading.temperature))
            const hum_ok = this.applyLogic(node.isHumidity, this.checkOK(node.humidityRange, node.reading.humidity))
            return !(co2_ok && temp_ok && hum_ok)
          })
            .sort((a, b) => { return ('' + a.uid).localeCompare(b.uid) })
        }

        this.$store.commit('setFaulties', this.faultyNodes)
        return
      }
      , 10000)
    this.$store.dispatch('fetchSensors').then(() => {
      this.$store.commit('loaded')
    })

    this.notificationService = setInterval(() => {
      if (this.faultyNodes.length > 0) {
        const notifBody = sendNotification(this.faultyNodes)
        this.$notification.show('There are few faulty nodes', {
          body: notifBody
        }, {})
      }
    }, 30 * 60 * 1000)

  },
  computed: {
    ...mapGetters({sensors: 'getSensors', loading: 'isLoading'}),
    ...mapActions('notifications', ['add']),
  },
  destroyed () {
    console.log('removing interval')
    clearInterval(this.fetchSensors)
    clearInterval(this.notificationService)
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
                this.$bvToast.toast('Successfully Deleted ' + uid)
                this.$store.dispatch('fetchSensors', 1)
              })
              .catch(() => this.$bvToast.toast('Could not delete ' + uid))
          }
        })
        .catch(e => {
          this.message = e.message
          this.$bvToast.toast(e.message)
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
