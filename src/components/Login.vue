<template>
  <div>
    <!-- <h1>login</h1> -->
    <!-- 登录 -->
    <div class="qriously-box">
      <div class="box-mask">
        <!-- 登录页logo -->
        <div class="mask-icon">
          <img src="../assets/images/Login_imgs/Netease_cloud_Icon.png" />
        </div>
        <!-- 登录页主体 -->
        <div class="login-choice">
          <div class="choice-phone-text">
            <div class="more-login">
              <div
                class="phone-text"
                :style="flag == true ? 'opacity: 1;' : 'opacity: 0;'"
              >
                {{ use_name1 }}
                <img src="../assets/images/Login_imgs/revise.png" @click="goinPhone"/>
              </div>
              <!-- <div class="enter-login" @click="oneClickLogin">一 键 登 录</div> -->
              <div
                class="now-experience"
                @click="oneClickLogin"
                :style="
                  flag == true
                    ? 'opacity: 1; z-index: 1;'
                    : 'opacity: 0; z-index: -1;'
                "
              >
                一 键 登 录
              </div>
              <div
                class="phone-text"
                :style="flag == false ? 'opacity: 1;' : 'opacity: 0;'"
              ></div>
              <div
                class="now-experience"
                @click="showPhoneLogin"
                :style="
                  flag == false
                    ? 'opacity: 1; z-index: 1;'
                    : 'opacity: 0; z-index: -1;'
                "
              >
                手 机 登 录
              </div>
            </div>
            <div class="choice-more">
              <div class="more-wechat iconImg">
                <img src="../assets/images/Login_imgs/wechat_icon.png" />
              </div>
              <div class="more-qq iconImg">
                <img src="../assets/images/Login_imgs/qq_icon.png" />
              </div>
              <div class="more-micro-blog iconImg">
                <img src="../assets/images/Login_imgs/micro_blog_icon.png" />
              </div>
              <div class="more-163mail iconImg" @click="showMailLogin">
                <img src="../assets/images/Login_imgs/163mail_icon.png" />
              </div>
            </div>

            <!-- 手机登录界面 -->
            <div class="bottom-login">
              <van-popup
                v-model="phoneshow"
                position="bottom"
                style="height: 250px"
              >
                <div class="popup-login-163mail">手机登录</div>
                <van-form>
                  <van-field
                    v-model="userInfo1.phone"
                    name="手机号"
                    label="手机号"
                    placeholder="手机号"
                    autocomplete="off"
                    :rules="[
                      { required: true, message: '请填写手机号' },
                      { pattern: ohoneRegxp, message: '手机号格式不正确' },
                    ]"
                  />
                  <van-field
                    v-model="userInfo1.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                  />
                  <div style="margin: 16px">
                    <van-button
                      round
                      block
                      type="info"
                      native-type="submit"
                      @click="phoneLogin"
                      >登录</van-button
                    >
                  </div>
                </van-form>
              </van-popup>
            </div>

            <!-- 网易邮箱登录界面 -->
            <div class="bottom-login">
              <van-popup
                v-model="mailshow"
                position="bottom"
                style="height: 250px"
              >
                <div class="popup-login-163mail">网易邮箱登录</div>
                <van-form>
                  <van-field
                    v-model="userInfo.mail"
                    name="邮箱"
                    label="邮箱"
                    placeholder="邮箱"
                    :rules="[
                      { required: true, message: '请填写邮箱' },
                      { pattern: emailRegxp, message: '邮箱格式不正确' },
                    ]"
                  />
                  <van-field
                    v-model="userInfo.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                  />
                  <div style="margin: 16px">
                    <van-button
                      round
                      block
                      type="info"
                      native-type="submit"
                      @click="mail163Login"
                      >登录</van-button
                    >
                  </div>
                </van-form>
              </van-popup>
            </div>

            <!-- 加载页 -->
            <div class="loading-box" v-show="loadings">
              <van-loading color="#00000066" size="34px" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 切换手机号登录 -->
    <div class="toggle-phone-login" :style="closesss == true ? 'top: 0%;' : 'top: -100%;'">
      <div class="phone-login-box">
        <!-- 导航栏 -->
        <div class="nav-bar">
          <div class="bar-icon" @click="closePhone">
            <img src="../assets/images/Login_imgs/delete_ipt.png" />
          </div>
          <div class="bar-userimg">
            手机号登录
          </div>
        </div>
        <!-- 简介栏 -->
        <div class="jianjie-box">
          <div class="box-item">登录体验更多精彩</div>
        </div>
        <!-- 输入框栏 -->
        <div class="ipt-phone-box">
          <div class="phone-box-item">
            <input type="text" v-model="captchaPhone" placeholder="请输入手机号">
          </div>
        </div>
        <!-- 提交按钮 -->
        <div class="bottom-button">
          <div class="button-box">
            <button @click="captchaSent">下一步</button>
          </div>
        </div>
        <!-- 找回账号 -->
        <div class="bottom-findmy">
          <div class="findmy-box">
            找回账号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 163邮箱验证正则
      emailRegxp:
        /^[A-Za-z]\w{5,17}@(vip\.(126|163|188)\.com|163\.com|126\.com|yeach\.net)/,
      // 用户邮箱
      userInfo: {
        mail: "",
        password: "",
      },
      // 手机号验证正则
      ohoneRegxp:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      // 用户手机号
      userInfo1: {
        phone: "",
        password: "",
      },
      // cookies保存用
      use_name: "",
      use_pasd: "",
      // 保存替换中间四位的手机号
      use_name1: "",
      // 邮箱登录层显示隐藏
      mailshow: false,
      // 手机登录层显示隐藏
      phoneshow: false,
      // 用户信息
      info: "",
      // 用户歌单信息
      sInfo: "",
      // loading显示隐藏
      loadings: false,
      flag: false,
      captchaPhone: "",
      // 退出
      closesss: "",
    };
  },
  created() {
    this.getCookie();
    this.judge();
    // 处理用户手机,需要渲染在页面
    this.use_name1 = this.use_name.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  },
  methods: {
    // 发送验证码
    captchaSent(){
      this.axios.get(`/captcha/sent?phone=${this.captchaPhone}`)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    // 判断cookies是否有值
    judge() {
      if (!this.use_name || !this.use_pasd) {
        setTimeout(() => {
          // 控制手机登录
          this.flag = false;
        }, 2000);
      } else {
        setTimeout(() => {
          // 控制一键登录
          this.flag = true;
        }, 2000);
        console.log("有cookies");
      }
    },
    // 显示网易邮箱登录界面
    showMailLogin() {
      // /弹出层显示隐藏
      this.mailshow = true;
    },
    // 显示手机登录界面
    showPhoneLogin() {
      // /弹出层显示隐藏
      this.phoneshow = true;
    },
    // 网易邮箱登录
    mail163Login() {
      this.axios
        .get(
          `/login?email=${this.userInfo.mail}&password=${this.userInfo.password}`
        )
        .then((res) => {
          if (res.code === 200) {
            // 获取用户信息
            this.axios
              .get(`/user/detail?uid=${res.account.id}`)
              .then((res) => {
                sessionStorage.setItem("info", JSON.stringify(res));
              })
              .catch((err) => {});

            // 获取用户歌单信息
            this.axios
              .get(`/user/playlist?uid=${res.account.id}`)
              .then((res) => {
                sessionStorage.setItem("sInfo", JSON.stringify(res));
              })
              .catch((err) => {});

            // 改变loadin状态,显示
            this.loadings = true;
            // 改变from表单状态,隐藏
            this.mailshow = false;
            // 1700ms之后隐藏loading
            setTimeout(() => {
              this.loadings = false;
            }, 1700);
            // 2000ms之后隐藏跳转
            setTimeout(() => {
              this.$router.push({
                path: "/Recommend",
                query: {
                  info: this.info,
                  sInfo: this.sInfo,
                },
              });
            }, 2000);
            // 登录返回的token存储到sessionStorage
            sessionStorage.setItem("token", res.token);
          }
        })
        .catch((err) => {});
    },
    // 手机号登录
    phoneLogin() {
      this.axios
        .get(
          `/login/cellphone?phone=${this.userInfo1.phone}&password=${this.userInfo1.password}`
        )
        .then((res) => {
          if (res.code === 200) {
            // 调用保存cookies的方法,传入需要保存的数据,以及定时销毁cookies的时间
            this.setCookie(this.userInfo1.phone, this.userInfo1.password, 7);
            // 获取用户信息
            this.axios
              .get(`/user/detail?uid=${res.account.id}`)
              .then((res) => {
                sessionStorage.setItem("info", JSON.stringify(res));
              })
              .catch((err) => {});

            // 获取用户歌单信息
            this.axios
              .get(`/user/playlist?uid=${res.account.id}`)
              .then((res) => {
                sessionStorage.setItem("sInfo", JSON.stringify(res));
              })
              .catch((err) => {});

            // 改变loadin状态,显示
            this.loadings = true;
            // 改变from表单状态,隐藏
            this.phoneshow = false;
            // 1700ms之后隐藏loading
            setTimeout(() => {
              this.loadings = false;
            }, 1700);
            // 2000ms之后隐藏跳转
            setTimeout(() => {
              this.$router.push({
                path: "/Recommend",
                query: {
                  info: this.info,
                  sInfo: this.sInfo,
                },
              });
            }, 2000);
            // 登录返回的token存储到sessionStorage
            sessionStorage.setItem("token", res.token);
          }
        })
        .catch((err) => {});
    },
    // 手机号一键登录
    oneClickLogin() {
      // 调用获取cookies方法存入数据,方便一键登录使用
      if (!this.use_name || !this.use_pasd) {
        this.$toast("登录过期");
      } else {
        this.axios
          .get(
            `/login/cellphone?phone=${this.use_name}&password=${this.use_pasd}`
          )
          .then((res) => {
            if (res.code === 200) {
              // 获取用户信息
              this.axios
                .get(`/user/detail?uid=${res.account.id}`)
                .then((res) => {
                  // 保存用户信息
                  sessionStorage.setItem("info", JSON.stringify(res));
                })
                .catch((err) => {});
              // 获取用户歌单信息
              this.axios
                .get(`/user/playlist?uid=${res.account.id}`)
                .then((res) => {
                  sessionStorage.setItem("sInfo", JSON.stringify(res));
                })
                .catch((err) => {});

              // 改变loadin状态,显示
              this.loadings = true;
              // 改变from表单状态,隐藏
              this.phoneshow = false;
              // 1700ms之后隐藏loading
              setTimeout(() => {
                // 改变loadin状态,隐藏
                this.loadings = false;
              }, 1700);
              // 2000ms之后隐藏跳转
              setTimeout(() => {
                this.$router.push({ path: "/Recommend" });
              }, 2000);
              // 登录返回的token存储到sessionStorage
              sessionStorage.setItem("token", res.token);
            }
          })
          .catch((err) => {});
      }
    },
    // 保存用户账号密码到本地cookies
    setCookie(c_pho, c_pwd, clearday) {
      var clearday = new Date(); //获取时间
      clearday.setTime(clearday.getTime() + 24 * 60 * 60 * 1000 * clearday); //保存的天数
      //字符串拼接cookie
      document.cookie =
        "userPhone" + "=" + c_pho + ";path=/;expires=" + clearday.toGMTString();
      document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + clearday.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        // 以;裁切字符
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          //再次切割
          var arr2 = arr[i].split("=");
          //判断查找相对应的值
          if (arr2[0] == "userPhone") {
            //保存到保存数据的地方
            this.use_name = arr2[1];
          } else if (arr2[0] == "userPwd") {
            this.use_pasd = arr2[1];
          }
        }
      }
    },
    // 进入
    goinPhone(){
      this.closesss = true;
    },  
    // 退出
    closePhone() {
      this.closesss = false;
    },
  },
};
</script>

<style lang="less" scoped>
.toggle-phone-login {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  z-index: 11;
  top: 0;
  left: 0;
  color: gray;
  transition: all 0.4s ease;
  .phone-login-box {
    width: 90%;
    margin: 0 auto;
    .bottom-findmy{
      width: 100%;
      .findmy-box{
        width: 100%;
        text-align: center;
        margin-top: 20px;
      }
    }
    .bottom-button{
      width: 100%;
      .button-box{
        width: 100%;
        margin-top: 30px;
        button{
          width: 100%;
          outline: noen;
          border: 1px solid #d73535;
          background: #d73535;
          line-height: 35px;
          border-radius: 20px;
          color: #fff;
        }
      }
    }
    .ipt-phone-box{
      width: 100%;
      .phone-box-item{
        width: 100%;
        border-bottom: 1px solid #d3d3d3;
        padding-bottom: 5px;
        input{
          padding-left: 20px;
          outline: none;
          border: none;
        }
      }
    }
    .jianjie-box{
      width: 100%;
      margin: 30px auto;
    }
    .nav-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 15px;
      .bar-userimg {
        flex: 1;
        font-size: 14px;
        margin-left: 15px;
      }
      .bar-icon {
        margin-top: 3px;
        width: 20px;
        img {
          width: 100%;
        }
      }
    }
  }
}
.qriously-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #ee2e23;
  z-index: 10;
  .box-mask {
    margin: 0 auto;
    .login-choice {
      width: 100%;
      .choice-phone-text {
        width: 90%;
        margin: 220px auto;
        .choice-more {
          width: 275px;
          display: flex;
          align-items: center;
          margin: 20px auto;
          justify-content: space-between;
          .iconImg {
            border: 1px solid #f64240;
            width: 30px;
            height: 30px;
            text-align: center;
            border-radius: 50%;
            img {
              width: 23px;
              margin-top: 3px;
            }
          }
        }
        .more-login {
          position: relative;
          .now-experience {
            width: 275px;
            height: 45px;
            margin: 0px auto;
            line-height: 45px;
            background: #fff;
            text-align: center;
            border-radius: 50px;
            color: #f64240;
            font-weight: bold;
            border: 1px solid #fff;
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: all 300ms cubic-bezier(1, 0.995, 0, -0.015);
          }
          .phone-text {
            width: 275px;
            height: 45px;
            margin: 0 auto;
            line-height: 45px;
            text-align: center;
            color: #ffffff;
            font-weight: 100;
            font-size: 14px;
            transition: all 300ms cubic-bezier(1, 0.995, 0, -0.015);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              margin-left: -5px;
              width: 30px;
              height: 30px;
            }
          }
          .enter-login {
            width: 275px;
            height: 45px;
            margin: 0 auto;
            line-height: 45px;
            background: #ffffff;
            text-align: center;
            border-radius: 50px;
            color: #f00000;
            font-weight: bold;
          }
        }
        .loading-box {
          width: 100%;
          margin: -350px auto;
          display: flex;
          justify-content: center;
        }
        .bottom-login {
          /deep/ .van-button {
            background: #ee2e23;
            border: 1px solid #ee2e23;
          }
          .popup-login-163mail {
            text-align: center;
            margin: 20px auto;
            font-size: 16px;
            font-weight: 200;
          }
        }
      }
    }
    .mask-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      text-align: center;
      margin: 170px auto;
      padding: 5px;
      position: relative;
      img {
        width: 40px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>