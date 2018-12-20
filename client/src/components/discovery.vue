<template>
  <div class="discovery">
    <b-container class="mt-5 h-100">
      <div class="d-flex flex-column h-100">
        <div>
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
        </div>
        <div>
          <!--selected_category로 동영상 요청 후 영상 뿌리기, 해당 변수에는 113 001 등 선택된 카테고리 번호가 들어있음-->
          <span v-if="category_on_lv1===true" v-for="lecture in lectures" v-bind:key="lecture.l_no" class="lecture">
              <router-link :to="{ name: 'lecture', params: { id: lecture.l_wr_id, no: lecture.l_no }}">
                  <img v-bind:src="'data:image/jpeg;base64,'+lecture.l_thum" class="thumbnail">
              </router-link>
              <div>
                  <div class="p-0"><strong class="d-inline-block text-truncate" style="max-width:185px">{{lecture.l_title}}</strong></div>
                  <div class="p-0 text-right"><i class="fas fa-eye mx-1"></i> {{lecture.l_view}} <i class="fas fa-thumbs-up mx-1"></i> {{lecture.l_like}}</div>
              </div>
          </span>
        </div>
        <div class="mt-auto">
          <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#" tabindex="-1">Previous</a></li>
            <li class="page-item" v-for="(item, index) in pagenation" v-bind:key="index" @click="selectpage"><div class="page-link">{{item}}</div></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </b-container>
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
    },
    selectLevel1 (categoryName1) {
      this.selected_cate_lv1 = categoryName1
      this.category_on_lv1 = true
      this.selected_lecture = []
      this.lectures = []
      let categoryNumber0
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].c_name === categoryName1) {
          categoryNumber0 = this.categories[i].c_level0
        }
      }
      this.selected_category = categoryNumber0 + this.cast_category1(categoryName1)
      this.selectedCatNo = categoryNumber0
      let getLectures = '/api/discovery/' + categoryNumber0 + '/1'
      this.$http.get(getLectures)
      .then((res) => {
        this.lecturesTemp = res.data.discovery
        let cnt = parseInt(res.data.cnt / 15) + 1
        this.pagenation = {}
        for (let i = 0; i < cnt; i++) {
          this.pagenation[i] = i + 1
        }
        for (let j = 0; j < this.lecturesTemp.length; j++) {
          if (this.lecturesTemp[j].l_category === this.selected_category) {
            this.lectures.push(this.lecturesTemp[j])
          }
        }
      })
    },
    selectpage (event) {
      // console.log(event.target.innerHTML)
      this.selected_lecture = []
      this.lectures = []
      let offset = event.target.innerHTML
      let getLectures = '/api/discovery/' + this.selectedCatNo + '/' + offset
      this.$http.get(getLectures)
      .then((res) => {
        this.lecturesTemp = res.data.discovery
        let cnt = parseInt(res.data.cnt / 15) + 1
        this.pagenation = {}
        for (let i = 0; i < cnt; i++) {
          this.pagenation[i] = i + 1
        }
        for (let j = 0; j < this.lecturesTemp.length; j++) {
          if (this.lecturesTemp[j].l_category === this.selected_category) {
            this.lectures.push(this.lecturesTemp[j])
          }
        }
      })
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
      lectures: [],
      lecturesTemp: [],
      pagenation: null,
      selectedCatNo: null
    }
  }
}
</script>

<style scoped>
.thumbnail {
  width: 185px;
  vertical-align: middle;
}

.lecture {
  display: inline-block;
  padding: 10px;
}
.discovery {
  height: 80vh;
}
</style>
