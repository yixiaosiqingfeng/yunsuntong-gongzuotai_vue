<template>
  <div class="hudongshequ">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000"
      active-text-color="#409eff"
      @select="handleSelect"
    >
      <el-menu-item index="interCom">互动社区</el-menu-item>
      <el-menu-item index="hotList">今日热榜</el-menu-item>
      <el-menu-item index="myPost">我的帖子</el-menu-item>
      <el-menu-item index="auanvi">音视频资源</el-menu-item>
      <el-menu-item index="myPriLet">我的私信</el-menu-item>
    </el-menu>
    <transition name="fade-transform" mode="out-in">
      <component :is="activeIndex" />
    </transition>
  </div>
</template>

<script>
import interCom from './interCom'
import hotList from './hotList'
import auanvi from './auanvi'
import myPost from './myPost'
import myPriLet from './myPriLet'

export default {
  name: 'Index',
  components: { interCom, hotList, auanvi, myPost, myPriLet },
  data() {
    return {
      activeIndex: 'interCom'

    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
    }
  }
}
</script>

<style scoped>
  .hudongshequ .el-menu-demo {
    border: 0;
  }

  .hudongshequ .el-menu-item {
    height: 50px;
  }
</style>
