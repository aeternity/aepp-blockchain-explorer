import Vue from 'vue'
import './filters'
import app from './app'
import router from './router'
import store from './store'
import yaniToAe from './mixins/yaniToAe'

Vue.config.productionTip = false
Vue.mixin(yaniToAe)

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
