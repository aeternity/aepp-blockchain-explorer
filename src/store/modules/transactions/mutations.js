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

  /***
   * resetAll reset the state of 'transactions' module
   * @param {Object} state
   */
  resetState (state) {
    Object.assign(state,
      {
        transactions: []
      }
    )
  }
}
