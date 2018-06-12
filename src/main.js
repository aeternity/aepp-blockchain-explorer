/**
 * Vue
 */
import Vue from 'vue'

/**
 * Vue Plugins
 */
import VueLoading from 'vuex-loading'

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
 * Vue Application custom Tags
 */
import * as components from './components'

/**
 * Import global components
 */
Vue.use(components)

/**
 * Applying VueLoading
 */
Vue.use(VueLoading)

/**
 * Creating the Vuex Loader
 */
const vueLoading = new VueLoading({ useVuex: true })

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
  vueLoading,

  /**
   * Render app
   */
  render: h => h(app)
}).$mount('#app')
