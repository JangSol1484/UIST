<template>
<!--회원가입-->
  <div>
    <br><br><br><br>
    <b-container>
      <b-row align-v="center" align-h="center">
        <b-col md="7">
          <b-form id = "signinform" autocomplete = "off" @keydown.enter = "sendPost">
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "아이디 :"
              label-for = "s_id">
              <b-form-input id= "s_id"
                        size = "lg"
                        type = "text" 
                        v-model = "u_id" 
                        required = "required" 
                        placeholder = "ID를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "비밀번호 :"
              label-for = "s_pw">
              <b-form-input id= "s_pw"
                        size = "lg"
                        type = "password" 
                        v-model = "u_pw" 
                        required = "required" 
                        placeholder = "비밀번호를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "이름 :"
              label-for = "s_name">
              <b-form-input id= "s_name"
                        size = "lg"
                        type = "text" 
                        v-model = "u_name" 
                        required = "required" 
                        placeholder = "이름를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "이메일 :"
              label-for = "s_email">
              <b-form-input id= "s_email"
                        size = "lg"
                        type = "email" 
                        v-model = "u_email" 
                        required = "required" 
                        placeholder = "이메일를 입력해주세요">
              </b-form-input>
            </b-form-group>
            <b-form-group horizontal
              :label-cols = "2"
              label-size = "lg"
              label = "자기소개 :"
              label-for = "s_intro">
              <b-form-textarea id = "s_intro"
                    v-model = "u_intro"
                    placeholder = "자기소개를 입력해주세요"
                    :rows = "3"
                    :max-rows = "6">
              </b-form-textarea>
            </b-form-group>
            <b-button id = "loginb" class="w-100" size="lg" variant="secondary" @click = "sendPost">가입하기</b-button> <br><br>
            <router-link :to="{name: 'home'}">뒤로가기</router-link>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    {{data}}
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
