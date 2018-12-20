import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from 'components/home'
import MyPage from 'components/mypage'
import UserPage from 'components/userpage'
import MyClass from 'components/class'
import UserClass from 'components/userclass'
import Lecture from 'components/lecture'
import Login from 'components/login'
import Signup from 'components/signup'
import Search from 'components/search'
import Upload from 'components/upload'
import Discovery from 'components/discovery'
import store from '../store'
const requireAuth = () => (from, to, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/login?returnPath=my')
}

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
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/lecture/:id/:no',
      name: 'lecture',
      component: Lecture
    },
    {
      path: '/search/:query',
      name: 'search',
      component: Search
    },
    {
      path: '/my/:id',
      name: 'my',
      component: MyPage,
      beforeEnter: requireAuth()
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserPage
    },
    {
      path: '/my/:id/class',
      name: 'myclass',
      component: MyClass,
      beforeEnter: requireAuth()
    },
    {
      path: '/user/:id/class',
      name: 'userclass',
      component: UserClass
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      beforeEnter: requireAuth()
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: Discovery
    }
  ]
})
