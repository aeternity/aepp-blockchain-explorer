import Vue from 'vue'
import Vuex from 'vuex'
import { createActionHelpers } from 'vuex-loading'
import modules from './modules'
import ae from './aeppsdk'

Vue.use(Vuex)

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    env: process.env
  },

  mutations: {
    /**
     * setNodeStatus
     * @param {Object} state
     * @param $nodeStatus
     */
    setNodeStatus (state, $nodeStatus) {
      return Object.assign(state, { $nodeStatus })
    }
  },

  actions: {
    /**
     * getNodeStatus
     * @param {Object} state
     * @param {Function} commit
     * @param {dispatch} dispatch
     * @return {Object}
     */
    async getNodeStatus ({ state, commit, dispatch }) {
      startLoading(dispatch, 'getNodeStatus')

      const client = await ae

      const [top, version] = await Promise.all([
        client.api.getTop(),
        client.api.getVersion()
      ])

      commit('setNodeStatus', { top, version })

      endLoading(dispatch, 'getNodeStatus')

      return { top, version }
    }
  },

  modules
})
