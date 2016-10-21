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
      <span class="button button__small js-getUrl" @click="getUrl"><input type="hidden" :name="file.original_name"  :value="file.url">外链链接</span>
      <span class="button button__small js-getMdCode" @click="getMdCode"><input type="hidden" :name="file.original_name" :value="file.url">md语法</span>
      <span class="button button__small" @click="deleteLocalHistory">删除记录</span>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard';
  import store from '../util/store';
  export default {
    props: ['file'],
    data() {
      return {};
    },
    mounted() {
      console.log('file component init...');
      let vm = this;
      new Clipboard('.js-getUrl', {
        text: function(trigger) {
          return trigger.querySelector('input').value;
        }
      });
      new Clipboard('.js-getMdCode', {
        text: function(trigger) {
          let target = trigger.querySelector('input');
          return '[' + target.name + '](' + target.value + ')';
        }
      });
    },
    watch: {
      file(val, old) {
        val.md_url ='[' + val.original_name + '](' + val.url + ')';
        return val;
      }
    },
    methods: {
      getUrl(e) {
        return this.file.url;
      },
      getMdCode() {
        let code = '[' + this.file.original_name + '](' + this.file.url + ')';
        return code;
      },
      deleteLocalHistory() {
        let list = store.get('fileList');
        // this.file = null;
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