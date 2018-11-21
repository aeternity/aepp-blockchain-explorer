import { wrapActionsWithResolvedEpoch } from '../../utils'

export default wrapActionsWithResolvedEpoch({
  /**
   * get the transactions in the mempool
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} hash
   * @return {*}
   */
  async get ({ rootGetters: { epoch }, commit }, hash) {
    const transactions = await epoch.api.getTxs()

    commit('setTransactions', transactions)

    return transactions
  },

  /**
   * get transactions in the mempool
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} hash
   * @return {*}
   */
  async mempool ({ rootGetters: { epoch }, commit }, hash) {
    const mempoolTxs = await epoch.api.getTxs()

    commit('setMempoolTxs', mempoolTxs)

    return mempoolTxs
  },

  /**
   *
   * @param rootGetters
   * @param commit
   * @param hash
   * @return {Promise<*>}
   */
  async getTransactionsFromBlockHash ({ rootGetters: { epoch }, commit }, hash) {
    const transactions = await epoch.api.getTxs()

    commit('setTransactions', transactions)

    return transactions
  },

  /**
   *
   * @param rootGetters
   * @param commit
   * @param hash
   * @return {Promise<*>}
   */
  async getTxByHash ({ rootGetters: { epoch }, commit }, hash) {
    const transaction = await epoch.api.getTransactionByHash(hash)

    commit('setTransaction', transaction)

    return transaction
  }
})
