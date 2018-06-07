/**
 * Exporting Mutations
 */
export default {
  /**
   * Set blocks
   * @param {Object} state
   * @param {Boolean} blocks
   * @return {Object}
   */
  setBlocks: function (state, blocks) {
    return Object.assign(state, { blocks })
  }
}
