<template>
  <div v-if="designation === 'admin'" class="logs">
    <h3>Recent acitivites</h3>
    <hr>
    <b-list-group>
      <b-list-group-item
        v-for="log in logs"
        :key="log._id"
        :variant="getVariant(log.action)"
        >
        <Created v-if="log.action === '0'"/>
        <Updated v-if="log.action === '1'"/>
        <Deleted v-if="log.action === '2'"/>
        User <b>{{ log.user }}</b>
        {{ getActions(log.action) }}
        {{ getEntity(log.entity) }}
        <b-badge>
        {{ log.entityId }}
        </b-badge>
        {{ agoCalc(log.datetime) }} ago
      </b-list-group-item>
    </b-list-group>
  </div>
  <div v-else>
    <h3>You are not authorised to see these logs.</h3>
  </div>
</template>

<script>
import Created from 'vue-material-design-icons/PlusBox.vue'
import Updated from 'vue-material-design-icons/Update.vue'
import Deleted from 'vue-material-design-icons/Delete.vue'

import { mapGetters } from 'vuex'
  export default {
    name: 'Logs',
    data() {
      return {
        logs: [
          { _id: 'lol' }
        ]
      }
    },
    components: {
      Created,
      Updated,
      Deleted,
      // LoggedIn
    },
    computed: {
      ...mapGetters({
        designation: 'getDesignation'
      }),
    },
    methods: {
      getActions(idx) {
        return [
          'created new',
          'updated existing',
          'deleted',
        ][idx]
      },
      getEntity(idx) {
        return [
          'user',
          'node',
        ][idx]
      },
      agoCalc(time) {
        const dt = Date.parse(time)
        const dateDiff_hrs = Math.floor((new Date() - dt) / 1000 / 3600 ) ;
        if (dateDiff_hrs > 24) {
          const days = Math.floor(dateDiff_hrs / 24)
          return days + " days"
        }
        if (dateDiff_hrs === 0) {
          return "few seconds"
        }
        return dateDiff_hrs + " hrs"
      },
      getVariant(action) {
        switch(action) {
          case '0':
            return 'primary'
          case '1':
            return 'secondary'
          case '2':
            return 'danger'
          default:
            return 'info'
        }
      }
    },
    mounted() {
      this.$store.dispatch('fetchLogs')
        .then(logs => {
          this.logs = logs
        })
    }
  }
  </script>

<style>
li {
  list-style-type: none;
}

.logs {
  text-align: left;
}

</style>
