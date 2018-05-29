import Vue from 'vue'

/**
 * Exporting Mutations
 */
export default {
  /**
   * Template
   * @param {{}} state
   * @param {{}} payload
   * @return {Object}
   */
  template: function (state, payload) {
    return Object.assign(state, payload)
  },

  // TODO: update later
  setHeight (state, height) {
    state.height = height
  },
  setMarketStats (state, marketStats) {
    state.marketStats = marketStats
  },
  setBlock (state, block) {
    Vue.set(state.blocks, block.height, block)
    Vue.set(state.blocks, block.hash, block)
  },
  setAccount (state, account) {
    Vue.set(state.accounts, account.address, account)
  },
  setAccountName (state, account) {
    Vue.set(state.accountNames, account.address, account)
  },
  setNodeStatus (state, nodeStatus) {
    state.nodeStatus = nodeStatus
  },
  setTx (state, tx) {
    Vue.set(state.txs, tx.hash, tx)
  }
}
