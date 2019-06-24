<template>
  <div class="hedaer-nav">
    <div class="logo">
      <img
        style="position:absolute;top:2px;left:20px;"
        width="30"
        height="25"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561354316179&di=51bc41816e77fb01902e495de76f12de&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F07%2F19%2F64D58PIC9Eu.jpg"
        alt="logo"
      >
      <span class="ml40">畅驾</span>
      <span class="ml10">一路乐逍遥直播...</span>
      <span class="ml10">下个节目:同步新空气</span>
      <span class="ml10">距离我的节目还有：12:55</span>
      <el-button class="ml10" type="text" size="mini">进入直播间</el-button>
    </div>
    <div class="mr20" style="display:flex;align-items: center;">
      <div style="display:flex;align-items: center;">
        <span>城市:</span>
        <el-cascader
          v-model="value"
          size="mini"
          :options="options"
          :show-all-levels="false"
          @change="cityFn"
        />
        <div class="tianqi" @mouseover="tianqiFlag=true" @mouseout="tianqiFlag=false">
          <span class="iconfont icon-tianqi4" style="font-size:22px;" />
          <span>27°C</span>
        </div>
      </div>
      <span class="ml10">2019/08/21 09:05</span>
      <div class="ml10 mr10" style="width:30px;height:30px;border-radius:50%;overflow:hidden;">
        <img
          width="100%"
          height="100%;"
          style="vertical-align: center;"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561355336834&di=f1f0a459cfd2f5f4144759c696c27048&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F7e9b8f8bbc3a8d4a6b609b8fe9d96736a1b21b9b6ae58-noTpYs_fw658"
          alt="头像"
        >
      </div>
      <el-button type="text" size="mini" @click="changeIden">切换身份</el-button>
      <el-button type="text" size="mini" @click="logout">退出系统</el-button>
    </div>
    <div class="weather" :class="{tianqiOver:tianqiFlag,tianqiOut:!tianqiFlag}" @mouseover="tianqiFlag=true" @mouseout="tianqiFlag=false">
      <weather />
    </div>
  </div>
</template>
<script>
import { removeRoles } from '@/utils/auth'
import weather from './weather'

export default {
  name: 'AnchorHeader',
  components: { weather },
  data() {
    return {
      weatherFlag: false,
      tianqiFlag: false,
      value: [
        '广东', '佛山'
      ],
      options: [
        {
          value: '北京',
          label: '北京',
          children: [
            {
              value: '朝阳',
              label: '朝阳'
            }
          ]
        },
        {
          value: '广东',
          label: '广东',
          children: [
            {
              value: '佛山',
              label: '佛山'
            },
            {
              value: '广州',
              label: '广州'
            }
          ]
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        location.reload()
      })
    },
    async changeIden() {
      await removeRoles()
      await this.$router.push({ path: '/auth-redirect' })
      location.reload()
    },
    cityFn(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
  .hedaer-nav {
    height: 30px;
    /*line-height: 30px;*/
    background-color: #555;
    color: #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 10px #555;
  }

  .logo {
    margin-left: 20px;
  }

  .weather {
    position: absolute;
    height: 60px;
    width: 100%;
    top: -60px;
    left: 0;
    z-index: 10000;
    /*background-color: rgba(25, 231, 239, 0.5);*/
    background-color: rgba(0, 0, 0, 0.5);
    display:flex;
    align-items: center;
  }
  .tianqi{
    cursor:pointer;
  }
  .tianqiOver{
    transform: translateY(60px);
    transition: 0.8s;
  }
  .tianqiOut{
    transform: translateY(0);
    transition: 0.8s;
  }

</style>
<style lang="scss">
  .hedaer-nav {

    .el-input__inner {
      border: 0;
      width: 50px;
      background-color: rgba(0, 0, 0, 0);
      padding: 0;
      color: #ddd;
    }

    .el-cascader__label {
      padding: 0;
      color: #ddd;
      line-height: 30px;
    }

    .el-cascader {
      padding: 0;
    }

    .el-cascader-menu {
      min-width: 80px;
    }
  }

</style>
