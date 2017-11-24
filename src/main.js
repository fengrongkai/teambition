
import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css'
Vue.use(iView);


Vue.use(VueRouter); 
 

import '@/assets/css/app.css'
import '@/js/index.js'
import '@/js/utils.js'

 let Bus = new Vue();
 Vue.prototype.$bus=Bus;
new Vue({
  el: '#app',
 router,
  store,
  template: '<App/>',
  components: { App }
})

