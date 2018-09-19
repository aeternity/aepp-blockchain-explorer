import Vue from 'vue'
import VueLoading from 'vuex-loading'
import './filters'
import app from './app'
import router from './router'
import store from './store'
import VueWait from 'vue-wait'

Vue.use(VueLoading)
Vue.use(VueWait)

const vueLoading = new VueLoading({ useVuex: true })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  vueLoading,
  render: h => h(app)
}).$mount('#app')
