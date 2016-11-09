import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';

import UploaderView from './components/Uploader.vue';
import SettingsView from './components/Settings.vue';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;

const routes = [
  { path: '/upload', component: UploaderView },
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

// let domApp = document.getElementById('app');
// // let domApp = document;
// domApp.addEventListener('drag', function(e) {
//   console.log('drag', e);
// }, false);
// domApp.addEventListener('dragstart', function(e) {
//   console.log('drag start', e);
// }, false);
// domApp.addEventListener('dragenter', function(e) {
//   console.log('drag enter', e);
// }, false);
// domApp.addEventListener('dragover', function(e) {
//   console.log('drag over', e);
//   let layer = document.createElement('div');
//   layer.className = 'draglayer';
//   if (!e.target.classList.contains('draglayer')) {
//     domApp.appendChild(layer);
//   }
// }, false);
// domApp.addEventListener('dragleave', function(e) {
//   console.log('drag leave', e);
// }, false);
// domApp.addEventListener('drop', function(e) {
//   console.log('drop', e);
//   domApp.removeChild(domApp.querySelectorAll('.draglayer'));
// }, false);
