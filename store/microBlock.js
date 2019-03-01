import Vue from 'vue'
import axios from 'axios'
import { wrapActionsWithResolvedNode } from './utils'

export const state = () => ({
  microBlock: {},
  microBlocks: {}
})

export const mutations = {
  setMicroBlock (state, microBlock) {
    state.microBlock = microBlock
  },

  setMicroBlocks (state, microBlock) {
    Vue.set(state.microBlocks, microBlock.hash, microBlock)
  }
}

export const actions = wrapActionsWithResolvedNode({
  async getMicroBlockFromHash ({ state, rootState: { nodeUrl }, commit }, hash) {
    const data = await axios.get(`${nodeUrl}/v2/micro-blocks/hash/${hash}/header`)
    const transactions = await axios.get(`${nodeUrl}/v2/micro-blocks/hash/${hash}/transactions`)
    const microBlock = { ...{}, ...data.data, ...transactions.data }
    commit('setMicroBlocks', microBlock)
    return microBlock
  },

  async getMicroBlocks ({ state, rootGetters: { epoch }, commit, dispatch }, hashes) {
    try {
      const microBlocks = await Promise.all(
        hashes.map((hash, index) => {
          return dispatch('getMicroBlockFromHash', hashes[index].hash)
        })
      )
      return microBlocks
    } catch (e) {
      commit('catchError', 'Error', { root: true })
    }
  }

})
