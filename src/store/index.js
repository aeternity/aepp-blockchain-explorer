import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import NodeChain from '@aeternity/aepp-sdk/es/chain/node'
import { wrapActionsWithResolvedNode } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    nodeUrl: process.env.VUE_APP_NODE_URL,
    error: ''
  },

  getters: {
    nodePromise ({ nodeUrl }) {
      return NodeChain({
        url: nodeUrl,
        internalUrl: nodeUrl,
        forceCompatibility: true
      })
    },
    isConnected (state) {
      return state.$nodeStatus.connected
    }
  },

  mutations: {
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
    }

  },

  actions: wrapActionsWithResolvedNode({
    /**
     * getNodeStatus
     * @param {Object} rootGetters
     * @param {Function} commit
     * @return {Object}
     */
    async getNodeStatus ({ rootGetters: { node }, commit }) {
      try {
        const [top, version] = await Promise.all([
          node.api.getCurrentGeneration(),
          node.api.getStatus()
        ])
        commit('setNodeStatus', { connected: true, top, version })
        return { connected: true, top, version }
      } catch (e) {
        commit('catchError', 'Error', { root: true })
      }
    }
  }),

  modules
})

export default store
