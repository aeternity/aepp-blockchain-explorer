export default {
  /**
   * setTransaction object
   * @param {Object} state
   * @param {Object} transaction
   * @return {Object}
   */
  setTransaction: function (state, transaction) {
    const tx = state.transactions.find(tx => tx.hash === transaction.hash)
    if (tx) return tx
    return Object.assign(state, { transactions: state.transactions.concat(transaction) })
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
