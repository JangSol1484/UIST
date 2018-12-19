<template>
<!--강의 영상 업로드-->
<!--script는 건드리지 말 것-->
  <div>
    <br>
    <b-container class="w-50">
      <b-row>
        <h2>업로드</h2>
      </b-row>
      <br><br>
      <b-row>
        <b-col class="text-left">
          <b-form-group
                        :label-cols="2"
                        label="타이틀 : "
                        label-class="text-sm-right"
                        label-for="up_title"
                        >          
              <b-form-input v-model="l_title"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="5" class="text-right">
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
          </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
                        :label-cols="2"
                        label="소개 : "
                        label-class="text-sm-right"
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
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-progress class = "mt-2" :value="uploadPercentage" max="100" show-progress animated></b-progress>
          <b-button class = "mt-1" size="" variant="secondary" @click="upload">업로드</b-button>
          <b-button class="mt-1" variant="secondary" router-link :to="{name: 'myclass'}">취소</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



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
          this.formData.append('category', this.selected_cate_lv1)
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
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].c_level0 === this.cast_category0(categoryName0) && this.cast_category0(categoryName0) !== '9') {
          if (this.categories[i].c_level1 !== '00') {
            this.category_level1.push(this.categories[i].c_name)
          }
        }
      }
      if (this.cast_category0(categoryName0) === '9') {
        this.category_on_lv0 = false
        this.category_on_lv1 = true
        this.selected_category = '900'
      }
    },
    selectLevel1 (categoryName1) {
      this.selected_cate_lv1 = categoryName1
      this.category_on_lv1 = true
      this.selected_lecture = []
      let categoryNumber0
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].c_name === categoryName1) {
          categoryNumber0 = this.categories[i].c_level0
        }
      }
      this.selected_category = categoryNumber0 + this.cast_category1(categoryName1)
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
      uploadPercentage: 0,
      selected_cate_lv0: '카테고리 선택',
      selected_cate_lv1: '2 카테고리 선택',
      category_on_lv0: false,
      category_on_lv1: false,
      category_level0: [],
      category_level1: [],
      categories: '',
      selected_category: ''
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

