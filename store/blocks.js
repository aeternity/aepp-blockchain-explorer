import Vue from 'vue'
import axios from 'axios'
import { wrapActionsWithResolvedNode, times } from './utils'

export const state = () => ({
  height: 0,
  generation: {},
  microBlocks: {},
  block: {},
  generations: {},
  hashToHeight: {}
})

export const getters = {
  /**
   * TODO: Refactor this function
   * getAverageBlockTime by calculating
   * the list of the blocks on the state
   * @param state
   * @return {number}
   */
  getAverageBlockTime: function ({ generations }) {
    const blockTimes = []
    for (let key in generations) {
      if (generations.hasOwnProperty(key) && generations.hasOwnProperty(parseInt(key) + 1)) {
        blockTimes.push(Math.abs(generations[key].keyBlock.time - generations[parseInt(key) + 1].keyBlock.time))
      }
    }
    return (blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length)
  },

  /**
   * getLastBlockTime
   * @param state
   * @return {function(*): *}
   */
  getLastMinedBlockTime: function (state) {
    return function (time) {
      return state.generations[state.height] ? time - state.generations[state.height].keyBlock.time : null
    }
  }
}

export const mutations = {
  /**
   * setHeight mutates the
   * state property height
   * @param {Object} state
   * @param {Number} height
   */
  setHeight (state, height) {
    Object.assign(state, { height })
  },

  /**
   * setBlock Mutates the head block object
   * @param {Object} state
   * @param {Object} block
   */
  setBlock (state, block) {
    Object.assign(state, { block })
  },

  /**
   * setGenerations mutates the array of generations
   * @param {Object} state
   * @param {Object} generation
   */
  setGenerations (state, generation) {
    Vue.set(state.hashToHeight, generation.keyBlock.hash, generation.keyBlock.height)
    Vue.set(state.generations, generation.keyBlock.height, generation)
  },

  /**
   * addMicroBlocks adds a microBlock to a generation object
   * @param {Object} state
   * @param {String} height
   * @param {Array} microBlocks
   */
  addMicroBlocks (state, { height, microBlocks }) {
    for (const i in microBlocks) {
      if (!state.microBlocks[height]) {
        Vue.set(state.microBlocks, height, [])
        state.microBlocks[height].push(microBlocks[i])
      } else if (!state.microBlocks[height].includes(microBlocks[i])) {
        state.microBlocks[height].push(microBlocks[i])
      }
    }
  }
}

export const actions = wrapActionsWithResolvedNode({
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
    const resp = await axios.get(process.env.middlewareURL + 'middleware/transactions/interval/' + height + '/' + height)
    generation.numTransactions = resp.data.transactions.length
    for (const tx of resp.data.transactions) {
      commit('transactions/setTransaction', tx, { root: true })
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
    const generation = await node.api.getGenerationByHeight(height)
    const resp = await axios.get(process.env.middlewareURL + 'middleware/transactions/interval/' + height + '/' + height)
    generation.numTransactions = resp.data.transactions.length
    for (const tx of resp.data.transactions) {
      commit('transactions/setTransaction', tx, { root: true })
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
   * @param {Number} maxBlocks
   * @return {*}
   */
  getLatestGenerations: async function ({ state, rootGetters: { node }, commit, dispatch }, maxBlocks) {
    try {
      await dispatch('height')
      const array = Promise.all(
        times(maxBlocks, (index) => dispatch('getGenerationFromHeight', state.height - index))
      )
      return array
    } catch (e) {
      console.log(e)
      commit('catchError', 'Error', { root: true })
    }
  },
  nuxtServerInit ({ dispatch }, context) {
    return Promise.all([
      dispatch('getLatestGenerations', 5)
    ])
  }
})
