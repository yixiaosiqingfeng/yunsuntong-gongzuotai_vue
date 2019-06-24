<template>
  <div>
    <!-- 顶部搜索部分 -->
    <div class="mypost_header">
      <!-- 右侧搜索框 -->
      <div class="mypost_header_left">
        <el-input v-model="input" placeholder="请输入要搜索的内容" size="mini" class="mypost_header_input"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </div>
      <!-- 中间文字信息 -->
      <div class="mypost_header_text">
        
        <ul>
          <span>排序：</span>
          <li>最新</li>
          <li>综合</li>
          <li>按字数</li>
          <li>点赞数</li>
          <li>评论数</li>
        </ul>
      </div>
      <!-- 左侧区域 -->
      <div class="mypost_header_right">
        <el-button-group>
          <el-button type="primary" size="mini">全部</el-button>
          <el-button size="mini">收藏夹</el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 帖子展示 -->
    <div class="mypost_center">
      <!-- 左侧头像 -->
      <div class="mypost_center_left">
        <div class="mypost_center_left_photo">
          <img src alt>
        </div>
      </div>
      <div class="mypost_center_right">
        <div class="mypost_center_top">
          <div class="mypost_center_top_left">
            <h3>
              <span>张小三&nbsp;&nbsp;</span>
              <span>18866668888</span>
            </h3>
            <h4>
              <span style="color:red;">#同步新空气#&nbsp;&nbsp;</span>
              <span>12：20</span>
            </h4>
          </div>
          <div class="mypost_center_top_right">
            <div>
              <el-button type="primary" size="mini">置顶</el-button>
              <el-button type="primary" size="mini">收藏</el-button>
              <el-button type="primary" size="mini">删帖</el-button>
            </div>
          </div>
        </div>
        <div class="mypost_center_text">
          <div
            class="container"
            :title="film.filmInfo"
            :class="fold ? 'fold' : 'unfold'"
            v-if="film.filmInfo !==''"
          >
            <label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span class="mypost_center_text_cen">{{film.filmInfo}}</span>
            </label>
          </div>
          <div class="open">
            <div class="show" @click="handleFold" v-show="fold">展开</div>
            <div class="show" @click="handleFold" v-show="!fold">收起</div>
          </div>
        </div>
        <div class="mypost_center_foot">
          <div>
            <div class="mypost_center_foot_love" @click="iconflag='2'">
              <span>
                点赞&nbsp;
                <i class="iconfont" :class="{iconbuoumaotubiao15:iconflag==='1',icondianzan:iconflag==='2'}"></i>
              </span>
            </div>
            <el-button type="primary" size="mini">评论&nbsp;&nbsp;20</el-button>
            <el-button type="primary" size="mini">转发&nbsp;&nbsp;20</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      input: "",
      iconflag:'1',
      fold: true,
      film: {
        filmInfo: `前端框架如Vue、React等都是单页面的应用，也就是说整个web站点其实都是一个index页面，
                所谓的页面跳转都是替换index.html里边的内容，而页面的title是在每个页面初始化的时候才设置一次。
                对于现在的前端框架，传统的每个页面设置title标签的做法是不行的。
                前端框架如Vue、React等都是单页面的应用，也就是说整个web站点其实都是一个index页面，
                所谓的页面跳转都是替换index.html里边的内容，而页面的title是在每个页面初始化的时候才设置一次。
                对于现在的前端框架，传统的每个页面设置title标签的做法是不行的。
                前端框架如Vue、React等都是单页面的应用，也就是说整个web站点其实都是一个index页面，
                所谓的页面跳转都是替换index.html里边的内容，而页面的title是在每个页面初始化的时候才设置一次。
                对于现在的前端框架，传统的每个页面设置title标签的做法是不行的。
                前端框架如Vue、React等都是单页面的应用，也就是说整个web站点其实都是一个index页面，
                所谓的页面跳转都是替换index.html里边的内容，而页面的title是在每个页面初始化的时候才设置一次。
                对于现在的前端框架，传统的每个页面设置title标签的做法是不行的。
                前端框架如Vue、React等都是单页面的应用，也就是说整个web站点其实都是一个index页面，
                所谓的页面跳转都是替换index.html里边的内容，而页面的title是在每个页面初始化的时候才设置一次。
                对于现在的前端框架，传统的每个页面设置title标签的做法是不行的。`
      }
    };
  },
  methods: {
    handleFold() {
      this.fold = !this.fold;
    }
  }
};
</script>

<style scoped>
/* 头部搜索开始 */
.mypost_header {
  height: 50px;
  margin: 5px 10px;
  line-height: 50px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* justify-items: space-between; */
  /* position: relative; */
}
.mypost_header_left {
  width: 33%;
  /* background-color: red; */
}
.mypost_header_text {
  width: 55%;
  /* background-color:pink; */
}
.mypost_header_right {
  width: 22%;
  /* background-color: pink; */
}
.mypost_header_input {
  width: 70%;
}
.mypost_header_input >>> .el-input__inner {
  border-radius: 20px;
}
.mypost_header_left >>> .el-button--mini {
  padding: 5px 5px;
}
.mypost_header_text ul {
  display: flex;
  margin: 0;
  padding: 0;
  margin-left: 50px;
}
.mypost_header_text li {
  display: inline-block;
  margin-left: 10px;
  /* height: 50px; */
}
/* 头部搜索结束 */
/* 帖子部分开始 */
.mypost_center {
  display: flex;
}
.mypost_center_left {
  width: 10%;
  /* background-color: pink; */
  padding: 5px;
}
.mypost_center_left_photo {
  background-color: pink;
  height: 60px;
  width: 60px;
}
.mypost_center_right {
  width: 90%;
}
.mypost_center_top {
  display: flex;
}
.mypost_center_top_left {
  width: 73%;
}
h3,
h4 {
  margin: 5px 0;
  padding: 0;
}
.mypost_center_top_right {
  width: 30%;
  /* background-color: red; */
}
.mypost_center_text {
  padding-right: 25px;
}
.mypost_center_foot_love {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
.icondianzan{
  color: red;
}
.mypost_center_foot {
  border-bottom: 1px solid #ccc;
  padding:15px 0;
}
/* 帖子部分结束 */
/* 帖子数量控制 */
.container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 0 10px 0;
  font-size: 15px;
}
.container.fold {
  -webkit-line-clamp: 2;
}
.container.unfold {
  -webkit-line-clamp: 100;
}
.show {
  font-size: 13px;
  color: cornflowerblue;
  display: inline;
}
.open{
  cursor: pointer;
}
.mypost_center_text_cen{
  line-height:24px;
  font-weight:normal
}
</style>
