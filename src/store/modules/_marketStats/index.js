export default {
  namespaced: true,
  state: {
    priceChf: null,
    marketCapChf: null,
    priceBtc: null
  },
  mutations: {
    setMarketStats (state, stats) {
      Object.assign(state, stats)
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
       * Pulling market stats
       * @type {Response}
       */
      const marketCHF = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=aeternity&vs_currencies=chf&include_market_cap=true')
      const marketBTC = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=aeternity&vs_currencies=btc&include_market_cap=true')
      const { aeternity: aeCHF } = await marketCHF.json()
      const { aeternity: aeBTC } = await marketBTC.json()

      /**
       * Renaming variables
       */
      const {
        chf_market_cap: marketCapChf,
        chf: priceChf
      } = aeCHF

      const {
        btc: priceBtc
      } = aeBTC

      /**
       * committing to the state
       */
      return commit('setMarketStats', { priceBtc, marketCapChf, priceChf })
    }
  }
}
