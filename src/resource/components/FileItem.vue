<template>
  <div class="file">
    <div class="file-thumbnail">
      <img :src="file.thumbnail" alt="" class="file-thumbnail__images">
    </div>
    <div class="file-state" v-if="file.uploading">
      <div class="file-state__progressbox" :style="{'height': (100-file.percent) + '%'}" :data-percent="file.percent">
        {{file.percent}}%
      </div>
    </div>
    <div class="file-info">
      <div class="file-name">
        <div>
          {{file.original_name}}
        </div>
        <span class="button button__small js-getUrl" v-if="file.url"><input type="hidden" :name="file.original_name"  :value="file.url">外链链接</span>
        <span class="button button__small js-getMdCode" v-if="file.url"><input type="hidden" :name="file.original_name" :value="file.url">md语法</span>
      </div>
      <div class="file-metadata" v-if="file.upload_at">
        {{file.upload_at}}
      </div>
    </div>

  </div>
</template>
<script>
  // import timeago from 'timeago.js';
  import Clipboard from 'clipboard';
  import store from '../util/store';
  export default {
    props: ['file'],
    data() {
      return {};
    },
    mounted() {
      let vm = this;
      new Clipboard('.js-getUrl', {
        text: function(trigger) {
          return trigger.querySelector('input').value;
        }
      });
      new Clipboard('.js-getMdCode', {
        text: function(trigger) {
          let target = trigger.querySelector('input');
          return '![' + target.name + '](' + target.value + ')';
        }
      });
    },
    watch: {
      file(val, old) {
        val.md_url ='![' + val.original_name + '](' + val.url + ')';
        // val.upload_at = new timeago().format(old.upload_at);
        return val;
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .file {
    width: 160px;
    height: 160px;
    overflow: hidden;
    box-sizing: border-box;
    margin: 2px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
    &:hover {
      .file-info {
        top:0;
      }
    }
    &-thumbnail {
      width: 100%;
      height: 100%;
      font-size: 0;
      background: url('../images/loading.svg') no-repeat center center ;
      &__images {
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
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 1.2rem;
      flex: 1;
      color: #fff;
      position: absolute;
      top: 200px;
      background: rgba(0,0,0,0.6);
      transition: all 0.3s ease-in-out 0s;
    }
    &-state {
      width: 100%;
      height: 100%;
      position: absolute;
      &__progressbox {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
    }
    &-actions {
      width: 74px;
    }
  }
</style>