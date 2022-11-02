<template>
  <div>
    <b-alert variant="danger" show>
    {{ message }}
    </b-alert>
  </div>
</template>



<script>
export default {
  name: 'AlertBox',
  props: {
    message: { type: String, default: 'There was an error' },
  },
}
</script>

<style scoped>
</style>
