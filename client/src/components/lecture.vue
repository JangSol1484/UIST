<template>
  <div class="row justify-content-md-center mt-3 w-100">
    <div class="col-7 mx-4 px-0">
      <div class="video-inner-container">
        <video class="embed-responsive embed-responsive-16by9" muted="muted" ref="videoPlayer">
          <source v-if="path" :src="path" type="video/mp4">
        </video>
        <div id="video-controls" class="d-flex flex-row mx-0" @mouseover="showControls" @mouseout="hideControls" :style="{animationName: visible, opacity: opacity}">
          <div>
            <button class="play mx-2" v-show="play" ref="btn_play" @click="play_lecture"></button>
            <button class="pause mx-2" v-show="!play" ref="btn_play" @click="play_lecture"></button>
          </div>
          <div class="align-self-center">{{currentTime}} / {{duration}}</div>
          <div class="progress flex-grow-1 mt-2 mx-2" style="height: 15px" @click="seek" ref="seekBar"><div class="progress-bar" role="progressbar" :style="{width: seekPer}" :aria-valuenow="seekVal" aria-valuemin="0" aria-valuemax="100"></div></div>
          <div><range-slider class="slider mt-1" min="0" max="1" step="0.05" v-model="sliderValue" @change="volume"></range-slider></div>
        </div>
        
      </div>
      <div>
        <div class="mt-3">
          <h3>{{lecture.l_title}}</h3>
          <div>
            <div class="d-flex justify-content-between">
              <div>
                {{lecture.l_wr_name}}<br>
                {{lecture.l_date}}<br>
              </div>
              <div class="d-flex flex-column">
                <div>
                  <b-button :variant="like_color" @click="btn_like">좋아요 {{lecture.l_like}}</b-button>
                  <b-button :variant="sub_color" @click="btn_subscribe">구독 {{subscribed}}</b-button>
                </div>
                <div class="text-right">조회수 : {{lecture.l_view}}</div>
              </div>
            </div>

            <hr style="width: 100%; height: 1px; background-color:#BDBDBD;">

            <h6>{{lecture.l_text}}</h6><br>
              
            <router-link :to="{name: 'home'}">뒤로가기</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4">
      <textarea class="form-control" @keydown.tab.prevent="tabed($event.target)" style="resize: none;" :rows="30"></textarea>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  created: function () {
    let self = this
    let id = this.$route.params.id
    let no = this.$route.params.no
    this.$http.get(`/api/lecture/${id}/${no}`)
    .then((res) => {
      this.lecture = res.data.lecture
      this.like = res.data.like
      this.subscribe = res.data.subscribe
      this.subscribed = res.data.subscribed

      if (this.like === true) {
        this.like_color = 'primary'
      }
      if (this.subscribe === true) {
        this.sub_color = 'danger'
      }

      this.target = this.lecture.l_v_name + '.' + this.lecture.l_v_type
      this.path = `/api/contents/video?play=${this.target}`

      this.player = this.$refs.videoPlayer
      this.player.addEventListener('loadedmetadata', function () {
        self.duration = parseInt(this.duration / 60) + ':' + (parseInt(this.duration % 60) >= 10 ? parseInt(this.duration % 60) : '0' + parseInt(this.duration % 60))
        self.currentTime = '0:00'
      }, false)
      this.player.addEventListener('timeupdate', function () {
        self.currentTime = parseInt(this.currentTime / 60) + ':' + (parseInt(this.currentTime % 60) >= 10 ? parseInt(this.currentTime % 60) : '0' + parseInt(this.currentTime % 60))
        self.seekVal = (100 / this.duration) * this.currentTime
        self.seekPer = self.seekVal + '%'
      }, false)
    })
  },
  data: function () {
    return {
      lecture: {},
      path: null,
      note: '',
      target: null,
      visible: null,
      opacity: 0,
      currentTime: null,
      duration: null,
      seekVal: null,
      seekPer: null,
      sliderValue: 0.5,
      play: false,
      player: null,
      like: false,
      like_color: 'secondary',
      sub_color: 'secondary'
    }
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
    btn_like (evnet) {
      let id = this.$route.params.id
      let no = this.$route.params.no
      this.$http.get(`/api/lecture/like/${id}/${no}`)
      .then((res) => {
        if (res.data === 'T') {
          this.like_color = 'primary'
          this.lecture.l_like += 1
        } else if (res.data === 'F') {
          this.like_color = 'secondary'
          this.lecture.l_like -= 1
        } else {
          alert('좋아요는 로그인 후 가능합니다.')
        }
      })
    },
    btn_subscribe (event) {
      let id = this.$route.params.id
      this.$http.get(`/api/user/subscribe/${id}`)
      .then((res) => {
        if (res.data === 'T') {
          this.sub_color = 'danger'
          this.subscribed += 1
        } else if (res.data === 'F') {
          this.sub_color = 'secondary'
          this.subscribed -= 1
        } else {
          alert('구독은 로그인 후 가능합니다.')
        }
      })
    },
    showControls (event) {
      this.visible = 'showControls'
      this.opacity = 0.8
    },
    hideControls (event) {
      this.visible = 'hideControls'
      this.opacity = 0
    },
    play_lecture () {
      if (!this.play) {
        this.player.play()
        this.play = true
      } else {
        this.player.pause()
        this.play = false
      }
    },
    seek (event) {
      this.seekVal = parseInt(event.offsetX / this.$refs.seekBar.offsetWidth * 100)
      this.seekPer = this.seekVal + '%'

      this.player.currentTime = this.seekVal * this.player.duration / 100
    },
    volume (event) {
      this.player.volume = this.sliderValue
    }
  },
  components: {
    RangeSlider
  }
}
</script>

<style scoped>
textarea.form-control {
  overflow: auto;
  width: 100%;
}

video.embed-responsive {
  height: 100%;
}

.slider {
  /* overwrite slider styles */
  width: 100px;
}

.play {
  border: 0;
  background-color: Transparent;
  background-image: url('../assets/pause.png');
  height: 30px;
  width: 30px;
}
.pause {
  border: 0;
  background-color: Transparent;
  background-image: url('../assets/play.png');
  height: 30px;
  width: 30px;
}

#video-controls {
  opacity: 0;
  position: relative;
  margin-top: -40px;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: grey;
  color: white;

  animation-duration: 0.3s;
}

@keyframes hideControls {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

@keyframes showControls {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
