<template>
	<div class="app">
		<head-tab></head-tab>
		<!-- <router-link to="/settings">设置<router-link> -->
		<router-view></router-view>
		<div class="uploader" id="uploader">
			<div class="uploader-header" id="container">
				<h1>ImgShack, file uploader</h1>
				<button id="go">upload</button>
                
			</div>
			<div class="uploader-body">
				<div class="uploader-body--drop"></div>
			</div>
		</div>
	</div>

</template>
<script>
  import { createToken } from '../util/createToken';
  import { createUploader } from '../util/createUploader';
  import HeadTabView from './HeadTab.vue';

  export default {
    data() {
      return {};
    },
    mounted() {
      console.log('!!!app');

        let bucket = 'zhanglun';
        //上传到七牛后保存的文件名
        var param = {};
        param.scope = bucket;
        let uploadToken = createToken(param, 100000);

        let uploader = createUploader({
            browse_button: 'go',
            drop_element: 'uploader',
            container: 'container',
            domain: 'http://7i7gl0.com1.z0.glb.clouddn.com',
            token: uploadToken,
        });
        uploader.bind('PostInit', function(){
            console.log('init!', arguments);
        });
        uploader.bind('FileUploaded', function(up, file, info){
            console.log(up, file, info)
        });

    },
    components: {
    	'head-tab': HeadTabView,
    }
  }
</script>
<style lang="less">
	@uploader-height: 600px;
	@header-height: 60px;
	.uploader {
		width: 500px;
		height: @uploader-height;
		/*display: flex;*/
		/*flex-direction: column;*/
		margin: 50px auto 0;
		border-radius: 6px;
		background: #fff;
		&-header {
			box-sizing: border-box;
			height: @header-height;
			padding: 8px;
			text-align: center;
			border-bottom: 1px solid #eef1f3;
		}
		&-body {
			/*flex: 1 0 auto;*/
			height: @uploader-height - @header-height;
			box-sizing: border-box;
			padding: 14px;
			&--drop {
				height: 70%;
				background: url('../images/drag-area.png');
				background-size: cover;
			}
		}
	}
</style>