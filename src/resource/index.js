import './css/base.less';

import Vue from 'vue';

import AppView from './components/App.vue';

Vue.config.devtools = true;
Vue.config.debug = true;


new Vue({
  el: '#app',
  render: (createElement) => createElement(AppView),
});

import {createToken} from './util/createToken';
let bucket = 'blog';
//上传到七牛后保存的文件名
var param = {};
param.scope = bucket;
// param.callbackUrl = 'http://your.domain.com/callback';
param.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
console.log(createToken(param));