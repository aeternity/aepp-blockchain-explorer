import Vue from 'vue'

export default {
  /**
   * setAccount
   * @param {Object} state
   * @param {Object} payload
   * @return {Object}
   */
  setAccount: function (state, payload) {
    return Vue.set(state.accounts, payload.address, payload)
  },

  /**
   * setName
   * @param {Object} state
   * @param {Object} payload
   * @return {*}
   */
  setName: function (state, payload) {
    return Vue.set(state.names, payload.address, payload)
  }
}
