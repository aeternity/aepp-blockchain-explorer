/**
 * Exporting Mutations
 */
export default {
  /**
   * setAccount
   * @param {Object} state
   * @param {Object} payload
   * @return {Object}
   */
  setAccount: function (state, payload) {
    return Object.assign(state.accounts, { [payload.address]: payload })
  },

  /**
   * setName
   * @param {Object} state
   * @param {Object} payload
   * @return {*}
   */
  setName: function (state, payload) {
    return Object.assign(state.names, { [payload.address]: payload })
  }
}
