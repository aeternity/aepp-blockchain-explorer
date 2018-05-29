/**
 * Exporting Mutations
 */
export default {
  /**
   * setBlocks mutates the array of blocks
   * @param {Object} state
   * @param {Boolean} blocks
   * @return {Object}
   */
  setBlocks: function (state, blocks) {
    return Object.assign(state, { blocks })
  },

  /**
   * setHeight mutates the
   * state property height
   * @param {Object} state
   * @param {Number} height
   * @return {Object}
   */
  setHeight: function (state, height) {
    return Object.assign(state, { height })
  }
}
