import './css/base.less';
import Vue from 'vue';

import AppView from './components/App.vue';

Vue.config.devtools = true;
Vue.config.debug = true;


new Vue({
  el: '#app',
  render: (createElement) => createElement(AppView),
});
