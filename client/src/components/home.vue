<template>
  <div class="lecture">
    <h1>강의 목록</h1>
    <div v-for="lecture in lectures" v-bind:key="lecture.l_no" class="movie">
      <img v-bind:src="`/api/contents/thumbnail/${lecture.l_thum}`" class="thumbnail">
      <div>
        <strong>{{lecture.l_no}}</strong> {{lecture.l_title}} [{{lecture.l_view}}]
        <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr, no: lecture.l_no }}">더보기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  created () {
    this.$http.get('/api/lecture')
    .then((res) => {
      this.lectures = res.data.lecture
    })
  },
  data () {
    return {
      lectures: [],
      login: []
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
  left: 20%;
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
