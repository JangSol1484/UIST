<template>
<!--강의 영상과 강의 정보를 렌더-->
<!--우측 note는 지속적으로 ajax로 서버와 통신하며 값을 DB에 갱신, 미구현-->
  <div>
    <div class="video">
      <video-player  class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        customEventName="customstatechangedeventname"
 
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @statechanged="playerStateChanged($event)"
        @ready="playerReadied">
      </video-player>
      <!--
        <video id="myvideo" v-bind:src = "path" controls autoplay preload="metadata" ref="myvideo"></video>
        
      -->
    </div>
    <div class="contents">
      제목 : {{lecture.l_title}}<br>
      본문 : {{lecture.l_text}}<br>
      작성자 : {{lecture.l_wr}}<br>
      작성일 : {{lecture.l_date}}<br>
      조회수 : {{lecture.l_view}}<br>
      파일 : {{play}}<br>

      <button v-on:click="getCurrentTime">dddddddddd</button>
      
    <router-link :to="{name: 'home'}">뒤로가기</router-link>
    </div>
    <textarea class="note" @keydown.tab.prevent="tabed($event.target)" style="resize: none;"></textarea>
  </div>
</template>

<script>
export default {
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  created: function () {
    let id = this.$route.params.id
    let no = this.$route.params.no
    this.$http.get(`/api/lecture/${id}/${no}`)
    .then((res) => {
      this.lecture = res.data
      this.play = this.lecture.l_v_name + '.' + this.lecture.l_v_type
      this.path = `/api/contents/video?play=${this.play}`
      this.playerOptions = {
        autoplay: true,
        muted: false,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.2, 1.5, 2.0],
        width: '960px',
        height: '540px',
        sources: [{
          type: 'video/mp4',
          src: `/api/contents/video?play=${this.play}`
        }]// ,
        // poster: "/static/images/author.jpg",
      }
    })
  },
  data: function () {
    return {
      lecture: {},
      path: '',
      note: '',
      play: '',
      playerOptions: null
    }
  },
  mounted () {
    // this.currentTime = this.$refs.myvideo.currentTime
  },
  methods: {
    tabed (textareas) {
      let tab = '    '
      let cursor = textareas.selectionStart
      let value = textareas.value
      textareas.value = value.substring(0, cursor) + tab + value.substring(cursor, value.length)
      textareas.selectionDirection = 'none'
      textareas.setSelectionRange(cursor + 4, cursor + 4)
    },
    onPlayerPlay (player) {
        // console.log('player play!', player)
    },
    onPlayerPause (player) {
        // console.log('player pause!', player)
    },
      // ...player event
      // or listen state event
    playerStateChanged (playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
    },
      // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
    },
    getCurrentTime (event) {
      console.log(this.$refs.videoPlayer.video.currentTime())
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
  width: 960px;
  height: 540px;
}
textarea.note {
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
