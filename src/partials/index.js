export const install = function (Vue, options) {
  const components = {
    'latest-block': () => import(/* webpackChunkName: "latestBlock" */'./latestBlock/latestBlock.vue'),
    'market-stats': () => import(/* webpackChunkName: "marketStats" */'./marketStats/marketStats.vue'),
    'recent-blocks': () => import(/* webpackChunkName: "recentBlocks" */'./recentBlocks/recentBlocks.vue'),
    'ae-footer': () => import(/* webpackChunkName: "footer" */'./footer/footer.vue')
  }

  return Object.keys(components).forEach((id) => Vue.component(id, components[id]))
}
