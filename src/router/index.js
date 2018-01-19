import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import Address from '@/screens/address/address.vue'
import BlockList from '@/screens/blockList/blockList.vue'
import Block from '@/screens/block/block.vue'
import Transaction from '@/screens/transaction/transaction.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/account/:address',
      name: 'Address',
      component: Address
    },
    {
      path: '/blocks',
      name: 'BlockList',
      component: BlockList
    },
    {
      path: '/block/:block',
      name: 'Block',
      component: Block
    },
    {
      path: '/tx',
      name: 'Transaction',
      component: Transaction
    }
  ]
})
