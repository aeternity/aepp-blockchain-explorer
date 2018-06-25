/**
 * Exporting Getters
 */
export default {
  getTxByHash: (state) => (hash) => {
    return state.transactions.find(tx => tx.hash === hash)
  }
}
