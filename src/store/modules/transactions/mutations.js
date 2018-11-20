import Vue from 'vue'

export default {
  /**
   * setTransaction object
   * @param {Object} state
   * @param {Object} transaction
   */
  setTransaction (state, transaction) {
    Vue.set(state.transactions, transaction.hash, transaction)
  },

  /***
   * resetAll reset the state of 'transactions' module
   * @param {Object} state
   */
  resetState (state) {
    Vue.set(state, 'transactions', {})
  }
}
