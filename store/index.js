// import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'
import { wrapActionsWithResolvedEpoch } from './utils'

export const state = () => ({
  $nodeStatus: {},
  epochUrl: process.env.VUE_APP_EPOCH_URL,
  error: ''
})

// export const getters = {
//   epochPromise ({ epochUrl }) {
//     return EpochChain({
//       url: epochUrl,
//       internalUrl: epochUrl
//     })
//   },
//   isConnected (state) {
//     return state.$nodeStatus.connected
//   }
// }

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
}

export const actions = wrapActionsWithResolvedEpoch({
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
})
