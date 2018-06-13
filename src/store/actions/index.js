/**
 * Importing Libraries
 */
import times from 'lodash/times'
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

/**
 * Fetch JSON
 */
const fetchJson = async (...args) => {
  const response = await fetch(...args)
  return response.json()
}

/**
 * Exporting Actions
 */
export default {
  /**
   * Template
   * @param {Function} commit
   * @param {{}} state
   * @param {{}} payload
   * @return {*}
   */
  async getNodeStatus ({ state, commit, dispatch }) {
    /**
     * start load state
     */
    startLoading(dispatch, 'getNodeStatus')

    /**
     * Pull node state, version and peers
     */
    const [nodeTop, nodeVersion, peers] = await Promise.all([
      fetchJson(`${process.env.AETERNITY_EPOCH_API_URL}v2/top`),
      fetchJson(`${process.env.AETERNITY_EPOCH_API_URL}v2/version`),
      Promise.all(times(3, async (i) => {
        const [[top, address], version] = await Promise.all([
          fetch(`${process.env.AETERNITY_EPOCH_API_URL}peer/${i + 1}/v2/top`).then(async response => {
            return [await response.json(), response.headers.get('X-Upstream')]
          }),
          fetchJson(`${process.env.AETERNITY_EPOCH_API_URL}peer/${i + 1}/v2/version`)
        ])
        return { top, version, address }
      }))
    ])

    /**
     * Commit the update on the state
     */
    commit('setNodeStatus', { nodeTop, nodeVersion, peers })

    /**
     * End Loading State
     */
    endLoading(dispatch, 'getNodeStatus')

    /**
     * Return node status
     */
    return { nodeTop, nodeVersion, peers }
  }
}
