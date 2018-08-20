import ae from '../aeppsdk'
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

export default {
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
}
