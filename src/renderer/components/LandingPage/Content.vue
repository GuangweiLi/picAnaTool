<template>
  <div>
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
</template>
<script>
export default {
  props: ['result'],
  computed: {
    areaContent: function() {
      return this.result.length ? this.result[this.current - 1].content : ''
    }
  },
  data() {
    return {
      current: 1
    }
  }
}
</script>