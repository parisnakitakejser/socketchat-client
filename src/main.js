import Vue from 'vue'
import App from './App.vue'
import BoostrapVue from 'bootstrap-vue';
Vue.config.productionTip = false

Vue.use(BoostrapVue)
import './scss/main.scss';
new Vue({
  render: h => h(App),
}).$mount('#app')
