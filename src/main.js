/**
 * Vue
 */
import Vue from 'vue'

/**
 * Global imports
 */
import './filters'

/**
 * Application logic
 */
import app from './app'
import router from './router'
import store from './store'

/**
 * Vue configs
 * @type {boolean}
 */
Vue.config.productionTip = false

/**
 * We export the instance of the app
 * so that if we ever need to have a
 * reference of the application itself
 * somewhere, we can simply `import` it
 */
export default new Vue({
  /**
   * Vue plugins
   */
  router,
  store,

  /**
   * Render app
   */
  render: h => h(app)
}).$mount('#app')
