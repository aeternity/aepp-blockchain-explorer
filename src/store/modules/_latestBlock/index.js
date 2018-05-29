/**
 * Exporting Vuex Module
 */
export default {
  namespaced: true,
  state: {
    block: null
  },
  mutations: {
    setBlock (state, block) {
      return Object.assign(state, { block })
    }
  }
}
