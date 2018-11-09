// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import Header from './Header'
import router from './router'
import store from './store'

Vue.prototype.$http = axios

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
var main = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

var header = new Vue({
  el: '#header',
  router,
  template: '<Header/>',
  components: { Header }
})

