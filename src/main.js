import Vue from 'vue'
import './filters'
import app from './app'
import router from './router'
import store from './store'
import VueWait from 'vue-wait'

Vue.use(VueWait)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(app)
}).$mount('#app')
