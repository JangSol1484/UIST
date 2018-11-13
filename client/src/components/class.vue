<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{msg}}
    <router-link :to="{name: 'upload'}">업로드</router-link>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/user/my/class')
    .then((res) => {
      this.msg = res.data.msg
    })
    .catch(() => { this.$store.dispatch('LOGOUT').then(() => this.$router.push('/login')) })
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>
