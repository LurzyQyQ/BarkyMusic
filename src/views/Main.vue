<template>
  <div class="main">
    <div>
      <!-- 二级路由插座 -->
      <router-view></router-view>
    </div>

    <!-- 小播放器 -->
    <div class="player-box" v-show="sId">
      <div class="box-item">
        <div class="item-img">
          <div
            class="box-ra-wai"
            :class="[{ move: !flag }, { stop: flag }]"
            @click="sPlayer"
          >
            <div class="box-ra-nei">
              <img :src="clickS.sPicUrl" />
            </div>
          </div>
        </div>
        <div class="item-name">
          <div class="sname">{{ clickS.sName }}</div>
          <div class="item-zuozhename">{{ clickS.zzName }}</div>
        </div>
        <div class="item-audio">
          <audio
            hidden
            :src="clickS.sUrl"
            controls
            ref="musicPUp"
            @canplay="canplayFun"
            autoplay
            @timeupdate="lyricOver"
            @ended="sOver"
          ></audio>
        </div>
        <div class="pause-unpause">
          <div class="pause-img" v-show="flag == false" @click="pauseMus">
            <!-- @click="pauseMus" -->
            <img src="../assets/images/Main_imgs/pause_song_small.png" />
          </div>
          <div class="unpause-img" v-show="flag == true" @click="playMus">
            <!-- @click="playMus -->
            <img src="../assets/images/Main_imgs/player_song_small.png" />
          </div>
        </div>
        <div class="item-more" @click="ssList">
          <img src="../assets/images/Main_imgs/Song_list.png" />
        </div>
      </div>
    </div>

    <!-- 播放列表 -->
    <div
      class="player-list-box"
      :style="songlistSh == true ? 'bottom: 0px;' : 'bottom: -100%;'"
    ></div>

    <!-- 播放列表 -->
    <div
      class="player-list-box2"
      :style="bbaa == 1 ? 'bottom: 0px;' : 'bottom: -100%;'"
    >
      <!-- 退出歌曲列表全屏 -->
      <div class="close-songlist" @click="hSongList"></div>

      <div class="list-box-item">
        <div class="fixed-top">
          <!-- 功能 -->
          <div class="box-item-title">
            <div class="item-dd-title">
              <span>当前播放</span>
              <span>({{ ssListt.length }})</span>
            </div>
          </div>
          <div class="box-item-fun">
            <div class="item-fun-dd">
              <!-- 列表循环  (chioseF  1) -->
              <div
                class="item-fun-chiose"
                v-show="chioseF == 1"
                @click="changChioseF(2)"
              >
                <div class="icon">
                  <img src="../assets/images/Main_imgs/List_loop.png" />
                </div>
                <div>循环播放</div>
              </div>
              <!-- 随机播放  (chioseF  2) -->
              <div
                class="item-fun-chiose"
                v-show="chioseF == 2"
                @click="changChioseF(3)"
              >
                <div class="icon">
                  <img src="../assets/images/Main_imgs/Random_play.png" />
                </div>
                <div>随机播放</div>
              </div>
              <!-- 单曲循环  (chioseF  3) -->
              <div
                class="item-fun-chiose"
                v-show="chioseF == 3"
                @click="changChioseF(1)"
              >
                <div class="icon">
                  <img
                    src="../assets/images/Main_imgs/Single_tune_circulation.png"
                  />
                </div>
                <div>单曲循环</div>
              </div>
              <div class="item-fun-likeall">
                <div class="icon">
                  <img src="../assets/images/Main_imgs/Collect_all.png" />
                </div>
                <div>收藏全部</div>
              </div>
              <div class="item-fun-deletes">
                <div class="icon" @click="clearSongList">
                  <img src="../assets/images/Main_imgs/Delete_list.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blank"></div>
        <!-- 歌曲列表 -->
        <div class="songlist-box">
          <div
            class="lists-box-item"
            v-for="(item, index) in ssListt"
            :key="index"
            @click="getSong1(item.id, index)"
          >
            <div class="box-item-lefticon" v-show="linehightImg == item.id">
              <div class="icon">
                <img src="../assets/images/Main_imgs/audio_frequency.png" />
              </div>
            </div>
            <div
              class="box-item-songname"
              :class="{ active: linehightImg == item.id }"
            >
              <span>{{ item.name }}</span>
              <span> - {{ item.ar[0].name }}</span>
            </div>
            <div class="box-item-laiyuan" v-show="linehightImg == item.id">
              播放来源
            </div>
            <div class="box-item-deletes">
              <div class="icon">
                <img src="../assets/images/Main_imgs/delete_song.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏播放器 -->
    <!-- v-show="bigPlayer" -->
    <div
      :style="bigPlayer == true ? 'bottom: 0px;' : 'bottom: -100%;'"
      class="all-player-box"
    >
      <div class="player-box-dd">
        <div class="box-dd-top">
          <div class="dd-top-close">
            <img
              src="../assets/images/Main_imgs/to_bottom_close.png"
              @click="hPlayer"
            />
          </div>
          <div class="dd-top-information">
            <div class="top-information-songname">{{ clickS.sName }}</div>
            <div class="top-information-zuozhename">{{ clickS.zzName }}</div>
          </div>
          <div class="dd-top-share">
            <img src="../assets/images/Main_imgs/share_song.png" />
          </div>
        </div>

        <div class="opaciyt-box">
          <!-- 歌词盒子 -->
          <div class="lyric-box" :style="shLyirc == true ? 'opacity: 0;' : 'opacity: 1;'" @click="SHLyirc">
            <!-- 歌词每一项 -->
            <ul ref="lyricUL" class="lyric-itme">
              <li
                v-for="(item, index) in lyricObjArr"
                :key="index"
                :class="{ active: lyricIndex != index }"
                :data-index="index"
                ref="lyric"
              >
                {{ item.lyric }}
              </li>
            </ul>
          </div>

          <!-- 歌碟 -->
          <div class="box-dd-centent" :style="shLyirc == false ? 'opacity: 0;' : 'opacity: 1;'">
            <div class="move-styli2-box">
              <div class="styli2-box">
                <img
                  src="../assets/images/Main_imgs/styli2.png"
                  :class="[{ in: !flag }, { out: flag }]"
                />
              </div>
            </div>
            <div
              class="dd-centent-white"
              :class="[{ move: !flag }, { stop: flag }]"
            >
              <div class="centent-black" @click="SHLyirc">
                <div class="black-img">
                  <img :src="clickS.sPicUrl" />
                </div>
              </div>
            </div>
            <!-- 功能栏 -->
            <div class="box-dd-fun">
              <div class="dd-fun-centent">
                <div class="fun-centent-aix">
                  <img src="../assets/images/Main_imgs/like_song.png" />
                </div>
                <!-- <div class="fun-centent-aix" v-show="likeaSong">
                <img src="../assets/images/Main_imgs/like_active.png" />
              </div> -->
                <div class="fun-centent-aix">
                  <img src="../assets/images/Main_imgs/download_1.png" />
                </div>
                <div class="fun-centent-aix">
                  <img src="../assets/images/Main_imgs/Song_review.png" />
                </div>
                <div class="fun-centent-aix">
                  <img src="../assets/images/Main_imgs/more_fun.png" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 用于固定底部的盒子 -->
        <div class="fiexd-box">
          <!-- 歌曲进度条 -->
          <!-- <van-slider v-model="value" @change="onChange" /> -->
          <div class="box-dd-progress">
            <div class="dd-propgress-bottom">
              <div class="propgress-bottom-left">
                {{ mcurrentTime | playerTime }}
              </div>
              <div class="propgress-bottom-slider">
                <van-slider
                  v-model="value"
                  @change="changeM"
                  button-size="8px"
                  active-color="#d81e06"
                />
              </div>
              <div class="propgress-bottom-right">
                {{ mduration | playerTime }}
              </div>
            </div>
          </div>
          <!-- 底部功能 -->
          <div class="botto-fun-box">
            <div class="fun-box-bottom">
              <div
                class="box-bottom-xunhuan1"
                v-show="chioseF == 1"
                @click="changChioseF(2)"
              >
                <img src="../assets/images/Main_imgs/playe_looping.png" />
              </div>
              <div
                class="box-bottom-xunhuan2"
                v-show="chioseF == 2"
                @click="changChioseF(3)"
              >
                <img src="../assets/images/Main_imgs/player_random_play.png" />
              </div>
              <div
                class="box-bottom-xunhuan3"
                v-show="chioseF == 3"
                @click="changChioseF(1)"
              >
                <img
                  src="../assets/images/Main_imgs/Single_tune_circulation_1.png"
                />
              </div>
              <div class="box-bottom-prev" @click="pverM">
                <img src="../assets/images/Main_imgs/prev_song.png" />
              </div>
              <div class="box-bottom-pause">
                <img
                  class="img1"
                  src="../assets/images/Main_imgs/pause_song.png"
                  v-show="flag == false"
                  @click="pauseMus"
                />
                <img
                  class="img2"
                  src="../assets/images/Main_imgs/player_song.png"
                  v-show="flag == true"
                  @click="playMus"
                />
              </div>
              <div class="box-bottom-next" @click="nextM">
                <img src="../assets/images/Main_imgs/next_song.png" />
              </div>
              <div class="box-bottom-songlist">
                <img src="../assets/images/Main_imgs/Song_list_1.png" />
              </div>
            </div>
          </div>
        </div>
        <!-- 虚化背景 -->
        <div
          class="bj-xuhua"
          :style="`background: url(${clickS.sPicUrl}) no-repeat; background-position: 46%;`"
        ></div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div class="bottom-menu">
      <van-tabbar
        v-model="activeIndex"
        active-color="#ee2e23"
        inactive-color="#7d7d7d"
        route
      >
        <van-tabbar-item
          v-for="(item, index) in tabbardata"
          :key="index"
          :to="item.to"
        >
          <span>{{ item.title }}</span>
          <template #icon="props">
            <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeIndex: 0,
      tabbardata: [
        {
          title: "推荐",
          activeIcon: require("../assets/images/Main_imgs/recommend_active.png"),
          inactiveIcon: require("../assets/images/Main_imgs/recommend.png"),
          to: { name: "Recommend" },
        },
        {
          title: "我的音乐",
          activeIcon: require("../assets/images/Main_imgs/my_active.png"),
          inactiveIcon: require("../assets/images/Main_imgs/my.png"),
          to: { name: "My" },
        },
        {
          title: "视频",
          activeIcon: require("../assets/images/Main_imgs/video_active.png"),
          inactiveIcon: require("../assets/images/Main_imgs/video.png"),
          to: { name: "Video" },
        },
        // {
        //   title: "发现",
        //   activeIcon: require("../assets/images/Main_imgs/find_active.png"),
        //   inactiveIcon: require("../assets/images/Main_imgs/find.png"),
        //   to: { name: "Find" },
        // },
      ],
      // 控制播放暂停图标
      flag: false,
      value: 0,
      // 控制大播放器显示隐藏
      bigPlayer: false,
      // 当前音频位置
      mcurrentTime: 0,
      // 音乐总长度
      mduration: 0,
      // 当前音乐下标
      moveSindex: "",
      // 歌曲
      clickS: {
        // 当前点击音乐的url
        sUrl: "",
        // 当前点击音乐的海报
        sPicUrl: "",
        // 当前点击音乐的名字
        sName: "",
        // 当前点击音乐的作者名
        zzName: "",
      },
      // 保存歌词
      lyricArr: "",
      // 歌曲歌词数组
      lyricObjArr: [],
      // 控制歌词页显示隐藏
      shLyirc: false,
      // 歌词的下标
      lyricIndex: 0,
      // 当前歌曲进度时间
      currentTime: 0,
      // 移动的距离
      topMar: "",
      // 控制歌曲列表显示隐藏
      songlistSh: false,
      bbaa: 0,
      // 添加点击歌曲的图片显示
      linehightImg: "",
      // 播放模式选择
      chioseF: 1,
    };
  },
  methods: {
    // 清空播放列表
    clearSongList() {
      this.$store.state.songList = "";
      this.$store.state.sid = "";
      this.$refs.musicPUp.pause();
    },
    // 改变播放状态
    changChioseF(chang) {
      this.chioseF = chang;
      // this.$store.commit("changChiose", this.chioseF);
    },
    // 获取歌曲id
    getSong1(id, index) {
      // 存储歌曲id,下标到state
      this.likeaSong = id;
      this.$store.commit("saveId", id);
      this.$store.commit("saveIndex", index);
      this.$store.commit("saveSlength", this.ssListt.length);
    },
    // 通过点击事件控制歌曲列表显示
    ssList() {
      this.songlistSh = true;
      setTimeout(() => {
        this.bbaa = 1;
      }, 150);
    },
    // 通过点击事件控制歌曲列表隐藏
    hSongList() {
      this.bbaa = 0;
      setTimeout(() => {
        this.songlistSh = false;
      }, 150);
    },
    // 通过state的歌曲id来获取歌词
    getLyric() {
      this.lyricObjArr = [];

      let id = this.sId;
      this.axios
        .get(`/lyric?id=${id}`)
        .then((res) => {
          //以\n来分割字符串
          let regNewLine = /\n/;
          this.lyricArr = res.lrc.lyric.split(regNewLine);
          // 分割歌词括号里的时间
          let regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
          // 遍历歌词数组,分割时间

          this.lyricArr.forEach((item) => {
            // 如果这一行歌词为空,就不裁切,return
            if (item == "") return;

            let obj = {};
            let time = item.match(regTime);

            // 以对象的格式存储时间对应歌词
            obj.lyric =
              item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
            obj.time = time
              ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
              : 0;
            obj.uid = new Date().getTime();

            if (obj.lyric === "") {
              return;
            } else {
              this.lyricObjArr.push(obj);
            }
          });
        })
        .catch((err) => {});
    },
    // formatLyricTime用来转换时间的方法
    formatLyricTime(time) {
      let regMin = /.*:/;
      let regSec = /:.*\./;
      let regMs = /\./;

      let min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      let ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
    // 控制歌词页面的显示隐藏
    SHLyirc() {
      this.shLyirc = !this.shLyirc;
    },
    // 通过获取state的id来获取歌曲
    getSong() {
      let id = this.sId;
      // 获取歌曲url
      this.axios
        .get(`/song/url?id=${id}`)
        .then((res) => {
          // 赋值
          this.clickS.sUrl = res.data[0].url;
          this.linehightImg = id;
        })
        .catch((err) => {});
      // 获取歌曲信息
      this.axios
        .get(`/song/detail?ids=${id}`)
        .then((res) => {
          // 当前点击音乐的海报
          this.clickS.sPicUrl = res.songs[0].al.picUrl;
          // 当前点击音乐的名字
          this.clickS.sName = res.songs[0].name;
          // 当前点击音乐的作者名
          this.clickS.zzName = res.songs[0].ar[0].name;
          // console.log(this.sPicUrl, this.sName, this.zzName);
        })
        .catch((err) => {});
    },
    //   控制播放图片
    playMus() {
      this.$refs.musicPUp.play();
      this.flag = false;
      // 清除潜在的定时器
      clearInterval(timer);
      let timer = setInterval(() => {
        // 获取音乐当前的时间
        this.mcurrentTime = this.$refs.musicPUp.currentTime;
        // 获取音乐总时间
        this.mduration = this.$refs.musicPUp.duration;
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
      let duration = (this.$refs.musicPUp.duration * this.value) / 100;
      // 修改自增的时间
      this.mduration = duration;
      this.$refs.musicPUp.currentTime = duration;
    },
    // 音乐加载完毕,直接获取歌曲总时间
    canplayFun() {
      this.mduration = this.$refs.musicPUp.duration;
      this.flag = false;
      // 加载完毕调用一次变化自增的时间
      this.playMus();
    },
    // 控制暂停图片
    pauseMus() {
      this.$refs.musicPUp.pause();
      this.flag = true;
    },
    // 控制大播放器显示
    sPlayer() {
      this.bigPlayer = true;
    },
    // 控制大播放器隐藏
    hPlayer() {
      this.bigPlayer = false;
    },
    // // 上一首音乐
    pverM() {
      // 获取公共数据state的歌曲下标
      let index = this.$store.state.sindex;
      // 歌单长度
      let len = this.$store.state.slength;
      // 判断下标是否等于0
      if (index === 0) {
        // 如果等于,那么再次点击的时候把下标变为歌单最后一首歌的下标
        this.$store.state.sindex = len - 1;
      } else {
        // 否则自减
        this.$store.state.sindex--;
        console.log("切换上一首下标 =>", this.$store.state.sindex);
      }
    },
    // // 下一首音乐
    nextM() {
      // 判断当前模式是否是列表循环(1)
      if (this.chioseF === 1) {
        // 获取公共数据state的歌曲下标
        let index = this.$store.state.sindex;
        // 歌单长度
        let len = this.$store.state.slength;
        // 判断下标是否等于歌单长度减一
        if (index === len - 1) {
          // 如果等于,那么再次点击的时候把下标变为歌单第一首歌的下标
          this.$store.state.sindex = 0;
        } else {
          // 否则自加
          this.$store.state.sindex++;
        }
        console.log("循环播放中");
        // 判断当前模式是否是随机播放(2)
      } else if (this.chioseF === 2) {
        // 歌单列表长度
        let length = this.$store.state.slength;
        // 控制随机数在歌单列表长度里面
        let random = parseInt(Math.random() * length);
        // 拿到歌曲的下标
        let sindex = this.$store.state.sindex;
        // 判断随机数是否等于当前播放的歌曲下标
        while (random == sindex) {
          // 如果等于,在进行一次随机
          random = parseInt(Math.random() * length);
        }
        // 最后通过修改歌曲下标来随机播放
        this.$store.state.sindex = random;
        console.log("随机播放中");
        // 判断当前模式是否是单曲循环(3)
      } else if (this.chioseF === 3) {
        // 直接再次调用歌曲的play方法,再次播放
        this.$refs.musicPUp.play();
        console.log("单曲循环中");
      }
    },
    // 歌词移动
    lyricOver() {
      // 匹配歌词
      // 遍历歌词数组
      for (let i = 0; i < this.lyricObjArr.length; i++) {
        // 判断当前歌曲时间是否大于歌词对象里的time
        if (this.mcurrentTime > parseInt(this.lyricObjArr[i].time)) {
          // 获取li的自定义属性值index
          let index = this.$refs.lyric[i].dataset.index;
          // 判断这个index是否等于每个当前数组的下标
          if (i === parseInt(index)) {
            // 赋值,用于添加样式类名
            this.lyricIndex = i;
            // 设置ul的y轴偏移量
            this.$refs.lyricUL.style.transform = `translateY(-${
              26 * (i + 1)
            }px)`;
            // this.topMar = 30 *(i + 1)
            // console.log(this.topMar);
          }
        }
      }
    },
    // 自动播放下一首
    sOver() {
      setTimeout(() => {
        this.nextM();
      }, 1000);
    },
  },
  // 过滤
  filters: {
    playerTime(data) {
      let min = parseInt(data / 60); //分钟
      let sec = parseInt(data % 60); //秒钟
      if (min == 0 && sec == 0) {
        return "00:00";
      } else {
        return (
          (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
        );
      }
    },
  },
  computed: {
    // 计算sid值
    sId() {
      return this.$store.state.sid;
    },
    // 获取state的歌曲列表
    ssListt() {
      return this.$store.state.songList;
    },
    // 歌曲下标
    ssIndex() {
      return this.$store.state.sindex;
    },
  },
  watch: {
    // 监控sId的值的变化
    sId(val) {
      // 只有sid有值才会调用this.getSong();
      if (val) {
        // 调用获取歌曲方法
        this.getSong();
        // 调用获取歌词方法
        this.getLyric();
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 播放列表
.player-list-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1000;
  transition: all 0.4s ease;
}
// 播放列表
.player-list-box2 {
  width: 100%;
  height: 100%;
  background: transparent;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1000;
  transition: all 0.4s ease;
  .close-songlist {
    width: 100%;
    height: 33%;
    background: transparent;
  }
  .list-box-item {
    width: 90%;
    height: 60%;
    margin: 0px auto;
    border-radius: 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    overflow-y: auto;
    .fixed-top {
      width: 90%;
      height: 70px;
      z-index: 900;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      position: fixed;
      background: #fff;
      .box-item-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        .item-dd-title {
          width: 90%;
          margin: 0px auto;
        }
      }
      .box-item-fun {
        width: 100%;
        .item-fun-dd {
          width: 90%;
          margin: -10px auto;
          display: flex;
          justify-content: space-between;
          .item-fun-chiose {
            flex: 1;
          }
          .item-fun-likeall {
            margin-right: 30px;
          }
          .item-fun-chiose,
          .item-fun-likeall,
          .item-fun-deletes {
            display: flex;
            align-items: center;
            .icon {
              width: 23px;
              margin-right: 4px;
              &:last-child {
                margin-right: 0px;
              }
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .blank {
      width: 90%;
      height: 50px;
    }
    .songlist-box {
      width: 100%;
      margin-top: 20px;
      .lists-box-item {
        width: 90%;
        height: 30px;
        margin: 0px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // border: 1px solid black;
        padding: 5px 0px;
        .box-item-deletes {
          .icon {
            width: 25px;
            img {
              width: 100%;
            }
          }
        }
        .box-item-laiyuan {
          flex: 1;
          margin-left: 20px;
          color: gray;
          font-size: 12px;
          transform: scale(0.9);
        }
        .box-item-songname {
          width: 150px;
          margin-left: 2px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.active {
            width: 150px;
            margin-left: 2px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ee2e23;
          }
          span {
            &:first-child {
              font-size: 14px;
            }
            &:last-child {
              font-size: 12px;
              display: inline-block;
              transform: scale(0.9);
            }
          }
        }
        .box-item-lefticon {
          .icon {
            width: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
// 大播放器
.all-player-box {
  width: 100%;
  height: 100%;
  background: #949494;
  position: fixed;
  z-index: 1100;
  left: 0px;
  bottom: -100%;
  overflow: hidden;
  transition: all 0.4s ease;
  .bj-xuhua {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(100px);
    z-index: -100;
  }
  .player-box-dd {
    width: 90%;
    margin: 0 auto;
    .fiexd-box {
      width: 90%;
      position: absolute;
      bottom: -100px;
      .botto-fun-box {
        width: 100%;
        .fun-box-bottom {
          width: 90%;
          margin: 120px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .box-bottom-pause {
            width: 40px;
            height: 40px;
            text-align: center;
            border: 1px solid #fff;
            border-radius: 50%;
            line-height: 65px;
          }
          .box-bottom-xunhuan3 {
            width: 20px;
            img {
              width: 20px;
              margin-top: 0px;
              margin-left: 0px;
            }
          }
          .box-bottom-songlist,
          .box-bottom-xunhuan1,
          .box-bottom-xunhuan2 {
            width: 20px;
            height: 20px;
            img {
              width: 100%;
            }
          }
          .box-bottom-prev,
          .box-bottom-next {
            width: 20px;
            height: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
      .box-dd-progress {
        width: 97%;
        margin: -110px auto;
        .dd-propgress-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          font-weight: 200;
          font-size: 12px;
          .propgress-bottom-slider {
            width: 245px;
          }
        }
      }
    }

    .opaciyt-box {
      width: 100%;
      height: 520px;
      position: relative;
      .lyric-box {
        width: 100%;
        height: 444px;
        margin: 50px auto;
        // background: transparent;
        overflow: hidden;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
         transition: all 500ms cubic-bezier(0.000, -0.600, 1.000, 1.650); 
        .lyric-itme {
          width: 90%;
          margin: 230px auto;
          text-align: center;
          overflow-y: auto;
          transition: all 0.5s linear;
          li {
            display: block;
            font-size: 16px;
            color: #ebebeb;
            margin-bottom: 10px;
            &.active {
              background: transparent;
              font-size: 12px;
              font-weight: 300;
              color: #616161;
            }
          }
        }
      }
      .box-dd-centent {
        width: 100%;
        margin: 5px auto;
        position: absolute;
        top: 0;
        left: 0;
         transition: all 500ms cubic-bezier(0.000, -0.600, 1.000, 1.650); 
        .move-styli2-box {
          width: 100%;
          margin-left: 5px;
          margin-top: -10px;
          .styli2-box {
            width: 150px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
            img {
              transform-origin: 74px 25px;
              transform: rotate(-20deg);
              width: 100%;

              transition: all 0.6s ease;
              &.in {
                transform: rotate(5deg);
              }
              &.out {
                transform: rotate(-20deg);
              }
            }
          }
        }
        .box-dd-fun {
          width: 90%;
          margin: 190px auto;
          .dd-fun-centent {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .fun-centent-aix {
              width: 25px;
              height: 25px;
              img {
                width: 100%;
              }
            }
          }
        }
        .dd-centent-white {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          margin: -50px auto;
          background: rgba(255, 255, 255, 0.4);
          position: relative;
          // z-index: -1;
          &.move {
            animation: xuanzhuan 10s linear 0s infinite;
          }
          &.stop {
            animation: xuanzhuan 10s linear 0s infinite;
            animation-play-state: paused;
          }
          @keyframes xuanzhuan {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .centent-black {
            width: 245px;
            height: 245px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: #000;
            .black-img {
              width: 165px;
              height: 165px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
              background: #f8f8f8;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
    .box-dd-top {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      .dd-top-information {
        .top-information-zuozhename {
          font-size: 12px;
          color: #c4c4c4;
          margin-top: 5px;
        }
        .top-information-songname {
          color: #fff;
          font-weight: 200;
          font-size: 14px;
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .dd-top-share {
        width: 25px;
        height: 25px;
        img {
          width: 100%;
        }
      }
      .dd-top-close {
        width: 35px;
        height: 35px;
        img {
          width: 100%;
        }
      }
    }
  }
}
// 小播放栏
.player-box {
  width: 100%;
  position: fixed;
  bottom: 45px;
  left: 0px;
  background: #fff;
  height: 50px;
  .box-item {
    width: 90%;
    margin: 0 auto;
    font-weight: 400;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .pause-unpause {
      display: flex;
      justify-content: center;
      margin-right: 15px;
      .pause-img {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
        }
      }
      .unpause-img {
        width: 20px;
        height: 20px;
        img {
          width: 100%;
        }
      }
    }
    .item-more {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
      }
    }
    .item-audio {
      position: absolute;
      left: 0;
    }
    .item-zuozhename {
      font-weight: 400;
      margin-top: 2px;
    }
    .item-name {
      flex: 1;
      margin-left: 10px;
      // margin-top: 5px;
      .sname {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item-img {
      margin-top: 3px;
      .box-ra-wai {
        width: 40px;
        height: 40px;
        background: #1a1a1a;
        border-radius: 50%;
        position: relative;
        &.move {
          animation: xuanzhuan 10s linear 0s infinite;
        }
        &.stop {
          animation: xuanzhuan 10s linear 0s infinite;
          animation-play-state: paused;
        }
        @keyframes xuanzhuan {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .box-ra-nei {
          width: 25px;
          height: 25px;
          background: #fff;
          border: 1px solid gray;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
// 底部导航栏
.bottom-menu {
  /deep/ .van-hairline--top-bottom {
    // height: 40px;
    position: fixed;
    bottom: 0;
    left: 0;
    border: none;
  }
}
</style>