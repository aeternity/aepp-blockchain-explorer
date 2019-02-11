import Vue from 'vue'

export default {
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
