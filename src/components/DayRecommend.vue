<template>
  <div>
    <!-- 歌单详情页顶部导航栏 -->
    <div class="songdetails-top-nav">
      <div class="top-nav-left">
        <div class="nav-left-back">
          <img
            src="../assets/images/SongDetails_imgs/back.png"
            @click="goBack"
          />
        </div>
        <div class="nav-left-text">每日推荐</div>
      </div>
      <div class="top-nav-right">
        <div class="nav-right-more">
          <img src="../assets/images/SongDetails_imgs/more_fun.png" />
        </div>
      </div>
    </div>
    <div class="bj-box">
      <img :src="songlist[0].picUrl" />
    </div>
    <!-- 歌单列表 -->
    <div class="song-list">
      <div
        class="list-item"
        v-for="(item, index) in songlist"
        :key="index"
        @click="getSong(item.id, index)"
        :data-musicid="item.id"
        :data-index="index"
      >
        <div class="item-idnex">
          <img :src="item.picUrl" />
        </div>
        <div class="item-name">
          <div class="song-name">{{ item.name }}</div>
          <div class="zuozhe-name">
            {{ item.name }} - {{ item.song.artists.name }}
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
  name: "DayRecommend",
  data(){
      return {
          songlist: "",
      }
  },
  created(){
   
  },
  methods: {
    
    // 返回方法
    goBack() {
      this.$router.go(-1);
    },
     // 获取歌曲id
    getSong(id, index) {
      console.log(id, index);
      // 存储歌曲id,下标到state
      this.$store.commit("saveId", id);
      this.$store.commit("saveIndex", index);
      this.$store.commit("saveSlength", this.songlist.length);
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
    &:first-child{
        padding-top: 15px;
    }
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
.bj-box {
  width: 100%;
  height: 300px;
  background: #000;
  overflow: hidden;
  position: relative;
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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