<template>
<!--내 강의실 and X의 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    <br>
    {{categories}}
    <b-container>
      <b-row class="mb-2 w-100">
        <b-col><h1>{{this.$store.getters.getName}}님의 강의실</h1></b-col>
        <b-col class="text-right">
          <b-button variant="dark" router-link :to="{name: 'upload'}" >업로드</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-4 w-100">
        <b-col>
          <b-card bg-variant="light">
            <b-row>
              <b-col>
                <b-img thumbnail fluid v-bind:src="'data:image/jpeg;base64,'+thumbnail" width = "400px" height="400px"/>
              </b-col>
              <b-col class="d-flex align-items-end flex-column">
                <div class="h6">{{upinfo[0].lectures}}개의 강의가 업로드 됨</div>
                <div class="h6">구독자 : {{upinfo[0].follower}}명</div>
                <div class="h4 mt-auto">{{upinfo[0].intro}}</div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mb-3 w-100">
        <b-col>
          <b-dropdown :text="selected_cate_lv0" >
            <b-dropdown-item v-for="category0 in category_level0" 
                            :key="category0"
                            @click="selectLevel0(category0)">
              {{category0}}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown v-if="category_on_lv0===true" :text="selected_cate_lv1">
            <b-dropdown-item v-for="category1 in category_level1"
                            :key="category1"
                            @click="selectLevel1(category1)">
              {{category1}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
      <b-row class="w-100">
        <b-col>
          <b-card class="w-100" v-if = "this.category_on_lv1===true">
            <div class="d-flex flex-column border-bottom mb-4" v-for="video in selected_lecture" :key="video.l_no">
              <div class="d-flex flex-row">
                <router-link :to="{ name: 'lecture', params: { id: video.l_wr_id, no: video.l_no }}">
                  <img class="mb-3" v-bind:src="'data:image/jpeg;base64,'+video.l_thum" width="185px">
                </router-link>
                <div class="d-flex flex-column mx-3">
                  <div class="h3 mb-3">{{video.l_title}}</div>
                  <div class="h5">{{video.l_text}}</div>
                  <div class="h6 mt-auto mb-3">조회수 : {{video.l_view}} 좋아요 : {{video.l_like}}</div>
                </div>
                <div class="h6 ml-auto mb-3 align-self-end">
                  수정 삭제
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  created () {
    let id = this.$route.params.id
    this.$http.get(`/api/lecture/${id}`)
    .then((res) => {
      this.mylecture = res.data.lecture
      this.categories = res.data.categoryInfo

      for (let i = 0, write = true; i < this.categories.length; i++) {
        for (let j = 0; j < this.category_level0_temp.length; j++) {
          if (this.category_level0_temp[j] === this.categories[i].c_level0) {
            write = false
            break
          }
        }
        if (write) {
          this.category_level0_temp.push(this.categories[i].c_level0)
        }
        write = true
      }
      for (let i in this.category_level0_temp) {
        this.category_level0.push(this.category_name[this.category_level0_temp[i]])
      }
    })
    .catch(() => {
      alert('로그인이 만료되었습니다.')
      this.$router.push('/')
      this.$store.dispatch('LOGOUT')
    })
    this.$http.get(`/api/user/thumbnail/${this.$route.params.id}`)
    .then((res) => {
      this.thumbnail = res.data
    })
    this.$http.get(`/api/user/my/class`)
    .then((res) => {
      this.upinfo = res.data
    })
  },
  data () {
    return {
      upinfo: '',
      myinfo: '',
      mylecture: '',
      thumbnail: null,
      selected_cate_lv0: '카테고리 선택',
      selected_cate_lv1: '카테고리 선택',
      category_name: ['수능', '공시', '어학', '사회', '투자', '생활', '예술', '기술', '게임', '기타', '전체'],
      category_on_lv0: false,
      category_on_lv1: false,
      categories: [],
      category_level0_temp: [],
      category_level0: [],
      category_level1: [],
      selected_lecture: []
    }
  },
  methods: {
    cast_category0 (categoryName) {
      for (let i = 0; i < this.categories.length; i++) {
        if (categoryName === this.categories[i].c_name) {
          return this.categories[i].c_level0
        }
      }
    },
    cast_category1 (categoryName) {
      for (let i = 0; i < this.categories.length; i++) {
        if (categoryName === this.categories[i].c_name) {
          return this.categories[i].c_level1
        }
      }
    },
    selectLevel0 (categoryName0) {
      this.selected_cate_lv0 = categoryName0
      this.category_on_lv0 = true
      this.category_on_lv1 = false
      this.category_level1 = []

      for (let i = 0, write = true; i < this.categories.length; i++) {
        if (this.cast_category0(categoryName0) === this.categories[i].c_level0) {
          for (let j = 0; j < this.category_level1.length; j++) {
            if (this.category_level1[j] === this.categories[i].c_name) {
              write = false
              break
            }
          }
          if (this.categories[i].c_level1 === '00') {
            write = false
          }
          if (write) {
            this.category_level1.push(this.categories[i].c_name)
          }
        }
        write = true
      }
    },
    selectLevel1 (categoryName1) {
      this.selected_cate_lv1 = categoryName1
      this.category_on_lv1 = true
      this.selected_lecture = []
      let categoryNumber0
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].c_name === categoryName1) {
          categoryNumber0 = this.categories[i].c_level0
        }
      }
      let category = categoryNumber0 + this.cast_category1(categoryName1)
      for (let j = 0; j < this.mylecture.length; j++) {
        if (this.mylecture[j].l_category === category) {
          this.selected_lecture.push(this.mylecture[j])
        }
      }
    }
  }
}
</script>
