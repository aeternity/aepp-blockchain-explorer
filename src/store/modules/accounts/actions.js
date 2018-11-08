import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'

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
    const client = await EpochChain({
      url: this.state.epochUrl
    })

    let balance = 0

    try {
      balance = await client.balance(address)
    } catch (e) {
      balance = 0
    }

    const account = { address, balance }

    if (isEqual(state.accounts[address], account)) return account

    commit('setAccount', account)

    return account
  },

  async name ({ state, commit, dispatch }, address) {
    if (!process.env.VUE_APP_MIDDLEWARE_URL) return

    if (!isEmpty(state.names[address]) && (Date.now() - state.names[address].ts < 10000)) return

    if (isEmpty(state.names[address])) commit('setName', { address, ts: Date.now(), name: null })

    const { name } = await fetch(`${process.env.VUE_APP_MIDDLEWARE_URL}${address}`)

    const account = { address, ts: Date.now(), name }

    if (isEqual(state.names[address], account)) return account

    commit('setName', account)

    return account
  }
}
