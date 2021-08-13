<template>
  <div class="recommend">
    <div class="main">
      <!-- 导航栏 -->
      <div class="nav-bar">
        <div class="bar-icon" @click="ssList">
          <img src="../assets/images/Recommend_imgs/option.png" />
        </div>
        <div class="bar-search" @click="gotSearch">
          <div class="ipt">
            <i class="fa fa-search"></i>
            <span>{{ defaultM }}</span>
          </div>
        </div>
        <div class="bar-userimg">
          <img src="../assets/images/Recommend_imgs/Listening_to_music.png" />
        </div>
      </div>

      <!-- 轮播图 -->
      <div class="swiper">
        <div
          class="swiper-box-item"
          :style="{
            transitionDuration: transTime,
            transform: `translateX(${navlate}px)`,
          }"
        >
          <div
            class="swiper-item"
            v-for="(item, index) in navSwiperArray"
            :key="index"
          >
            <img :src="item.imageUrl" />
          </div>

          <div class="swiper-item">
            <img :src="navMusic0" />
          </div>
          <div class="swiper-item">
            <img :src="navMusic1" />
          </div>
          <div class="swiper-item">
            <img :src="navMusic2" />
          </div>
        </div>
      </div>

      <!-- 内容选择 -->
      <div class="content-nav">
        <div class="nav-body">
          <div class="nav-item nav-day">
            <img
              src="../assets/images/Recommend_imgs/Daily_recommendation.png"
            />
            <span>每日推荐</span>
          </div>
          <div class="nav-item nav-musics" @click="gotoSongsList">
            <img src="../assets/images/Recommend_imgs/Song_list.png" />
            <span>歌单</span>
          </div>
          <div class="nav-item nav-musictop" @click="gotoRankingList">
            <img src="../assets/images/Recommend_imgs/Ranking_List.png" />
            <span>排行榜</span>
          </div>
          <div class="nav-item nav-live" @click="gotoMvS">
            <img src="../assets/images/Recommend_imgs/live_broadcast.png" />
            <span>MV</span>
          </div>
        </div>
      </div>

      <!-- 推荐歌单头部 -->
      <div class="recommend-title">
        <div class="title-content">
          <div class="content-recommend">
            <span>推荐歌单</span>
          </div>
          <div class="content-all">
            <span>歌单广场</span>
            <div class="img-content">
              <img src="../assets/images/Recommend_imgs/Enter_more.png" />
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐歌单轮播图 -->
      <div class="recommend-swiper">
        <div class="swiper-banner">
          <!-- 渲染圆点 -->
          <div
            class="bannerrr banner-1"
            v-for="(item, index) in dayMusicLength"
            :key="index"
            @click="setPoint(index)"
            :class="imgIndex == index ? 'active ' : ''"
          ></div>
        </div>
        <div class="my-swiper-box">
          <div
            class="swiper-box"
            :style="{
              transitionDuration: transTime,
              transform: `translateX(${late}px)`,
            }"
          >
            <!-- 渲染轮播图每一项 -->
            <div
              class="box-item"
              v-for="(item, index) in dayMusic"
              :key="index"
              @click="clickSongs(item.id)"
            >
              <img :src="item.picUrl" />
              <div class="item-icon">
                <img
                  src="../assets/images/Recommend_imgs/Netease_cloud_Icon.png"
                />
              </div>
              <div class="item-playcount">
                <div class="playcount-icon">
                  <img src="../assets/images/Recommend_imgs/play.png" />
                </div>
                <div class="playcount-text">
                  {{
                    item.playCount > 10000
                      ? (item.playCount - (item.playCount % 1000)) / 10000 + "W"
                      : item.playCount
                  }}
                </div>
              </div>
              <div class="item-bottom">
                <div class="bottom-text">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 左侧设置 -->
      <leftfun
        :leftsh="leftsh"
        :bbaa="bbaa"
        @close-F="hSongList"
        @F-close="closeLoginH"
      ></leftfun>
    </div>
  </div>
</template>

<script>
import leftfun from "../components/LeftFunction.vue";

export default {
  name: "Recommend",
  data() {
    return {
      currIndex: 0,
      // 每次移动的距离
      late: 0,
      navlate: 0,
      // 动画时间
      transTime: "500ms",
      // 获取的推荐歌单
      dayMusic: "",
      //推荐歌单长度
      dayMusicLength: 0,
      // 图片索引
      imgIndex: 0,
      // 定时器
      timer: null,
      // 导航栏轮播数组
      navSwiperArray: [],
      // 无缝跳转
      navMusic0: "",
      navMusic1: "",
      navMusic2: "",
      // 歌单歌曲数组
      songList: [],
      // 用户头像
      userImg: "",
      // 默认搜索关键词
      placeholder: null,
      // 控制设置栏
      leftsh: false,
      bbaa: 0,
    };
  },
  created() {
    this.autoplay();
    this.autoGetDayMusic();
    this.autoGetNavDayMusic();
    this.navAutoplay();
    this.userImg = this.$store.state.userImg;
  },
  methods: {
    // 主页跳转mv页
    gotoMvS() {
      this.$router.push({ name: "Video" });
    },
    // 跳转歌单页
    gotoSongsList() {
      // 官方五十个歌单
      this.axios
        .get(`/top/playlist?limit=51&order=hot`)
        .then((res) => {
          this.$router.push({ path: "/SongsList" });
          sessionStorage.setItem("officialList", JSON.stringify(res.playlists));
        })
        .catch((err) => {
          console.log(err);
        });
      // 推荐十二个歌单
      this.axios
        .get(`/top/playlist?limit=12`)
        .then((res) => {
          sessionStorage.setItem(
            "recommendList",
            JSON.stringify(res.playlists)
          );
        })
        .catch((err) => {
          console.log(err);
        });
      // 欧美十二个歌单
      this.axios
        .get(`/top/playlist?limit=12&cat=欧美`)
        .then((res) => {
          sessionStorage.setItem("westernList", JSON.stringify(res.playlists));
        })
        .catch((err) => {
          console.log(err);
        });
      // 华语十二个歌单
      this.axios
        .get(`/top/playlist?limit=12&cat=华语`)
        .then((res) => {
          sessionStorage.setItem("chineseList", JSON.stringify(res.playlists));
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    closeLoginH() {
      this.hSongList();
    },
    // 跳转排行榜
    gotoRankingList() {
      this.axios
        .get(`/toplist/detail`)
        .then((res) => {
          this.$router.push({ path: "/RankingList" });
          sessionStorage.setItem("rankinglist", JSON.stringify(res.list));
        })
        .catch((err) => {});
    },
    // 推荐歌单自动轮播
    autoplay() {
      if (this.timer == null) {
        setInterval(() => {
          // 图片索引自增
          this.imgIndex++;
          // 判断图片索引是否等于导航点索引
          this.imgIndex =
            this.imgIndex > this.dayMusicLength - 1 ? 0 : this.imgIndex;
          // 位移
          this.late -= 250;
          if (this.late == -1500) {
            this.late = 0;
            this.transTime = "1000ms";
          } else {
            this.transTime = "500ms";
          }
        }, 3000);
      } else {
        return;
      }
    },
    // 获取推荐歌单数据
    autoGetDayMusic() {
      this.axios
        .get("/personalized?limit=6")
        .then((res) => {
          this.dayMusic = res.result;
          // 获取数据长度
          this.dayMusicLength = res.result.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 设置导航点切换图片
    setPoint(index) {
      this.imgIndex = index;
      // 设置ul标签的位置
      this.late = -this.imgIndex * 250;
    },

    // 导航栏自动轮播
    navAutoplay() {
      if (this.timer == null) {
        let time = setInterval(() => {
          // 位移
          this.navlate -= 310;
          if (this.navlate == -1860) {
            this.navlate = 0;
            this.transTime = "0ms";
          } else {
            this.transTime = "500ms";
          }
        }, 2500);
      } else {
        return;
      }
    },
    // 获取推荐导航栏轮播数据
    autoGetNavDayMusic() {
      this.axios
        .get("/banner")
        .then((res) => {
          this.navSwiperArray = res.banners;
          this.navMusic0 = res.banners[5].imageUrl;
          this.navMusic1 = res.banners[6].imageUrl;
          this.navMusic2 = res.banners[7].imageUrl;
        })
        .catch((err) => {
          console.log(err);
        });
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
    // 跳转搜索页
    gotSearch() {
      this.$router.push({ name: "Search" });
    },
  },
  computed: {
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
  components: {
    leftfun,
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin-top: 15px;
  .bar-userimg {
    width: 35px;
    height: 35px;
    img {
      width: 100%;
      margin-top: 5px;
    }
  }
  .bar-search {
    .ipt {
      border-radius: 20px;
      width: 260px;
      height: 32px;
      background: #ffffff;
      position: relative;
      i {
        position: absolute;
        top: 50%;
        left: 20px;
        color: gray;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        left: 140px;
        top: 50%;
        color: gray;
        transform: translate(-50%, -50%);
        width: 215px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .bar-icon {
    margin-top: 3px;
    width: 25px;
    img {
      width: 100%;
    }
  }
}
.ssetting-login {
  width: 100%;
  height: 667px;
  position: absolute;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);
  /deep/ .van-button {
    border: 1px solid #c20c0c;
    background: #c20c0c;
  }
  /deep/ .van-field__body {
    margin-left: -25px;
  }
  /deep/ .van-cell__title {
    margin-right: -10px;
    margin-left: 25px;
  }
  .login-body {
    width: 80%;
    height: 230px;
    margin: 200px auto;
    background: rgba(255, 255, 255);
    border-radius: 15px;
    .login-body-top {
      display: flex;
      justify-content: space-between;
      padding: 10px 40px;
      font-size: 16px;
      color: #5f5f5f;
      .body-top-left,
      .body-top-right {
        .bottom {
          width: 64px;
          height: 4px;
          border-radius: 20px;
          transition: all 0.1s;
          margin-left: -10px;
          &.active {
            background: #c20c0c;
            margin-left: 0px;
          }
        }
      }
    }
  }
}
.ssetting {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10000;
  height: 667px;
}
.recommend-swiper {
  width: 100%;
  overflow: hidden;
  margin-top: -10px;
  .my-swiper-box {
    width: 95%;
    overflow: hidden;
    margin-left: 20px;
    // border: 1px solid black;
  }
  .swiper-box {
    width: 1500px;
    display: flex;
    overflow: hidden;
    z-index: -1;
    margin-top: 4px;
    .box-item {
      width: 250px;
      height: 230px;
      background: #f0f0f0;
      margin-left: 15px;
      border-radius: 15px;
      text-align: center;
      overflow: hidden;
      position: relative;
      .item-bottom {
        position: absolute;
        width: 100%;
        height: 35px;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        background: rgba(49, 49, 49, 0.6);
        .bottom-text {
          width: 90%;
          text-align: center;
          // border: 1px solid white;
          margin-left: 10px;
          font-size: 12px;
          color: white;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .item-playcount {
        position: absolute;
        top: 15px;
        left: 160px;
        padding: 5px 0px;
        border-radius: 5px;
        background: rgba(49, 49, 49, 0.6);
        display: flex;
        align-items: center;
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
      .item-icon {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 25px;
        height: 25px;
        background: #ee2e23;
        border-radius: 50%;
        img {
          width: 100%;
          margin-top: -1px;
        }
      }
      img {
        width: 100%;
      }
      &:first-child {
        margin-left: 15px;
      }
    }
  }
  .swiper-banner {
    width: 80%;
    margin: 5px auto;
    display: flex;
    .bannerrr {
      width: 6px;
      height: 6px;
      border: 1px solid #f0f0f0;
      background: #f0f0f0;
      border-radius: 50%;
      margin-left: 10px;
      margin-top: -5px;
      &:first-child {
        margin-left: 0px;
      }
      &.active {
        border: 1px solid #ee2e23;
      }
    }
  }
}
.recommend-title {
  border-top: 1px solid #eeeeee;
  width: 100%;
  margin-top: 15px;
  .title-content {
    width: 80%;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .content-all {
      display: flex;
      color: gray;
      .img-content {
        width: 28px;
        margin-top: -5px;
        margin-left: -5px;
        img {
          width: 100%;
        }
      }
    }
    .content-recommend {
      span {
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
}
.content-nav {
  width: 100%;
  .nav-body {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    margin-top: -20px;
    .nav-item {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ee2e23;
      position: relative;
      text-align: center;
      span {
        width: 50px;
        display: block;
        margin-top: 45px;
        margin-left: -5px;
        color: #797979;
      }
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 60%;
        transform: translate(-50%, -50%);
      }
    }
    .nav-body {
      display: flex;
    }
  }
}
.swiper {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  .swiper-box-item {
    width: 4030px;
    display: flex;
    // border: 1px solid black;
    padding: 20px 0px;
    margin-left: -10px;
  }
  .swiper-item {
    width: 310px;
    height: 110px;
    background: #f6f6f6;
    border-radius: 15px;
    margin-left: 10px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
/deep/ .van-toast__text {
  position: absolute;
  z-index: 2000;
}
</style>
