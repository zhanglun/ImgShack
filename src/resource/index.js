import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';

import UploaderView from './components/Uploader.vue';
import LibraryView from './components/Library.vue';
import SettingsView from './components/Settings.vue';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;

const routes = [
  { path: '/upload', component: UploaderView },
  { path: '/library', component: LibraryView },
  { path: '/settings', component: SettingsView },
  { path: '*', redirect: '/upload' }
];


const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item__link--active'
});

new Vue({
  router,
}).$mount('#app');
