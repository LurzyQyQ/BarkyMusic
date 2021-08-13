<template>
  <div class="video">
    <!-- 歌单详情页顶部导航栏 -->
    <div class="songdetails-top-nav">
      <div class="top-nav-left">
        <div class="nav-left-back" @click="ssList">
          <img src="../assets/images/Video_imgs/option.png" />
        </div>
        <div class="nav-left-text">视频</div>
        <div class="nav-right-search">
          <img src="../assets/images/Video_imgs/search.png" />
        </div>
      </div>
    </div>

    <!-- 搜索详细信息 -->
    <!--  -->
    <div class="deatli-chiose">
      <div class="deinformation-list-box">
        <div class="fun-box">
          <!-- 顶部选项 -->
          <div class="top-list-fun">
            <div
              class="list-fun-item"
              @click="changScurrIndex(0)"
              :class="{ active: scurrIndex == 0 }"
            >
              MV
              <span class="item" :class="{ active: scurrIndex == 0 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(1)"
              :class="{ active: scurrIndex == 1 }"
            >
              LOOK直播
              <span class="item" :class="{ active: scurrIndex == 1 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(2)"
              :class="{ active: scurrIndex == 2 }"
            >
              现场
              <span class="item" :class="{ active: scurrIndex == 2 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(3)"
              :class="{ active: scurrIndex == 3 }"
            >
              翻唱
              <span class="item" :class="{ active: scurrIndex == 3 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(4)"
              :class="{ active: scurrIndex == 4 }"
            >
              舞蹈
              <span class="item" :class="{ active: scurrIndex == 4 }"></span>
            </div>
            
          </div>
          <div class="fun-choice-box">
            <div class="podcast-box" v-show="scurrIndex == 0">
              <!-- 加载页 -->
              <div class="loading-box" v-show="loadings">
                <van-loading color="#eb342b" size="34px" />
              </div>
              <div class="mv-box" v-show="!loadings">
                <!-- 每一项mv -->
                <div
                  class="box-item"
                  v-for="(item, index) in mvRecommend"
                  :key="index"
                >
                  <div class="item-mvicon">
                    <div class="img">
                      <img src="../assets/images/Video_imgs/MV.png" />
                    </div>
                    <div class="item-mvname">{{ item.name }}</div>
                  </div>
                  <div class="item-video-body">
                    <video
                      :src="currIndex == index ? mvUrl : ''"
                      controls="controls"
                      autoplay
                      ref="mvplayer"
                    ></video>
                    <div
                      class="item-video-mask"
                      v-show="shPlayPause == index ? false : true"
                      :style="`background: url(${item.cover}); background-size: 100% 100%; background-repeat: no-repeat;`"
                    >
                      <img
                        src="../assets/images/Video_imgs/player.png"
                        @click="getMvUrl(item.id, index)"
                      />
                    </div>
                  </div>
                  <div class="item-addzan">
                    <div class="zuozhe-img">
                      <!-- <img src="item."> -->
                    </div>
                    歌手:
                    <div
                      class="zuozhename"
                      v-for="(ite, ind) in item.artists"
                      :key="ind"
                    >
                      {{ ite.name + "&nbsp;" }}
                    </div>
                    <div
                      class="gotoMv-Details"
                      @click="pushMvDetails"
                      v-show="shPlayPause == index"
                    >
                      查看详情
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-box" v-show="scurrIndex == 1">努力中loading...</div>
            <div class="songSheet-box" v-show="scurrIndex == 2">努力中loading...</div>
            <div class="video-box" v-show="scurrIndex == 3">努力中loading...</div>
            <div class="singer-box" v-show="scurrIndex == 4">努力中loading...</div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- 左侧设置 -->
    <leftfun :leftsh="leftsh" :bbaa="bbaa" @close-F="hSongList" @F-close="closeLoginH"></leftfun>

  </div>
</template>

<script>
import leftfun from '../components/LeftFunction.vue'

export default {
  name: "Video",
  data() {
    return {
      scurrIndex: 0,
      // mv列表
      mvRecommend: [],
      // mvUrl
      mvUrl: "",
      // currIndex控制单个视频获取
      currIndex: 0,
      // 控制播放暂停图标的显示隐藏
      shPlayPause: null,
      // mv信息
      mvinfo: "",
      // loading显示隐藏
      loadings: false,
      // 控制设置栏
      leftsh: false,
      bbaa: 0,
    };
  },
  created() {
    this.getMv();
    this.changScurrIndex(0)
  },
  methods: {
    // 控制左边设置栏显示
    ssList() {
      this.leftsh = true;
      setTimeout(() => {
        this.bbaa = 1;
      }, 350);
    },
    // 控制左边设置栏显示隐藏
    hSongList() {
      this.bbaa = 0;
      setTimeout(() => {
        this.leftsh = false;
      }, 350);
    },
    // 退出登录后隐藏设置栏
    closeLoginH(){
        this.hSongList()
    },
    // 选项栏添加取消类名
    changScurrIndex(index) {
      this.scurrIndex = index;
      // 显示loading
      this.loadings = true;
      // 2000ms隐藏loading
      setTimeout(() => {
        this.loadings = false;
      }, 1000);
    },
    // 获取mv
    getMv() {
      this.axios
        .get(`/mv/all?area=欧美&limit=20`)
        .then((res) => {
          this.mvRecommend = res.data;
        })
        .catch((err) => {});
    },
    // 点击mv获取mv视频地址
    getMvUrl(mvid, index) {
      sessionStorage.setItem("mvid", mvid);
      this.axios
        .get(`/mv/url?id=${mvid}`)
        .then((res) => {
          this.currIndex = index;
          this.mvUrl = res.data.url;
          // 将点击的mv链接存储
          sessionStorage.setItem("videourl", JSON.stringify(res.data.url));
          // 将点击的mv信息存储
          let oneMv = this.mvRecommend[index];
          sessionStorage.setItem("mvIndex", JSON.stringify(oneMv));
          this.shPlayPause = index;
          // 获取对应mv评论等数据
          this.axios
            .get(`/mv/detail/info?mvid=${mvid}`)
            .then((res) => {
              // 保存mv相关点赞信息
              this.mvinfo = res;
              sessionStorage.setItem("mvinfo", JSON.stringify(res));
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    },
    // 控制mv详情页显示隐藏
    pushMvDetails() {
      this.$router.push({ name: "MvDetails" });
    },
  },
  components: {
    leftfun,
  }
};
</script>

<style lang="less" scoped>
.deatli-chiose {
  width: 100%;
  .deinformation-list-box {
    width: 100%;
    background: #fff;
    .fun-box {
      width: 90%;
      margin: 0px auto;
      .fun-choice-box {
        width: 100%;
        .podcast-box {
          width: 100%;
          .loading-box {
            width: 100%;
            height: 600px;
            margin: 20px auto;
            display: flex;
            justify-content: center;
          }
          .mv-box {
            width: 100%;
            margin: 0 auto;
            .box-item {
              width: 100%;
              margin-bottom: 15px;
              &:last-child {
                margin-bottom: 50px;
              }
              .item-addzan {
                width: 100%;
                display: flex;
                margin-top: 10px;
                padding-bottom: 10px;
                align-items: center;
                color: gray;
                position: relative;
                .gotoMv-Details {
                  position: absolute;
                  right: 0;
                }
              }
              .item-video-body {
                width: 100%;
                height: 190px;
                background: #000;
                position: relative;
                overflow: hidden;
                .item-video-mask {
                  width: 100%;
                  position: absolute;
                  height: 100%;
                  background: rgba(0, 0, 0);
                  z-index: 1;
                  img {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    position: absolute;
                  }
                }
                video {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
              .item-mvicon {
                display: flex;
                align-items: center;
                .img {
                  width: 25px;
                  img {
                    width: 100%;
                  }
                }
                .item-mvname {
                  width: 200px;
                  margin-left: 5px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                }
              }
            }
          }
        }
        .multiple-box {
          width: 100%;
          .loading-box {
            width: 100%;
            height: 600px;
            margin: 20px auto;
            display: flex;
            justify-content: center;
          }
          .multiple-desc-singer {
            width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .recommend-item {
              width: 49%;
              height: 250px;
              background: gray;
            }
          }
        }
        .single-box {
          text-align: center;
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
        .singer-box,
        .video-box,
        .songSheet-box{
          text-align: center;
        }
      }
      .top-list-fun {
        padding: 10px 0px;
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
}
.songdetails-top-nav {
  width: 100%;
  background: #fff;
  padding: 10px 0px;
  .top-nav-left {
    width: 90%;
    margin: 0px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0px;
    .nav-left-text {
      color: gray;
      font-size: 14px;
    }
    .nav-right-search {
      width: 20px;
      height: 20px;
      margin-right: -10px;
      img {
        width: 20px;
      }
    }
    .nav-left-back {
      width: 20px;
      height: 20px;
      margin-left: -10px;
      img {
        width: 25px;
      }
    }
  }
}
</style>