/**
 * Exporting Getters
 */
export default {
  /**
   * TODO: Refactor this function
   * getAverageBlockTime by calculating
   * the list of the blocks on the state
   * @param state
   * @return {number}
   */
  getAverageBlockTime: function (state) {
    const blockTimes = state.blocks.map(
      (block, idx, blocks) => idx + 1 < blocks.length && blocks[idx].time - blocks[idx + 1].time
    )
    // no idea what this does
    blockTimes.pop()
    return (blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length)
  },

  /**
   * getLastBlockTime
   * @param state
   * @return {function(*): *}
   */
  getLastMinedBlockTime: function (state) {
    return function (time) {
      return state.blocks[0] ? time - state.blocks[0].time : null
    }
  }
}
