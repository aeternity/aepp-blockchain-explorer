import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'
import createPersistedState from 'vuex-persistedstate'
import { wrapActionsWithResolvedEpoch } from './utils'
import networks from '../lib/networks'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['epochUrl', 'customNetworks']
    })
  ],
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL || networks[0].url,
    customNetworks: []
  },

  getters: {
    networks ({ customNetworks }) {
      return [...networks, ...customNetworks.map(network => ({ ...network, isCustom: true }))]
    },
    currentNetwork ({ epochUrl }, { networks }) {
      return networks.find(({ url }) => url === epochUrl) || {
        name: epochUrl,
        url: epochUrl
      }
    },
    epochPromise (state, { currentNetwork }) {
      return EpochChain({
        url: currentNetwork.url,
        internalUrl: currentNetwork.url
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
    },
    /**
     * addNetwork
     * @param state
     * @param {Object} network
     */
    addNetwork (state, network) {
      state.customNetworks.push(network)
    },
    /**
     * removeNetwork
     * @param state
     * @param index
     */
    removeNetwork (state, index) {
      state.customNetworks.splice(index - networks.length, 1)
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
