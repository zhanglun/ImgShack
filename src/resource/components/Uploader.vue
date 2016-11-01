<template>
	<div class="uploader">
		<div class="uploader-body" id="uploader-body">
			<div class="uploader-body--drop" id="uploader"></div>
      <div class="form-control">
        <button id="uploader-btn" class="button">选择文件</button>
      </div>
    </div>
    <file-view v-for="file in uploadList" :file="file" :index="file.url"></file-view>
  </div>
</template>
<script>
  import { createToken, createUploadLink, createThumbnailLink } from '../util/qiniuUtil';
  import { createUploader } from '../util/createUploader';
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

    },
    methods: {
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
      initUploader(domain, token, methods) {
        let vm = this;
        let uploader = createUploader({
          browse_button: 'uploader-btn',
          container: 'uploader-body',
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

            let { name, size, lastModifiedDate, percent, id } = file;
            var fileInfo = {
              original_name: name,
              // upload_at: lastModifiedDate,
              // size: size,
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
          let thumbnail = createThumbnailLink(key, 60, 60);
          let { name, size, lastModifiedDate } = file;
          var fileInfo = {
            original_name: name,
            url,
            thumbnail,
            upload_at: lastModifiedDate,
            size: size,
            uploading: false,
          }
          // store.addFile(fileInfo);
          saveFile(fileInfo);
          setFile(vm.uploadList, file.id, 'url', url);
          setFile(vm.uploadList, file.id, 'thumbnail', thumbnail);
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
		// height: @uploader-height;
		margin: 0 auto 0;
		background: #fff;
		&-header {
			box-sizing: border-box;
			height: @header-height;
			padding: 8px;
			text-align: center;
			border-bottom: 1px solid #eef1f3;
		}
		&-body {
			height: 412px;
			box-sizing: border-box;
			padding: 14px;
			&--drop {
				height: 70%;
				background: url('../images/drop.png') no-repeat center;
        border-radius: 10px;
        border: 2px dashed #8c99a5;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
  }
</style>