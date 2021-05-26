<template>
  <div class="cont">
    <h1> Trend for {{ this.$route.params.uid }}</h1>
    <Trend class="constrained"></Trend>
  </div>
</template>

<script>
import Trend from '@/components/Trend.js'

export default {
  name: 'Trends',
  components: {
    Trend
  }
}
</script>

<style scoped>
.cont {
  width: 500px !important;
  height: 400px !important;
}
</style>
