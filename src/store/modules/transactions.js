import Vue from 'vue'
import { wrapActionsWithResolvedNode } from '../utils'

export default {
  namespaced: true,

  state: {
    transactions: {}
  },

  mutations: {
    /**
     * setTransaction object
     * @param {Object} state
     * @param {Object} transaction
     */
    setTransaction (state, transaction) {
      Vue.set(state.transactions, transaction.hash, transaction)
    }
  },
  actions: wrapActionsWithResolvedNode({
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
    async getTxByGeneration ({ state, commit, rootGetters: { node } }, { start, end }) {
      const listTxRequest = await fetch(`${process.env.VUE_APP_NODE_URL}middleware/transactions/interval/${start}/${end}`)
      const listTx = (await listTxRequest.json())
      return listTx.transactions
    }
  })
}
