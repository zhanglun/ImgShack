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
  .settings {
    padding: 10px;
  }

</style>
