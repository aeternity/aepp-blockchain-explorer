/**
 * Exporting Getters
 */
export default {
  /**
   * Return block array
   * @param {Object} state
   * @return {Array}
   */
  blocks: function (state) {
    return state.blocks
  },

  /**
   * Return max block height
   * @return {*}
   */
  height: function (state) {
    return state.height
  }
}
