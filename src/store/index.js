/**
 * Vue
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Vuex
 */
import state from './state'
import modules from './modules'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

/**
 * Installing Vue Plugins
 */
Vue.use(Vuex)

/**
 * Exporting Vuex.Store Instance
 */
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
  modules
})
