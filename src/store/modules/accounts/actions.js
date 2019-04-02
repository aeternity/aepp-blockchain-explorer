import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { wrapActionsWithResolvedNode } from '../../utils'
import camelcaseKeysDeep from 'camelcase-keys-deep'

export default wrapActionsWithResolvedNode({
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
      const resp = await fetch(process.env.VUE_APP_NODE_URL + 'middleware/transactions/account/' + address + '/count')
      numTransactions = (await resp.json())['count']
    } catch (e) {
      balance = 0
      numTransactions = 0
    }
    const account = { address, balance, numTransactions }
    if (isEqual(state.accounts[address], account)) return account
    commit('setAccount', account)
    return account
  },

  async getTransactions ({ state, rootGetters: { node }, commit }, { address, transactionsToGet, increaseBy = 10 }) {
    const page = typeof transactionsToGet === 'undefined' ? 1 : Math.ceil(transactionsToGet / increaseBy)
    let transactions = state.accountTransactions[address] ? state.accountTransactions[address] : []
    try {
      const resp = await fetch(process.env.VUE_APP_NODE_URL + 'middleware/transactions/account/' + address + '?limit=' + increaseBy + '&page=' + page)
      transactions = transactions.concat(camelcaseKeysDeep((await resp.json()).transactions))
    } catch (e) {
      throw new Error(e)
    }
    const account = { address, transactions }
    const stateTransactions = state.accounts[address] ? state.accounts[address].transactions : []
    if (isEqual(stateTransactions, transactions)) return (state.accounts[address])
    commit('setTransactions', { address, transactions })
    return account
  },

  async name ({ state, commit }, address) {
    if (!process.env.VUE_APP_MIDDLEWARE_URL) return

    if (!isEmpty(state.names[address]) && (Date.now() - state.names[address].ts < 10000)) return

    if (isEmpty(state.names[address])) commit('setName', { address, ts: Date.now(), name: null })

    const { name } = await fetch(`${process.env.VUE_APP_MIDDLEWARE_URL}${address}`)

    const account = { address, ts: Date.now(), name }

    if (isEqual(state.names[address], account)) return account

    commit('setName', account)

    return account
  }
})
