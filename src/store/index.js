import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import NodeChain from '@aeternity/aepp-sdk/es/chain/node'
import { wrapActionsWithResolvedEpoch } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL,
    error: ''
  },

  getters: {
    epochPromise ({ epochUrl }) {
      return NodeChain({
        url: epochUrl,
        internalUrl: epochUrl,
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
     * @param epochUrl
     */
    changeNetworkUrl (state, epochUrl) {
      state.epochUrl = epochUrl
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

  actions: wrapActionsWithResolvedEpoch({
    /**
     * getNodeStatus
     * @param {Object} rootGetters
     * @param {Function} commit
     * @return {Object}
     */
    async getNodeStatus ({ rootGetters: { epoch }, commit }) {
      try {
        const [top, version] = await Promise.all([
          epoch.api.getCurrentGeneration(),
          epoch.api.getStatus()
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
