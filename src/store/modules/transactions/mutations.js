/**
 * Exporting Mutations
 */
export default {
  /**
   * setTransaction object
   * @param {Object} state
   * @param {Object} transaction
   * @return {Object}
   */
  setTransaction: function (state, transaction) {
    return Object.assign(state, { transaction })
  },

  /**
   * setTransactions array
   * @param {Object} state
   * @param {Array} transactions
   * @return {Object}
   */
  setTransactions: function (state, transactions) {
    return Object.assign(state, { transactions })
  },

  /**
   * setMempoolTxs
   * @param {Object} state
   * @param {Array} mempoolTxs
   * @return {Object}
   */
  setMempoolTxs: function (state, mempoolTxs) {
    return Object.assign(state, { mempoolTxs })
  }
}
