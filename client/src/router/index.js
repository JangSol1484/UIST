import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from 'components/home'
import MyPage from 'components/mypage'
import MyClass from 'components/class'
import Lecture from 'components/lecture'
import Login from 'components/login'
import Signin from 'components/Signin'
import Upload from 'components/upload'
// import store from '../store'

/*
const requireAuth = () => (from, to, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/login?returnPath=my')
}
*/

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/lecture/:id/:no',
      name: 'lecture',
      component: Lecture
    },
    {
      path: '/my',
      name: 'my',
      component: MyPage
    //  beforeEnter: requireAuth()
    },
    {
      path: '/my/class',
      name: 'myclass',
      component: MyClass
     // beforeEnter: requireAuth()
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    //  beforeEnter: requireAuth()
    }
  ]
})
