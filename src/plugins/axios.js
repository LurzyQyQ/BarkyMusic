"use strict";
import Vue from 'vue';
import axios from "axios";

//  1.0 默认配置
axios.defaults.baseURL = "http://localhost:3000"
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 2.0 自定义配置
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};
// 3.0 可以使用自定义配置新建一个 axios 实例
const _axios = axios.create(config);
// 4.0 请求拦截器
_axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 编辑推荐
    if(config.url==="/personalized"){
        // console.log("请求编辑推荐数据");
        window.localStorage.setItem('_isLoading',true);
    }
    // 最新音乐
    if(config.url==="/personalized/newsong"){
      //  console.log("请求最新音乐数据");
       window.localStorage.setItem('_isNewLoading',true);
    }
   

    return config;
  },
  function(error) {
    // 请求失败执行的逻辑
    return Promise.reject(error);
  }
);
// 5.0 响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 处理响应数据
    return response.data;
  },
  function(error) {
    // 处理响应失败信息
    return Promise.reject(error);
  }
);

// 6.0 安装插件 axios 
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  // 7.0 把axios挂载Vue的原型对象
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};
// 7.0 使用使用
Vue.use(Plugin)

// 8.0 导出插件
export default Plugin;
