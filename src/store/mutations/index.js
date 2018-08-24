export default {
  /**
   * setNodeStatus
   * @param {Object} state
   * @param $nodeStatus
   */
  setNodeStatus (state, $nodeStatus) {
    return Object.assign(state, { $nodeStatus })
  }
}
