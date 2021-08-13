import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import 'font-awesome/css/font-awesome.min.css'
import 'animate.css'
import axios from 'axios'
import './plugins/axios'

import {
  Tabbar,
  TabbarItem ,
  Form,
  Field,
  Button ,
  Toast,
  Popup ,
  Slider ,
  Loading ,
} from 'vant';

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Form)
  .use(Field)
  .use(Button )
  .use(Toast )
  .use(Popup  )
  .use(Slider )
  .use(Loading )

// 添加axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //发送请求之前,显示加载中mask
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  return config;
}, error => {
  // 对请求错误做些什么
  Toast.clear();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  //服务器响应数据后关闭加载提示
  Toast.clear();
  return response;
}, error => {
  // 对响应错误做点什么
  Toast.clear();
  return Promise.reject(error);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
