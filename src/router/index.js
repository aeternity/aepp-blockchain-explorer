import Vue from 'vue'
import Router from 'vue-router'

import Address from '@/screens/address/address.vue'
import Status from '@/screens/status/status.vue'
import GenerationList from '@/screens/generationList/generationList.vue'

const Index = () => import(/* webpackChunkName: 'index' */'@/screens/index/index.vue')
const Generation = () =>
  import(/* webpackChunkName: 'transaction' */'@/screens/generation/generation.vue')
const Block = () => import(/* webpackChunkName: 'transaction' */'@/screens/block/block.vue')
const TransactionDetail = () =>
  import(/* webpackChunkName: 'transaction-detail' */'@/screens/transactionDetail/transactionDetail.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'Index',
    path: '/',
    component: Index
  }, {
    name: 'Address',
    path: '/account/:address',
    component: Address,
    props: true
  }, {
    name: 'GenerationList',
    path: '/generations',
    component: GenerationList
  }, {
    name: 'Generation',
    path: '/generation/:generationId',
    component: Generation,
    props: true
  }, {
    name: 'Block',
    path: '/block/:blockId',
    component: Block,
    props: true
  }, {
    name: 'TransactionDetail',
    path: '/tx/:txId',
    component: TransactionDetail,
    props: true
  }, {
    name: 'Status',
    path: '/status',
    component: Status
  }],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
