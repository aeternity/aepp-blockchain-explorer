import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import Address from '@/screens/address/address.vue'
import GenerationList from '@/screens/generationList/generationList.vue'
import Generation from '@/screens/generation/generation.vue'
import Block from '@/screens/block/block.vue'
import Transaction from '@/screens/transaction/transaction.vue'
import TransactionDetail from '@/screens/transactionDetail/transactionDetail.vue'
import Status from '@/screens/status/status.vue'

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
    name: 'Transaction',
    path: '/tx',
    component: Transaction
  }, {
    name: 'TransactionDetail',
    path: '/tx/:txId',
    component: TransactionDetail,
    props: true
  }, {
    name: 'Status',
    path: '/status',
    component: Status
  }]
})
