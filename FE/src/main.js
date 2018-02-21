// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import func from "./public/func";
import App from './App'
import router from './router'
import store from './store/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import api from "../../BE/api";
import util from '../../BE/util/util'
import { Modal } from 'iview'
import { Notice } from 'iview'

Vue.config.productionTip = false;
// Vue.use(iView);
Vue.prototype.func = func;
Vue.prototype.api = api;
Vue.prototype.axios = axios;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;



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
