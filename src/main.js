import Vue from 'vue'
import './filters'
import app from './app'
import router from './router'
import store from './store'
import '@aeternity/aepp-components-3/dist/aepp.components.css'
import '@aeternity/aepp-components-3/dist/aepp.fonts.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
