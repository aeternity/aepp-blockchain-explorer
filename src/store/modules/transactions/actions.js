/**
 * Importing API
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
   * Template
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {*} payload
   * @return {Promise<any>}
   */
  template: function ({ commit, dispatch }, payload) {
    /**
     * start load state
     */
    startLoading(dispatch, 'transactions/template')

    /**
     * Return New Promise
     */
    return new Promise((resolve, reject) => {
      /**
       * End Loading State
       */
      endLoading(dispatch, 'transactions/template')

      /**
       * Resolve template
       */
      return resolve('template')
    })
  }
}
