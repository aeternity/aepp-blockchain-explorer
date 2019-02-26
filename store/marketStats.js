export const state = () => ({
  priceChf: null,
  marketCapChf: null,
  priceBtc: null
})

export const mutations = {
  setMarketStats (state, stats) {
    Object.assign(state, stats)
  }
}

export const actions = {
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
    const market = await this.$axios.$get('https://api.coinmarketcap.com/v1/ticker/aeternity/?convert=CHF')

    /**
     * Renaming variables
     */
    const {
      price_btc: priceBtc,
      market_cap_chf: marketCapChf,
      price_chf: priceChf
    } = (await market.json())[0]

    /**
     * committing to the state
     */
    return commit('setMarketStats', { priceBtc, marketCapChf, priceChf })
  }
}
