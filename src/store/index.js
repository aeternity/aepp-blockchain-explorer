import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL,
    error: ''
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
    catchError(state, error) {
      state.error = error
    },
    /**
     * clearError
     * @param state
     */
    clearError(state) {
      state.error = ''
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
      try {
        const client = await EpochChain({
          url: this.state.epochUrl
        })
        const [top, version] = await Promise.all([
          client.api.getCurrentGeneration(),
          client.api.getStatus()
        ])

        commit('setNodeStatus', { top, version })

        return { top, version }


      } catch (e) {
        commit('catchError', 'Eror', {root: true})
      }

    }

  },

  modules
})

export default store
