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
    /**
     * start load state
     */
    startLoading(dispatch, 'accounts/get')

    /**
     * Await for the SDK promise
     */
    const client = await ae

    /**
     * Fetch account balance and transactions
     */
    const [{ balance }, { transactions }] = await Promise.all([
      await client.api.getAccountBalance(address),
      await client.api.getAccountTransactions(address)
    ])

    /**
     * Generate object with the account details
     */
    const account = { address, balance, transactions }

    /**
     * Check if the account is up to date
     */
    if (isEqual(state.account, account)) return

    /**
     * Update the state with new information
     */
    commit('setAccount', account)

    /**
     * End Loading State
     */
    return endLoading(dispatch, 'accounts/get')
  },

  /**
   * name pulls the name of a specific address
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} address
   * @return {*}
   */
  async name ({ state, commit, dispatch }, address) {
    /**
     * start load state
     */
    startLoading(dispatch, 'accounts/name')

    /**
     * Check if the name lookup middleware exists
     */
    if (!process.env.NAME_LOOKUP_MIDDLEWARE_URL) return

    /**
     * Check if the time elapsed since is less than 10000
     */
    if (!isEmpty(state.name)) if (new Date().getTime() - state.name.ts < 10000) return

    /**
     * If its an empty object, set the default data-set
     */
    if (isEmpty(state.name)) commit('setAccountName', { address, ts: new Date().getTime(), name: null })

    /**
     * Fetch the name of the address
     */
    const { name } = await fetch(`${process.env.NAME_LOOKUP_MIDDLEWARE_URL}${address}`)

    /**
     * Generate the account data
     */
    const account = { address, name, ts: new Date().getTime() }

    /**
     * Check if the data is the same
     */
    if (isEqual(state.name, account)) return

    /**
     * Update the state
     */
    commit('setName', account)

    /**
     * End Loading State
     */
    return endLoading(dispatch, 'accounts/name')
  }
}
