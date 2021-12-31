<template>
  <div id="app">
    <TitleBar />
    <div class="container">
      <b-breadcrumb class="no-print" :items="[
                            { text: 'Home', href: '/' },
                            { text: $route.name, href: $route.path }
                            ]">
      </b-breadcrumb>
      <router-view></router-view>
    </div>
    <footer class="main" v-if="this.$route.meta.footer">
      Copyright &copy; 2021 ATES OPL.
      All Rights Reserved.
    </footer>
  </div>
</template>

<script>

import TitleBar from './components/TitleBar.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
  },
  data () {
    return {
    }
  },
  mounted() {
    this.$notification.show('NIV CMS', {
      body: 'Hello, App has been initialised.'
    }, {})
  }
}
</script>

<style>
html, #app {
  background-color: #fff;
}

/*
html, #app {
  background-color: #ddd;

}
 */

hr {
  border-color: white;
}
/*
 */

#app {
  text-align: center;
  margin-top: 0px;
}
.container {
  margin-top: 40px;
}

@media print {
  .no-print { display: none; }
}

footer.main {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 4px 10px;
  height: 30px;
  background-color: #ccc;
  text-align: left;
}
</style>
