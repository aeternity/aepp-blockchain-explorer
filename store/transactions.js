import Vue from 'vue'
import axios from 'axios'
import { wrapActionsWithResolvedNode } from './utils'

export const state = () => ({
  transactions: {}
})

export const mutations = {
  /**
   * setTransaction object
   * @param {Object} state
   * @param {Object} transaction
   */
  setTransaction (state, transaction) {
    Vue.set(state.transactions, transaction.hash, transaction)
  }
}

export const actions = wrapActionsWithResolvedNode({
  /**
   *
   * @param state
   * @param commit
   * @param {Object} rootGetters
   * @param hash
   * @return {Promise<*>}
   */
  async getTxByHash ({ state, commit, rootGetters: { node } }, hash) {
    if (state.transactions[hash]) return state.transactions[hash]

    const transaction = await node.tx(hash, true)
    commit('setTransaction', transaction)

    return transaction
  },
  async getTxByGeneration ({ rootState, commit, rootGetters: { node } }, { start, end }) {
    const listTxRequest = await axios.get(`${rootState.nodeUrl}/middleware/transactions/interval/${start}/${end}`)
    return listTxRequest.data.transactions
  }
})
