<template>
  <div class>
    반갑습니다! <span v-text="login"></span>

    <span v-if="!isAuthenticated || !login">
      <router-link :to="{name: 'login'}">로그인</router-link>
      <router-link :to="{name: 'signin'}">회원가입</router-link>
      id : test, pw : 1111
    </span>

    <span v-else-if="isAuthenticated && login">
      <router-link :to="{name: 'my'}">마이페이지</router-link>
      <a href="" @click.prevent="onClickLogout">로그아웃</a>
    </span>
    
    <h1>강의 목록</h1>
    <div v-for="lecture in lectures" v-bind:key="lecture.l_no" class="movie">
      <img v-bind:src="lecture.thum" class="poster">
      <div>
        <strong>{{lecture.l_no}}</strong> {{lecture.l_title}} {{lecture.l_thum}} [{{lecture.l_view}}]
        <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr, no: lecture.l_no }}">더보기</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import store from '../store'

export default {
  created () {
    this.$http.get('/api/lecture')
    .then((res) => {
      this.lectures = res.data.lecture
    })
    this.$http.get('/api/user')
    .then((res) => {
      this.login = res.data.login
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
    isAuthenticated () {
      return store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      store.dispatch('LOGOUT').then(() => this.$router.push('/'))
      this.login = ''
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.index {
  position: relative;
  left: 20%;
}
.poster {
  width: 185px;
  vertical-align: middle;
}

.movie {
  display: inline-block;
  padding: 10px;
  text-align: center;
}
</style>
