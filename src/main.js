import Vue from 'vue'
import VueLoading from 'vuex-loading'
import './filters'
import app from './app'
import router from './router'
import store from './store'
import * as components from './components'
import * as partials from './partials'

Vue.use(components)
Vue.use(partials)
Vue.use(VueLoading)

const vueLoading = new VueLoading({ useVuex: true })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vueLoading,
  render: h => h(app)
}).$mount('#app')
