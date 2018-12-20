<template>
<!--메인화면 홈페이지 /api/lecture에서 받은 정보를 화면에 렌더-->
  <div class="index">
    <br>
    <b-container>
      <b-row v-if="subscribeds">
        <h1>구독</h1>
      </b-row>
      <b-row>
        <b-col>
          <span v-for="subscribed in subscribeds" v-bind:key="subscribed.l_no" class="lecture">
            <router-link :to="{ name: 'lecture', params: { id: subscribed.l_wr_id, no: subscribed.l_no }}">
              <img v-bind:src="'data:image/jpeg;base64,'+subscribed.l_thum" class="thumbnail">
            </router-link>
            <div class="d-flex flex-column mb-3">
              <div class="p-0"><strong class="d-inline-block text-truncate" style="max-width:185px">{{subscribed.l_title}}</strong></div>
              <div class="p-0 text-right"><i class="fas fa-eye mx-1"></i> {{subscribed.l_view}} <i class="fas fa-thumbs-up mx-1"></i> {{subscribed.l_like}}</div>
            </div>
          </span>
        </b-col>
      </b-row>
      <b-row v-if="newests">
        <h1>최신 강의</h1>
      </b-row>
      <b-row>
        <b-col>
          <span v-for="newest in newests" v-bind:key="newest.l_no" class="lecture">
            <router-link :to="{ name: 'lecture', params: { id: newest.l_wr_id, no: newest.l_no }}">
              <img v-bind:src="'data:image/jpeg;base64,'+newest.l_thum" class="thumbnail">
            </router-link>
            <div class="d-flex flex-column mb-3">
              <div class="p-0"><strong class="d-inline-block text-truncate" style="max-width:185px">{{newest.l_title}}</strong></div>
              <div class="p-0 text-right"><i class="fas fa-eye mx-1"></i> {{newest.l_view}} <i class="fas fa-thumbs-up mx-1"></i> {{newest.l_like}}</div>
            </div>
          </span>
        </b-col>
      </b-row>
      <b-row v-if="populars">
        <h1>인기 강의</h1>
      </b-row>
      <b-row>
        <b-col>
          <span v-for="popular in populars" v-bind:key="popular.l_no" class="lecture">
            <router-link :to="{ name: 'lecture', params: { id: popular.l_wr_id, no: popular.l_no }}">
              <img v-bind:src="'data:image/jpeg;base64,'+popular.l_thum" class="thumbnail">
            </router-link>
            <div class="d-flex flex-column mb-3">
              <div class="p-0"><strong class="d-inline-block text-truncate" style="max-width:185px">{{popular.l_title}}</strong></div>
              <div class="p-0 text-right"><i class="fas fa-eye mx-1"></i> {{popular.l_view}} <i class="fas fa-thumbs-up mx-1"></i> {{popular.l_like}}</div>
            </div>
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/lecture')
    .then((res) => {
      this.subscribeds = res.data.subscribed
      this.newests = res.data.newest
      this.populars = res.data.popular
    })
  },
  data () {
    return {
      subscribeds: false,
      newests: false,
      populars: false,
      login: [],
      test: null
    }
  },
  name: 'home',
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.index {
  position: relative;
}
.thumbnail {
  width: 185px;
  vertical-align: middle;
}

.lecture {
  display: inline-block;
  padding: 10px;
}
</style>
