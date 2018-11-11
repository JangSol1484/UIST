<template>
  <div>
    title:<input type = "text" name = "l_title" v-model = "l_title">
    <br>
    text:<textarea name = "l_text" v-model = "l_text"></textarea>
    <br>
    <div class = "dropbox">
      <input class = "input-file" type = "file" name = "userfile" @change="loadfile($event.target.name, $event.target.files)" @drop="loadfile($event.target.name, $event.target.files)">
      <h2 v-text="msg"></h2>
    </div>
    <progress max="100" :value.prop="uploadPercentage"></progress>
    <br>
    <input type = "button" @click="upload" value = "업로드">
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
      if (type[1] === 'mp4' || type[1] === 'avi' || type[1] === 'mkv') {
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
        this.$http.post('/api/contents/upload', this.formData, {
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

<style>
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

