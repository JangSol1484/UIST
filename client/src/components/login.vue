<template>
<!--서버에 로그인 요청을 보내고 인증정보를  vuex 로컬에 저장-->
    <div>
      <form id = "loginform" @submit.prevent = "onSubmit(uid, upw)">
        id:<input type = "text" v-model = "uid">
        <br>
        pw:<input type = "password" v-model = "upw">
        <br>
        <button>send</button>
      </form>
      <br>
      <router-link :to="{name: 'home'}">뒤로가기</router-link>
    </div>
</template>

<script>
export default {
  created () {
  },
  name: 'login',
  data: function () {
    return {
      uid: 'test',
      upw: '1111',
      mag: ''
    }
  },
  methods: {
    onSubmit (uid, upw) {
      this.$store.dispatch('LOGIN', {uid, upw})
      .then(() => this.redirect())
      .catch(message => { this.msg = message })
    },
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>
