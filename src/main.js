import Vue from 'vue'
import './filters'
import app from './app'
import router from './router'
import store from './store'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
