<template>
  <div class="outer">
    <div class="mgb">
      <PictureList @analysis="getResult"></PictureList>
    </div>
    <div v-show="result.length">
      <Content :result="result"></Content>
    </div>
  </div>
</template>

<script>
  
  import Content from './LandingPage/Content'
  import PictureList from './LandingPage/PictureList'

  export default {
    name: 'landing-page',
    components: {
      Content,
      PictureList
    },
    data() {
      return {
        result: []
      }
    },
    methods: {
      // 图片转成API要求的base64格式
      getResult(result) {
        this.result = result
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
