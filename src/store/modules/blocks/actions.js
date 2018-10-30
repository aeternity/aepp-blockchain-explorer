import times from 'lodash/times'
import isEqual from 'lodash/isEqual'
import { wrapActionsWithResolvedEpoch } from '../../utils'

/**
 * @param height
 * @param epoch
 * @returns {Promise<*>}
 */
async function getGenerationFromHeightWrapper (height, epoch) {
  const generation = await epoch.api.getGenerationByHeight(height)
  const microBlocksHashes = generation.microBlocks
  generation.microBlocksDetailed = await Promise.all(
    microBlocksHashes.map(
      async (hash) => {
        let microBlock = await epoch.api.getMicroBlockHeaderByHash(hash)
        microBlock.transactions = (await epoch.api.getMicroBlockTransactionsByHash(hash)).transactions
        return microBlock
      }
    )
  )
  generation.numTransactions = generation.microBlocksDetailed.reduce(
    (accumulator, currentValue) => accumulator + currentValue.transactions.length, 0
  )
  return generation
}

export default wrapActionsWithResolvedEpoch({
  /**
   * height fetches the block-height
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @return {Object}
   */
  async height ({ state, rootGetters: { epoch }, commit }) {
    const height = await epoch.height()

    if (height === state.height) {
      return state.height
    }

    commit('setHeight', height)

    return height
  },

  /**
   * @param state
   * @param {Object} rootGetters
   * @param commit
   * @param hash
   * @returns {Promise<*>}
   */
  async getGenerationFromHash ({ state, rootGetters: { epoch }, commit }, hash) {
    const generation = await epoch.api.getGenerationByHash(hash)
    const microBlocksHashes = generation.microBlocks
    generation.microBlocksDetailed = await Promise.all(
      microBlocksHashes.map(
        async (hash) => {
          let microBlock = await epoch.api.getMicroBlockHeaderByHash(hash)
          microBlock.transactions = (await epoch.api.getMicroBlockTransactionsByHash(hash)).transactions
          return microBlock
        }
      )
    )
    generation.numTransactions = generation.microBlocksDetailed.reduce(
      (accumulator, currentValue) => accumulator + currentValue.transactions.length, 0
    )

    if (isEqual(state.generation, generation)) {
      return state.generation
    }

    commit('setGeneration', generation)
    return generation
  },

  /**
   * getBlockFromHash fetches the block from the blockchain
   * from a single hash argument
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} hash
   * @return {*}
   */
  async getBlockFromHash ({ state, rootGetters: { epoch }, commit }, hash) {
    const isKeyBlock = hash.substr(0, 2) === 'kh'
    var block
    if (isKeyBlock) {
      block = await epoch.api.getKeyBlockByHash(hash)
    } else {
      block = await epoch.api.getMicroBlockHeaderByHash(hash)
      block.transactions = (await epoch.api.getMicroBlockTransactionsByHash(hash)).transactions
    }

    if (isEqual(state.block, block)) {
      return state.block
    }

    commit('setBlock', block)

    return block
  },

  /**
   * Fetches the head of the blockchain
   * @param {Object} store
   * @param {Object} store.state
   * @param {Object} store.rootGetters
   * @param {Function} store.commit
   * @param {String} height
   * @return {*}
   */
  async getGenerationFromHeight ({ state, rootGetters: { epoch }, commit }, height) {
    const generation = await getGenerationFromHeightWrapper(height, epoch)

    if (isEqual(state.generation, generation)) {
      return state.generation
    }

    commit('setGeneration', generation)

    return generation
  },

  /**
   * Fetches the head of the blockchain
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} height
   * @return {*}
   */
  async getBlockFromHeight ({ state, rootGetters: { epoch }, commit }, height) {
    const block = await epoch.api.getKeyBlockByHeight(height)

    if (isEqual(state.block, block)) {
      return state.block
    }

    commit('setBlock', block)

    return block
  },

  /**
   * getLatestBlocks pulls a list of blocks based on the
   * size of the payload
   * @param {Object} state
   * @param {Function} commit
   * @param {Function} rootGetters
   * @param {Function} dispatch
   * @param {Number} size
   * @return {*}
   */
  async getLatestBlocks ({ state, rootGetters: { epoch }, commit, dispatch }, size) {
    await dispatch('height')
    const blocks = await Promise.all(
      times(size, (index) => epoch
        .api
        .getKeyBlockByHeight(state.height - index))
    )

    if (!blocks.length) {
      return state.blocks
    }

    commit('setBlocks', blocks)

    return blocks
  },

  /**
   * getLatestBlocks pulls a list of blocks based on the
   * size of the payload
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Number} size
   * @return {*}
   */
  async getLatestGenerations ({ state, rootGetters: { epoch }, commit, dispatch }, size) {
    await dispatch('height')
    const generations = await Promise.all(
      times(size, (index) => getGenerationFromHeightWrapper(state.height - index, epoch))
    )

    if (!generations.length) {
      return state.generations
    }
    commit('setGenerations', generations)
    return generations
  },

  /**
   * addBlocksByHeightAndSize pulls a list of blocks based on the
   * specified height and size of the pull requested
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {Number} height
   * @param {Number} size
   * @return {*}
   */
  async addBlocksByHeightAndSize ({ state, rootGetters: { epoch }, commit }, {height, size}) {
    const blocks = await Promise.all(
      times(size, (index) => epoch
        .api
        .getKeyBlockByHeight(height - index))
    )

    if (!blocks.length) {
      return state.blocks
    }

    commit('addBlocks', blocks)

    return blocks
  }
})
