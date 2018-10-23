export default {
  /**
   * TODO: Refactor this function
   * getAverageBlockTime by calculating
   * the list of the blocks on the state
   * @param state
   * @return {number}
   */
  getAverageBlockTime: function (state) {
    const blockTimes = state.generations.map(
      (generation, idx, generations) => idx + 1 < generations.length && generations[idx].keyBlock.time - generations[idx + 1].keyBlock.time
    )
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
      return state.generations[0] ? time - state.generations[0].keyBlock.time : null
    }
  }
}
