<template>
	<div class="uploader" id="uploader">
		<div class="uploader-body">
			<div class="uploader-body--drop"></div>
      <div class="form-control form-control--center">
        <button id="uploader-btn" class="button button--success">选择文件</button>
        <button class="button" @click="clean">清除本地记录</button>
      </div>
    </div>
    <div class="filelist">
      <file-view v-for="file in uploadList" :file="file" :index="file.url"></file-view>
      <file-view v-for="file in history" :file="file" :index="file.url"></file-view>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';
  import { createToken, createUploadLink, createThumbnailLink } from '../util/qiniuUtil';
  import { createUploader } from '../util/createUploader';
  import {formatFile} from '../util/formatFile';
  import store from '../util/store';
  import FileView from './FileItem.vue';
  import settingsView from './Settings.vue';

  function setFile(fileList, id, key, val) {
    fileList.forEach(fileItem => {
      if (fileItem.id === id) {
        fileItem[key] = val;
      }
    })
  }

  let db = store.open('files');
  db = store.open('settings');
  db.files.loadDatabase();

  function saveFile(file) {
    db.files.update({id: file.id}, {$set: file}, { upsert: true }, (err, result) => {
      console.log(arguments);
      console.log('保存成功！');
    })
  }
  export default {
    data() {
      return {
        uptoken: '',
        settings: null,
        uploader: null,
        uploadList: [],
        history: [],
      };
    },
    components: {
      FileView,
    },
    mounted() {
      let settings = store.get('settings');
      if(!settings) {
        this.$router.push('/settings');
      }else {
        this.$data.settings = settings;
        this.$data.uptoken = this.getUpToken(settings);
        this.initUploader(settings.domain, this.$data.uptoken);
      }

      this.getHistory();

      // 粘贴剪切板图片
      document.querySelector('.uploader').addEventListener('paste', (e) => {
        let clipboard = e.clipboardData;
        let type = clipboard.items[0].type;
        if (type.match(/image/)) {
          var file = clipboard.items[0].getAsFile();
          if (file.size === 0) {
            return;
          }
          this.uploader.addFile(file);
        }
      });

      // 拖拽

    },
    methods: {
      clean() {
        db.files.remove({}, {multi: true}, () => {
          console.log(arguments);
        });
      },
      getUpToken(settings) {
        let uptoken = store.get('uptoken');
        if(uptoken) {
          this.$data.uptoken = uptoken;
          return uptoken;
        }else {
          let params = {
            scope: settings.bucket,
          };
          let keys = {
            access_key: settings.access_key,
            secret_key: settings.secret_key,
          };
          return createToken(keys, params,);
        }
      },
      getHistory() {
        db.files.find({}).sort({upload_at:-1}).exec((err, files) => {
          this.$data.history = formatFile(files);
        });
      },
      initUploader(domain, token, methods) {
        let vm = this;
        let uploader = createUploader({
          browse_button: 'uploader-btn',
          container: 'uploader',
          drop_element: 'uploader',
          domain: domain,
          token: token,
        });
        uploader.bind('PostInit', function(up, file) {
        });
        uploader.bind('FilesAdded', (up, files) => {
          files.map((file) => {
            var reader = new FileReader();
            reader.onload = (e) => {
              let thumbnail = e.target.result;
              setFile(vm.uploadList, file.id, 'thumbnail', thumbnail);
            }
            reader.readAsDataURL(file.getNative());
            file.upload_at = new Date();

            let { name, size, upload_at, percent, id } = file;
            let fileInfo = {
              original_name: name,
              upload_at,
              size,
              percent,
              id,
              thumbnail: '',
              url: '',
              uploading: true,
            }
            this.$data.uploadList.unshift(fileInfo);
          });
        });
        uploader.bind('UploadProgress', (up, file) => {
          setFile(vm.uploadList, file.id, 'percent', file.percent);
        });
        uploader.bind('FileUploaded', (up, file, info) => {
          let key = JSON.parse(info.response).key
          let url = createUploadLink(key);
          let thumbnail = createThumbnailLink(key, 160, 160);
          let { name, size, upload_at } = file;
          var fileInfo = {
            original_name: name,
            url,
            thumbnail,
            upload_at: upload_at,
            size: size,
            uploading: false,
          }

          saveFile(fileInfo);
          setFile(vm.uploadList, file.id, 'url', url);
          setFile(vm.uploadList, file.id, 'upload_at', moment(file.upload_at).format('YYYY-MM-DD HH:mm:ss'));
          setFile(vm.uploadList, file.id, 'thumbnail', thumbnail);
        });

        uploader.bind('Error', () => {
          // TODO: 
          console.log(arguments);
          // remove();
        });
        this.uploader = uploader;
      }
    }
  }
</script>
<style lang="less">
	@uploader-height: 600px;
	@header-height: 60px;
	.uploader {
		margin: 0 auto 0;
		&-header {
			box-sizing: border-box;
			height: @header-height;
			padding: 8px;
			text-align: center;
			border-bottom: 1px solid #eef1f3;
		}
		&-body {
			box-sizing: border-box;
			&--drop {
        width: 260px;
        height: 130px;
        background: #f4f4f4 url('../images/upload.png') no-repeat center center;
        background-size: 39% 50%;
        margin: 14px auto 0;
        border-radius: 10px;
        border: 1px dashed #d7d7d7;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
  }
  .filelist {
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    width: 330px;
  }
</style>