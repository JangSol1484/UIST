<template>
<!--회원가입-->
  <div>
    <form id = "signinform" @submit.prevent = "sendPost">
      id:<input type = "text" name = "u_id" v-model = "u_id">
      <br>
      pw:<input type = "password" name = "u_pw" v-model = "u_pw">
      <br>
      name:<input type = "text" name = "u_name" v-model = "u_name">
      <br>
      email:<input type = "email" name = "u_email" v-model = "u_email">
      <br>
      introduction:<textarea name = "u_intro" v-model = "u_intro"></textarea>
      <br>
      <button>send</button>
    </form>
    {{data}}
    <br>
    <router-link :to="{name: 'home'}">뒤로가기</router-link>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      data: []
    }
  },
  methods: {
    sendPost: function () {
      this.$http.post('/api/user/signin', {
        u_id: this.u_id,
        u_pw: this.u_pw,
        u_name: this.u_name,
        u_email: this.u_email,
        u_intro: this.u_intro
      }).then((res) => {
        if (res.data === true) {
          this.$router.push('/')
        } else {
          this.data = '회원가입 실패'
        }
      })
    }
  }
}
</script>
