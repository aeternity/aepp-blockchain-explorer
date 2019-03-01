import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  generations: {},
  hashToHeight: {}
})

export const mutations = {
  setGenerations (state, generations) {
    for (var key in generations) {
      if (generations.hasOwnProperty(key)) {
        const generation = generations[key]
        if (!state.generations.hasOwnProperty(generation.height)) {
          Vue.set(state.hashToHeight, generation.hash, generation.height)
          Vue.set(state.generations, generation.height, generation)
        }
      }
    }
  }
}

export const actions = {
  getLatestGenerations: async function ({ state, rootState: { nodeUrl, height }, commit, dispatch }, maxBlocks) {
    try {
      const generations = await axios.get(nodeUrl + '/middleware/generations/' + (height - maxBlocks).toString() + '/' + height.toString())
      commit('setGenerations', generations.data.data)
      return generations.data.data
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
}
