import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'
import createPersistedState from 'vuex-persistedstate'
import { wrapActionsWithResolvedEpoch } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['localNetworkList']
    })
  ],
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL,
    error: '',
    isNetworkSwitcher: false,
    isConnectForm: false,
    loading: false,
    networkList: [
      {
        name: 'Roma',
        url: 'https://sdk-mainnet.aepps.com/',
        isLocal: false
      },
      {
        name: 'sdk-edgenet.aepps',
        url: 'https://sdk-edgenet.aepps.com/',
        isLocal: false
      },
      {
        name: 'sdk-testnet.aepps',
        url: 'https://sdk-testnet.aepps.com/',
        isLocal: false
      }
    ],
    localNetworkList: []
  },

  getters: {
    epochPromise ({ epochUrl }) {
      return EpochChain({
        url: epochUrl,
        internalUrl: epochUrl
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
     * showNetworkList
     * @param state
     */
    showNetworkList (state) {
      state.isNetworkSwitcher = true
    },
    /**
     * closeNetworkList
     * @param state
     */
    closeNetworkList (state) {
      state.isNetworkSwitcher = false
    },
    /**
     * showForm
     * @param state
     */
    showForm (state) {
      state.isConnectForm = true
    },
    /**
     * closeForm
     * @param state
     */
    closeForm (state) {
      state.isConnectForm = false
    },
    /**
     * showLoading
     * @param state
     */
    showLoading (state) {
      state.loading = true
    },
    /**
     * closeLoading
     * @param state
     */
    closeLoading (state) {
      state.loading = false
    },
    /**
     * updateNetwork
     * @param state
     * @param {Object} network
     */
    updateNetwork (state, network) {
      state.localNetworkList.push(network)
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

        commit('setNodeStatus', { top, version })

        return { top, version }
      } catch (e) {
        commit('catchError', 'Error', {root: true})
      }
    },
    /**
     * changeNetwork
     * @param {Object} state
     * @param {Function} commit
     * @param {Function} dispatch
     * @param {String} url
     */
    async changeNetwork ({state, commit, dispatch}, url) {
      let currentUrl = state.epochUrl
      commit('showLoading')
      commit('changeNetworkUrl', url)
      commit('blocks/resetState')
      commit('accounts/resetState')
      commit('transactions/resetState')

      try {
        await Promise.all([
          dispatch('blocks/height'),
          dispatch('getNodeStatus')
        ])

        dispatch('blocks/getLatestGenerations', 10)

        commit('closeLoading')
        commit('clearError')
      } catch (err) {
        commit('closeLoading')
        commit('changeNetworkUrl', currentUrl)
        commit('catchError', err)
      }
    }
  }),

  modules
})

export default store
