/**
 * Importing Libraries
 */
import times from 'lodash/times'
import isEqual from 'lodash/isEqual'
import ae from '../../aeppsdk'
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
   * height fetches the block-height
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
     * Await for the SDK promise
     */
    const client = await ae

    /**
     * Fetch the height of the block
     */
    const height = await client.height()

    /**
     * Don't change the state if has similar state
     */
    if (height === state.height) return endLoading(dispatch, 'blocks/height')

    /**
     * Commit the updates
     */
    commit('setHeight', height)

    /**
     * End vuex-loading
     */
    return endLoading(dispatch, 'blocks/height')
  },

  /**
   * getBlockFromHash fetches the block from the blockchain
   * from a single hash argument
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} hash
   * @return {*}
   */
  async getBlockFromHash ({ state, commit, dispatch }, hash) {
    /**
     * Start vuex-loading
     */
    startLoading(dispatch, 'blocks/getBlockFromHash')

    /**
     * Await for the SDK promise
     */
    const client = await ae

    /**
     * Define the block constant holder
     */
    const block = await client.api.getBlockByHash(hash, { txEncoding: 'json' })

    /**
     * Check if the pulled block is equal to the current block
     * if it is, stop the loading and don't commit
     */
    if (isEqual(state.block, block)) return endLoading(dispatch, 'blocks/getBlockFromHash')

    /**
     * Commit the block to the state
     */
    commit('setBlock', block)

    /**
     * End vuex-loading
     */
    return endLoading(dispatch, 'blocks/getBlockFromHash')
  },

  /**
   * Fetches the head of the blockchain
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} height
   * @return {*}
   */
  async getBlockFromHeight ({ state, commit, dispatch }, height) {
    /**
     * Start vuex-loading
     */
    startLoading(dispatch, 'blocks/getBlockFromHeight')

    /**
     * Await for the SDK promise
     */
    const client = await ae

    /**
     * Define the block constant holder
     */
    const block = await client.api.getBlockByHeight(height, { txEncoding: 'json' })

    /**
     * Check if the pulled block is equal to the current block
     * if it is, stop the loading and don't commit
     */
    if (isEqual(state.block, block)) return endLoading(dispatch, 'blocks/getBlockFromHeight')

    /**
     * Commit the block to the state
     */
    commit('setBlock', block)

    /**
     * End vuex-loading
     */
    return endLoading(dispatch, 'blocks/getBlockFromHeight')
  },

  /**
   * getLatestBlocks pulls a list of blocks based on the
   * size of the payload
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Number} size
   * @return {*}
   */
  async getLatestBlocks ({ state, commit, dispatch }, size) {
    /**
     * Start vuex-loading
     */
    startLoading(dispatch, 'blocks/getLatestBlocks')

    /**
     * Get latest block-height
     */
    await dispatch('height')

    /**
     * Pull all blocks through a promise.all/await
     */
    const blocks = await Promise.all(times(size, (index) => dispatch('getBlockFromHeight', state.height - index)))

    /**
     * Check if the array is not empty, if it's empty
     * then don't modify the state
     */
    if (!blocks.length) return endLoading(dispatch, 'blocks/getLatestBlocks')

    /**
     * Commit the block to the state
     */
    commit('setBlocks', blocks)

    /**
     * End vuex-loading
     */
    return endLoading(dispatch, 'blocks/getLatestBlocks')
  }
}
