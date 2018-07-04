/**
 * Importing Libraries
 */
import ae from '../../aeppsdk'
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

/**
 * Exporting Actions
 */
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
    startLoading(dispatch, 'transactions/get')

    const client = await ae
    const transactions = await client.api.getTxs()

    commit('setTransactions', transactions)

    endLoading(dispatch, 'transactions/get')

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
    startLoading(dispatch, 'transactions/mempool')

    const client = await ae
    const mempoolTxs = await client.api.getTxs()

    commit('setMempoolTxs', mempoolTxs)

    endLoading(dispatch, 'transactions/mempool')

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
    startLoading(dispatch, 'transactions/getTransactionsFromBlockHash')

    const client = await ae
    const transactions = await client.api.getTxs()

    commit('setTransactions', transactions)

    endLoading(dispatch, 'transactions/getTransactionsFromBlockHash')

    return transactions
  },

  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param from
   * @param to
   * @return {Promise<*>}
   */
  async getTxsFromBlocksByHeightRange ({ state, commit, dispatch }, { from, to }) {
    startLoading(dispatch, 'transactions/getTxsFromBlocksByHeightRange')

    const client = await ae
    const transactions = await client.api.getTxsListFromBlockRangeByHeight({
      from,
      to,
      txEncoding: 'json'
    })

    commit('setTransactions', transactions)

    endLoading(dispatch, 'transactions/getTxsFromBlocksByHeightRange')

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
    startLoading(dispatch, 'transactions/getTxByHash')

    const client = await ae
    const { transaction } = await client.api.getTx(hash, { txEncoding: 'json' })

    commit('setTransaction', transaction)

    endLoading(dispatch, 'transactions/getTxByHash')

    return transaction
  },

  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param hash
   * @return {Promise<*>}
   */
  async getContractCallFromTx({ state, commit, dispatch }, hash) {
    startLoading(dispatch, 'transactions/getContractCallFromTx')

    const client = await ae
    const call = await client.api.getContractCallFromTx(hash)

    endLoading(dispatch, 'transactions/getContractCallFromTx')

    return call
  }
}
