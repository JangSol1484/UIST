<template>
  <div id="header">
    <router-link :to="{name: 'home'}">
      <span class='title'>UIST</span>
    </router-link>
    <span class='user' v-if="!this.$store.getters.getName">
      <router-link :to="{name: 'login'}">로그인</router-link>
      <router-link :to="{name: 'signin'}">회원가입</router-link>
      id : test, pw : 1111
    </span>
    
    <span class='user' v-else-if="this.$store.getters.getName">
      반갑습니다 <span v-text="this.$store.getters.getName"></span> 님!
      <router-link :to="{name: 'my'}">마이페이지</router-link>
      <a href="" @click.prevent="onClickLogout">로그아웃</a>
    </span>
  </div>
</template>

<script>
export default {
  created () {
    /*
    this.$http.get('/api/user')
    .then((res) => {
      this.username = res.data.username
    }) */
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('LOGOUT')
      this.username = null
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#header {
  background-color: aquamarine;
  position: fixed;
  margin: 0;
  top: 0%;
  left: 0%;
  height: 8%;
  width: 100%;
}

.title {
  font-size: 40px;
}

.user {
  text-align: right;
}
</style>
