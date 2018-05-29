/**
 * Exporting Mutations
 */
export default {
  /**
   * Set transactions state
   * @param {Object} state
   * @param {Boolean} transactions
   * @return {Object}
   */
  setTransactions: function (state, transactions) {
    return Object.assign(state, { transactions })
  }
}
