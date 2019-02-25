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

  getLatestGenerations: async function ({ state, rootGetters: { node }, commit, dispatch }, maxBlocks) {
    try {
      await dispatch('height')
      // TODO replace following url with commented out one, once the endpoint is live
      // return await axios.get(process.env.VUE_APP_EPOCH_URL + '/middleware/generations/' + (state.height - maxBlocks).toString() + '/' + state.height.toString())
      const generations = await axios.get('https://gist.githubusercontent.com/shekhar-shubhendu/0fb81ee9b5f7d9d282b4b824c34991f6/raw/d5eabb80721c499d57d8480b109ed266547a8c9f/gistfile1.txt')
      commit('setGenerations', generations.data.slice(150, 165))
      return generations.data.slice(42800, 43150)
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
