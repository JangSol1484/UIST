<template>
<!--강의 영상과 강의 정보를 렌더-->
<!--우측 note는 지속적으로 ajax로 서버와 통신하며 값을 DB에 갱신, 미구현-->
  <div>
    <div class="video">
      <video v-bind:src = "path" controls></video>
    </div>
    <div class="contents">
      제목 : {{lecture.l_title}}<br>
      본문 : {{lecture.l_text}}<br>
      작성자 : {{lecture.l_wr}}<br>
      작성일 : {{lecture.l_date}}<br>
      조회수 : {{lecture.l_view}}<br>
      파일 : {{play}}<br>
      
    <router-link :to="{name: 'home'}">뒤로가기</router-link>
    </div>
    <div class="note" contentEditable="true" @input="getPos($event)" @keydown.tab.prevent="tabed"></div>
  </div>
</template>

<script>
export default {
  created: function () {
    let id = this.$route.params.id
    let no = this.$route.params.no
    this.$http.get(`/api/lecture/${id}/${no}`)
    .then((res) => {
      this.lecture = res.data[0]
      this.play = this.lecture.l_v_name + '.' + this.lecture.l_v_type
      this.path = `/api/contents/video?play=${this.play}`
    })
  },
  data: function () {
    return {
      lecture: {},
      path: '',
      note: '',
      play: ''
    }
  },
  methods: {
    tabed () {
    },
    getPos (e) {
      console.log(e.target)
    }
  }
}
</script>

<style scoped>
div.video {
  position: absolute;
  left: 0%;
  width: 960px;
  height: 540px;
}
div.video > video {
  width: 100%;
  height: 100%;
}
div.note {
  position: absolute;
  padding: 5px;
  left: 970px;
  width: 490px;
  height: 540px;
  overflow: auto;
  background-color: aliceblue;
}
div.contents {
  position: absolute;
  top: 550px;
  width: 960px;
}
</style>
