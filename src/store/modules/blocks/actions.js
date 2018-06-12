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
    startLoading(dispatch, 'blocks/height')

    const client = await ae
    const height = await client.height()

    if (height === state.height) {
      endLoading(dispatch, 'blocks/height')
      return state.height
    }

    commit('setHeight', height)
    endLoading(dispatch, 'blocks/height')

    return height
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
    startLoading(dispatch, 'blocks/getBlockFromHash')

    const client = await ae
    const block = await client.api.getBlockByHash(hash, { txEncoding: 'json' })

    if (isEqual(state.block, block)) {
      endLoading(dispatch, 'blocks/getBlockFromHash')
      return state.block
    }

    commit('setBlock', block)
    endLoading(dispatch, 'blocks/getBlockFromHash')

    return block
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
    startLoading(dispatch, 'blocks/getBlockFromHeight')

    const client = await ae
    const block = await client.api.getBlockByHeight(height, { txEncoding: 'json' })

    if (isEqual(state.block, block)) {
      endLoading(dispatch, 'blocks/getBlockFromHeight')
      return state.block
    }

    commit('setBlock', block)
    endLoading(dispatch, 'blocks/getBlockFromHeight')

    return block
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
    startLoading(dispatch, 'blocks/getLatestBlocks')

    await dispatch('height')
    const blocks = await Promise.all(
      times(size, (index) => dispatch('getBlockFromHeight', state.height - index))
    )

    if (!blocks.length) {
      endLoading(dispatch, 'blocks/getLatestBlocks')
      return state.blocks
    }

    commit('setBlocks', blocks)
    endLoading(dispatch, 'blocks/getLatestBlocks')

    return blocks
  }
}
