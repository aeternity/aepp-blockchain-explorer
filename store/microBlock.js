import axios from '@nuxtjs/axios'

export const state = () => ({
  microBlock: {}
})

export const mutations = {
  setMicroBlock (state, microBlock) {
    state.microBlock = microBlock
  }
}

export const actions = {
  async getMicroBlockFromHash ({ state, rootState: { nodeUrl }, commit }, hash) {
    const block = (await axios.get(`${nodeUrl}/v2/micro-blocks/hash/${hash}/header`)).data
    block.transactions = (await axios.get(`${nodeUrl}/v2/micro-blocks/hash/${hash}/transactions`)).data.transactions
    commit('setMicroBlock', block)
    return block
  }
}
