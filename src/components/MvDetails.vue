<template>
  <div>
    <!-- mv详情 -->
    <div class="mv-details-box">
      <div class="details-box-dd">
        <!-- 歌单详情页顶部导航栏 -->
        <div class="songdetails-top-nav">
          <div class="top-nav-left">
            <div class="nav-left-back">
              <img src="../assets/images/Video_imgs/back.png" @click="goBack" />
            </div>
            <div class="nav-right-search">
              <img src="../assets/images/Video_imgs/more_fun.png" />
            </div>
          </div>
        </div>

        <!-- mv主体 -->
        <div
          class="mv-body"
          :style="commentsSh == false ? 'bottom: 10%;' : 'top: 15%;'"
        >
          <div class="body-box">
            <div class="mv-box" @click="pauseVideo">
              <video ref="mvvideo" :src="mvUrl" autoplay="autoplay"></video>
            </div>
            <div class="playericon" v-show="flag == true" @click="playerVideo">
              <img src="../assets/images/Video_imgs/player_details.png" />
            </div>
          </div>
        </div>

        <!-- MV信息 -->
        <div class="details-body">
          <div class="body-details">
            <div class="details-item">
              <!-- 左侧信息 -->
              <div class="item-left">
                <div class="left-top">
                  <div class="left-img">
                    <img :src="mvInfo.cover" />
                  </div>
                  <div class="left-name">{{ mvInfo.artistName }}</div>
                  <div class="left-addlike">
                    <img src="../assets/images/Video_imgs/add.png" />
                  </div>
                </div>
                <div class="left-bottom">{{ mvInfo.name }}</div>
              </div>
              <!-- 右侧选项 -->
              <div class="item-right">
                <div class="right-zan item-img">
                  <img
                    src="../assets/images/Video_imgs/zan.png"
                    :class="zan == false ? 'img2' : 'img3'"
                    v-show="zan == false"
                    @click="zanThisMv"
                  />
                  <img
                    src="../assets/images/Video_imgs/zan_active.png"
                    v-show="zan == true"
                    :class="zan == true ? 'img1' : 'img3'"
                    @click="zanThisMv"
                  />
                  <div class="zan-text">{{ mvinfo.likedCount }}</div>
                </div>
                <div class="right-pinlun item-img" @click="pinlunOpen">
                  <img src="../assets/images/Video_imgs/pinglun.png" />
                  <div class="zan-text">{{ mvinfo.commentCount }}</div>
                </div>
                <div class="right-zhaunfa item-img">
                  <img src="../assets/images/Video_imgs/zhuanfa.png" />
                  <div class="zan-text">{{ mvinfo.shareCount }}</div>
                </div>
                <div class="right-shoucang item-img">
                  <img src="../assets/images/Video_imgs/wenjianjia.png" />
                  <div class="zan-text">收藏</div>
                </div>
              </div>
            </div>
            <!-- 进度条 -->
            <div class="jindut">
              <!-- @change="changeM" -->
              <van-slider
                v-model="value"
                button-size="5px"
                @change="changeM"
                active-color="#d8d8d8"
              />
            </div>
            <!-- 添加喜欢，歌手名字 -->
            <div class="addlike-box">
              <div class="like-box">
                <img
                  @click="likeThisMv"
                  src="../assets/images/Video_imgs/like.png"
                  v-show="liked == false"
                />
                <img
                  @click="likeThisMv"
                  src="../assets/images/Video_imgs/like_active.png"
                  v-show="liked == true"
                />
              </div>
              <div class="like-name">
                {{ mvInfo.name }} - {{ mvInfo.artistName }}
              </div>
            </div>
          </div>
        </div>

        <!-- 评论区 -->
        <div
          class="pinlun-box"
          :style="commentsSh == true ? 'bottom: 0%;' : 'bottom: -100%;'"
        >
          <div class="pinlun-box-item">
            <div class="bottom-icon" @click="pinlunClose">
              <img src="../assets/images/Video_imgs/bottom.png" />
            </div>
            <div class="pinlun-dd">
              <div class="item1">评论({{ comments.length }})</div>
              <div class="item active">推荐</div>
              <div class="item">最热</div>
              <div class="item">最新</div>
            </div>

            <div class="tips" v-show="comments == 0">暂时没有评论哦</div>

            <!-- 评论主体 -->
            <div
              class="pinlun-body"
              v-for="(item, index) in comments"
              :key="index"
            >
              <div class="pinlun-body-item">
                <div class="item-img">
                  <img :src="item.user.avatarUrl" />
                </div>
                <div class="item-nickname">
                  <div class="name">{{ item.user.nickname }}</div>
                  <div class="timer">
                    <div class="timer-1">{{ item.time | formatDate }}</div>
                  </div>
                </div>
              </div>
              <!-- 评论内容 -->
              <div class="body-pinlun-text">
                {{ item.content }}
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
  name: "MvDetails",
  data() {
    return {
      mvUrl: "",
      mvinfo: "",
      value: 0,
      //   播放图标默认隐藏
      flag: false,
      mcurrentTim: "",
      mduration: "",
      liked: false,
      zan: false,
      mvid: "",
      //   品论列表
      comments: "",
      // 控制评论区显示隐藏
      commentsSh: false,
      mvInfo: "",
    };
  },
  created() {
    this.mvUrl = JSON.parse(sessionStorage.getItem("videourl"));
    this.mvinfo = JSON.parse(sessionStorage.getItem("mvinfo"));
    this.mvid = JSON.parse(sessionStorage.getItem("mvid"));
    this.mvInfo = JSON.parse(sessionStorage.getItem("mvIndex"));
    this.currTimerVideo();
    console.log(this.mvinfo);
  },
  methods: {
    //   点击打开评论列表
    pinlunOpen() {
      this.axios
        .get(`/comment/mv?id=${this.mvid}`)
        .then((res) => {
          this.comments = res.comments;
          this.commentsSh = true;
        })
        .catch((err) => {});
    },
    //   点击关闭评论列表
    pinlunClose() {
      this.commentsSh = false;
    },
    //   控制点赞/取消点赞该mv
    zanThisMv() {
      this.zan = !this.zan;
      if(this.zan){
        this.mvinfo.likedCount += 1;
      }else{
        this.mvinfo.likedCount -= 1;
      }
    },
    //   控制收藏/取消收藏该mv
    likeThisMv() {
      this.liked = !this.liked;
      if (this.liked) {
        setTimeout(() => {
          this.$toast("收藏成功");
        }, 500);
      } else if (!this.liked) {
        setTimeout(() => {
          this.$toast("取消收藏");
        }, 500);
      }
    },
    //   暂停视频
    pauseVideo() {
      this.$refs.mvvideo.pause();
      this.flag = true;
    },
    //   播放视频
    playerVideo() {
      this.$refs.mvvideo.play();
      this.flag = false;
    },
    // 计算进度条时间
    currTimerVideo() {
      clearInterval(timer);
      let timer = setInterval(() => {
        // 获取音乐当前的时间
        this.mcurrentTime = this.$refs.mvvideo.currentTime;
        // 获取音乐总时间
        this.mduration = this.$refs.mvvideo.duration;
        // 计算滚动条的value值
        this.value = (this.mcurrentTime / this.mduration) * 100;
        // 时间结束清除定时器
        if (this.value == 100) {
          clearInterval(timer);
          // 改变flag值控制旋转,以及暂停,播放图标
          this.flag = true;
        }
      }, 999);
    },
    // 获取滚动条位置
    changeM() {
      let duration = (this.$refs.mvvideo.duration * this.value) / 100;
      // 修改自增的时间
      this.mduration = duration;
      this.$refs.mvvideo.currentTime = duration;
    },
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
  },
  filters: {
    formatDate(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      //   let h = date.getHours();
      //   h = h < 10 ? "0" + h : h;
      //   let m = date.getMinutes();
      //   m = m < 10 ? "0" + m : m;
      //   let s = date.getSeconds();
      //   s = s < 10 ? "0" + s : s;
      //   return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      return y + "-" + MM + "-" + d;
    },
  },
};
</script>

<style lang="less" scoped>
.mv-details-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .details-box-dd {
    width: 100%;
    margin: 0 auto;
    .pinlun-box {
      width: 100%;
      position: absolute;
      left: 0%;
      bottom: 0%;
      transition: all 0.3s ease;
      .pinlun-box-item {
        width: 100%;
        height: 446px;
        background: #fff;
        position: absolute;
        bottom: 0px;
        overflow: hidden;
        overflow-y: auto;
        
        .tips {
          text-align: center;
          color: gray;
        }
        .pinlun-body {
          width: 100%;
          margin-bottom: 25px;
          .body-pinlun-text {
            width: 65%;
            // height: 100px;
            margin: 0 auto;
          }
          .pinlun-body-item {
            width: 90%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .item-nickname {
              color: gray;
              flex: 1;
              margin-left: 10px;
              .timer {
                display: flex;
                transform: scale(0.8);
                margin-left: -30px;
              }
            }
            .item-img {
              width: 35px;
              height: 35px;
              overflow: hidden;
              border-radius: 50%;
              background: #d8d8d8;
              img {
                width: 100%;
              }
            }
          }
        }
        .pinlun-dd {
          width: 90%;
          margin: 25px auto;
          display: flex;
          justify-content: space-between;
          color: gray;
          .item1 {
            flex: 1;
          }
          .item {
            margin-right: 10px;
            &:last-child {
              margin-right: 0px;
            }
            &.active {
              color: #000;
              font-weight: bold;
            }
          }
        }
        .bottom-icon {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          img {
            width: 100%;
          }
        }
      }
    }
    .details-body {
      width: 100%;
      margin: 0 auto;
      .body-details {
        .addlike-box {
          width: 90%;
          position: absolute;
          bottom: -1%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          color: #d8d8d8;
          .like-name {
            // width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .like-box {
            width: 30px;
            height: 30px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
        }
        .jindut {
          width: 100%;
          position: absolute;
          bottom: 7%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .details-item {
          width: 90%;
          position: absolute;
          bottom: -10%;
          left: 50%;
          display: flex;
          transform: translate(-50%, -50%);
          align-items: flex-end;
          .item-right {
            .right-zan {
              .img1 {
                animation: dianzan 0.3s linear;
              }
              .img2 {
                animation: quxiao 0.3s linear;
              }
              @keyframes dianzan {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(1.2);
                }
              }
              @keyframes quxiao {
                0% {
                  transform: scale(1);
                }
                100% {
                  transform: scale(0.8);
                }
              }
            }
            color: #d8d8d8;
            .item-img {
              text-align: center;
              width: 25px;
              height: 25px;
              margin-top: 35px;
              &:last-child {
                margin-bottom: 20px;
              }
              img {
                width: 100%;
              }
            }
          }
          .item-left {
            width: 90%;
            margin: 0px auto;
            color: #d8d8d8;
            .left-bottom {
              width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-top: 10px;
            }
            .left-top {
              display: flex;
              align-items: center;
              .left-addlike {
                border-radius: 10px;
                padding: 8px 13px;
                background: #f66842;
                position: relative;
                margin-left: 5px;
                img {
                  width: 12px;
                  position: absolute;
                  top: 49%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .left-img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                overflow: hidden;
                background: #cecece;
                margin-right: 5px;
                position: relative;
                img {
                  width: 100%;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
      }
    }
    .mv-body {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      .body-box {
        .mv-box {
          width: 100%;
          height: 190px;
          background: #000;
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          video {
            width: 100%;
          }
        }
        .playericon {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          img {
            width: 25px;
          }
        }
      }
    }
    .songdetails-top-nav {
      width: 100%;
      background: #000;
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
  }
}
</style>