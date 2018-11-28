<template>
<!--메인화면 홈페이지 /api/lecture에서 받은 정보를 화면에 렌더-->
<!--썸네일은 별도로 /api/contents/thumbnail에서 요청함-->
  <div class="index">
    <div>
      <h1>최신 영상</h1>
      <span v-for="newest in newests" v-bind:key="newest.l_no" class="lecture">
        <router-link :to="{ name: 'lecture', params: { id: newest.l_wr_id, no: newest.l_no }}">
          <img v-bind:src="'data:image/jpeg;base64,'+newest.l_thum" class="thumbnail">
        </router-link>
        <div>
          <strong>{{newest.l_title}}</strong> [{{newest.l_view}}]
        </div>
      </span>
    </div>
    <!--<img v-bind:src="`/api/user/thumbnail/test`" class="thumbnail">-->
    <div>
      <h1>인기 영상</h1>
      <span v-for="popular in populars" v-bind:key="popular.l_no" class="lecture">
        <router-link :to="{ name: 'lecture', params: { id: popular.l_wr_id, no: popular.l_no }}">
          <img v-bind:src="'data:image/jpeg;base64,'+popular.l_thum" class="thumbnail">
        </router-link>
        <div>
          <strong>{{popular.l_title}}</strong> [{{popular.l_view}}]
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/lecture')
    .then((res) => {
      this.newests = res.data.newest
      this.populars = res.data.popular
    })
  },
  data () {
    return {
      newests: [],
      populars: [],
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
  text-align: center;
}
</style>
