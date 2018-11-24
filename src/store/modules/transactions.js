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
    },

    /***
     * resetAll reset the state of 'transactions' module
     * @param {Object} state
     */
    resetState (state) {
      Vue.set(state, 'transactions', {})
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

      const transaction = await epoch.api.getTransactionByHash(hash)

      commit('setTransaction', transaction)

      return transaction
    }
  })
}
