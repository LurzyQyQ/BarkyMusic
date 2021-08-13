<template>
  <div>
    <!-- 左侧功能栏 -->
    <div
      class="left-close-box"
      :style="leftsh == true ? 'bottom: 0%;' : 'left: -100%;'"
    ></div>

    <!-- 左侧功能栏 -->
    <div
      class="left-close-box2"
      :style="bbaa == 1 ? 'bottom: 0%;' : 'left: -100%;'"
    >
      <div class="close-box1">
        <div class="close-login-box">
          <div class="user-box">
            <div class="box-img">
              <img :src="info.profile.avatarUrl"/>
            </div>
            <div class="box-name">
              <div class="name-use">{{info.profile.nickname}}</div>
              <div class="right-more">
                <img src="../assets/images/LeftFunction_imgs/right_more.png" />
              </div>
            </div>
            <div class="box-scancode">
              <img src="../assets/images/LeftFunction_imgs/scancode.png" />
            </div>
          </div>
        </div>
        <!-- 退出登录 -->
        <div class="close-login">
          <div class="close-login-item" @click="closeLogin">
            <div class="item-txt">退出登录/关闭</div>
          </div>
        </div>
      </div>

      <div
        class="close-music1"
        :style="ccdd == 1 ? 'bottom: 0%;' : 'bottom: -100%;'"
      >
        <div class="music-box">
          <div class="box-item">
            <div class="item-title">
              <div>退出登录/关闭</div>
            </div>
          </div>
          <div class="close">关闭云音乐</div>
          <div class="quitlogin" @click="bSongList">退出云音乐登录</div>
        </div>
        <div class="music-box2" @click="closeChiose"></div>
      </div>
      <!-- 关闭设置栏 -->
      <div class="close-box2" @click="hFun"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftFunction",
  data() {
    return {
      info: "",
      ccdd: 0,
    };
  },
  props: ["leftsh", "bbaa"],
  created() {
    // 用户个人信息
    this.info = JSON.parse(sessionStorage.getItem("info"));
  },
  methods: {
    // 控制左边设置栏隐藏
    hFun() {
      this.$emit("close-F");
    },
    // 控制二级退出/关闭显示
    closeLogin() {
      this.ccdd = 1;
    },
    // 控制二级退出/关闭隐藏
    closeChiose(){
      this.ccdd = 0;
    },
    // 控制下方退出/关闭显示隐藏
    // 退出登录清空sessionStorage数据
    bSongList() {
      this.ccdd = 0;
      sessionStorage.clear();
      this.$toast("退出登录成功");
      setTimeout(() => {
        this.$emit("F-close");
        this.$router.push({name: "Login"})
      }, 2000);
    },
  },
};
</script>

<style lang="less" scoped>
.left-close-box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  transition: all 0.4s ease;
}
.left-close-box2 {
  width: 100%;
  height: 100%;
  background: transparent;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  transition: all 0.4s ease;
  .close-music {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    transition: all 0.4s ease;
  }
  .close-music1 {
    width: 100%;
    height: 100%;
    background: transparent;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    transition: all 0.4s ease;
    .music-box2 {
      width: 100%;
      height: 82%;
      position: absolute;
      left: 0px;
      top: 0px;
      background: transparent;
    }
    .music-box {
      width: 100%;
      height: 14%;
      background: #fff;
      position: absolute;
      bottom: 0px;
      left: 50%;
      padding: 10px 0px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      transform: translate(-50%, 0%);
      .close{
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
      }
      .quitlogin{
        width: 90%;
        margin: 0 auto;
        margin-top: 20px;
      }  
      .box-item{
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        color: #494949;
        div{
          width: 90%;
          padding: 5px 0px;
          margin: 0 auto;
          margin-top: -5px;
          margin-left: 10px;
        }
      }
    }
  }
  .close-box1 {
    width: 80%;
    height: 100%;
    background: #f5f5f5;
    padding: 10px 0px;
    position: relative;
    .close-login {
      width: 90%;
      background: #fff;
      position: absolute;
      left: 50%;
      bottom: 20px;
      padding: 10px 0px;
      border-radius: 10px;
      text-align: center;
      color: #eb3b38;
      transform: translate(-50%, -50%);
    }
    .close-login-box {
      width: 90%;
      margin: 0 auto;
      .user-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .box-scancode {
          width: 25px;
          height: 25px;
          img {
            width: 100%;
          }
        }
        .box-name {
          flex: 1;
          margin-left: 10px;
          display: flex;
          align-items: center;
          .right-more {
            width: 15px;
            height: 15px;
            img {
              width: 100%;
            }
          }
        }
        .box-img {
          width: 40px;
          height: 40px;
          overflow: hidden;
          background: #fff;
          border-radius: 50%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .close-box2 {
    width: 20%;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    background: transparent;
  }
}
</style>