import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
function startAndEnd (str, start = 6, end = 6) {
  return str.substr(0, start + 2) +
    '…' +
    str.substr(str.length - end, str.length)
}
Vue.filter('startAndEnd', startAndEnd)

function humanDate (ts) {
  return new Date(ts).toISOString()
}
Vue.filter('humanDate', humanDate)

function round (number, precision = 2) {
  var factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}
Vue.filter('round', round)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
