import EpochChain from '@aeternity/aepp-sdk/es/chain/epoch'

export default {
  /**
   *
   * @param state
   * @param commit
   * @param dispatch
   * @param hash
   * @return {Promise<*>}
   */
  async getTxByHash ({ state, commit, dispatch }, hash) {
    const client = await EpochChain({
      url: this.state.epochUrl
    })
    const transaction = await client.api.getTransactionByHash(hash)

    commit('setTransaction', transaction)

    return transaction
  }
}
