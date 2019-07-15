<template>
  <div class="login-container">
    <div class="accountBox">
      <div v-show="flagBtn" class="login_box">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
          </el-tooltip>
          <div style="display:flex;justify-content: flex-end;">
            <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">登 录</el-button>
          </div>
        </el-form>
      </div>
      <div v-show="!flagBtn" class="login_box" style="text-align:center;">
        <p style="padding-top:20px;font-size:18px;">扫一扫登录即刻网页版</p>
        <div style="width:220px;margin:30px auto;cursor:pointer;">
          <img
            width="100%"
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561010187386&di=b486091097a6b87c66a1b0011be70a32&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2FkD2BwibncCkYqdbC4FunNelTAjqxq6sFR8n1giaY52SIkdl2szrHD9lkoajvaqhxMRRYwx9eLoqzTPmkrjJsR71g%2F640%3Fwx_fmt%3Dpng"
            alt=""
            @mouseover="mouseIn"
            @mouseout="phoneFlag='2'"
          >
        </div>
        <div>
          <p>打开最新版本即刻APP</p>
          <p style="margin-top:5px;">「<span style="color:red;">首页</span>」-「<span style="color:red;">扫一扫</span>」</p>
        </div>
        <div class="phone" :class="{start:phoneFlag==='1',end:phoneFlag==='2'}">
          <img src="../../assets/images/guide.e12ac12.png" width="100%" alt="">
        </div>
      </div>
      <div class="flagBtn">
        <span
          v-show="flagBtn"
          class="iconfont icon-erweima1"
          style="font-size:45px;position:relative;top:3px;"
          @click="flagBtn1"
        />
        <span
          v-show="!flagBtn"
          class="iconfont icon-diannao"
          style="font-size:45px;position:relative;top:3px;"
          @click="flagBtn2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: 'hoster',
        // username: 'editor',
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      flagBtn: true,
      phoneFlag: false,
      timer: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.phoneFlag = '1'
    this.timer = setTimeout(() => {
      this.phoneFlag = '2'
    }, 2000)
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    mouseIn() {
      this.phoneFlag = '1'
      clearInterval(this.timer)
    },
    flagBtn1() {
      this.phoneFlag = false
      this.flagBtn = false
    },
    flagBtn2() {
      this.phoneFlag = false
      this.flagBtn = true
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #fff;
  $dark_gray: #889aa4;
  $light_gray: #444;
  $shadow_strat: #ccc;
  $shadow_end: #bbb;
  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .phone {
      position: absolute;
      right: -250px;
      top: 0;
      width: 250px;
      opacity: 0;
      display:none;
    }
    .start {
      display:block;
      animation:strat 0.5s ;
      animation-fill-mode: forwards;
    }
    .end{
      display:block;
      animation:end 0.5s ;
      animation-fill-mode: forwards;
    }
    @keyframes strat {
      0%{
        opacity: 0;
        transform: translateX(0);
      }
      100%{
        opacity: 1;
        transform: translateX(50px);
      }
    }
    @keyframes end{
      0%{
        opacity: 1;
        transform: translateX(50px);
      }
      100%{
        opacity: 0;
        transform: translateX(0);
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
    .login-form {
      position: relative;
      max-width: 100%;
      padding: 70px 40px;
      margin: 0 auto;
      overflow: hidden;
    }
    .accountBox {
      position: relative;
      width: 380px;
      margin: 200px auto;
      box-shadow: 0 0 15px $shadow_strat;
      border-radius: 10px;
      transition: box-shadow 0.5s;
      -webkit-transition: box-shadow 0.5s;
      .login_box {
        height: 410px;
      }
    }
    .accountBox:hover {
      box-shadow: 0 0 20px $shadow_end;
    }
    .flagBtn {
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
