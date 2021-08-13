<template>
  <div class="video">
    <!-- 歌单详情页顶部导航栏 -->
    <div class="songdetails-top-nav">
      <div class="top-nav-left">
        <div class="nav-left-back" @click="goBack">
          <img src="../assets/images/RankingList_imgs/back-arrow.png" />
        </div>
        <div class="nav-left-text">歌单广场</div>
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
              推荐
              <span class="item" :class="{ active: scurrIndex == 0 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(1)"
              :class="{ active: scurrIndex == 1 }"
            >
              官方
              <span class="item" :class="{ active: scurrIndex == 1 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(2)"
              :class="{ active: scurrIndex == 2 }"
            >
              欧美
              <span class="item" :class="{ active: scurrIndex == 2 }"></span>
            </div>
            <div
              class="list-fun-item"
              @click="changScurrIndex(3)"
              :class="{ active: scurrIndex == 3 }"
            >
              华语
              <span class="item" :class="{ active: scurrIndex == 3 }"></span>
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
                <div class="box-recommend-item">
                  <div class="item-body">
                    <div
                      class="recommend-body"
                      v-for="(item, index) in recommendList"
                      :key="index"
                      @click="clickSongs(item.id)"
                    >
                      <div class="body-img">
                        <img :src="item.coverImgUrl" />
                        <div class="body-title">{{ item.updateFrequency }}</div>
                      </div>
                      <div class="body-name">{{ item.name }}</div>
                      <div class="item-playcount">
                        <div class="playcount-icon">
                          <img src="../assets/images/Recommend_imgs/play.png" />
                        </div>
                        <div class="playcount-text">
                          {{
                            item.playCount > 10000
                              ? (item.playCount - (item.playCount % 1000)) /
                                  10000 +
                                "W"
                              : item.playCount
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="single-box" v-show="scurrIndex == 1">
              <!-- 加载页 -->
              <div class="loading-box" v-show="loadings">
                <van-loading color="#eb342b" size="34px" />
              </div>
              <div class="mv-box" v-show="!loadings">
                <!-- 每一项mv -->
                <div class="box-recommend-item">
                  <div class="item-body">
                    <div
                      class="recommend-body"
                      v-for="(item, index) in officialList"
                      :key="index"
                      @click="clickSongs(item.id)"
                    >
                      <div class="body-img">
                        <img :src="item.coverImgUrl" />
                        <div class="body-title">{{ item.updateFrequency }}</div>
                      </div>
                      <div class="body-name">{{ item.name }}</div>
                      <div class="item-playcount">
                        <div class="playcount-icon">
                          <img src="../assets/images/Recommend_imgs/play.png" />
                        </div>
                        <div class="playcount-text">
                          {{
                            item.playCount > 10000
                              ? (item.playCount - (item.playCount % 1000)) /
                                  10000 +
                                "W"
                              : item.playCount
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="songSheet-box" v-show="scurrIndex == 2">
              <!-- 加载页 -->
              <div class="loading-box" v-show="loadings">
                <van-loading color="#eb342b" size="34px" />
              </div>
              <div class="mv-box" v-show="!loadings">
                <!-- 每一项mv -->
                <div class="box-recommend-item">
                  <div class="item-body">
                    <div
                      class="recommend-body"
                      v-for="(item, index) in westernList"
                      :key="index"
                      @click="clickSongs(item.id)"
                    >
                      <div class="body-img">
                        <img :src="item.coverImgUrl" />
                        <div class="body-title">{{ item.updateFrequency }}</div>
                      </div>
                      <div class="body-name">{{ item.name }}</div>
                      <div class="item-playcount">
                        <div class="playcount-icon">
                          <img src="../assets/images/Recommend_imgs/play.png" />
                        </div>
                        <div class="playcount-text">
                          {{
                            item.playCount > 10000
                              ? (item.playCount - (item.playCount % 1000)) /
                                  10000 +
                                "W"
                              : item.playCount
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="video-box" v-show="scurrIndex == 3">
              <!-- 加载页 -->
              <div class="loading-box" v-show="loadings">
                <van-loading color="#eb342b" size="34px" />
              </div>
              <div class="mv-box" v-show="!loadings">
                <!-- 每一项mv -->
                <div class="box-recommend-item">
                  <div class="item-body">
                    <div
                      class="recommend-body"
                      v-for="(item, index) in chineseList"
                      :key="index"
                      @click="clickSongs(item.id)"
                    >
                      <div class="body-img">
                        <img :src="item.coverImgUrl" />
                        <div class="body-title">{{ item.updateFrequency }}</div>
                      </div>
                      <div class="body-name">{{ item.name }}</div>
                      <div class="item-playcount">
                        <div class="playcount-icon">
                          <img src="../assets/images/Recommend_imgs/play.png" />
                        </div>
                        <div class="playcount-text">
                          {{
                            item.playCount > 10000
                              ? (item.playCount - (item.playCount % 1000)) /
                                  10000 +
                                "W"
                              : item.playCount
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      // 用于选项栏添加类名
      scurrIndex: 0,
      // loading显示隐藏
      loadings: false,
      //   官方歌单列表
      officialList: "",
      //   推荐歌单列表
      recommendList: "",
      // 欧美歌单列表
      westernList: "",
      // 华语歌单列表
      chineseList: "",
    };
  },
  created() {
    this.officialList = JSON.parse(sessionStorage.getItem("officialList"));
    this.recommendList = JSON.parse(sessionStorage.getItem("recommendList"));
    this.westernList = JSON.parse(sessionStorage.getItem("westernList"));
    this.chineseList = JSON.parse(sessionStorage.getItem("chineseList"));
  },
  methods: {
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
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
    // 点击歌单跳转到歌单详情页面
    clickSongs(id) {
      this.axios
        .get(`/playlist/detail?id=${id}`)
        .then((res) => {
          this.$store.commit("saveSongsList", res.playlist.tracks);
          // 存储需要带去详情页的歌曲数据到sessionStorage
          sessionStorage.setItem("songs", JSON.stringify(res.playlist.tracks));
          // 存储需要带去详情页的歌单信息数据到sessionStorage
          sessionStorage.setItem("sTitle", JSON.stringify(res.playlist));
          // 跳转对应页面
          this.$router.push({ path: "/SongDetails" });
        })
        .catch((err) => {});
    },
  },
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
        .video-box,
        .songSheet-box,
        .single-box,
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
            margin-bottom: 90px;
            .box-recommend-item {
              width: 100%;
              margin: 0px auto;
              background: #fff;
              border-radius: 10px;
              .item-body {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-top: 15px;
                .recommend-body-1 {
                  width: 100px;
                  background: transparent;
                }
                .recommend-body {
                  width: 100px;
                  background: transparent;
                  position: relative;
                  height: 150px;
                  margin-left: 5px;
                  margin-top: 10px;
                  &::before {
                    content: "";
                    width: 96px;
                    height: 20px;
                    position: absolute;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    background: rgba(128, 128, 128, 0.2);
                    top: -5px;
                    left: 50%;
                    transform: translate(-50%);
                  }
                  .body-name {
                    margin-top: 7px;
                    transform: scale(0.9);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                  }
                  .item-playcount {
                    position: absolute;
                    top: 5px;
                    left: 35px;
                    padding: 5px 0px;
                    border-radius: 5px;
                    background: rgba(49, 49, 49, 0.6);
                    display: flex;
                    align-items: center;
                    z-index: 0;
                    transform: scale(0.7);
                    .playcount-text {
                      width: 50px;
                      color: white;
                    }
                    .playcount-icon {
                      width: 15px;
                      height: 15px;
                      margin-left: 3px;
                      img {
                        width: 100%;
                      }
                    }
                  }
                  .body-img {
                    width: 100px;
                    height: 100px;
                    border-radius: 15px;
                    background: #f8f8f8;
                    position: relative;
                    overflow: hidden;

                    img {
                      width: 100%;
                    }
                    .body-title {
                      position: absolute;
                      top: 5px;
                      right: 12px;
                      color: #fff;
                      transform: scale(0.9);
                    }
                  }
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
      }
      .top-list-fun {
        padding: 10px 0px 0px 0px;
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
      color: black;
      font-size: 14px;
      flex: 1;
      margin-left: 20px;
      margin-top: 2px;
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