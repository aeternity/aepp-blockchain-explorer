import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'

Vue.use(VueResource)
Vue.config.productionTip = false

Vue.http.options.root = process.env.AETERNITY_EPOCH_API_URL

/* eslint-disable no-new */
function startAndEnd (str, start = 6, end = 6) {
  return str.substr(0, start + 2) +
    '…' +
    str.substr(str.length - end, str.length)
}
Vue.filter('startAndEnd', startAndEnd)

function agoFormat (ts) {
  if (ts < 0) return null
  let sec = Math.floor(ts / 1000)
  let min = 0
  let hours = 0
  let days = 0
  if (sec > 59) {
    min = Math.floor(sec / 60)
    sec = sec - (min * 60)
  }
  if (min > 59) {
    hours = Math.floor(min / 60)
    min = min - (hours * 60)
  }
  if (hours > 23) {
    days = Math.floor(hours / 24)
    hours = hours - (days * 24)
  }
  if (min > 0) {
    sec = ("00" + sec).slice(-2)
  }
  if (hours > 0) {
    min = ("00" + min).slice(-2)
  }
  if (days > 0) {
    hours = ("00" + hours).slice(-2)
  }
  let strarr = []
  if (days) { strarr.push(`<span class='number'>${days}</span><span class='unit'>d</span>`) }
  if (hours) { strarr.push(`<span class='number'>${hours}</span><span class='unit'>h</span>`) }
  if (min) { strarr.push(`<span class='number'>${min}</span><span class='unit'>m</span>`) }
  if (sec) { strarr.push(`<span class='number'>${sec}</span><span class='unit'>s</span>`) }

  return strarr.join(' ')
}
Vue.filter('agoFormat', agoFormat)

function humanDate (ts) {
  return new Date(ts).toISOString()
}
Vue.filter('humanDate', humanDate)

function round(number, precision=2) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
Vue.filter('round', round)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
