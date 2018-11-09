<template>
  <div id="header">
    반갑습니다! <span v-text="login"></span>

    <span v-if="!isAuthenticated || !login">
      <router-link :to="{name: 'login'}">로그인</router-link>
      <router-link :to="{name: 'signin'}">회원가입</router-link>
      id : test, pw : 1111
    </span>

    <span v-else-if="isAuthenticated && login">
      <router-link :to="{name: 'my'}">마이페이지</router-link>
      <a href="" @click.prevent="onClickLogout">로그아웃</a>
    </span>
  </div>
</template>

<script>
import store from './store'

export default {
  created () {
    this.$http.get('/api/user')
    .then((res) => {
      this.login = res.data.login
    })
  },
  computed: {
    isAuthenticated () {
      return store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      store.dispatch('LOGOUT').then(() => this.$router.push('/'))
      this.login = ''
    }
  },
  data () {
    return {
      login: []
    }
  }
}
</script>

<style>
#header {
  background-color: aquamarine;
  position: fixed;
  margin: 0;
  top: 0%;
  left: 0%;
  height: 8%;
  width: 100%;
}
</style>
