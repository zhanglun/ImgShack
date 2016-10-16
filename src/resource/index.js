import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import UploaderView from './components/Uploader.vue';
import SettingsView from './components/Settings.vue';
import HistoryView from './components/History.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.devtools = true;
Vue.config.debug = true;

const routes = [
  { path: '/upload', component: UploaderView },
  { path: '/history', component: HistoryView },
  { path: '/settings', component: SettingsView },
  { path: '*', redirect: '/upload' }
];


const router = new VueRouter({
  routes,
  linkActiveClass: 'nav-item__link--active'
});

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
});

store.commit('increment');
store.commit('increment');

console.log(store.state.count); // -> 1

const app = new Vue({
  router,
  store
}).$mount('#app');
