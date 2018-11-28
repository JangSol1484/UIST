<template>
<!--유저 정보에 관한 요약 정보 렌더-->
<!--내가 시청한 강의와 내가 업로드한 강의-->
  <div>
    <br><br><br>
    <b-container>
      <br><br>
      <div align-self="end">
        <b-button size="" variant="secondary" router-link :to="{name: 'myclass'}" >내강의실</b-button>
        <b-button size="" 
                  v-b-toggle.collapse_btn 
                  variant="secondary" 
                  @click="modifyB()" 
                  aria-controls="collapse_btn"
                  :aria-expanded="showBtn ? 'true' : 'false'">
          {{profileB}}
        </b-button>
        <b-collapse id="collapse_btn" class="mt-2" v-model = "showBtn">
          <b-button>취소</b-button>
        </b-collapse>
      </div>
      <br>
      <b-card bg-variant="light">
        <b-col>
          <b-row>
            <b-col>
              <b-form-group horizontal
                      breakpoint="lg"
                      label="유저 정보:"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
             </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img thumbnail fluid v-bind:src="'data:image/jpeg;base64,'+thumbnail" width = "400px" height="400px"/>
            </b-col>
            <b-col md="8">
              <b-form-group horizontal
                        label="아이디:"
                        label-class="text-sm-right"
                        label-for="my_id"
                        >
              <b-form-input id="my_id" disabled = true :value="user.u_id"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="이름:"
                            label-class="text-sm-right"
                            label-for="my_name">
                <b-form-input id="my_name" :disabled = modify :value="user.u_name"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="이메일:"
                            label-class="text-sm-right"
                            label-for="my_email">
                <b-form-input id="my_email" :disabled = modify :value="user.u_email"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="자기소개:"
                            label-class="text-sm-right"
                            label-for="my_intro">
                <b-form-textarea id="my intro"
                            :rows = "3"
                            :max-rows = "6"
                            :disabled = modify >
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-card>

      <b-card bg-variant="light">
        <b-form-group horizontal
                      breakpoint="lg"
                      label="구독 정보:"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
        </b-form-group>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  
  export default {
    data () {
      return {
        user: null,
        thumbnail: null,
        modify: true,
        modifyOn: '2',
        profileB: '프로필 수정',
        showBtn: false
      }
    },
    created () {
      this.$http.get('api/user/my')
        .then((res) => {
          this.user = res.data.user
          this.$http.get(`api/user/thumbnail/${this.user.u_id}`)
          .then((res) => {
            this.thumbnail = res.data
          })
        })
        .catch(() => {
          this.$router.push('/')
          this.$store.dispatch('LOGOUT')
        })
    },
    methods: {
      modifyB () {
        switch (this.modifyOn) {
          case '1':
            alert('프로필을 저장합니다.')
            this.modify = true
            this.profileB = '프로필 수정'
            this.modifyOn = '2'
            break
          case '2':
            alert('프로필을 수정합니다.')
            this.modify = false
            this.profileB = '프로필 저장'
            this.modifyOn = '1'
            break
        }
      }
    }
  }
</script>
