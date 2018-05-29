/**
 * Importing API
 */
import { createActionHelpers } from 'vuex-loading'

/**
 * Setting up start/end Loading helper methods
 */
const { startLoading, endLoading } = createActionHelpers({
  moduleName: 'loading'
})

/**
 * Exporting Actions
 */
export default {
  /**
   * height fetches the blockheight
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @return {Object}
   */
  async height ({ state, commit, dispatch }) {
    /**
     * Start vuex-loading
     */
    startLoading(dispatch, 'blocks/height')

    /**
     * Fetch the top block
     */
    const block = await fetch(`${process.env.AETERNITY_EPOCH_API_URL}v2/top`)

    /**
     * Get the hight of the response
     */
    const { height } = await block.json()

    /**
     * Start vuex-loading
     */
    endLoading(dispatch, 'blocks/height')

    /**
     * Commit the updates
     */
    return commit('setHeight', height)
  }
}
