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
   * setBlocks mutates the array of blocks
   * @param {Object} state
   * @param {Array} blocks
   */
  setBlocks (state, blocks) {
    Object.assign(state, { blocks })
  },

  /**
   * setGenerations mutates the array of generations
   * @param {Object} state
   * @param {Array} generations
   */
  setGenerations (state, generations) {
    Object.assign(state, { generations })
  },

  /**
   * addBlocks appends to the end of the array
   * the blocks assigned
   * @param {Object} state
   * @param {Array} blocks
   */
  addBlocks (state, blocks) {
    Object.assign(state, { blocks: state.blocks.concat(blocks) })
  }
}
