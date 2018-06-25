/**
 * Exporting Getters
 */
export default {
  /**
   * getAccount based on the address
   * @param {Object} state
   * @return {Function}
   */
  getAccount: function (state) {
    return function (address) {
      return state.accounts[address] && state.accounts[address]
    }
  },

  /**
   * getName based on the address
   * @param {Object} state
   * @return {Function}
   */
  getName: function (state) {
    return function (address) {
      return state.names[address] && state.names[address]
    }
  }
}
