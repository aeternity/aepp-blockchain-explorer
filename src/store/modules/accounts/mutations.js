/**
 * Exporting Mutations
 */
export default {
  /**
   * setAccount
   * @param {Object} state
   * @param {Boolean} account
   * @return {Object}
   */
  setAccount: function (state, account) {
    return Object.assign(state, { account })
  },

  /**
   * setName
   * @param {Object} state
   * @param {String} name
   */
  setName: function (state, name) {
    return Object.assign(state, { name })
  }
}
