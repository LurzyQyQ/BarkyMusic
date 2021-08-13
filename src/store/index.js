import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: "",
    userImg: "",
    // 歌曲id
    sid: "",
    // 歌曲下标
    sindex: "",
    // 歌曲列表的长度
    slength: "",
    // 歌单列表
    songList: "",
  },
  mutations: {
    getUserId(state, payload){
      state.userId = payload;
      // console.log("用户id => ", payload);
    },
    getImg(state, payload){
      state.userImg = payload;
      // console.log("用户头像 => ", payload);
    },
    saveId(state, payload){
      state.sid = payload;
      // console.log("当前点击的歌曲id => ", payload);
    },
    saveIndex(state, payload){
      state.sindex = payload;
      // console.log("当前点击的歌曲index => ", payload);
    },
    saveSlength(state, payload){
      state.slength = payload;
      // console.log("歌曲列表的长度 => ", payload);
    },
    saveSongsList(state, payload){
      state.songList = payload;
      // console.log("歌单列表 => ", payload);
    },
  },
  actions: {
  },
  modules: {
  }
})
