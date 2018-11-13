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
    Vue.set(state.generations, generation.keyBlock.height, generation)
  },

  /**
   * addBlocks appends to the end of the array
   * the blocks assigned
   * @param {Object} state
   * @param {Array} blocks
   */
  addBlocks (state, blocks) {
    Object.assign(state, { blocks: state.blocks.concat(blocks) })
  },

  /***
   * resetAll reset the state of 'blocks' module
   * @param {Object} state
   */
  resetState (state) {
    Object.assign(state,
      {
        height: 0,
        generation: {},
        block: {},
        blocks: [],
        generations: {}
      }
    )
  }
}
