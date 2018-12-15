<template>
  <div>
    <br><br>
    <b-container>
      <b-row>
        <h2>강의 검색</h2>
      </b-row>
      <b-row>
        <b-col>
          <span v-for="lecture in lecturelist" v-bind:key="lecture.l_no" class="lecture">
              <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr_id, no: lecture.l_no }}">
                <img v-bind:src="'data:image/jpeg;base64,'+lecture.l_thum" class="thumbnail">
              </router-link>
              <div>
                <strong>{{lecture.l_title}}</strong> [{{lecture.l_view}}]
              </div>
            </span>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <h2>유저 검색</h2>
      </b-row>
      <b-row>
        <b-col>
          <span v-for="s_user in userlist" v-bind:key="s_user.u_no" class="user">
              <router-link :to="{ name: 'class', params: { id: s_user.u_id }}">
                <img v-bind:src="'data:image/jpeg;base64,'+s_user.u_thum" class="thumbnail" width="150px" height="150px">
              </router-link>
              <div>
                <strong>{{s_user.u_name}}</strong>
              </div>
            </span>
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
  }
}
</script>

