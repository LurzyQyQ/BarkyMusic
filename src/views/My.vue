<template>
  <div class="my">
    <!-- 我的-导航栏 -->
    <div class="nav-bar">
      <div class="bar-icon" @click="ssList">
        <img src="../assets/images/My_imgs/option.png" />
      </div>
      <div class="bar-search">
        <img src="../assets/images/My_imgs/search.png" />
      </div>
    </div>

    <!-- 我的-用户信息-简洁 -->
    <div class="userinfo-box">
      <div class="box-item">
        <!-- 用户头像 -->
        <div class="box-left">
          <div class="left-box">
            <img :src="info.profile.avatarUrl" />
          </div>
        </div>
        <!-- 用户昵称 -->
        <div class="box-centent">
          <div class="box-name">{{info.profile.nickname}}</div>
          <div class="box-vip">
            <img src="../assets/images/My_imgs/vip.jpg" />
            <div class="box-lv">lv.{{info.level}}</div>
          </div>
        </div>
        <div class="box-right">
          <img src="../assets/images/My_imgs/Enter_more.png" />
        </div>
      </div>
    </div>

    <!-- 我的-我喜欢 -->
    <div class="my-like-box">
      <div class="like-box-item">
        <div class="box-item-left">
          <div class="item-left-img">
            <img :src="likeList.coverImgUrl" />
          </div>
          <div class="item-left-img-mask">
            <img src="../assets/images/My_imgs/love.png" />
          </div>
        </div>
        <div class="box-item-centent">
          <div class="item-centent-text">
            <div class="centent-text-top">我喜欢的音乐</div>
            <div class="centent-text-bottom">
              {{likeList.trackCount}}首
            </div>
          </div>
        </div>
        <div class="box-item-right">
          <div class="itme-right-box">
            <div class="right-box-img">
              <img src="../assets/images/My_imgs/Cardiac_pattern.png" />
            </div>
            <div class="right-box-text">心动模式</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 我的-歌单-创建-收藏 -->
    <div class="my-songs-box">
      <div class="songs-box-item">
        <div
          class="box-item-1"
          v-for="(item, index) in gedanArray"
          :key="index"
          @click="toggle(index)"
        >
          {{ item.title }}
          <div :class="currIndex == index ? 'active' : ''"></div>
        </div>
      </div>
    </div>

    <!-- 创建歌单-收藏歌单-各单助手对应的div -->
    <div class="song-box-box">
      <div class="box-box">
        <div class="box-establish" v-show="currIndex == 0">
          <div class="establish-title">
            <div class="title-left">创建歌单({{newList.length}}个)</div>
            <div class="title-right">
              <img src="../assets/images/My_imgs/more.png" />
            </div>
          </div>
          <!-- 创建歌单列表 -->
          <div class="list-songs-box" v-for="item, index in newList" :key="index">
            <div class="like-box-item">
              <div class="box-item-left">
                <div class="item-left-img">
                  <img :src="item.coverImgUrl" />
                </div>
              </div>
              <div class="box-item-centent">
                <div class="item-centent-text">
                  <div class="centent-text-top">{{item.name}}</div>
                  <div class="centent-text-bottom">{{item.trackCount}}首</div>
                </div>
              </div>
              <div class="box-item-right">
                <div class="itme-right-box">
                  <div class="right-box-img" @click="notLike(index)">
                    <img src="../assets/images/My_imgs/Delete_list.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="box-collection" v-show="currIndex == 1">
          <div class="establish-title">
            <div class="title-left">收藏歌单({{collectionList.length}}个)</div>
            <div class="title-right">
              <img src="../assets/images/My_imgs/more.png" />
            </div>
          </div>
          <!-- 创建歌单列表 -->
          <div class="list-songs-box" v-for="item, index in collectionList" :key="index">
            <div class="like-box-item">
              <div class="box-item-left">
                <div class="item-left-img">
                  <img :src="item.coverImgUrl" />
                </div>
              </div>
              <div class="box-item-centent">
                <div class="item-centent-text">
                  <div class="centent-text-top">{{item.name}}</div>
                  <div class="centent-text-bottom">{{item.trackCount}}首</div>
                </div>
              </div>
              <div class="box-item-right">
                <div class="itme-right-box">
                  <div class="right-box-img" @click="notLike(index)">
                    <img src="../assets/images/My_imgs/Delete_list.png" />
                  </div>
                </div>
              </div>
            </div>
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
  name: "My",
  data() {
    return {
      currIndex1: 0,
      //登录页面用户信息
      userInfo: {
        Email163: "",
        Password163: "",
      },
      currIndex: 0,
      gedanArray: [
        { id: "00001", title: "创建歌单", ind: 0 },
        { id: "00002", title: "收藏歌单", ind: 1 },
      ],
      // 用户信息
      info: "",
      // 歌单信息
      // sInfo: "",
      // 我喜欢的歌单
      likeList: "",
      // 创建的歌单
      newList: [],
      // 收藏的歌单
      collectionList: [], 
      // 控制设置栏
      leftsh: false,
      bbaa: 0,
    };
  },
  created() {
    // 用户个人信息
    this.info = JSON.parse(sessionStorage.getItem("info"));
    // 用户喜欢的音乐
    this.likeList = JSON.parse(sessionStorage.getItem("sInfo")).playlist[0];
    // 用户创建的歌单
    this.newList.push(JSON.parse(sessionStorage.getItem("sInfo")).playlist[1]);
    // 用户收藏的歌单
    this.collectionList.push(JSON.parse(sessionStorage.getItem("sInfo")).playlist[2], JSON.parse(sessionStorage.getItem("sInfo")).playlist[3]);
  },
  methods: {
    // 取消收藏歌单
    notLike(index){
      this.collectionList.splice(index, 1);
    },
    toggle(index) {
      this.currIndex = index;
    },
    // 控制左边设置栏隐藏
    ssList() {
      this.leftsh = true;
      setTimeout(() => {
        this.bbaa = 1;
      }, 350);
    },
    // 控制左边设置栏显示
    hSongList() {
      this.bbaa = 0;
      setTimeout(() => {
        this.leftsh = false;
      }, 350);
    },
    // 退出登录后隐藏左侧设置栏
    closeLoginH(){
        this.hSongList()
    },
  },
  components: {
    leftfun,
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-toast__text {
  position: absolute;
  z-index: 2000;
}
.nav-bar {
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin-top: 15px;
  .bar-userimg {
    width: 34px;
    height: 34px;
    background: #ffffff;
    border-radius: 50%;
  }
  .bar-search {
    input {
      padding: 9px 55px;
      border-radius: 20px;
      border: none;
      outline: none;
      text-align: center;
      background: #ffffff;
    }
  }
  .bar-icon {
    width: 25px;
    img {
      width: 100%;
      margin-top: 3px;
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
          &.active1 {
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
.song-box-box {
  width: 100%;
  .box-box {
    width: 90%;
    margin: 15px auto;
    position: relative;
    display: flex;
    // border: 1px solid black;
    border-radius: 10px;
    background: #ffffff;
    .list-songs-box {
      width: 100%;
      height: 60px;
      background: #ffffff;
      padding: 10px 0px 0px 0px;
      &:last-child{
        margin-bottom: 90px;
        padding-bottom: 10px;
      }
      .like-box-item {
        width: 90%;
        margin: 0px auto;
        display: flex;
        background: #ffffff;
        justify-content: space-between;
        color: #303030;
        align-items: center;
        .box-item-right {
          .itme-right-box {
            display: flex;
            border-radius: 20px;
            .right-box-text {
              font-size: 12px;
              margin-top: 1px;
              color: black;
            }
            .right-box-img {
              width: 20px;
              img {
                width: 100%;
              }
            }
          }
        }
        .box-item-centent {
          flex: 1;
          margin-left: 10px;
          width: 100px;
          // border: 1px solid black;
          .centent-text-bottom {
            font-size: 12px;
            font-weight: 200;
            margin-top: 5px;
          }
          .centent-text-top {
            width: 200px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .box-item-left {
          position: relative;
          .item-left-img {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            background: #f8f8f8;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
    .establish-title {
      width: 90%;
      margin: 0 auto;
      display: flex;
      background: #fff;
      padding: 10px 17px;
      justify-content: space-between;
      align-items: center;
      .title-right {
        img {
          width: 20px;
        }
      }
      .title-left {
        flex: 1;
      }
    }
    .box-establish,
    .box-collection,
    .box-assistant {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.my-songs-box {
  width: 100%;
  .songs-box-item {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 15px;
    .box-item-1 {
      div {
        width: 60px;
        border-radius: 20px;
        height: 4px;
        transition: all 0.1s;
        margin-left: -10px;
        &.active {
          background: #fa3025;
          margin-left: 0px;
        }
      }
    }
    span {
      font-size: 12px;
      color: #afafaf;
    }
  }
}
.my-like-box {
  width: 100%;
  .like-box-item {
    width: 80%;
    margin: 20px auto;
    display: flex;
    background: #ffffff;
    padding: 10px 15px;
    justify-content: space-between;
    color: #303030;
    align-items: center;
    .box-item-right {
      .itme-right-box {
        display: flex;
        border: 1px solid #acacac;
        padding: 5px 10px 0px 10px;
        border-radius: 20px;
        .right-box-text {
          font-size: 12px;
          margin-top: 1px;
          color: black;
        }
        .right-box-img {
          margin-right: 5px;
          width: 20px;
          img {
            width: 100%;
          }
        }
      }
    }
    .box-item-centent {
      flex: 1;
      margin-left: 10px;
      width: 100px;
      // border: 1px solid black;
      .centent-text-bottom {
        font-size: 12px;
        font-weight: 200;
        margin-top: 5px;
      }
      .centent-text-top {
        font-size: 14px;
      }
    }
    .box-item-left {
      position: relative;
      .item-left-img-mask {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 74px;
        img {
          width: 25px;
        }
      }
      .item-left-img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        background: #f8f8f8;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
}

.userinfo-box {
  width: 100%;
  .box-item {
    width: 90%;
    margin: 30px auto;
    // border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box-right {
      width: 30px;
      img {
        width: 100%;
      }
    }
    .box-centent {
      flex: 1;
      margin-left: 10px;
      margin-top: 10px;
      .box-vip {
        display: flex;
        width: 50px;
        margin-top: 5px;
        align-items: center;
        .box-lv {
          margin-left: 5px;
        }
        img {
          margin-top: 2px;
          width: 100%;
        }
      }
    }
    .box-left {
      width: 60px;
      height: 60px;
      border: 1px solid #e7e7e7;
      border-radius: 50%;
      background: white;
      position: relative;
      .left-box {
        width: 55px;
        height: 55px;
        background: #ffffff;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
}
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 15px;
  // border: 1px solid black;
  padding: 0px 10px;
  .bar-search {
    width: 25px;
    img {
      width: 100%;
    }
  }
  .bar-icon {
    width: 25px;
    img {
      width: 100%;
      margin-top: 3px;
    }
  }
}
</style>