<template>
<!--내 강의실-->
<!--내가 올린 모든 동영상에 관한 정보 혹은 요약된 정보를 렌더-->
<!--아직 미구현-->
  <div>
    {{myinfo}}<br>
    {{mylecture}}<br>
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
            <b-drop-item v-for="category in categories" :key="category">{{category}}</b-drop-item>
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
      category_name: ['수능', '공시', '어학', '사회', '투자', '생활', '예술', '기술', '게임', '기타'],
      category_level1: [],
      category_level2: []
    }
  }
}
</script>
