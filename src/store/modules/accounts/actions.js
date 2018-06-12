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
    startLoading(dispatch, 'accounts/get')

    const client = await ae

    const [{ balance }, { transactions }] = await Promise.all([
      await client.api.getAccountBalance(address),
      await client.api.getAccountTransactions(address)
    ])

    const account = { address, balance, transactions }

    if (isEqual(state.account, account)) return

    commit('setAccount', account)

    return endLoading(dispatch, 'accounts/get')
  },

  async name ({ state, commit, dispatch }, address) {
    startLoading(dispatch, 'accounts/name')

    if (!process.env.NAME_LOOKUP_MIDDLEWARE_URL) return
    if (!isEmpty(state.name)) if (new Date().getTime() - state.name.ts < 10000) return
    if (isEmpty(state.name)) commit('setAccountName', { address, ts: new Date().getTime(), name: null })

    const { name } = await fetch(`${process.env.NAME_LOOKUP_MIDDLEWARE_URL}${address}`)
    const account = { address, name, ts: new Date().getTime() }

    if (isEqual(state.name, account)) return

    commit('setName', account)

    return endLoading(dispatch, 'accounts/name')
  }
}
