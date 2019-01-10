import Vue from 'vue'
import { wrapActionsWithResolvedEpoch } from '../utils'

export default {
  namespaced: true,

  state: {
    transactions: {},
    txByGeneration: {}
  },

  mutations: {
    /**
     * setTransaction object
     * @param {Object} state
     * @param {Object} transaction
     */
    setTransaction (state, transaction) {
      Vue.set(state.transactions, transaction.hash, transaction)
    },
    batchTx (state, txList) {
      for (const tx of txList) {
        if (!state.transactions[tx.hash]) {
          Vue.set(state.transactions, tx.hash, tx)
        }
      }
    },
    setTxByGeneration (state, genList) {
      state.txByGeneration = genList
    }
  },
  actions: wrapActionsWithResolvedEpoch({
    /**
     *
     * @param state
     * @param commit
     * @param {Object} rootGetters
     * @param hash
     * @return {Promise<*>}
     */
    async getTxByHash ({ state, commit, rootGetters: { epoch } }, hash) {
      if (state.transactions[hash]) return state.transactions[hash]

      const transaction = await epoch.tx(hash, true)
      commit('setTransaction', transaction)

      return transaction
    },
    async getTxByGeneration ({ state, commit, rootGetters: { epoch } }, { start, end }) {
      const listTxRequest = await fetch(`http://explorer.newby.org:8000/middleware/transactions/interval/${start}/${end}`) // update url, use env
      let txByGeneration = state.txByGeneration
      const listTx = (await listTxRequest.json())
      commit('batchTx', listTx.transactions)
      for (const tx of listTx.transactions) {
        try {
          txByGeneration[tx.block_height].add(tx.hash)
        } catch (error) {
          txByGeneration[tx.block_height] = new Set()
        }
      }
      commit('setTxByGeneration', txByGeneration)
      return listTx.transactions
    }
  })
}
