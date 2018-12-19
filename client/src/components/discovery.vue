<template>
  <div>
    <br>
    <b-row>
      <b-col>
        {{lectures}}
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
    <b-row>
      <!--selected_category로 동영상 요청 후 영상 뿌리기, 해당 변수에는 113 001 등 선택된 카테고리 번호가 들어있음-->
      <span v-if="category_on_lv1===true" v-for="lecture in lectures" v-bind:key="lecture.l_no" class="lecture">
          <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr_id, no: lecture.l_no }}">
              <img v-bind:src="'data:image/jpeg;base64,'+lecture.l_thum" class="thumbnail">
          </router-link>
          <div>
              <strong>{{lecture.l_title}}</strong> [{{lecture.l_view}}]
          </div>
      </span>
    </b-row>
  </div>
</template>

<!--동영상 가져오는 쿼리 필요-->
<script>
export default {
  created () {
    this.formData = new FormData()
    this.$http.get('/api/category')
    .then((res) => {
      this.categories = res.data
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].c_level1 === '00') {
          this.category_level0.push(this.categories[i].c_name)
        }
      }
    })
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
      this.selected_cate_lv1 = '카테고리 선택'
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
      let getLectures = '/api/discovery/' + this.cast_category0(categoryName0)
      alert(getLectures)
      this.$http.get(getLectures)
      .then((res) => {
        this.lectures = res.data
      })
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
      this.selected_category = categoryNumber0 + this.cast_category1(categoryName1)
      for (let j = 0; j < this.mylecture.length; j++) {
        if (this.mylecture[j].l_category === this.selected_category) {
          this.selected_lecture.push(this.mylecture[j])
        }
      }
    }
  },
  data () {
    return {
      selected_cate_lv0: '카테고리 선택',
      selected_cate_lv1: '카테고리 선택',
      category_level0: [],
      category_level1: [],
      category_on_lv0: false,
      category_on_lv1: false,
      categories: '',
      selected_category0: '',
      selected_category1: '',
      lectures: []
    }
  }
}
</script>
