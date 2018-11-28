<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{myinfo}}<br>
    {{mylecture}}<br>
    {{categories}}<br>
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
              <b-label>아이디</b-label>
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
          <b-dropdown id="set_category" text="카테고리 선택">
            <b-drop-item :v-for="category in category_level1" :key="category" >{{category}}</b-drop-item>
          </b-dropdown>
          <b-dropdown v-if="category_one===true" id="set_sub_category" text="카테고리 선택">
            
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
      this.mylecture = res.data
    })
    this.$http.get('/api/lecture/testapi')
    .then((res) => {
      this.categories = res.data
      for (let i = 0, write = true; i < this.categories.length; i++) {
        for (let j = 0; j < this.category_level1.length; j++) {
          if (this.category_level1[j] === this.categories[i].c_level0) {
            write = false
            break
          }
        }
        if (write) {
          this.category_level1.push(this.categories[i].c_level0)
        }
        write = true
      }
    })
  },
  data () {
    return {
      myinfo: '',
      mylecture: '',
      category_name: ['수능', '공시', '어학', '사회', '투자', '생활', '예술', '기술', '게임', '기타'],
      categories: [],
      category_level2: [],
      category_level1: []
    }
  }
}
</script>
