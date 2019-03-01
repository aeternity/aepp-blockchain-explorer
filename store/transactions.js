import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  transactions: {}
})

export const mutations = {
  setTransactions (state, transactions) {
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      if (!state.transactions.hasOwnProperty(transaction.hash)) {
        Vue.set(state.transactions, transaction.hash, transaction)
      }
    }
  }
}

export const actions = {
  getLatestTransactions: async function ({ state, rootState: { nodeUrl, height }, commit, dispatch }, payload) {
    const page = payload.page
    const maxTransactions = payload.numTransactions
    try {
      const transactions = await axios.get(nodeUrl + 'middleware/transactions/interval/1/' + height.toString() + '?limit=' + maxTransactions + '&page=' + page)
      commit('setTransactions', transactions.data.transactions)
      return transactions.data.transactions
    } catch (e) {
      console.log(e)
      commit('catchError', 'Error', { root: true })
    }
  },
  nuxtServerInit ({ dispatch }, context) {
    return (
      dispatch('getLatestTransactions', { 'page': 1, 'numTransactions': 10 })
    )
  }
}
