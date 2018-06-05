/**
 * Importing Components
 */
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

/**
 * Exporting
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
