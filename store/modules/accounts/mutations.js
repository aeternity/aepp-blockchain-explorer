import Vue from 'vue'

export default {
  /**
   * setAccount
   * @param {Object} state
   * @param {Object} payload
   */
  setAccount (state, payload) {
    Vue.set(state.accounts, payload.address, payload)
  },

  /**
   * setName
   * @param {Object} state
   * @param {Object} payload
   */
  setName (state, payload) {
    Vue.set(state.names, payload.address, payload)
  }
}
