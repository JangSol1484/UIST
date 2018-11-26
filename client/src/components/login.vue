<template>
  <div id="login" align="center">
    <b-container>
      <b-row align-v="center" align-h="center">
        <b-col md="4">
          <b-form id = "loginform" autocomplete = "off" @keydown.enter="onSubmit(uid, upw)">
            <b-form-group label = "아이디" 
                        label-for = "ID">
              <b-form-input id = "ID" 
                          size = "lg"
                          type = "text" 
                          v-model = "uid" 
                          required = "required" 
                          placeholder="ID를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group label = "비밀번호"
                        label-for = "Password">
              <b-form-input id = "Password"
                          size = "lg"
                          type = "password"
                          v-model = "upw"
                          required = "required" 
                          placeholder="비밀번호를 입력해주세요"
                          @keydown.enter="onSubmit(uid, upw)">
              </b-form-input>
            </b-form-group>
            <b-button class="w-75" size="lg" variant="secondary" @click = "onSubmit(uid, upw)">send</b-button> <br>
            <b-button class="w-75" size="lg" variant="success"><router-link :to="{name: 'signin'}">회원가입</router-link></b-button> <br>
            
            <router-link :to="{name: 'home'}">뒤로가기</router-link>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  created () {
  },
  name: 'login',
  data () {
    return {
      form: {
        uid: '',
        upw: ''
      }
    }
  },
  methods: {
    onSubmit (uid, upw) {
      this.$store.dispatch('LOGIN', {uid, upw})
      .then(() => this.redirect())
    },
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
