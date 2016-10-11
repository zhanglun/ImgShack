<template>
    <div class="uploader" id="uploader">
        <div class="uploader-header">
            <h1>ImgShack, file uploader</h1>
        </div>
        <div class="uploader-body">
            <div class="uploader-body--drop"></div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    ready() {
      console.log('!!!app');
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
        &-header{
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