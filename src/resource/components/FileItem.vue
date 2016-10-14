<template>
  <div class="file">
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