<template>
  <div>
    <h1>Trend for {{ uid }}</h1>
    <span style="margin: auto;">
      Showing from
      <strong>{{ from }}</strong>
      to
      <strong>{{ to }}</strong>
    </span>
    <Trend class="box" :from="from" :to="to" ></Trend>
  </div>
</template>

<script>
import Trend from '@/components/Trend.js'

export default {
  name: 'Graph',
  components: {
    Trend
  },
  data() {
    return {
      uid: this.$route.params.uid,
      from: this.$route.params.from,
      to: this.$route.params.to,
    }
  }
}
</script>

<style scoped>
.box {
  width: 50%;
  height: 50%;
  margin: auto;
}

div {
  text-align: center;
}

</style>
