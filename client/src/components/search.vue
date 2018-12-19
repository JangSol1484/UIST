<template>
  <div>
    <br><br>
    <b-container>
      <b-row>
        <h2>강의 검색</h2>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="shadow w-100">
            <div class="d-flex flex-column border-bottom mb-4" v-for="lecture in lecturelist" :key="lecture.l_no">
              <div class="d-flex flex-row">
                <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr_id, no: lecture.l_no }}">
                  <img class="mb-3" v-bind:src="'data:image/jpeg;base64,'+lecture.l_thum" width="185px">
                </router-link>
                <div class="d-flex flex-column mx-3">
                  <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr_id, no: lecture.l_no }}">
                    <div class="lectureTitle h3 mb-3 font-weight-bold">{{lecture.l_title}}</div>
                  </router-link>
                  <div class="h5 mt-auto">{{lecture.l_wr_name}}</div>
                  <div class="mb-3"><i class="fas fa-eye mx-1"></i> {{lecture.l_view}} <i class="fas fa-thumbs-up mx-1"></i> {{lecture.l_like}}</div>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <h2>유저 검색</h2>
      </b-row>
      <b-row>
        <b-col>
            <b-card class="shadow w-100">
            <div class="d-flex flex-column border-bottom mb-4" v-for="s_user in userlist" :key="s_user.u_no">
              <div class="d-flex flex-row">
                <router-link :to="{ name: 'lecture', params: { }}">
                  <img class="mb-3 fluid rounded-circle" v-bind:src="'data:image/jpeg;base64,'+ s_user.u_thum" width="120px" height="120px">
                </router-link>
                <div class="d-flex flex-column mx-3">
                  <router-link :to="{ name: 'lecture', params: { }}">
                    <div class="lectureTitle h3 mb-3 font-weight-bold">{{s_user.u_name}}</div>
                  </router-link>
                  <div class="h6">{{s_user.u_introduction}}</div>
                  <div class="mt-auto mb-3">{{s_user.u_lectures}}개의 강의가 업로드 됨</div>
                </div>
                <div class="h6 ml-auto d-flex align-items-center">
                  <button type="button" class="btn btn-primary" @click="btn_subscribe" :name="s_user.u_id">구독하기</button>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
<br>
  </div>
</template>

<script>
export default {
  created () {
    let query = this.$route.params.query
    this.$http.get(`/api/search/lecture?query=${query}`)
    .then((res) => {
      this.lecturelist = res.data
    })
    this.$http.get(`/api/search/user?query=${query}`)
    .then((res) => {
      this.userlist = res.data
      // alert(this.userlist[0].u_thum)
    })
  },
  data () {
    return {
      lecturelist: null,
      userlist: null
    }
  },
  methods: {
    btn_subscribe (event) {
      let id = event.target.name
      this.$http.get(`/api/user/subscribe/${id}`)
      .then((res) => {
        if (res.data === 'T') {
          alert('구독이 완료되었습니다.')
        } else if (res.data === 'F') {
          alert('구독이 취소되었습니다.')
        } else if (res.data === 'S') {
          alert('자신을 구독할 수 없습니다.')
        } else if (res.data === 'E') {
          alert('구독은 로그인 후 가능합니다.')
        }
      })
    }
  }
}

</script>

<style scoped>
.lectureTitle {
  color: black;
}
.lectureTitle:visited {
  color: black;
}
.lectureTitle:hover {
  color: black;
  text-decoration: underline; 
}
</style>
