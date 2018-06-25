import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import Address from '@/screens/address/address.vue'
import BlockList from '@/screens/blockList/blockList.vue'
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
    name: 'BlockList',
    path: '/blocks',
    component: BlockList
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
