import { wrapActionsWithResolvedNode } from './utils'

export const state = () => ({
  microBlock: {}
})

export const mutations = {
  setMicroBlock (state, microBlock) {
    state.microBlock = microBlock
  }
}

export const actions = wrapActionsWithResolvedNode({
  async getMicroBlockFromHash ({ state, rootGetters: { node }, commit }, hash) {
    const block = await node.api.getMicroBlockHeaderByHash(hash)
    block.transactions = (await node.api.getMicroBlockTransactionsByHash(hash)).transactions
    commit('setMicroBlock', block)
    return block
  }
})
