import Vue from 'vue'
import Vuex from 'vuex'
import { createActionHelpers } from 'vuex-loading'
import modules from './modules'
import ae from './aeppsdk'
import VueWait from 'vue-wait'
Vue.use(VueWait)

Vue.use(Vuex)

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

const watchNetworkChange = store => {
  store.subscribe(async (mutation, state) => {
    if (mutation.type === 'changeNetwork') {
      store.dispatch('wait/start', 'changing network', { root: true })
      await store.dispatch('blocks/height')
      await store.dispatch('getNodeStatus')
      await store.dispatch('blocks/getLatestGenerations', 10)
      store.dispatch('wait/end', 'changing network', { root: true })
    }
  })
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    $nodeStatus: {},
    baseUrl: process.env.VUE_APP_EPOCH_URL
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
     * @param baseUrl
     */
    changeNetwork (state, baseUrl) {
      state.baseUrl = baseUrl
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

      const client = await ae(state.baseUrl)

      const [top, version] = await Promise.all([
        client.api.getTop(),
        client.api.getVersion()
      ])

      commit('setNodeStatus', { top, version })

      endLoading(dispatch, 'getNodeStatus')

      return { top, version }
    }
  },

  modules,
  plugins: [watchNetworkChange]
})

export default store
