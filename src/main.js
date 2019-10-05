import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import BoostrapVue from 'bootstrap-vue';
Vue.config.productionTip = false

Vue.use(BoostrapVue)
Vue.use(VueRouter)

import './scss/main.scss';

import Main from '@/components/Main'
import Error404 from '@/components/error/Error404'
import Chat from '@/components/Chat'

const routes = [
    {path: '/', component: Main, name: 'main'},
    {path: '/404', component: Error404, name: 'error-404'},
    {path: '/chat', component: Chat, name: 'chat'},
    {path: '*', redirect: '/404'},
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
