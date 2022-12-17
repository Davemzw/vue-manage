import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/css/reset.css"
import axios from "axios"
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
  //必须返回config
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
