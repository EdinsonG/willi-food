import Vue from 'vue'
import router from './router/'
import store from './store/'
import axios from 'axios'
import VueSession from 'vue-session'
import './registerServiceWorker'
import './plugins/storage'
import './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueSession)
Vue.config.productionTip = false

window.axios=axios
const token = localStorage.getItem('token')

axios.defaults.baseURL = "http://auth.malllikeu.com/api";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = "Bearer " + token;

const app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
})

app.$mount('#app')
