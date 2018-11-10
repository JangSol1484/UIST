<template>
  <div id="header">

    <span v-if="!isAuthenticated">
      <router-link :to="{name: 'login'}">로그인</router-link>
      <router-link :to="{name: 'signin'}">회원가입</router-link>
      id : test, pw : 1111
    </span>

    <span v-else-if="isAuthenticated">
      반갑습니다! <span v-text="login"></span>
      <router-link :to="{name: 'my'}">마이페이지</router-link>
      <a href="" @click.prevent="onClickLogout">로그아웃</a>
    </span>
  </div>
</template>

<script>
export default {
  created () {
    this.login = this.$store.getters.getLogin
    /*
    this.$http.get('/api/user')
    .then((res) => {
      this.$store.commit('setlogin', res.data.login)
      this.login = this.$store.commit('getlogin')
    })
    */
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'))
    }
  },
  data () {
    return {
      login: this.$store.getters.getLogin
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
