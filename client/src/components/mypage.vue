<template>
<!--유저 정보에 관한 요약 정보 렌더-->
<!--내가 시청한 강의와 내가 업로드한 강의-->
  <div>
    <h2>Me</h2>
    <div>
      <label>User Info:</label>
      <pre>{{user}}</pre>
    </div>
    <div>
      <label>Access Log:</label>
      <div v-for="log in accessLog" v-bind:key="log.userId">{{log.userId}}, {{log.createdAt}}</div>
    </div>
    <router-link :to="{name: 'myclass'}">내강의실</router-link>
  </div>
</template>

<script>
  
  export default {
    data () {
      return {
        user: null,
        accessLog: []
      }
    },
    created () {
      this.$http.get('api/user/my')
        .then((res) => {
          this.user = res.data.user// 로그아웃하기
        })
        .catch(() => { this.$router.push('/') })
    }
  }
</script>
