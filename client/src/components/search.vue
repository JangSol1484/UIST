<template>
  <div>
    강의 검색 :<br>
    {{lecturelist}}<br>
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

