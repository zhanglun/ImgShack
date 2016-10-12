import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';

import AppView from './components/App.vue';
import SettingsView from './components/Settings.vue';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;

const routers = [
  { path: '/', component: AppView },
  { path: '/settings', commponet: SettingsView }
];

const router = new VueRouter({
  // mode: 'history',
  routers
});

const app = new Vue({
  router,
  render: (createElement) => createElement(AppView),
}).$mount('#app');