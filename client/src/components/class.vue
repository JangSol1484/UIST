<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{mylecture}}<br>
    {{categories}}<br>
    {{category_level0}}<br>
    {{category_level1}}<br>
    <b-container>
      <b-row>
        <b-col><h2>님의 강의실</h2></b-col>
        <b-col class="text-right">
          <b-button variant="dark" router-link :to="{name: 'upload'}" >업로드</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card bg-variant="light">
            <b-row>
              <b-col>
                <b-img thumbnail fluid v-bind:src="'data:image/jpeg;base64,'+thumbnail" width = "400px" height="400px"/>
              </b-col>
              <b-col md="8" class="text-center">
                <p>구독자 : 명</p>
                <p>동영상 : 개</p>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-dropdown id="set_category" :text="selected_cate_lv0" >
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
      <b-row>
        <b-card v-if = "this.category_on_lv1===true">
          <span v-for="video in selected_lecture" :key="video.l_no" class="lecture">
            <router-link :to="{ name: 'lecture', params: { id: video.l_wr_id, no: video.l_no }}">
              <img v-bind:src="'data:image/jpeg;base64,'+video.l_thum" class="thumbnail">
            </router-link>
            <div>
              <strong>{{video.l_title}}</strong> [{{video.l_view}}]
            </div>
          </span>
        </b-card>
      </b-row>
    </b-container>
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
  },
  data () {
    return {
      myinfo: '',
      mylecture: '',
      selected_cate_lv0: '카테고리 선택',
      selected_cate_lv1: '카테고리 선택',
      category_on_lv0: false,
      category_on_lv1: false,
      category_name: ['수능', '공시', '어학', '사회', '투자', '생활', '예술', '기술', '게임', '기타'],
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
