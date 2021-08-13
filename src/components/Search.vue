<template>
  <div class="main">
    <!-- 歌单详情页底部导航栏 -->
    <div class="songdetails-top-nav">
      <div class="centent">
        <!-- 导航栏 -->
        <div class="top-nav-left">
          <div class="nav-left-back">
            <img
              src="../assets/images/Search_imgs/back_arrow.png"
              @click="goBack"
            />
          </div>
        </div>
        <!-- 搜索框 -->
        <div class="ipt">
          <input
            v-model="newSearch"
            type="text"
            @keyup.enter="searchM"
            :placeholder="defaultM"
            autofocus="autofocus"
          />
          <img
            src="../assets/images/Search_imgs/delete_ipt.png"
            v-show="flag"
            @click="clearIpty"
          />
        </div>
      </div>
    </div>

    <!-- 搜索结果列表和详细信息 -->
    <div class="search-list-box">
      <!-- 搜索结果列表 -->
      <div class="list-box" v-show="flag">
        <!-- 只有作者名的搜索 -->
        <div class="box-item" v-show="newSearch" @click="getSongDet2(newSearch)">
          <div class="item-icon">
            <i class="fa fa-search"></i>
          </div>
          <div class="item-content">
            <span class="default">{{ newSearch }}</span>
          </div>
        </div>
        <!-- 包含作者名,歌曲名 -->
        <div
          class="box-item"
          v-for="(item, index) in songList"
          :key="index"
          @click="getSongDet(newSearch, item.name)"
        >
          <div class="item-icon">
            <i class="fa fa-search"></i>
          </div>
          <div class="item-content">
            <span class="default">{{ newSearch || placeholder }}</span>
            <span class="searchs">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 搜索详细信息 -->
      <div class="deinformation-list-box" v-show="shdeinformation">
        <div class="fun-box">
          <!-- 顶部选项 -->
          <div class="top-list-fun">
            <div
              class="list-fun-item"
              @click="changScurrIndex(0)"
              :class="{ active: scurrIndex == 0 }"
            >
              综合
              <span class="item" :class="{ active: scurrIndex == 0 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(1)"
              :class="{ active: scurrIndex == 1 }"
            >
              单曲
              <span class="item" :class="{ active: scurrIndex == 1 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(2)"
              :class="{ active: scurrIndex == 2 }"
            >
              歌单
              <span class="item" :class="{ active: scurrIndex == 2 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(3)"
              :class="{ active: scurrIndex == 3 }"
            >
              视频
              <span class="item" :class="{ active: scurrIndex == 3 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(4)"
              :class="{ active: scurrIndex == 4 }"
            >
              歌手
              <span class="item" :class="{ active: scurrIndex == 4 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(5)"
              :class="{ active: scurrIndex == 5 }"
            >
              播客
              <span class="item" :class="{ active: scurrIndex == 5 }"></span>
            </div>
          </div>
          <div class="fun-choice-box">
            <!-- 对象顶部选项的内容盒子 -->
            <div class="multiple-box" v-show="scurrIndex == 0">
              <div class="multiple-desc-singer">
                <div class="doyoulike">你可能感兴趣</div>
                <div class="geren-detail-box">
                  <div class="detail-box-img">
                    <img :src="singer.singerImg" />
                  </div>
                  <div class="detail-box-text">
                    <div class="box-text-singername">
                      歌手: <span>{{ singer.singerName }}</span>
                    </div>
                    <div class="box-text">
                      <div class="text-fensi">粉丝: 213万</div>
                      <div class="text-songs">歌曲: {{ singer.musicSize }}</div>
                    </div>
                  </div>
                  <div class="detail-box-addlike">
                    <div class="box-addlike-img">
                      <img src="../assets/images/Search_imgs/add_like.png" />
                    </div>
                    <div class="box-addlike-text">关注</div>
                  </div>
                </div>
              </div>

              <!-- 歌单列表 -->
              <div class="song-list">
                <div
                  class="list-item"
                  v-for="(item, index) in songList"
                  :key="index"
                  @click="getSong(item.id, index)"
                  :data-musicid="item.id"
                  :data-index="index"
                >
                  <span
                    class="addclass"
                    :class="{ active: linehight == item.id }"
                  ></span>
                  <div class="item-name">
                    <div class="song-name">{{ item.name }}</div>
                    <div class="zuozhe-name">
                      {{ item.ar[0].name }} - {{ item.al.name }}
                    </div>
                  </div>
                  <div class="item-mv" v-show="item.mv">
                    <img src="../assets/images/Search_imgs/mv.png" />
                  </div>
                  <div class="item-more">
                    <img src="../assets/images/Search_imgs/more.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="single-box" v-show="scurrIndex == 1">
              <!-- 歌单列表 -->
              <div class="song-list">
                <div
                  class="list-item"
                  v-for="(item, index) in songList"
                  :key="index"
                  @click="getSong(item.id, index)"
                  :data-musicid="item.id"
                  :data-index="index"
                >
                  <span
                    class="addclass"
                    :class="{ active: linehight == item.id }"
                  ></span>
                  <div class="item-name">
                    <div class="song-name">{{ item.name }}</div>
                    <div class="zuozhe-name">
                      {{ item.ar[0].name }} - {{ item.al.name }}
                    </div>
                  </div>
                  <div class="item-mv" v-show="item.mv">
                    <img src="../assets/images/Search_imgs/mv.png" />
                  </div>
                  <div class="item-more">
                    <img src="../assets/images/Search_imgs/more.png" />
                  </div>
                </div>
              </div>
            </div>
            <div class="songSheet-box" v-show="scurrIndex == 2">努力中loading...</div>
            <div class="video-box" v-show="scurrIndex == 3">努力中loading...</div>
            <div class="singer-box" v-show="scurrIndex == 4">努力中loading...</div>
            <div class="podcast-box" v-show="scurrIndex == 5">努力中loading...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      newSearch: null,
      //   搜索列表
      songList: null,
      //   默认搜索关键词
      placeholder: null,
      // 控制删除图标显示隐藏
      flag: false,
      // 用于选项栏添加类名
      scurrIndex: 0,
      // 控制搜索详细信息显示隐藏
      shdeinformation: false,
      // 添加点击歌曲的高亮样式
      linehight: "",
      // 歌手id
      singerId: "",
      // 歌手信息
      singer: {
        singerImg: "",
        briefDesc: "",
        singerName: "",
        musicSize: "",
      },
    };
  },
  methods: {
    // 详情页获取歌曲播放
    getSong(id, index) {
      this.$store.commit("saveId", id);
      this.$store.commit("saveIndex", index);
      this.$store.commit("saveSlength", this.songList.length);
    },
    // 点击单个歌曲跳转详情
    getSongDet(zz, song) {
      console.log(zz, song);
      this.axios
        .get(`/cloudsearch?keywords=${zz + song}&limit=10`)
        .then((res) => {
          this.songList = res.result.songs;
          // 将点击的数据提交state,渲染在歌曲列表
          this.$store.commit("saveSongsList", this.songList);
          // 控制搜索详细信息显示
          this.shdeinformation = true;
          // 删除图标隐藏
          this.flag = false;
          console.log(res);
        })
        .catch((err) => {
          console.log(res);
        });
    },
    getSongDet2(zz) {
      console.log(zz);
      this.axios
        .get(`/cloudsearch?keywords=${zz}&limit=10`)
        .then((res) => {
          this.songList = res.result.songs;
          // 将点击的数据提交state,渲染在歌曲列表
          this.$store.commit("saveSongsList", this.songList);
          // 控制搜索详细信息显示
          this.shdeinformation = true;
          // 删除图标隐藏
          this.flag = false;
          console.log(res);
        })
        .catch((err) => {
          console.log(res);
        });
    },
    // 选项栏添加取消类名
    changScurrIndex(index) {
      this.scurrIndex = index;
    },
    // 清空输入框
    clearIpty() {
      this.newSearch = null;
      this.shdeinformation = false;
    },
    // 搜索
    searchM() {
      console.log(this.newSearch);
      if (this.placeholder) {
        this.axios
          .get(`/cloudsearch?keywords=${this.newSearch}`)
          .then((res) => {
            this.songList = res.result.songs;
            // 歌手id
            this.singerId = res.result.songs[1].ar[0].id;
            // 调用获取歌曲信息方法
            this.getSinger();
            // 将搜索到的数据提交state,渲染在歌曲列表
            this.$store.commit("saveSongsList", this.songList);
            // 控制搜索详细信息显示
            this.shdeinformation = true;
            // 删除图标隐藏
            this.flag = false;
          })
          .catch((err) => {});
      } else {
        // 删除图标隐藏
        this.flag = false;
      }
    },
    // 获取歌手信息
    getSinger() {
      if (this.scurrIndex === 0) {
        this.axios
          .get(`/artist/detail?id=${this.singerId}`)
          .then((res) => {
            this.singer.singerImg = res.data.artist.cover;
            this.singer.briefDesc = res.data.artist.briefDesc;
            this.singer.singerName = res.data.artist.name;
            this.singer.musicSize = res.data.artist.musicSize;
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    watchs() {
      return this.newSearch;
    },
    lsUpDown() {
      return this.$store.state.sindex;
    },
    // 默认搜索关键词
    defaultM() {
      this.axios
        .get(`/search/default`)
        .then((res) => {
          this.placeholder = res.data.realkeyword;
        })
        .catch((err) => {});
      return this.placeholder;
    },
  },
  watch: {
    // 监控输入框的变化
    watchs(val) {
      if (val) {
        this.axios
          .get(`/cloudsearch?keywords=${this.newSearch}?limit=10`)
          .then((res) => {
            this.songList = res.result.songs;
            // 输入框有值,删除图标显示
            this.flag = true;
            // 输入框有值,隐藏歌曲详情栏
            this.shdeinformation = false;
          })
          .catch((err) => {});
      } else {
        this.songList = null;
        this.flag = false;
      }
    },
    // 监控歌曲下标的变化
    lsUpDown(val) {
      // 根据自定义属性获取元素
      let index = document.querySelector("div[data-index= '" + val + "' ]");
      // 根据元素获取自定义属性的值
      // 记得转number类型,不然会在wacth调用两次
      let id = parseInt(index.dataset.musicid);
      this.linehight = id;
      // 修改state的id
      this.$store.state.sid = id;
    },
  },
};
</script>

<style lang="less" scoped>
.search-list-box {
  width: 100%;
  .deinformation-list-box {
    width: 100%;
    background: #fff;
    .fun-box {
      width: 90%;
      margin: 10px auto;
      .fun-choice-box {
        width: 100%;
        padding: 10px 0px;
        margin-top: 10px;
        .multiple-box {
          // width: 90%;
          background: #fff;
          margin: 0 auto;
          border-radius: 10px;
          .song-list {
            width: 100%;
            .list-item {
              width: 100%;
              margin: 0 auto;
              // background: pink;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
              span {
                display: block;
                width: 4px;
                height: 30px;
                border-radius: 10px;
                margin-right: 5px;
                opacity: 0;
                transition: all 0.1s linear;
                &.active {
                  opacity: 1;
                  background: #ee2e23;
                }
              }
              &:last-child {
                margin-bottom: 90px;
              }
              .item-more {
                width: 20px;
                margin-left: 10px;
                img {
                  width: 100%;
                }
              }
              .item-mv {
                width: 30px;
                img {
                  width: 100%;
                }
              }
              .item-name {
                flex: 1;
                .song-name {
                  width: 200px;
                  font-size: 14px;
                  color: #353535;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .zuozhe-name {
                  margin-top: 3px;
                  width: 200px;
                  color: #808080;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
          .multiple-desc-singer {
            width: 90%;
            margin: 0 auto;
            padding: 15px 0px;
            margin-bottom: 20px;
            .detail-box-addlike {
              display: flex;
              border: 1px solid #d81e06;
              height: 20px;
              line-height: 22px;
              padding: 0px 7px;
              border-radius: 20px;
              .box-addlike-text {
                color: #d81e06;
                transform: scale(0.9);
              }
              .box-addlike-img {
                width: 20px;
                img {
                  width: 100%;
                }
              }
            }
            .detail-box-text {
              flex: 1;
              margin-top: 10px;
              .box-text-singername {
                margin-bottom: -10px;
                span {
                  color: #5757c2;
                }
              }
              .box-text {
                display: flex;
                align-items: center;
                color: gray;
                margin-left: -10px;
                margin-top: 20px;
                transform: scale(0.9);
                .text-songs {
                  margin-left: 10px;
                }
              }
            }
            .geren-detail-box {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .detail-box-img {
                border-radius: 50%;
                border: 1px solid #f8f8f8;
                overflow: hidden;
                width: 60px;
                height: 60px;
                text-align: center;
                position: relative;
                margin-left: 0px;
                margin-top: 10px;
                margin-right: 10px;
                img {
                  width: 70px;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
            .doyoulike {
              color: gray;
            }
          }
        }
        .single-box {
          .song-list {
            width: 100%;
            .list-item {
              width: 100%;
              margin: 0 auto;
              // background: pink;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
              span {
                display: block;
                width: 4px;
                height: 30px;
                border-radius: 10px;
                margin-right: 5px;
                opacity: 0;
                transition: all 0.1s linear;
                &.active {
                  opacity: 1;
                  background: #ee2e23;
                }
              }
              &:last-child {
                margin-bottom: 90px;
              }
              .item-more {
                width: 20px;
                margin-left: 10px;
                img {
                  width: 100%;
                }
              }
              .item-mv {
                width: 30px;
                img {
                  width: 100%;
                }
              }
              .item-name {
                flex: 1;
                .song-name {
                  width: 200px;
                  font-size: 14px;
                  color: #353535;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .zuozhe-name {
                  margin-top: 3px;
                  width: 200px;
                  color: #808080;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
        .podcast-box,
        .singer-box,
        .video-box,
        .songSheet-box{
          text-align: center;
        }
      }
      .top-list-fun {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        .list-fun-item {
          .item {
            border-radius: 20px;
            display: block;
            width: 32px;
            height: 6px;
            background: transparent;
            transition: all 0.1s linear;
            transform: translateX(-20px);
            &.active {
              background: linear-gradient(to right, #ee2e23, #d66868);
              transform: translateX(0px);
            }
          }
          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }
  .list-box {
    width: 90%;
    margin: 0 auto;
    .box-item {
      display: flex;
      align-items: center;
      color: #969696;
      justify-content: space-between;
      &:last-child {
        margin-bottom: 95px;
      }
      .item-content {
        flex: 1;
        margin-left: 10px;
        border-bottom: 1px solid #f7f7f7;
        padding: 16px 0px;
        .default {
          color: #969696;
        }
        .searchs {
          margin-left: 5px;
          color: #545454;
        }
      }
    }
  }
}
.songdetails-top-nav {
  width: 100%;
  height: 50px;
  background: #fff;
  .centent {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top-nav-left {
      .nav-left-back {
        width: 20px;
        img {
          width: 100%;
        }
      }
    }
    .ipt {
      flex: 1;
      margin-left: 20px;
      display: flex;
      position: relative;
      input {
        width: 100%;
        outline: none;
        height: 32px;
        border: none;
        border-bottom: 2px solid #ababab;
      }
      img {
        width: 26px;
        height: 26px;
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.main {
  background: #fff;
}
</style>