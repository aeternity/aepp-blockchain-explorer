export default {
  /**
   * setTransaction object
   * @param {Object} state
   * @param {Object} transaction
   */
  setTransaction (state, transaction) {
    const tx = state.transactions.find(tx => tx.hash === transaction.hash)
    if (tx) return
    Object.assign(state, { transactions: state.transactions.concat(transaction) })
  },

  /**
   * setTransactions array
   * @param {Object} state
   * @param {Array} transactions
   */
  setTransactions (state, transactions) {
    Object.assign(state, { transactions })
  },

  /**
   * setMempoolTxs
   * @param {Object} state
   * @param {Array} mempoolTxs
   */
  setMempoolTxs (state, mempoolTxs) {
    Object.assign(state, { mempoolTxs })
  }
}
