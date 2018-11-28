<template>
  <div>
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
          <span v-for="user in userlist" v-bind:key="user.l_no" class="lecture">
              <router-link :to="{ name: 'lecture', params: { id: user.l_wr_id, no: user.l_no }}">
                <img v-bind:src="'data:image/jpeg;base64,'+lecture.l_thum" class="thumbnail">
              </router-link>
              <div>
                <strong>{{user.l_title}}</strong> [{{user.l_view}}]
              </div>
            </span>
        </b-col>
      </b-row>
    </b-container>
<br>
      
    유저 검색 :<br>
    {{userlist}}<br>
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

