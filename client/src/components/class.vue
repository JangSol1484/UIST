<template>
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
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>
