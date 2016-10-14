<template>
  <div class="file">
    <div class="file-thumbnail">
      <img :src="file.thumbnail" alt="" class="fle-thumbnaill__image">
    </div>
    <div class="file-info">
      <div class="file-name">
        {{file.original_name}}
      </div>
      <div class="file-metadata">
        上传时间：{{file.upload_at}}
        大小: {{file.size}}
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
  
</style>