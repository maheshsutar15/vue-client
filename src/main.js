import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueLoaders from 'vue-loaders'

Vue.config.productionTip = false

Vue.use(VueLoaders)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
