<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{myinfo}}<br>
    {{mylecture}}<br>
    <router-link :to="{name: 'upload'}">업로드</router-link>
    <b-card bg-variant="light">
          <b-row>
            <b-col>
              <b-form-group horizontal
                      breakpoint="lg"
                      label="업로더 정보:"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
             </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="8">
              <b-form-group horizontal
                        label="아이디:"
                        label-class="text-sm-right"
                        label-for="my_id"
                        >
              <b-form-input id="my_id" disabled = true></b-form-input>
              </b-form-group>
              <b-form-group horizontal
                        label="업로드한 동영상 수:"
                        label-class="text-sm-right"
                        label-for="my_video"
                        >
              <b-form-input id="my_video" disabled = true></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
      </b-card>
      <br>
      <b-row>
        <b-col>
          <b-dropdown id="set_category" text="카테고리 선택">
            
          </b-dropdown>
        </b-col>
      </b-row>
      <br>
      <b-card>

      </b-card>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/user/my/class')
    .then((res) => {
      this.myinfo = res.data.msg
    })
    .catch(() => {
      this.$router.push('/')
      this.$store.dispatch('LOGOUT')
    })
    this.$http.get('/api/lecture/test')
    .then((res) => {
      this.mylecture = res.data
    })
  },
  data () {
    return {
      myinfo: '',
      mylecture: []
    }
  }
}
</script>
