<template>
  <div>
    <b-form @submit.prevent = "onSubmit(uid, upw)" id = "loginform" autocomplete = "off">
      <b-form-group label = "아이디" 
                  label-for = "ID">
        <b-form-input id = "ID" 
                    size = "lg"
                    type = "text" 
                    v-model = "uid" 
                    required 
                    placeholder="ID를 입력해주세요">
        </b-form-input>
      </b-form-group>
      <b-form-group label = "비밀번호"
                  label-for = "Password">
        <b-form-input id = "Password"
                    size = "lg"
                    type = "password"
                    : state ="pwstate"
                    v-model = "upw"
                    required
                    placeholder="비밀번호를 입력해주세요">
        </b-form-input>
      </b-form-group>
      <b-button :size="lg" :variant="secondary">send</b-button> <br>
      <router-link :to="{name: 'signin'}">회원가입</router-link>
      <router-link :to="{name: 'home'}">뒤로가기</router-link>
    </b-form>
  </div>
<!--서버에 로그인 요청을 보내고 인증정보를  vuex 로컬에 저장-->
    <!--<div>
      <form id = "loginform" @submit.prevent = "onSubmit(uid, upw)">
        id:<input type = "text" v-model = "uid">
        <br>
        pw:<input type = "password" v-model = "upw">
        <br>
        <button>send</button>
      </form>
      <br>
      <router-link :to="{name: 'home'}">뒤로가기</router-link>
    </div>-->
</template>

<script>
export default {
  created () {
  },
  name: 'login',
  data () {
    return {
      form: {
        uid: ''
      },
      show: true
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
    },
    pwstate () {
      return this.upw.length > 0 ? true : false
    }
  }
}
</script>

<style scoped>
  #loginform {
    position: center;
  }
</style>
