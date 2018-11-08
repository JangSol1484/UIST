<template>
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
          this.user = res.data.user
          this.accessLog = res.data.accessLog
        })
    }
  }
</script>
