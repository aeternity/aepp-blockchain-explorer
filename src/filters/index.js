import Vue from 'vue'
import humanDate from './humanDate'
import round from './round'
import startAndEnd from './startAndEnd'
import yaniToAe from './yaniToAe'

Vue.filter('humanDate', humanDate)
Vue.filter('round', round)
Vue.filter('startAndEnd', startAndEnd)
Vue.filter('yaniToAe', yaniToAe)
