<template>
	<div class="uploader" id="uploader">
		<div class="uploader-body">
			<div class="uploader-body--drop"></div>
		</div>
	</div>
</template>
<script>
  import { createToken } from '../util/createToken';
  import { createUploader } from '../util/createUploader';

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