import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _24e32a80 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _0d088572 = () => interopDefault(import('../pages/generations/index.vue' /* webpackChunkName: "pages/generations/index" */))
const _55a96abf = () => interopDefault(import('../pages/transactions/index.vue' /* webpackChunkName: "pages/transactions/index" */))
const _812b3722 = () => interopDefault(import('../pages/generations/_generation/index.vue' /* webpackChunkName: "pages/generations/_generation/index" */))
const _047b2745 = () => interopDefault(import('../pages/transactions/_transaction/index.vue' /* webpackChunkName: "pages/transactions/_transaction/index" */))
const _3771857b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior,

    routes: [{
      path: "/dashboard",
      component: _24e32a80,
      name: "dashboard"
    }, {
      path: "/generations",
      component: _0d088572,
      name: "generations"
    }, {
      path: "/transactions",
      component: _55a96abf,
      name: "transactions"
    }, {
      path: "/generations/:generation",
      component: _812b3722,
      name: "generations-generation"
    }, {
      path: "/transactions/:transaction",
      component: _047b2745,
      name: "transactions-transaction"
    }, {
      path: "/",
      component: _3771857b,
      name: "index"
    }],

    fallback: false
  })
}
