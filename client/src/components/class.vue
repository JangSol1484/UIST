<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{myinfo}}<br>
    {{mylecture}}<br>
    {{categories}}<br>
    {{category_level0}}<br>
    {{category_level1}}<br>
    <router-link :to="{name: 'upload'}">업로드</router-link>
    <b-card bg-variant="light">
          <b-row>
            <b-col>
              <b-form-group horizontal
                      breakpoint="lg"
                      label="업로더 정보:"
                      label-size="lg"
                      label-class="font-weight-bold pt-0"
                      class="mb-0">
             </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-img thumbnail fluid v-bind:src="'data:image/jpeg;base64,'+thumbnail" width = "400px" height="400px"/>
            </b-col>
            <b-col md="8" class="text-left">
              <b-form-group horizontal
                        label="아이디:"
                        label-class="text-sm-right"
                        label-for="my_id"
                        >
              <label>아이디</label>
              </b-form-group>
              <b-form-group horizontal
                        label="업로드한 동영상 수:"
                        label-class="text-sm-right"
                        label-for="my_video"
                        >
              <label>동영상 수</label>
              </b-form-group>
            </b-col>
          </b-row>
      </b-card>
      <br>
      <b-row>
        <b-col>
          <b-dropdown id="set_category" :text="selected_cate_lv0">
            <b-dropdown-item v-for="category in category_level0" 
                            :key="category"
                            @click="selectLevel0(cast_category(category))">
              {{category}}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown v-if="category_on_lv0===true" :text="selected_cate_lv1">
            
          </b-dropdown>
        </b-col>
      </b-row>
      <br>
      <b-card>

      </b-card>
  </div>
</template>

<script>
export default {
  created () {
    let id = this.$route.params.id
    this.$http.get(`/api/lecture/${id}`)
    .then((res) => {
      this.mylecture = res.data
    })
    .catch(() => {
      this.$router.push('/')
      this.$store.dispatch('LOGOUT')
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
      category_level1: []
    }
  },
  methods: {
    cast_category (category) {
      for (let i = 0; i < this.categories.length;) {
        if (this.category_name === this.categories[i].c_name) {
          return this.categories[i].c_level0
        }
      }
    },
    selectLevel0 (categoryNumber) {
      this.selected_cate_lv0 = categoryNumber
      this.category_on_lv0 = true
      for (let i = 0, write = true; i < this.categories.length; i++) {
        for (let j = 0; j < this.category_level1.length; j++) {
          if (this.category_level1[j] === this.categories[i].c_name) {
            write = false
            break
          }
        }
        if (write) {
          this.category_level1.push(this.categories[i].c_name)
        }
        write = true
      }
    }
  }
}
</script>
