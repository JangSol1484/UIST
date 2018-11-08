<template>
  <div>
    title:<input type = "text" name = "l_title" v-model = "l_title">
    <br>
    text:<textarea name = "l_text" v-model = "l_text"></textarea>
    <br>
    <div class = "dropbox">
      <input class = "input-file" type = "file" name = "userfile" @change="loadfile($event.target.name, $event.target.files)" @drop="loadfile($event.target.name, $event.target.files)">
      <h2>드래그앤드롭</h2>
    </div>
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
      this.formData.append(name, files[0], files[0].name)
    },
    upload () {
      this.formData.append('title', this.l_title)
      this.formData.append('text', this.l_text)
      this.$http.post('/api/contents/upload', this.formData).then((res) => {
        this.$router.push({name: 'myclass'})
      })
    }
  },
  data () {
    return {
      formData: ''
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

