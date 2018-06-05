/**
 * Exporting Vuex Module
 */
export default {
  namespaced: true,
  state: {
    recent: []
  },
  mutations: {
    setRecent (state, recent) {
      return Object.assign(state, { recent })
    }
  }
}
