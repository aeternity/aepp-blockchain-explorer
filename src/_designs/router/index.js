/**
 * Exporting Routes
 */
export default {
  name: 'app',
  path: '/v2',
  component: () => import('../screens/index.vue'),
  meta: {
    // TODO: To be removed after new designs are completed.
    newDesigns: true
  },
  redirect: {
    name: 'app/dashboard'
  },
  children: [{
    name: 'app/accounts',
    path: 'accounts',
    component: {} // component: () => import('../screens/dashboard/index.vue'),
  }, {
    name: 'app/dashboard',
    path: 'dashboard',
    component: () => import('../screens/dashboard/index.vue')
  }, {
    name: 'app/generations',
    path: 'generations',
    component: () => import('../screens/generations/index.vue')
  }, {
    name: 'app/generation',
    path: 'generation',
    component: () => import('../screens/generation/index.vue')
  }, {
    name: 'app/transactions',
    path: 'transactions',
    component: () => import('../screens/transactions/index.vue')
  }, {
    name: 'app/transaction',
    path: 'transaction',
    component: () => import('../screens/transaction/index.vue')
  }
  ]
}
