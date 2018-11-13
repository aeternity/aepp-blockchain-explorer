export default {
  /**
   * TODO: Refactor this function
   * getAverageBlockTime by calculating
   * the list of the blocks on the state
   * @param state
   * @return {number}
   */
  getAverageBlockTime: function ({generations}) {
    const blockTimes = []
    for (var key in generations) {
      if (generations.hasOwnProperty(key) && generations.hasOwnProperty(parseInt(key) + 1)) {
        blockTimes.push(Math.abs(generations[key].keyBlock.time - generations[parseInt(key) + 1].keyBlock.time))
      }
    }
    return (blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length)
  },

  /**
   * getLastBlockTime
   * @param state
   * @return {function(*): *}
   */
  getLastMinedBlockTime: function (state) {
    return function (time) {
      return state.generations[state.height] ? time - state.generations[state.height].keyBlock.time : null
    }
  }
}
