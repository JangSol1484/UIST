// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-env browser */

import Vue from 'vue'
import BootVue from 'bootstrap-vue'
import axios from 'axios'
import App from './App'
import Header from './Header'
import router from './router'
import store from './store'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.prototype.$http = axios
Vue.use(BootVue)
Vue.use(VueVideoPlayer)

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
  store,
  template: '<Header/>',
  components: { Header }
})
