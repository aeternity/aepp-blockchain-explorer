import Vue from 'vue'
import { wrapActionsWithResolvedNode } from './utils'
import axios from 'axios'

export const state = () => ({
  height: 0,
  generations: {},
  hashToHeight: {}
})

export const mutations = {
  /**
   * setHeight mutates the
   * state property height
   * @param {Object} state
   * @param {Number} height
   */
  setHeight (state, height) {
    Object.assign(state, { height })
  },

  /**
   * setGenerations mutates the array of generations
   * @param {Object} state
   * @param generations
   */
  setGenerations (state, generations) {
    for (let i = 0; i < generations.length; i++) {
      const generation = generations[i]
      if (!state.generations.hasOwnProperty(generation.height)) {
        Vue.set(state.hashToHeight, generation.hash, generation.height)
        Vue.set(state.generations, generation.height, generation)
      }
    }
  }
}

export const actions = wrapActionsWithResolvedNode({
  /**
   * height fetches the block-height
   * @param {Object} state
   * @param {Object} rootGetters
   * @param {Function} commit
   * @return {Object}
   */
  async height ({ state, rootGetters: { node }, commit }) {
    try {
      const height = await node.height()

      if (height === state.height) {
        return state.height
      }

      commit('setHeight', height)

      return height
    } catch (e) {
      commit('catchError', 'Error', { root: true })
    }
  },

  getLatestGenerations: async function ({ state, rootState: { nodeUrl }, commit, dispatch }, maxBlocks) {
    try {
      await dispatch('height')
      const generations = await axios.get(nodeUrl + '/middleware/generations/' + (state.height - maxBlocks).toString() + '/' + state.height.toString())
      commit('setGenerations', generations.data)
      return generations.data
    } catch (e) {
      console.log(e)
      commit('catchError', 'Error', { root: true })
    }
  },
  nuxtServerInit ({ dispatch }, context) {
    return (
      dispatch('getLatestGenerations', 10)
    )
  }
})
