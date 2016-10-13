import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';

import IndexView from './components/Index.vue';
import UploaderView from './components/Uploader.vue';
import SettingsView from './components/Settings.vue';
import FileView from './components/FileList.vue';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;

const routes = [
  { path: '/', component: IndexView,
  children: [
    { path: 'upload', component: UploaderView },
    { path: 'settings', component: SettingsView }
  ]},
  { path: '*', redirect: '/'}
];


const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item__link--active'
});

const app = new Vue({
  router
}).$mount('#app')