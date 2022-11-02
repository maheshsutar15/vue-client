<template>
  <div>
    <b-button class="no-print" variant="primary" title="Print Chart" @click="print()">
      <PrintIcon/>
    </b-button>

    <b-table :busy="loading" striped sticky-header hover :items="$store.getters.getSensors" :fields="fields">
      <!-- <template #cell(uid)="dt"> -->
      <!--   {{ new Date(dt.value).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})  }} -->
      <!-- </template> -->
      <!-- <template #cell(temperature)="dt"> -->
      <!--   {{ dt.value }} &deg;C -->
      <!-- </template> -->
      <!-- <template #cell(co2)="dt"> -->
      <!--   {{ dt.value }} % -->
      <!-- </template> -->
      <!-- <template #cell(humidity)="dt"> -->
      <!--   {{ dt.value }} % -->
      <!-- </template> -->
      <template #table-busy>
        <div class="text-center text-info my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Coming soon...</strong>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import PrintIcon from 'vue-material-design-icons/Printer.vue'

export default {
  name: 'Table',
  components: {
    PrintIcon
  },
  data() {
    return {
      loading: true,
      fields: ['uid', 'location', 'temperatureRange'],
    }
  },
  async mounted() {
  },
  methods: {
    print() {
      window.print()
    }
  }

}


</script>

<style scoped>
table, tbody {
  width: 100%;
}
th, td {
  width: 100px;
}

@media print {
  .no-print { display: none; }
}

</style>
