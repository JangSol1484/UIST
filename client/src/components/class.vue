<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{myinfo}}<br>
    {{mylecture}}<br>
    <router-link :to="{name: 'upload'}">업로드</router-link>
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
