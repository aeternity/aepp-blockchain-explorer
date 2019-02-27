import axios from 'axios'
console.log(process.env)
export const state = () => ({
  $nodeStatus: {},
  nodeUrl: process.env.NUXT_APP_NODE_URL,
  error: '',
  height: 0
})

export const getters = {
}

export const mutations = {
  /**
   * setNodeStatus
   * @param {Object} state
   * @param $nodeStatus
   */
  setNodeStatus (state, $nodeStatus) {
    Object.assign(state, { $nodeStatus })
  },
  /**
   * changeNetwork
   * @param state
   * @param nodeUrl
   */
  changeNetworkUrl (state, nodeUrl) {
    state.nodeUrl = nodeUrl
  },
  /**
   * catchError
   * @param state
   * @param error
   */
  catchError (state, error) {
    state.error = error
  },
  /**
   * clearError
   * @param state
   */
  clearError (state) {
    state.error = ''
  },
  /**
   * setHeight mutates the
   * state property height
   * @param {Object} state
   * @param {Number} height
   */
  setHeight (state, height) {
    Object.assign(state, { height })
  }
}

export const actions = {
  /**
   * getNodeStatus
   * @param {Object} rootGetters
   * @param {Function} commit
   * @return {Object}
   */
  async height ({ state, rootState: { nodeUrl }, commit }) {
    try {
      const { height } = await axios.get(nodeUrl + '/v2/key-blocks/current/height').data

      if (height === state.height) {
        return state.height
      }

      commit('setHeight', height)

      return height
    } catch (e) {
      commit('catchError', 'Error', { root: true })
    }
  },
  async nuxtServerInit ({ commit, dispatch }, { context }) {
    await dispatch('height')
    await Promise.all([
      dispatch('generations/nuxtServerInit', context),
      dispatch('transactions/nuxtServerInit', context)
    ])
  }
}
