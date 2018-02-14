// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import func from "./public/func";
import api from "../../BE/api";
import { Modal } from 'iview'

Vue.config.productionTip = false;
// Vue.use(iView);
Vue.prototype.axios = axios;
Vue.prototype.$Modal = Modal;



/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })

let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render: h => h(App),
});
