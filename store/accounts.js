import Vue from 'vue'
import { wrapActionsWithResolvedNode } from './utils'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import axios from 'axios'

export const state = () => ({
  accounts: {},
  names: {},
  accountTransactions: {}
})

export const getters = {
  /**
   * getAccount based on the address
   * @param {Object} state
   * @return {Function}
   */
  getAccount: function (state) {
    return function (address) {
      return state.accounts[address] && state.accounts[address]
    }
  },

  /**
   * getName based on the address
   * @param {Object} state
   * @return {Function}
   */
  getName: function (state) {
    return function (address) {
      return state.names[address] && state.names[address]
    }
  }
}

export const mutations = {
  /**
   * setAccount
   * @param {Object} state
   * @param {Object} payload
   */
  setAccount (state, payload) {
    Vue.set(state.accounts, payload.address, payload)
  },

  /**
   * setTransactions
   * @param {Object} state
   * @param {Object} payload
   */
  setTransactions (state, payload) {
    Vue.set(state.accountTransactions, payload.address, payload.transactions)
  },

  /**
   * setName
   * @param {Object} state
   * @param {Object} payload
   */
  setName (state, payload) {
    Vue.set(state.names, payload.address, payload)
  }
}

export const actions = wrapActionsWithResolvedNode({
  /**
   * get the account details based on an address
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} address
   * @return {*}
   */
  async get ({ state, rootGetters: { node }, commit }, address) {
    let balance = 0
    let numTransactions = 0
    try {
      balance = await node.balance(address, { format: false })
      const resp = await axios.get(process.env.NUXT_APP_NODE_URL + 'middleware/transactions/account/' + address + '/count')
      numTransactions = resp.data.count
    } catch (e) {
      balance = 0
      numTransactions = 0
      throw new Error(e)
    }
    const account = { address, balance, numTransactions }
    commit('setAccount', account)
    return account
  },

  async getTransactions ({ state, rootGetters: { node }, commit }, { address, transactionsToGet, increaseBy = 10 }) {
    const page = typeof transactionsToGet === 'undefined' ? 1 : Math.ceil(transactionsToGet / increaseBy)
    let transactions = state.accountTransactions[address] ? state.accountTransactions[address] : []
    try {
      const resp = await axios.get(state.nodeUrl + 'middleware/transactions/account/' + address + '?limit=' + increaseBy + '&page=' + page)
      transactions = transactions.concat(camelcaseKeysDeep(resp.data.transactions))
    } catch (e) {
      throw new Error(e)
    }
    const account = { address, transactions }
    commit('setTransactions', { address, transactions })
    return account
  },

  async name ({ state, commit }, address) {
    if (!process.env.NUXT_APP_MIDDLEWARE_URL) return
    if (state.names[address].length !== 0 && (Date.now() - state.names[address].ts < 10000)) return
    if (state.names[address].length === 0) commit('setName', { address, ts: Date.now(), name: null })
    const { name } = await axios.get(`${process.env.NUXT_APP_MIDDLEWARE_URL}${address}`).data
    const account = { address, ts: Date.now(), name }
    commit('setName', account)
    return account
  }
})
