import isEqual from 'lodash/isEqual'
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

    if (isEqual(state.block, block)) {
      return state.block
    }

    commit('setMicroBlock', block)

    return block
  }
})
