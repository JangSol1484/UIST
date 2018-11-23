<template>
<!--유저 정보에 관한 요약 정보 렌더-->
<!--내가 시청한 강의와 내가 업로드한 강의-->
  <div>
    <h2>Me</h2>
    <div>
      <label>User Info:</label>
      <pre>{{user}}</pre>
      <img v-bind:src="'data:image/jpeg;base64,'+thumbnail" width = "180px" height="100px">
    </div>
    <router-link :to="{name: 'myclass'}">내강의실</router-link>
  </div>
</template>

<script>
  
  export default {
    data () {
      return {
        user: null,
        thumbnail: null
      }
    },
    created () {
      this.$http.get('api/user/my')
        .then((res) => {
          this.user = res.data.user
          this.$http.get(`api/user/thumbnail/${this.user.u_id}`)
          .then((res) => {
            this.thumbnail = res.data
          })
        })
        .catch(() => {
          this.$router.push('/')
          this.$store.dispatch('LOGOUT')
        })
    }
  }
</script>
