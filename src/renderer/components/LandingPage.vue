<template>
  <div class="outer">
    <div class="mgb">
      <el-upload
        class="upload-demo"
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
    </div>
    <transition name="el-fade-in">
      <el-progress v-show="showProcessBar" :text-inside="true" :stroke-width="15" :percentage="percentage"></el-progress>
    </transition>
    <div v-show="result.length && !showProcessBar">
      <div>
        <el-pagination
          :current-page.sync="current"
          :total="result.length"
          :page-size="1"
          :small="true"
          layout="prev, pager, next">
        </el-pagination>
      </div>
      <h2 class="mgb">
        <div class="pncInfo">图片名称：{{result.length ? result[current-1].name : ''}}</div>
        <el-button type="success" icon="el-icon-document-copy" circle title="复制文本" @click="copy"></el-button>
      </h2>
      <el-input
        id="block"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 15}"
        placeholder="请输入内容"
        v-model="areaContent">
      </el-input>
    </div>
  </div>
</template>

<script>
  import {getText} from '../api/request'

  export default {
    name: 'landing-page',
    computed: {
      areaContent: function() {
        return this.result.length ? this.result[this.current - 1].content : ''
      }
    },
    data() {
      return {
        current: 1,
        fileList: [
        ],
        result: [
        ],
        percentage: 0,
        showProcessBar: false
      }
    },
    methods: {
      // open (link) {
      //   this.$electron.shell.openExternal(link)
      // },
      // 实现点击复制textarea区域文本内容
      copy() {
        let block = document.getElementById('block');
        block.select();
        document.execCommand('copy');
        this.$message.success('复制成功！')
      },
      // 图片转成API要求的base64格式
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .outer{
    padding: 0.5em 1em
  }
  
  h2 {
    font-size: 12px;
    font-weight: normal;
    display: flex;
    align-items: center;
  }

  .pncInfo {
    margin-right: 1em;
  }

  .mgb{
    margin-bottom: 0.5em;
  }
</style>
