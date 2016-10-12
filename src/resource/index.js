import './css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';

import AppView from './components/App.vue';
import SettingsView from './components/Settings.vue';

Vue.use(VueRouter);

Vue.config.devtools = true;
Vue.config.debug = true;


const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }

const router = new VueRouter({
	linkActiveClass: 'side-menu__item--active',
 	base: __dirname,
  routes: [
    {
      path: '/first',
      component: First
    },
    {
      path: '/second',
      component: SettingsView,
    }
  ]
});


// const app = new Vue({
//   router,
//   render: (createElement) => createElement(AppView),
// }).$mount('#app');
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点在讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
