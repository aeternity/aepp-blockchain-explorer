/**
 * Importing Libraries
 */
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

/**
 * Exporting Actions
 */
export default {
  /**
   * get the transactions of a specific hash
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} hash
   * @return {*}
   */
  async get ({ state, commit, dispatch }, hash) {
    startLoading(dispatch, 'transactions/get')

    commit('setTransactions', [])

    return endLoading(dispatch, 'transactions/get')
  }
}
