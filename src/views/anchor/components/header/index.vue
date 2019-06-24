<template>
  <div>
    <!-- 主持人首页导航 -->
    <el-row class="host_header" type="flex" justify="space-between">
      <!-- 左边导航 -->
      <el-col class="host_header_left">
        <div class="host_header_left_logo">
          logo
          <img src alt>
          <div class="host_header_left_text">
            <span>畅驾</span>
          </div>
        </div>

        <div class="host_header_left_rem">
          <span>
           <span class="liveing"> {{ liveing }}</span>&nbsp;&nbsp;正在直播中... 下一个节目：同步新空气 &nbsp;&nbsp;距离我的节目时间还有：
            {{ countTime.hour }}小时{{ countTime.minute }}分{{ countTime.second }}秒 &nbsp;&nbsp;
            <span
              class="host_header_left_btn"
            >进入直播间</span>
          </span>
        </div>
      </el-col>
      <!-- 右边导航 -->
      <el-col class="host_header_right">
        <div class="host_header_right_weather">
          <div class="weather_icon" @mouseenter="getWeather" @mouseleave="weatherFlag='2'">
            <!-- <i class="el-icon-sunrise-1"></i> -->
            <!-- 天气图标 -->
            <i class="iconfont icontianqitubiao_yujiaxue"></i>
          </div>
          <div class="weather_text">
            <span>雷阵雨</span>
            <br>
            <span>35~27℃</span>
          </div>
        </div>

        <div class="host_header_right_time">
          <h2>2019/6/17&nbsp;09:02</h2>
        </div>

        <div class="host_header_right_photo">
          头像
          <img src alt>
        </div>
        <div class="host_header_right_btn">
          <el-button type="primary" size="mini" @click="changeIden">切换身份</el-button>
          <el-button type="primary" size="mini" @click="logout">退出系统</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 天气展示页面 -->
    <!-- <transition name="el-zoom-in-top">
    <weather v-show="sta" class="{start:phoneFlag==='1',end:phoneFlag==='2'}"/> 
    </transition>-->
    <div :class="{start:weatherFlag==='1',end:weatherFlag==='2'}" v-show="weatherFlag">
      <weather/>
    </div>
  </div>
</template>
<script>
import { removeRoles } from "@/utils/auth";
import weather from "./weather";

export default {
  name: "AnchorHeader",
  components: { weather },
  data() {
    return {
      // 正在直播的节目名称
      liveing: "一路乐逍遥",
      // 下一个直播节目名称
      nextLive: "同步新空气",
      // 下一节目倒计时
      countTime: {
        hour: "1",
        minute: "50",
        second: "23"
      },
      // 天气信息
      weather: {},
      //天气页面
      weatherFlag: false
    };
  },
  methods: {
    getWeather() {
      this.weatherFlag = "1";
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        location.reload();
      });
    },
    async changeIden() {
      await removeRoles();
      await this.$router.push({ path: "/auth-redirect" });
      location.reload();
    }
  }
};
</script>
<style scoped>
.host_header {
  /* height: 50px; */
  border: 1px solid #ccc;
  position: relative;
  background-color: #ccc;
}

.host_header_left {
  position: relative;
  width: 67%;
}

.host_header_right {
  position: relative;
  width: 33%;
}

.host_header_left_logo {
  display: inline-block;
  background-color: #ccc;
  height: 30px;
  width: 45px;
  margin: 5px 16px;
}

.host_header_left_text {
  position: absolute;
  top: 9px;
  left: 75px;
  font-size: 20px;
}

.host_header_left_rem {
  position: absolute;
  top: 11px;
  left: 145px;
  font-size: 16px;
}

.host_header_left_btn {
  padding: 5px;
  background-color: #169bd5;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.host_header_right_weather {
  width: 100px;
  height: 30px;
  margin-top: 3px;
}

.weather_icon {
  position: relative;
  width: 40px;
  height: 30px;
  /* background-color: red; */
  cursor: default;
}
.weather_icon i{
  font-size: 30px;
}
.weather_text {
  position: absolute;
  top: 4px;
  left: 37px;
}

.host_header_right_time {
  position: absolute;
  top: -8px;
  left: 111px;
}

.host_header_right_photo {
  display: inline-block;
  background-color: #ccc;
  height: 35px;
  width: 35px;
  position: absolute;
  top: 3px;
  left: 286px;
  border-radius: 50%;
}

.host_header_right_btn {
  position: absolute;
  top: 6px;
  right: 85px;
}
.liveing{
  color: red;
}
/* 缓慢显示动画 */
.start {
  display: block;
  animation: strat 0.5s;
  animation-fill-mode: forwards;
}
.end {
  display: block;
  animation: end 0.5s;
  animation-fill-mode: forwards;
}
@keyframes strat {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(10px);
  }
}
@keyframes end {
  0% {
    opacity: 1;
    transform: translateY(10px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

</style>
