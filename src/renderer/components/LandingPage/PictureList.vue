<template>
  <div>
    <el-upload
      ref="upload"
      action=""
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      :multiple="true"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">解析图片</el-button>
      <div slot="tip" class="el-upload__tip">只能解析jpg/png文件</div>
    </el-upload>
    <transition name="el-fade-in">
      <el-progress v-show="showProcessBar" :text-inside="true" :stroke-width="15" :percentage="percentage"></el-progress>
    </transition>
  </div>
</template>
<script>
import {getText} from '../../api/request'
export default {
  data() {
    return {
      fileList: [],
      result: [],
      percentage: 0,
      showProcessBar: false
    }
  },
  methods: {
    async readPic (file) {
      return new Promise((resolve) => {
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(ie) {
          resolve(this.result.split(',')[1])
        }
      })
    },
    async submitUpload() {
      this.showProcessBar = true;
      let i = 0;
      for (let file of this.fileList) {
        const resp = await this.readPic(file)
        const text = await getText(resp)
        this.result.push({
          name: file.name,
          content: text.words_result.map((m) => {return m.words}).join('\n')
        })
        i ++;
        this.percentage = (i / this.fileList.length).toFixed(2) * 100
      }
      this.showProcessBar = false
      this.$emit('analysis', this.result)
      this.$refs.upload.clearFiles()
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((f) => {
        return f.name !== file.name
      })
    },
    handleChange(file, files) {
      this.fileList = files
      this.result = []
    }
  }
}
</script>