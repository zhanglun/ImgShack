<template>
  <div class="library">
    <h1>Librarty222</h1>
     <div class="filelist">
      <file-view v-for="file in items" :file="file" :index="file.url"></file-view>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import store from '../util/store';
  import { generateAccessToken, createUploadLink, createThumbnailLink, } from '../util/qiniuUtil';
  import { formatFile, } from '../util/formatFile';
  import FileView from './FileItem.vue';
  export default {
    data() {
      return {
        items: [],
      };
    },
    components:{
      FileView,
    },
    mounted() {
      let settings = store.get('settings');
      if(!settings) {
        this.$router.push('/settings');
      }else {
        this.$data.settings = settings;
        console.log(this.$data.settings);
      }

      this.fetchFilesListFromRemote();
    },
    methods: {
      fetchFilesListFromRemote(){
        let settings = this.$data.settings;
        let api_url = 'http://rsf.qbox.me/';
        let keys = {
          access_key: settings.access_key,
          secret_key: settings.secret_key,
        };
        fetch(api_url + 'list?bucket=' + settings.bucket, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': generateAccessToken(keys, api_url + 'list?bucket=' + settings.bucket, null),
          },
        }).then((res) => {
          return res.json();
        }).then((res) => {
          console.log(res);
          this.$data.items = res.items.map((item) => {
            let { key, size, putTime, } = item;
            let url = createUploadLink(key);
            let thumbnail = createThumbnailLink(key, 160, 160);
            let fileInfo = {
              original_name: key,
              url,
              thumbnail,
              upload_at: moment(new Date(putTime/1000)).format('YYYY-MM-DD HH:mm:ss'),
              size: size,
            }
            return fileInfo;
          }).sort((a, b) => {
            if(a.upload_at > b.upload_at) {
              return -1;
            } else if (a.upload_at < b.upload_at) {
              return 1;
            }else {
              return 0;
            }
          });
        }).catch((err) => {
          debugger;
        });
      }
    }
  }
</script>
<style lang="less">
</style>