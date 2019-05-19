import times from 'lodash/times'
import isEqual from 'lodash/isEqual'
import { wrapActionsWithResolvedNode } from '../../utils'

export default wrapActionsWithResolvedNode({
  /**
   * height fetches the block-height
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @return {Object}
   */
  async height ({ state, rootGetters: { node }, commit }) {
    try {
      const height = await node.height()

      if (height === state.height) {
        return state.height
      }

      commit('setHeight', height)

      return height
    } catch (e) {
      commit('catchError', 'Error', { root: true })
    }
  },

  /**
   * @param state
   * @param {Object} rootGetters
   * @param commit
   * @param hash
   * @returns {Promise<*>}
   */
  async getGenerationFromHash ({ state, rootGetters: { node }, commit }, hash) {
    if (state.hashToHeight[hash]) {
      return state.generations[state.hashToHeight[hash]]
    }
    const generation = await node.api.getGenerationByHash(hash)
    generation.numTransactions = 0
    const height = generation.keyBlock.height
    const resp = await fetch(process.env.VUE_APP_NODE_URL + 'middleware/transactions/interval/' + height + '/' + height)
    generation.numTransactions = (await resp.json())['transactions'].length
    if (isEqual(state.generation, generation)) {
      return state.generation
    }
    commit('setGenerations', generation)

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
  async getBlockFromHash ({ state, rootGetters: { node }, commit }, hash) {
    const block = await node.api.getMicroBlockHeaderByHash(hash)
    block.transactions = (await node.api.getMicroBlockTransactionsByHash(hash)).transactions

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
  async getGenerationFromHeight ({ state, rootGetters: { node }, commit }, height) {
    if (!(state.height === height || state.height - 1 === height) && state.generations[height]) {
      // last two generations are prone to change
      // return if generation to get is not last or second last, and already exist in memory
      return
    }
    const generation = await node.api.getGenerationByHeight(height)
    const resp = await fetch(process.env.VUE_APP_NODE_URL + 'middleware/transactions/interval/' + height + '/' + height)
    generation.numTransactions = (await resp.json())['transactions'].length
    if (isEqual(state.generation, generation)) {
      return state.generation
    }

    commit('setGenerations', generation)

    return generation
  },
  async getMicroBlocksByHeight ({ state, rootGetters: { node }, commit }, { height, numBlocks }) {
    numBlocks = numBlocks || Infinity
    let generation = state.generations[height]
    const blocksPresent = state.microBlocks[height] ? state.microBlocks[height].length : 0
    const numblocksToGet = Math.min(numBlocks, generation.microBlocks.length)
    const blocksToGet = (await Promise.all(
      generation.microBlocks.slice(blocksPresent, numblocksToGet).map(
        async (hash) => {
          let microBlock = await node.api.getMicroBlockHeaderByHash(hash)
          microBlock.transactions = (await node.api.getMicroBlockTransactionsByHash(hash)).transactions
          return microBlock
        }
      )
    ))
    let microBlocks = state.microBlocks[height]
    microBlocks = microBlocks ? microBlocks.concat(blocksToGet) : blocksToGet
    commit('addMicroBlocks', { height, microBlocks })
    return microBlocks
  },

  /**
   * Fetches the head of the blockchain
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {String} height
   * @return {*}
   */
  async getBlockFromHeight ({ state, rootGetters: { node }, commit }, height) {
    const block = await node.api.getKeyBlockByHeight(height)

    if (isEqual(state.block, block)) {
      return state.block
    }

    commit('setBlock', block)

    return block
  },

  /**
   * getLatestGenerations pulls a list of blocks based on the
   * size of the payload
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Number} size
   * @return {*}
   */
  async getLatestGenerations ({ state, rootGetters: { node }, commit, dispatch }, size) {
    try {
      await dispatch('height')
      const generations = await Promise.all(
        times(size, (index) => dispatch('getGenerationFromHeight', state.height - index))
      )

      if (!generations.length) {
        return state.generations
      }
      return generations
    } catch (e) {
      commit('catchError', 'Error', { root: true })
    }
  }
})
