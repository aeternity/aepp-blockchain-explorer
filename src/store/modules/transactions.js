import Vue from 'vue'
import { wrapActionsWithResolvedEpoch } from '../utils'

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
    }
  })
}
