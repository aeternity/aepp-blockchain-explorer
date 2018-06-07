/**
 * Importing API
 */
import { createActionHelpers } from 'vuex-loading'
import _ from 'lodash'
import Ae from '@aeternity/aepp-sdk'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

const BASE_URL = process.env.AETERNITY_EPOCH_API_URL
const NAME_LOOKUP_MIDDLEWARE_URL = process.env.NAME_LOOKUP_MIDDLEWARE_URL

const fetchJson = async (...args) => {
  const response = await fetch(...args)
  return response.json()
}

const ae = Ae.create(BASE_URL)

/**
 * Exporting Actions
 */
export default {
  /**
   * Template
   * @param {Function} commit
   * @param {{}} state
   * @param {{}} payload
   * @return {*}
   */
  template: function ({ commit, state }) {
    startLoading('template')
    endLoading('template')
    return commit('template', state)
  },

  // TODO: update
  async fetchHeight ({ state, commit }) {
    const client = await ae
    const height = await client.height()
    if (height === state.height) return
    commit('setHeight', height)
  },

  //async fetchMarketStats ({ state, commit }) {
  //  const body = (await fetchJson(
  //    'https://api.coinmarketcap.com/v1/ticker/aeternity/?convert=CHF'))[0]
  //  const marketStats = {
  //    marketCapChf: body.market_cap_chf,
  //    priceBtc: body.price_btc,
  //    priceChf: body.price_chf
  //  }
  //  if (_.isEqual(state.marketStats, marketStats)) return
  //  commit('setMarketStats', marketStats)
  //},

  async fetchAccount ({ state, commit }, address) {
    const client = await ae
    const [{ balance }, { transactions }] = await Promise.all([
      await client.api.getAccountBalance(address),
      await client.api.getAccountTransactions(address)
    ])
    const account = { address, balance, transactions }
    if (_.isEqual(state.accounts[address], account)) return
    commit('setAccount', account)
  },

  async fetchAccountName ({ state, commit }, address) {
    if (!NAME_LOOKUP_MIDDLEWARE_URL) return
    if (state.accountNames[address]) {
      const diff = new Date().getTime() - state.accountNames[address].ts
      if (diff < 10000) return
    }
    if (!state.accountNames[address]) {
      commit('setAccountName', {
        address: address,
        name: null,
        ts: new Date().getTime()
      })
    }
    const {name} = await fetchJson(`${NAME_LOOKUP_MIDDLEWARE_URL}${address}`)
    const account = {
      address: address,
      name: name,
      ts: new Date().getTime()
    }
    if (_.isEqual(state.accountNames[address], account)) return
    commit('setAccountName', account)
  },

  async fetchNodeStatus ({ state, commit }) {
    const [nodeTop, nodeVersion, peers] = await Promise.all([
      fetchJson(`${BASE_URL}v2/top`),
      fetchJson(`${BASE_URL}v2/version`),
      Promise.all(_.times(3, async (i) => {
        const [[top, address], version] = await Promise.all([
          fetch(`${BASE_URL}peer/${i + 1}/v2/top`).then(async response => {
            return [await response.json(), response.headers.get('X-Upstream')]
          }),
          fetchJson(`${BASE_URL}peer/${i + 1}/v2/version`)
        ])
        return { top, version, address }
      }))
    ])
    commit('setNodeStatus', { nodeTop, nodeVersion, peers })
  },

  async loadBlock ({ state, commit }, { hash, height }) {
    if (state.blocks[hash || height]) return
    const query = `${hash ? 'hash' : 'height'}/${hash || height}`
    const block = await fetchJson(`${BASE_URL}v2/block/${query}?tx_encoding=json`)

    commit('setBlock', {
      ...block,
      minedBy: block.miner
    })
  },

  async loadLastBlocks ({ state, dispatch }, numberOfBlocks) {
    await dispatch('fetchHeight')
    for (let i = 0; i < numberOfBlocks; i++) {
      dispatch('loadBlock', { height: state.height - i })
    }
  },

  async loadTx ({ state, commit }, hash) {
    if (state.txs[hash]) return
    const query = `${hash}`
    const tx = await fetchJson(`${BASE_URL}v2/tx/${query}?tx_encoding=json`)
    commit('setTx', tx)
  }
}
