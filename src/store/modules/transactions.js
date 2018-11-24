import Vue from 'vue'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'

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

  actions: {
    /**
     *
     * @param state
     * @param commit
     * @param dispatch
     * @param hash
     * @return {Promise<*>}
     */
    async getTxByHash ({ state, commit, dispatch }, hash) {
      if (state.transactions[hash]) return state.transactions[hash]

      const client = await EpochChain({
        url: this.state.epochUrl
      })
      const transaction = await client.api.getTransactionByHash(hash)

      commit('setTransaction', transaction)

      return transaction
    }
  }
}
