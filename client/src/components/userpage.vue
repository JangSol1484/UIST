<template>
<!--유저 정보에 관한 요약 정보 렌더-->
<!--내가 시청한 강의와 내가 업로드한 강의-->
  <div>
    <b-container>
      <br><br>
      <div align-self="end">
        <b-button size="" variant="secondary" router-link :to="{name: 'userclass', params: {id: this.$route.params.id}}" >강의실</b-button>
        
      </div>
      <br>
      <b-card class="shadow" bg-variant="light">
        <b-col>
          <b-row aligh-h="between">
            <b-col order="1">
              <b-form-group horizontal
                      breakpoint="lg"
                      label="유저 정보"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
             </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <img  class="img-thumbnail" v-bind:src="thumbnail"/>
              <b-form-file name = "thumbnail" v-if="modify===false" @change="loadfile($event.target.name, $event.target.files)" @drop="loadfile($event.target.name, $event.target.files)"></b-form-file>
            </b-col>
            <b-col md="8">
              <b-form-group horizontal
                        label="아이디"
                        label-class="text-sm-right"
                        label-for="my_id"
                        >
              <b-form-input id="my_id" disabled = true :value="user.u_id"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="이름"
                            label-class="text-sm-right"
                            label-for="my_name">
                <b-form-input v-model="v_name" ref="my_name" id="my_name" :disabled = modify :value="user.u_name"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="이메일"
                            label-class="text-sm-right"
                            label-for="my_email">
                <b-form-input v-model="v_email" ref="my_email" id="my_email" :disabled = modify :value="user.u_email"></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                            label="자기소개"
                            label-class="text-sm-right"
                            label-for="my_intro">
                <textarea class="form-control"
                          v-model="v_intro"
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
      <b-card class="shadow" bg-variant="light">
        <b-form-group horizontal
                      breakpoint="lg"
                      label="구독 정보"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
        </b-form-group>
        <div class="d-inline-flex">
          <div v-for="sub in sub_list" v-bind:key="sub.bj">
            
            <div class="d-flex flex-column ml-3 mr-3">
              <div>
                <router-link :to="{ name: 'user', params: { id: sub.bjid}}">
                  <img class="fluid rounded-circle" v-bind:src="'data:image/jpeg;base64,'+sub.bjThumbnail" width = "120px" height="120px"/>
                </router-link>
              </div>
              <div class="text-center">{{sub.bj}}</div>
            </div>
            
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formData: null,
        user: null,
        sub_list: null,
        thumbnail: 'data:image/jpeg;base64,',
        modify: true,
        modifyOn: '2',
        profileB: '프로필 수정',
        showBtn: false,
        b_color: 'secondary',
        isJpeg: null,
        targetName: null,
        targetFile: null
      }
    },
    created () {
      let id = this.$route.params.id
      this.$http.get(`/api/user/${id}`)
        .then((res) => {
          this.user = res.data.user
          this.v_name = this.user.u_name
          this.v_email = this.user.u_email
          this.v_intro = this.user.u_introduction
          this.sub_list = res.data.sublist
          this.$http.get(`/api/user/${this.user.u_id}/thumbnail`)
          .then((res) => {
            this.thumbnail = this.thumbnail + res.data
          })
          this.v_name = this.user.u_name
        })
        .catch(() => {
          alert('로그인이 만료되었습니다.')
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
            this.sendProfileChange()
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
            this.v_name = this.user.u_name
            this.modify = true
            this.profileB = '프로필 수정'
            this.modifyOn = '2'
            this.b_color = 'secondary'
            break
        }
      },
      cancel () {
        this.modifyOn = '3'
        this.v_name = this.user.u_name + ' '
        this.modifyB()
      },
      sendProfileChange () {
        this.formData = new FormData()
        this.formData.append('name', this.v_name)
        this.formData.append('email', this.v_email)
        this.formData.append('intro', this.v_intro)
        this.formData.append(this.targetName, this.targetFile, this.targetFile.name)
        this.$http.post('/api/user/update', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
      loadfile (name, files) {
        this.targetName = name
        this.targetFile = files[0]
        this.thumbnail = URL.createObjectURL(files[0])
        let type = files[0].type.split('/')
        if (type[1] === 'jpg') {
          this.isJpeg = true
        }
      }
    }
  }
</script>
