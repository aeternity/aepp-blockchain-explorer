/**
 * Importing
 */
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

/**
 * Exporting Vuex Module
 */
export default {
  namespaced: true,
  state: {
    priceChf: null,
    marketCapChf: null,
    priceBtc: null
  },
  mutations: {
    setMarketStats (state, stats) {
      return Object.assign(state, stats)
    }
  },
  actions: {
    /**
     * get market stats of the overall blockchain
     * @param {Object} state
     * @param {Function} commit
     * @param {Function} dispatch
     * @return {Object}
     */
    async get ({ state, commit, dispatch }) {
      /**
       * Start vuex-loading
       */
      startLoading(dispatch, '_marketStats/get')

      /**
       * Pulling market stats
       * @type {Response}
       */
      const market = await fetch('https://api.coinmarketcap.com/v1/ticker/aeternity/?convert=CHF')

      /**
       * Renaming variables
       */
      const {
        price_btc: priceBtc,
        market_cap_chf: marketCapChf,
        price_chf: priceChf
      } = (await market.json())[0]

      /**
       * end vuex-loading
       */
      endLoading(dispatch, '_marketStats/get')

      /**
       * committing to the state
       */
      return commit('setMarketStats', { priceBtc, marketCapChf, priceChf })
    }
  }
}
