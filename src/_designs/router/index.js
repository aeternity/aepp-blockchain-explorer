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
  }]
}
