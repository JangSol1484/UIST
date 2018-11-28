<template>
<!--유저 정보에 관한 요약 정보 렌더-->
<!--내가 시청한 강의와 내가 업로드한 강의-->
  <div>
    <br><br><br>
    <b-container>
      <br><br>
      <div align-self="end">
        <b-button size="" variant="secondary" router-link :to="{name: 'myclass'}" >내강의실</b-button>
        
      </div>
      <br>
      <b-card bg-variant="light">
        <b-col>
          <b-row aligh-h="between">
            <b-col order="1">
              <b-form-group horizontal
                      breakpoint="lg"
                      label="유저 정보:"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
             </b-form-group>
            </b-col>
            <b-col class="text-right" order="2" md=3>
              <b-button-group>
                <b-button 
                    :variant="b_color"
                    @click="modifyB()">
                  {{profileB}}
                </b-button>
                <b-button 
                    variant="secondary" 
                    v-if="modify===false"
                    @click="cancel()">
                    취소
                </b-button>
              </b-button-group>
            </b-col>
            
          </b-row>
          <b-row class="mt-2">
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
                <b-form-input ref="my_name" id="my_name" :disabled = modify :value="getMyname"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="이메일:"
                            label-class="text-sm-right"
                            label-for="my_email">
                <b-form-input ref="my_email" id="my_email" :disabled = modify :value="user.u_email"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="자기소개:"
                            label-class="text-sm-right"
                            label-for="my_intro">
                <textarea class="form-control"
                          ref="my_intro"
                          id="my_intro"
                          :rows="3"
                          :max-rows="6"
                          :disabled = modify
                          :value="user.u_introduction"
                          style="resize:none">
                </textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-card>
      <br>
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
        showBtn: false,
        b_color: 'secondary'
      }
    },
    computed: {
      getMyname () {
        return this.user.u_name
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
            this.b_color = 'secondary'
            break
          case '2':
            alert('프로필을 수정합니다.')
            this.modify = false
            this.profileB = '프로필 저장'
            this.modifyOn = '1'
            this.b_color = 'info'
            break
          case '3':
            alert('변경을 취소합니다.')
            this.modify = true
            this.profileB = '프로필 수정'
            this.modifyOn = '2'
            this.b_color = 'secondary'
            break
        }
      },
      cancel () {
        this.modifyOn = '3'
        // this.$refs.my_name = this.getMyname()
        // this.my_name.value = this.user.u_name
        /* this.$refs.my_email.value = this.user.u_email
        this.$refs.my_intro.value = this.user.u_introduction */
        this.modifyB()
      }
    }
  }
</script>
