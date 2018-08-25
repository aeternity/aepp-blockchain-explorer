import Vue from 'vue'
import humanDate from './humanDate'
import round from './round'
import startAndEnd from './startAndEnd'

Vue.filter('humanDate', humanDate)
Vue.filter('round', round)
Vue.filter('startAndEnd', startAndEnd)
