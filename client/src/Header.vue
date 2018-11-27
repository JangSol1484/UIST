<template>
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">UIST</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">탐색</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="SearchQuery">
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" name="query" v-model="query"/>
            <b-button size="sm" class="my-2 my-sm-0" type="button" @click="SearchQuery">Search</b-button>
          </b-nav-form>
          <span class='user' id = "loginbar" v-if="!this.$store.getters.getName" >
            <router-link :to="{name: 'login'}" id="lglink">로그인</router-link>
            <router-link :to="{name: 'signup'}" id="sglink">회원가입</router-link>
          </span>

          <b-nav-item-dropdown right  id="drop" v-if="this.$store.getters.getName" v-b-popover.hover = "navDrop">
            <template slot="button-content" >
              <span class='user' v-if="this.$store.getters.getName" >
                반갑습니다 <span v-text="this.$store.getters.getName"></span> 님!
              </span>
            </template>
            <b-dropdown-item>
              <router-link :to="{name: 'my'}">마이페이지</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <a href="" @click.prevent="onClickLogout">로그아웃</a>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  created () {
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onClickLogout () {
      this.$store.dispatch('LOGOUT')
      this.username = null
    },
    SearchQuery () {
      let query = this.query
      this.$router.push(`/search/${query}`)
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 40px;
}

.user {
  text-align: right;
}
</style>
