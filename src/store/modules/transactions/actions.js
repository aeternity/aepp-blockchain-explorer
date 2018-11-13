import { getEpochClient } from '../../aeppsdk'

export default {
  /**
   * get the transactions in the mempool
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} hash
   * @return {*}
   */
  async get ({ state, commit, dispatch }, hash) {
    const client = await getEpochClient()
    const transactions = await client.api.getTxs()

    commit('setTransactions', transactions)

    return transactions
  },

  /**
   * get transactions in the mempool
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} hash
   * @return {*}
   */
  async mempool ({ state, commit, dispatch }, hash) {
    const client = await getEpochClient()
    const mempoolTxs = await client.api.getTxs()

    commit('setMempoolTxs', mempoolTxs)

    return mempoolTxs
  },

  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param hash
   * @return {Promise<*>}
   */
  async getTransactionsFromBlockHash ({ state, commit, dispatch }, hash) {
    const client = await getEpochClient()
    const transactions = await client.api.getTxs()

    commit('setTransactions', transactions)

    return transactions
  },

  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param hash
   * @return {Promise<*>}
   */
  async getTxByHash ({ state, commit, dispatch }, hash) {
    const client = await getEpochClient()
    const transaction = await client.api.getTransactionByHash(hash)

    commit('setTransaction', transaction)

    return transaction
  }
}
