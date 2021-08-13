<template>
  <div class="songdetails">
    <!-- 歌单顶部详情 -->
    <div class="details-top-box">
      <!-- 歌单详情页顶部导航栏 -->
      <div class="songdetails-top-nav">
        <div class="top-nav-left">
          <div class="nav-left-back">
            <img
              src="../assets/images/SongDetails_imgs/back.png"
              @click="goBack"
            />
          </div>
          <div class="nav-left-text">歌单</div>
        </div>
        <div class="top-nav-right">
          <div class="nav-right-search">
            <img src="../assets/images/SongDetails_imgs/search.png" />
          </div>
          <div class="nav-right-more">
            <img src="../assets/images/SongDetails_imgs/more_fun.png" />
          </div>
        </div>
      </div>
      <div
        class="mask-box"
        :style="`background: url(${SongstTitle.coverImgUrl});`"
      ></div>
      <div class="top-box-item">
        <div class="box-item-img">
          <!-- 歌单图片 -->
          <img :src="SongstTitle.coverImgUrl" class="backimg" />
          <!-- 歌单播放量 -->
          <div class="item-playcount">
            <div class="playcount-icon">
              <img src="../assets/images/SongDetails_imgs/play.png" />
            </div>
            <div class="playcount-text">
              {{
                SongstTitle.playCount > 10000
                  ? (SongstTitle.playCount - (SongstTitle.playCount % 1000)) /
                      10000 +
                    "W"
                  : SongstTitle.playCount
              }}
            </div>
          </div>
        </div>
        <!-- 歌单简介 -->
        <div class="jianjie-title">
          <div class="title-text">{{ SongstTitle.name }}</div>
          <!-- 作者信息 -->
          <div class="songs-zuozhe">
            <!-- 头像 -->
            <div class="zuozhe-icon">
              <img :src="SongstTitle.creator.avatarUrl" />
            </div>
            <!-- 昵称 -->
            <div class="zuozhe-nickname">
              {{ SongstTitle.creator.nickname }}
            </div>
            <!-- 关注图标 -->
            <div class="zuozhe-add">
              <img src="../assets/images/SongDetails_imgs/add.png" />
            </div>
          </div>
          <!-- 相似歌单 -->
          <div class="xiangsi-title">
            <div class="title-text">{{ SongstTitle.description }}</div>
            <div class="title-icon">
              <img src="../assets/images/SongDetails_imgs/right.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- 歌单功能栏 -->
      <div class="function-nav">
        <div class="nav-left" @click="likeNotLike">
          <img src="../assets/images/SongDetails_imgs/Collection.png" />
          <span>{{
            SongstTitle.subscribedCount > 10000
              ? (SongstTitle.subscribedCount -
                  (SongstTitle.subscribedCount % 1000)) /
                  10000 +
                "W"
              : SongstTitle.subscribedCount
          }}</span>
        </div>
        <div class="shu">|</div>
        <div class="nav-centent">
          <img src="../assets/images/SongDetails_imgs/comment.png" />
          <span>{{
            SongstTitle.commentCount > 10000
              ? (SongstTitle.commentCount - (SongstTitle.commentCount % 1000)) /
                  10000 +
                "W"
              : SongstTitle.commentCount
          }}</span>
        </div>
        <div class="shu">|</div>
        <div class="nav-right">
          <img src="../assets/images/SongDetails_imgs/Share_song_list.png" />
          <span>{{
            SongstTitle.shareCount > 10000
              ? (SongstTitle.shareCount - (SongstTitle.shareCount % 1000)) /
                  10000 +
                "W"
              : SongstTitle.shareCount
          }}</span>
        </div>
      </div>
    </div>

    <!-- 黑胶vip栏 -->
    <div class="heijiao-nav">
      <div class="nav-item">
        <div class="item-left">
          <div class="item-icon">
            <img src="../assets/images/SongDetails_imgs/Black_glue.jpg" />
          </div>
          <div class="item-text1">含13首VIP专享歌曲</div>
        </div>
        <div class="item-right">
          <div class="item-text2">VIP首月2.8元</div>
          <div class="item-icon">
            <img src="../assets/images/SongDetails_imgs/Enter_more.png" />
          </div>
        </div>
      </div>
    </div>

    <!-- 全部播放栏 -->
    <div class="all-player">
      <div class="player-item">
        <div class="item-left-icon" @click="getSong(0, 0)">
          <img src="../assets/images/SongDetails_imgs/player.png" />
        </div>
        <div class="item-left-text">
          <div class="left-text-all">播放全部</div>
          <div class="left-text-count">({{ songList.length }})</div>
        </div>
        <div class="item-right-icon">
          <div class="right-icon-download">
            <img src="../assets/images/SongDetails_imgs/download.png" />
          </div>
          <div class="right-icon-choice">
            <img src="../assets/images/SongDetails_imgs/isover.png" />
          </div>
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
        <div class="item-idnex">
          <img :src="item.al.picUrl" />
        </div>
        <div class="item-name">
          <div class="song-name">{{ item.name }}</div>
          <div class="zuozhe-name">
            {{ item.ar[0].name }} - {{ item.al.name }}
          </div>
        </div>
        <div class="item-mv">
          <img
            src="../assets/images/SongDetails_imgs/mv.png"
            v-show="item.mv"
          />
        </div>
        <div class="item-more">
          <img src="../assets/images/SongDetails_imgs/more.png" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "SongDetails",
  data() {
    return {
      // 歌曲列表
      songList: "",
      // 歌单详情
      SongstTitle: "",
      // t: 1为收藏 2为取消收藏
      t: false,
    };
  },
  created() {
    // 存储sessionStorage中的歌曲列表
    this.songList = JSON.parse(sessionStorage.getItem("songs"));
    console.log("歌曲列表=>", this.songList);
    // 存储sessionStorage中的歌单收藏,评论,分享数值
    this.SongstTitle = JSON.parse(sessionStorage.getItem("sTitle"));
    console.log("歌单信息=>", this.SongstTitle);
  },
  methods: {
    // 获取歌曲id
    getSong(id, index) {
      // 存储歌曲id,下标到state
      this.$store.commit("saveId", id);
      this.$store.commit("saveIndex", index);
      this.$store.commit("saveSlength", this.songList.length);
    },
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
    // 收藏取消收藏歌单
    likeNotLike(){
      this.t = !this.t;
      if(this.t){
        setTimeout(() => {
          this.$toast("收藏成功");
          sessionStorage.setItem("newSongs", JSON.stringify(this.SongstTitle));
          console.log(sessionStorage.getItem("newSongs"));
        }, 500)
      }else{
        setTimeout(() => {
          this.$toast("取消收藏");
        }, 500)
      }
    },
  },
  computed: {
    lsUpDown() {
      return this.$store.state.sindex;
    },
    chioseChang() {
      return this.$store.state.chioseF;
    },
  },
  watch: {
    // sindex
    lsUpDown(val) {
      // 根据自定义属性获取元素
      let index = document.querySelector("div[data-index= '" + val + "' ]");
      // 根据元素获取自定义属性的值
      let id = parseInt(index.dataset.musicid);
      // 修改state的id
      this.$store.state.sid = id;
    },
  },
};
</script>

<style lang="less" scoped>
.song-list {
  width: 100%;
  background: #fff;
  margin-top: -20px;
  .list-item {
    width: 90%;
    margin: 0 auto;
    // background: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .item-idnex {
      width: 35px;
      height: 35px;
      border-radius: 5px;
      overflow: hidden;
      background: #f8f8f8;
      img {
        width: 100%;
      }
    }
    &:first-child {
      margin-top: 20px;
    }
    &:last-child {
      padding-bottom: 10px;
      margin-bottom: 95px;
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
      margin-left: 15px;
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
.all-player {
  width: 100%;
  background: #fff;
  padding: 10px 0px;
  margin-top: 40px;
  .player-item {
    width: 90%;
    margin: 0 auto;
    // background: pink;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item-right-icon {
      display: flex;
      align-items: center;
      .right-icon-choice {
        margin-left: 15px;
      }
      .right-icon-download {
        width: 30px;
        img {
          width: 100%;
        }
      }
    }

    .item-left-text {
      flex: 1;
      margin-left: 10px;
      display: flex;
      align-items: center;
      .left-text-count {
        color: #999999;
      }
      .left-text-all {
        font-size: 14px;
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .item-left-icon {
      width: 20px;
      height: 20px;
      background: #c20c0c;
      border-radius: 50%;
      text-align: center;
      img {
        margin-top: 2px;
        margin-left: 2px;
        width: 15px;
      }
    }
  }
}
.heijiao-nav {
  width: 100%;
  .nav-item {
    width: 90%;
    display: flex;
    background: #ffffff;
    border: 1px solid #f8f8f8;
    justify-content: space-between;
    position: absolute;
    padding: 8px 5px;
    border-radius: 13px;
    left: 14px;
    .item-left,
    .item-right {
      display: flex;
      align-items: center;
    }
    .item-left {
      .item-text1 {
        color: #1b1b1b;
        margin-left: 10px;
      }
      .item-icon {
        width: 20px;
        img {
          width: 100%;
        }
      }
    }
    .item-right {
      .item-text2 {
        color: #808080;
        margin-right: 10px;
      }
      .item-icon {
        width: 20px;
        img {
          width: 100%;
        }
      }
    }
  }
}
.details-top-box {
  width: 100%;
  height: 280px;
  position: relative;
  background: #ffffff;
  // overflow: hidden;
  display: flex;
  justify-content: center;
  .function-nav {
    width: 60%;
    height: 45px;
    background: rgba(255, 255, 255);
    box-shadow: 0px 1px 9px 0px #d8d7d7;
    position: absolute;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 80%;
    border-radius: 20px;
    padding: 0px 10px;
    .shu {
      color: #808080;
    }
    .nav-right,
    .nav-centent,
    .nav-left {
      display: flex;
      align-items: center;
      span {
        color: #808080;
        margin-left: 5px;
        font-size: 12px;
        font-weight: 200;
      }
      img {
        width: 20px;
      }
    }
  }
  .top-box-item {
    width: 94%;
    position: absolute;
    z-index: 1000;
    display: flex;
    margin-top: 1.33333rem;
    .jianjie-title {
      width: 191px;
      margin-left: 12px;
      // background: skyblue;
      padding: 10px 0px;
      .xiangsi-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title-icon {
          width: 20px;
          height: 20px;
          img {
            width: 100%;
          }
        }
        .title-text {
          margin-top: 5px;
          width: 176px;
          font-size: 12px;
          font-weight: 200;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .songs-zuozhe {
        width: 100%;
        // background: orangered;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40px;
        .zuozhe-add {
          width: 13px;
          height: 13px;
          padding: 3px 10px;
          border-radius: 10px;
          margin-left: 5px;
          background: rgba(182, 181, 181, 0.6);
          img {
            width: 100%;
          }
        }
        .zuozhe-nickname {
          font-size: 12px;
          font-weight: 200;
          color: #e6e6e6;
          width: 115px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .zuozhe-icon {
          width: 25px;
          height: 25px;
          background: gray;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
      .title-text {
        font-size: 15px;
        color: #e6e6e6;
      }
    }
    .item-playcount {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 7px;
      border-radius: 10px;
      background: rgba(49, 49, 49, 0.3);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .playcount-text {
        // width: 30px;
        color: white;
        margin-left: 4px;
        font-weight: 200;
      }
      .playcount-icon {
        width: 10px;
        height: 10px;
        margin-left: 03px;
        img {
          width: 100%;
        }
      }
    }
    .box-item-img {
      width: 150px;
      height: 150px;
      background: #c7c7c7;
      border-radius: 20px;
      position: relative;
      overflow: hidden;
      .backimg {
        width: 100%;
      }
    }
  }
  .mask-box {
    width: 375px;
    height: 300px;
    // border-radius: 50%;
    background: #9b7045;
    position: absolute;
    // top: -35%;
    // left: -83%;
    filter: blur(100px);
    margin-top: -60px;
  }
}
.songdetails-top-nav {
  width: 100%;
  height: 1.33333rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 0;
  .top-nav-right,
  .top-nav-left {
    display: flex;
    align-items: center;
    padding: 10px 5px;
  }
  .nav-right-more,
  .nav-right-search,
  .nav-left-back {
    width: 30px;
    img {
      width: 100%;
    }
  }
  .nav-right-more,
  .nav-right-search {
    width: 20px;
    margin-left: 20px;
  }
  .nav-left-text {
    font-size: 16px;
    margin-left: 10px;
    color: #ffffff;
  }
}
</style>