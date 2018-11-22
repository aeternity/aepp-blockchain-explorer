import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'
import { wrapActionsWithResolvedEpoch } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL
  },

  getters: {
    epochPromise ({ epochUrl }) {
      return EpochChain({
        url: epochUrl
      })
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
      const [top, version] = await Promise.all([
        epoch.api.getCurrentGeneration(),
        epoch.api.getStatus()
      ])

      commit('setNodeStatus', { top, version })

      return { top, version }
    }
  }),

  modules
})

export default store
