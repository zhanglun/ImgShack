<template>
  <div class="settings">
    <div class="form-control">
      <label for="" class="form-control__label">Access_Key</label>
      <input type="text" class="form-control__input" v-model="settings.access_key">
    </div>
    <div class="form-control">
      <label for="" class="form-control__label">Secret_Key</label>
      <input type="text" class="form-control__input" v-model="settings.secret_key">
    </div>
    <div class="form-control">
      <label for="" class="form-control__label">Bucket_Name</label>
      <input type="text" class="form-control__input" v-model="settings.bucket">
    </div>
    <div class="form-control">
      <label for="" class="form-control__label">Domain</label>
      <input type="text" class="form-control__input" v-model="settings.domain">
    </div>
    <span class="button" @click="saveConfig">保存</span>
  </div>
</template>
<script>
  import store from '../util/store';
  export default {
    data() {
      return {
        settings: {
          access_key: '',
          secret_key: '',
          domain: '',
          bucket: '',
        },
      };
    },
    mounted() {
      console.log('Settings');
      let settings = store.get('settings');
      if(settings) {
        this.$data.settings = Object.assign({}, settings);
      }
    },
    methods: {
      saveConfig() {
        let settings = this.$data.settings;
        console.log(settings);
        store.set('settings', settings);
      }
    }
  }
</script>

<style lang="less">
  .form-control {
    &__label {

    }
    &__input {
      width: 100%;
    }
  }
  .button {
    display: inline-block;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: transparent;
    font-weight: 500;
    padding: 7px 18px;
    border-color: #66615B;
    color: #66615B;
    transition: all 150ms linear;
    &:hover, &:focus, &:active, &.active {
      background-color: #66615B;
      color: rgba(255, 255, 255, 0.7);
      border-color: #66615B;
    }
  }

</style>
