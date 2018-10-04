import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import ae from './aeppsdk'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    epochUrl: process.env.VUE_APP_EPOCH_URL
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

  actions: {
    /**
     * getNodeStatus
     * @param {Object} state
     * @param {Function} commit
     * @param {dispatch} dispatch
     * @return {Object}
     */
    async getNodeStatus ({ state, commit, dispatch }) {
      const client = await ae(state.epochUrl)

      const [top, version] = await Promise.all([
        client.api.getTop(),
        client.api.getVersion()
      ])

      commit('setNodeStatus', { top, version })

      return { top, version }
    }
  },

  modules
})

export default store
