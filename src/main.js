import Vue from 'vue'
import router from './router/'
import store from './store/'
import axios from 'axios'
import './registerServiceWorker'
import './plugins/storage'
import './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

const token = localStorage.getItem('token')

axios.defaults.baseURL = "http://auth.malllikeu.com/api";
axios.defaults.headers.common['Authorization'] = "Bearer " +token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
})

app.$mount('#app')
