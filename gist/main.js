import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './permission' // permission control

import * as filters from './filters' // global filters

// axios相关设置
import axios from 'axios'
window.axios = axios
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = window.serviceIP || process.env.BASE_API
axios.defaults.timeout = 30000 // 30秒超时

// axios.interceptors.request.use(req => {
//   console.log(req)
//   return req
// })

axios.interceptors.response.use((res) => {
  if (res.data.status === 200) {
    return res
  } else {
    res.data && vm.$message.error(res.data.error)
    return Promise.reject(res)
  }
}, err => {
  if (err.response && err.response.status === 401) {
    vm.$message.error('登录已失效，请重新登录')
    vm.$store.dispatch('LogOut').then(() => {
      location.reload()
    })
  }
  return Promise.reject(err)
})

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
