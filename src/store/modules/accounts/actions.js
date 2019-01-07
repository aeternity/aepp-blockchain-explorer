import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { wrapActionsWithResolvedEpoch } from '../../utils'

export default wrapActionsWithResolvedEpoch({
  /**
   * get the account details based on an address
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} address
   * @return {*}
   */
  async get ({ state, rootGetters: { epoch }, commit }, address) {
    let balance = 0

    try {
      balance = await epoch.balance(address, { format: false })
    } catch (e) {
      balance = 0
      throw new Error(e)
    }

    const account = { address, balance }

    if (isEqual(state.accounts[address], account)) return account

    commit('setAccount', account)

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
