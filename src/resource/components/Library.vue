<template>
  <div class="library">
    <h1>Librarty222</h1>
  </div>
</template>
<script>
  import moment from 'moment';
  import FileView from './FileItem.vue';
  export default {
    data() {
      return {};
    },
    components:{
      FileView,
    },
    mounted() {
      this.fetchFilesListFromRemote();
    },
    methods: {
      fetchFilesListFromRemote(){
      }
    }
  }
</script>
<style lang="less">
</style>