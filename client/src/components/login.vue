<template>
    <div>
      <form id = "loginform" @submit.prevent = "onSubmit(email, password)">
        id:<input type = "text" v-model = "email">
        <br>
        pw:<input type = "password" v-model = "password">
        <br>
        <button>send</button>
      </form>
      {{msg}}
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
      email: '',
      password: '',
      mag: ''
    }
  },
  methods: {
    onSubmit (email, password) {
      this.$store.dispatch('LOGIN', {email, password})
      .then(() => this.redirect())
      .catch(message => { this.msg = message })
    },
    redirect () {
      this.$router.push({name: 'home'})
    },
    sendPost: function () {
      this.$http.post('/api/user/login', {
        userid: this.userid,
        userpw: this.userpw
      }).then((res) => {
        this.data = res.data
        this.$router.push({name: 'home'})
      }, function () {
        console.log('failed')
      })
    }
  }
}
</script>
