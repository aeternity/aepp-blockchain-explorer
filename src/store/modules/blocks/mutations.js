export default {
  /**
   * setHeight mutates the
   * state property height
   * @param {Object} state
   * @param {Number} height
   * @return {Object}
   */
  setHeight: function (state, height) {
    return Object.assign(state, { height })
  },

  /**
   * setBlock Mutates the head block object
   * @param {Object} state
   * @param {Object} block
   * @return {Object}
   */
  setBlock: function (state, block) {
    return Object.assign(state, { block })
  },

  /**
   * setGeneration Mutates the head generation object
   * @param {Object} state
   * @param {Object} generation
   * @return {Object}
   */
  setGeneration: function (state, generation) {
    return Object.assign(state, { generation })
  },

  /**
   * setBlocks mutates the array of blocks
   * @param {Object} state
   * @param {Array} blocks
   * @return {Object}
   */
  setBlocks: function (state, blocks) {
    return Object.assign(state, { blocks })
  },

  /**
   * setGenerations mutates the array of generations
   * @param {Object} state
   * @param {Array} generations
   * @return {Object}
   */
  setGenerations: function (state, generations) {
    return Object.assign(state, { generations })
  },

  /**
   * addBlocks appends to the end of the array
   * the blocks assigned
   * @param {Object} state
   * @param {Array} blocks
   * @return {*}
   */
  addBlocks: function (state, blocks) {
    return Object.assign(state, { blocks: state.blocks.concat(blocks) })
  }
}
