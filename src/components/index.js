export const install = function (Vue, options) {
  const components = {
    'ae-hash': () => import(/* webpackChunkName: "ae-hash" */'./aeHash/aeHash.vue'),
    'blank': () => import(/* webpackChunkName: "ae-hash" */'./blank/index.vue'),
    'field': () => import(/* webpackChunkName: "field" */'./field/field.vue'),
    'named-address': () => import(/* webpackChunkName: "named-address" */'./namedAddress/namedAddress.vue'),
    'relative-time': () => import(/* webpackChunkName: "relativeTime" */'./relativeTime/relativeTime.vue'),
    'spinner': () => import(/* webpackChunkName: "spinner" */'./spinner/index.vue'),
    'transaction': () => import(/* webpackChunkName: "transaction" */'./transaction/transaction.vue'),
    'tx-type': () => import(/* webpackChunkName: "txType" */'./txType/txType.vue'),
    'view-and-copy': () => import(/* webpackChunkName: "view-and-copy" */'./viewAndCopy/viewAndCopy.vue')
  }

  return Object.keys(components).forEach((id) => Vue.component(id, components[id]))
}
