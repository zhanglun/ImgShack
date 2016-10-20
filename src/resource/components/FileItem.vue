<template>
  <div class="file">
    <div class="file-thumbnail">
      <img :src="file.thumbnail" alt="" class="file-thumbnail__images">
    </div>
    <div class="file-info">
      <div class="file-name">
        {{file.original_name}}
      </div>
      <div class="file-metadata">
        大小: {{file.size}}
      </div>
      <div class="file-metadata">
        时间: {{file.upload_at}}
      </div>
    </div>
    <div class="file-actions">
      <span class="button button__small" @click="getUrl">外链链接</span>
      <span class="button button__small" @click="getMdCode">md语法</span>
      <span class="button button__small">删除记录</span>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['file'],
    data() {
      return {};
    },
    mounted() {
      console.log('file component init...');
    },
    methods: {
      getUrl() {
        return this.file.url;
      },
      getMdCode() {
        let code = '[' + this.file.original_name + '](' + this.file.url + ')';
        console.log(code);
        return code;
      }
    }
  }
</script>
<style lang="less">
  .file {
    height: 80px;
    overflow: hidden;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    &-thumbnail {
      // float: left;
      width: 60px;
      height: 60px;
      margin-right: 10px;

      font-size: 0;
      border: 1px solid #d3d3d3;
      &__images {
        float: left;
      }
    }
    &-info{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // margin-left: 70px;
      font-size: 1.2rem;
      flex:1;
    }
    &-actions {

    }
  }  
</style>