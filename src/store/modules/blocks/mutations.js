/**
 * Exporting Mutations
 */
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
   * setBlocks mutates the array of blocks
   * @param {Object} state
   * @param {Boolean} blocks
   * @return {Object}
   */
  setBlocks: function (state, blocks) {
    return Object.assign(state, { blocks })
  }
}
