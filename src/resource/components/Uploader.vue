<template>
	<div class="uploader">
		<div class="uploader-body" id="uploader-body">
			<div class="uploader-body--drop" id="uploader"></div>
		</div>
	</div>
</template>
<script>
  import { createToken } from '../util/createToken';
  import { createUploader } from '../util/createUploader';
  import store from '../util/store';

  export default {
    data() {
      return {
        uptoken: '',
        settings: null,
      };
    },
    mounted() {
        let settings = store.get('settings');
        if(!settings) {
            this.$route.go('/settings');
        }else {
            this.$data.settings = settings;
            this.$data.uptoken = this.getUpToken(settings);
            this.initUploader(settings.domain, this.$data.uptoken);
        }

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
            let uploader = createUploader({
                browse_button: 'uploader',
                container: 'uploader-body',
                drop_element: 'uploader',
                domain: domain,
                token: token,
            });
            uploader.bind('PostInit', function(){
                console.log('init!', arguments);
            });
            uploader.bind('FileUploaded', (up, file, info) => {
                console.log(up, file, info);
                console.log('fileLink: ', this.$data.settings.domain + '/' + JSON.parse(info.response).key);
            });
        }
    }
  }
</script>
<style lang="less">
	@uploader-height: 600px;
	@header-height: 60px;
	.uploader {
		height: @uploader-height;
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
                border: 4px dashed #8c99a5;
                cursor: pointer;
			}
		}
	}
</style>