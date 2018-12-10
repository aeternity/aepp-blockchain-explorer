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
   * setGeneration Mutates the head generation object
   * @param {Object} state
   * @param {Object} generation
   */
  setGeneration (state, generation) {
    Object.assign(state, { generation })
  },

  /**
   * setGenerations mutates the array of generations
   * @param {Object} state
   * @param {Object} generation
   */
  setGenerations (state, generation) {
    Vue.set(state.hashToHeight, generation.keyBlock.hash, generation.keyBlock.height)
    Vue.set(state.generations, generation.keyBlock.height, generation)
  }
}
