import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/screens/index/index.vue'
import Address from '@/screens/address/address.vue'
import BlockList from '@/screens/blockList/blockList.vue'
import Block from '@/screens/block/block.vue'
import Transaction from '@/screens/transaction/transaction.vue'
import Status from '@/screens/status/status.vue'

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
      component: Address,
      props: true
    },
    {
      path: '/blocks',
      name: 'BlockList',
      component: BlockList
    },
    {
      path: '/block/:blockId',
      name: 'Block',
      component: Block,
      props: true
    },
    {
      path: '/tx',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/status',
      name: 'Status',
      component: Status
    }
  ]
})
