/**
 * Importing Libraries
 */
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
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
   * get the account details based on an address
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} address
   * @return {*}
   */
  async get ({ state, commit, dispatch }, address) {
    // startLoading(dispatch, 'accounts/get')

    const client = await ae

    const [{ balance }, { transactions }] = await Promise.all([
      client.api.getAccountBalance(address),
      client.api.getAccountTransactions(address)
    ])

    const account = { address, balance, transactions }

    if (isEqual(state.accounts[address], account)) return

    commit('setAccount', account)

    // endLoading(dispatch, 'accounts/get')

    return account
  },

  async name ({ state, commit, dispatch }, address) {
    // startLoading(dispatch, 'accounts/name')

    if (!process.env.NAME_LOOKUP_MIDDLEWARE_URL) return

    if (!isEmpty(state.names[address]) && (Date.now() - state.names[address].ts < 10000)) return

    if (isEmpty(state.names[address])) commit('setName', { address, ts: Date.now(), name: null })

    const { name } = await fetch(`${process.env.NAME_LOOKUP_MIDDLEWARE_URL}${address}`)

    const account = { address, ts: Date.now(), name }

    if (isEqual(state.names[address], account)) return

    commit('setName', account)

    // endLoading(dispatch, 'accounts/name')

    return account
  }
}
