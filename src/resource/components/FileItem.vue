<template>
  <div class="file">
    <div class="file-thumbnail">
      <img :src="file.thumbnail" alt="" class="file-thumbnail__images">
    </div>
    <div class="file-info">
      <div class="file-name">
        {{file.original_name}}
      </div>

<!--       <div class="file-metadata" v-if="file.size">
        {{file.size}}
      </div> -->
      <div class="file-metadata" v-if="file.upload_at">
        {{file.upload_at}}
      </div>
    </div>

    <div class="file-actions">
      <span class="button button__small js-getUrl" v-if="file.url"><input type="hidden" :name="file.original_name"  :value="file.url">外链链接</span>
      <span class="button button__small js-getMdCode" v-if="file.url"><input type="hidden" :name="file.original_name" :value="file.url">md语法</span>
    </div>
    <div class="file-state" v-if="file.uploading">
      <div class="file-state__progressbox">
        <span class="file-state__progressbar" :style="{'width': file.percent + '%'}" :data-percent="file.percent"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import timeago from 'timeago.js';
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
        val.upload_at = new timeago().format(old.upload_at);
        return val;
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .file {
    height: 70px;
    overflow: hidden;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    &-thumbnail {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      font-size: 0;
      border: 1px solid #d3d3d3;
      background: url('../images/loading.svg') no-repeat center center ;
      &__images {
        float: left;
        width: 50px;
        height: 50px;
      }
    }
    &-name {
      font-size:13px;
      font-weight: bolder;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-info{
      height: 100%;
      max-width: 260px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 1.2rem;
      flex:1;
    }
    &-state {
      width: 100%;
      &__progressbox {
        width: 100%;
        height: 5px;
        margin-top: 3px;
      }
      &__progressbar {
        height: 100%;
        display: block;
        background: green;
        background-color: #14c3a2;
        background-image: repeating-linear-gradient(-45deg, #14c3a2, #14c3a2 30px, #22e8c3 30px, #22e8c3 60px);
        background-size: 600px 100%;
        border-radius: 8px;
        &:after {
          // content: attr(data-percent);
          // float: right;
          // color: #fff;
        }
      }
    }
    &-actions {
      width: 74px;
    }
  }
</style>