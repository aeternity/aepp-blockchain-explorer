/**
 * Vue
 */
import Vue from 'vue'

/**
 * List of global filters in the app
 */
Vue.filter('humanDate', require('./humanDate').default)
Vue.filter('round', require('./round').default)
Vue.filter('startAndEnd', require('./startAndEnd').default)
