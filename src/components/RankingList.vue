<template>
  <div>
    <!-- 排行榜页顶部导航栏 -->
    <div class="songdetails-top-nav">
      <div class="top-nav-left">
        <div class="nav-left-back">
          <img
            src="../assets/images/RankingList_imgs/back-arrow.png"
            @click="goBack"
          />
        </div>
        <div class="nav-left-text">排行榜</div>
      </div>
    </div>

    <!-- 切换排行榜类型 -->
    <div class="switch-list-type">
      <div class="list-type">
        <div class="type-item">
          <div
            class="item-name"
            @click="changScurrIndex(0)"
            :class="{ active: scurrIndex == 0 }"
          >
            官方
          </div>
          <span
            class="item-addclass"
            :class="{ active: scurrIndex == 0 }"
          ></span>
        </div>
        <div class="type-item">
          <div
            class="item-name"
            @click="changScurrIndex(1)"
            :class="{ active: scurrIndex == 1 }"
          >
            曲风
          </div>
          <span
            class="item-addclass"
            :class="{ active: scurrIndex == 1 }"
          ></span>
        </div>
      </div>
    </div>

    <!-- 加载页 -->
    <div class="loading-box" v-show="loadings">
      <van-loading size="34px" color="#eb342b"/>
    </div>

    <!-- 榜单推荐 -->
    <div class="recommend-box" v-show="!loadings">
      <div class="box-recommend-item">
        <div class="recommend-title">榜单推荐</div>
        <div class="item-body">
          <div
            class="recommend-body"
            v-for="(item, index) in recommendRankingList"
            :key="index"
            @click="getRankinList(item.id)"
          >
            <div class="body-img">
              <img :src="item.coverImgUrl" />
              <div class="body-title">{{ item.updateFrequency }}</div>
              <div class="player">
                <img src="../assets/images/RankingList_imgs/player.png" />
              </div>
            </div>
            <div class="body-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 官方榜单 -->
    <div class="official-box" v-show="!loadings">
      <div class="official-box-item">
        <div class="official-title">官方榜</div>
        <div
          class="box-item"
          v-for="(item, index) in officialList"
          :key="index"
          @click="getRankinList(item.id)"
        >
          <div class="item-left">
            <img :src="item.coverImgUrl" />
            <div class="title">{{ item.name }}</div>
          </div>
          <div class="item-right">
            <div class="item" v-for="(it, ind) in item.tracks" :key="ind">
              {{ ind + 1 }}. {{ it.first }} - {{ it.second }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 曲风榜 -->
    <div class="recommend-box-1" v-show="!loadings">
      <div class="box-recommend-item">
        <div class="recommend-title">曲风榜</div>
        <div class="item-body">
          <div
            class="recommend-body"
            v-for="(item, index) in genreList"
            :key="index"
            @click="getRankinList(item.id)"
          >
            <div class="body-img">
              <img :src="item.coverImgUrl" />
              <div class="body-title">{{ item.updateFrequency }}</div>
              <div class="player">
                <img src="../assets/images/RankingList_imgs/player.png" />
              </div>
            </div>
            <div class="body-name">{{ item.name }}</div>
          </div>
          <!-- 用于填充flex -->
          <div class="recommend-body-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingList",
  data() {
    return {
      // 榜单推荐
      recommendRankingList: [],
      // 官方榜
      officialList: [],
      // 曲风榜
      genreList: [],
      // 用于选项栏添加类名
      scurrIndex: 0,
      // loading显示隐藏
      loadings: false,
    };
  },
  created() {
    this.loadingSH()
    this.recommendRankingList.push(
      JSON.parse(sessionStorage.getItem("rankinglist"))[12],
      JSON.parse(sessionStorage.getItem("rankinglist"))[11],
      JSON.parse(sessionStorage.getItem("rankinglist"))[17]
    );
    this.officialList.push(
      JSON.parse(sessionStorage.getItem("rankinglist"))[0],
      JSON.parse(sessionStorage.getItem("rankinglist"))[1],
      JSON.parse(sessionStorage.getItem("rankinglist"))[3]
    );
    this.genreList.push(
      JSON.parse(sessionStorage.getItem("rankinglist"))[7],
      JSON.parse(sessionStorage.getItem("rankinglist"))[8],
      JSON.parse(sessionStorage.getItem("rankinglist"))[5],
      JSON.parse(sessionStorage.getItem("rankinglist"))[24],
      JSON.parse(sessionStorage.getItem("rankinglist"))[27],
      JSON.parse(sessionStorage.getItem("rankinglist"))[10],
      JSON.parse(sessionStorage.getItem("rankinglist"))[6],
      JSON.parse(sessionStorage.getItem("rankinglist"))[25]
    );
  },
  methods: {
    // 控制loading
    loadingSH(){
      // 显示loading
      this.loadings = true;
      // 2000ms隐藏loading
      setTimeout(() => {
        this.loadings = false;
      }, 1000);
    },
    // 点击榜单跳转页面附带参数
    getRankinList(id) {
      this.axios
        .get(`/playlist/detail?id=${id}`)
        .then((res) => {
          // this.$store.commit("saveSongsList", res.playlist.tracks);
          sessionStorage.setItem(
            "songlist",
            JSON.stringify(res.playlist.tracks)
          );
          sessionStorage.setItem("songstTitle", JSON.stringify(res.playlist));
          this.$router.push({ path: "/SongDetailsRanking" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 选项栏添加取消类名
    changScurrIndex(index) {
      this.scurrIndex = index;
    },
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.loading-box {
  width: 100%;
  height: 600px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 60px;
  left: 0px;
}
.recommend-box-1 {
  width: 100%;
  margin-bottom: 110px;
  // margin-top: 30px;
  .box-recommend-item {
    width: 90%;
    margin: 0px auto;
    background: #fff;
    padding: 10px 17px;
    border-radius: 10px;
    .item-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .recommend-body-1 {
        width: 100px;
        background: transparent;
      }
      .recommend-body {
        width: 100px;
        background: transparent;
        position: relative;
        margin-top: 17px;
        margin-left: 5px;
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
          .player {
            position: absolute;
            right: 10px;
            bottom: 8px;
            width: 15px;
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
    .recommend-title {
      font-size: 14px;
      font-weight: bold;
      margin-top: 5px;
      // height: 32px;
    }
  }
}
.official-box {
  width: 100%;
  margin-top: 30px;
  .official-box-item {
    width: 90%;
    margin: 10px auto;
    margin-bottom: 10px;
    .official-title {
      font-size: 14px;
      font-weight: bold;
      height: 32px;
    }
    .box-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item-right {
        flex: 1;
        margin-left: 10px;
        .item {
          color: #313131;
          width: 200px;
          margin-top: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:first-child {
            margin-top: 0px;
          }
        }
      }
      .item-left {
        width: 106px;
        height: 106px;
        background: #f8f8f8;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
        }
        .title {
          position: absolute;
          left: 12px;
          bottom: 8px;
          color: #fff;
        }
      }
    }
  }
}
.recommend-box {
  width: 100%;
  margin-top: 80px;
  .box-recommend-item {
    width: 85%;
    margin: 0px auto;
    background: #fff;
    padding: 10px 10px;
    border-radius: 15px;
    .item-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .recommend-body {
        width: 100px;
        background: transparent;
        position: relative;
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
          margin-top: 10px;
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
          .player {
            position: absolute;
            right: 10px;
            bottom: 8px;
            width: 15px;
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
    .recommend-title {
      font-size: 14px;
      font-weight: bold;
      height: 32px;
    }
  }
}
.switch-list-type {
  width: 100%;
  background: #f8f8f8;
  height: 30px;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 1;
  .list-type {
    widows: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .type-item {
      text-align: center;
      .item-addclass {
        border-radius: 50px;
        display: block;
        width: 30px;
        height: 5px;
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
.songdetails-top-nav {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: #f8f8f8;
  .top-nav-left {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 10px 5px;
  }
  .nav-left-back {
    width: 20px;
    img {
      margin-top: 4px;
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
    color: #000;
  }
}
</style>