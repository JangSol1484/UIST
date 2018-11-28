<template>
<!--강의 영상 업로드-->
<!--script는 건드리지 말 것-->
  <div>
    <br>
    <b-container class="w-50">
      <b-row>
        <b-col class="text-left">
          <b-form-group horizontal
                        label="타이틀 : "
                        label-class="text-sm-left"
                        label-for="up_title"
                        >
              <b-form-input v-model="l_title"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group horizontal
                              label="소개 : "
                              label-class="text-sm-left"
                              label-for="l_text">
                  <textarea class="form-control"
                            v-model="l_text"
                            :rows = "3"
                            :max-rows = "6"
                            style="resize:none">
                  </textarea>
          </b-form-group>
          </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-file name = "userfile" v-model="file" :state="Boolean(file)" placeholder="Drag and Drop" @change="loadfile($event.target.name, $event.target.files)" @drop="loadfile($event.target.name, $event.target.files)"></b-form-file>
          <b-progress class = "mt-2" :value="uploadPercentage" max="100" show-progress animated></b-progress>
          <b-button class = "mt-1" size="" variant="secondary" @click="upload">업로드</b-button>
          <button @click="test">test</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
export default {
  created: function () {
    this.formData = new FormData()
  },
  methods: {
    loadfile (name, files) {
      this.targetName = name
      this.targetFile = files[0]
      let type = files[0].type.split('/')
      this.msg = type[1] + files[0].name
      if (type[1] === 'mp4') {
        this.isVideo = true
      }
    },
    upload () {
      if (this.isVideo) {
        if (!this.isFormExist) {
          this.formData.append('title', this.l_title)
          this.formData.append('text', this.l_text)
          this.formData.append(this.targetName, this.targetFile, this.targetFile.name)
          this.isFormExist = true
        }
        this.$http.post('/api/contents/upload/lecture', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          }.bind(this)
        })
        .then((res) => {
          this.$router.push({name: 'myclass'})
        })
      } else {
        alert('동영상만 올려라')
      }
    },
    test () {
      alert(this.l_title + this.l_text)
    }
  },
  data () {
    return {
      msg: 'drag and drop',
      isVideo: false,
      isFormExist: false,
      formData: null,
      targetName: null,
      targetFile: null,
      uploadPercentage: 0
    }
  }
}
</script>

<style scoped>
.dropbox {
  outline: 2px dashed #aaa;
  background: #7fb4dd;
  width: 300px;
  height: 300px;
  position: relative; 
  margin: 0 auto;
  text-align: center;
} 
.dropbox > h2{
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 2;
}
.input-file{
  position: absolute;
  opacity: 0;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index: 3;
}
</style>

