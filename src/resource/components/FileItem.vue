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
    {{file.originalName}}
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
    &-thumbnail {
      float: left;
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
      margin-left: 70px;
      font-size: 1.2rem;
    }
  }  
</style>