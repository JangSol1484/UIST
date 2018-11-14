<template>
  <div>
    {{data}}
  </div>
</template>

<script>
export default {
  created () {
    let query = this.$route.params.query
    this.$http.get(`/api/search/lecture?query=${query}`)
    .then((res) => {
      this.data = res.data
    })
  },
  data () {
    return {
      data: null
    }
  }
}
</script>

