import Vue from 'vue'

Vue.filter('humanDate', require('./humanDate').default)
Vue.filter('round', require('./round').default)
Vue.filter('startAndEnd', require('./startAndEnd').default)
