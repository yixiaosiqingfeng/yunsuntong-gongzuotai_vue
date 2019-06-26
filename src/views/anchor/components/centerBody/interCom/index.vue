<template>
  <div>
    <!-- 顶部搜索部分 -->
    <div class="mypost_header">
      <!-- 右侧搜索框 -->
      <div class="mypost_header_left">
        <!-- <el-input
          v-model="input"
          placeholder="请输入要搜索的内容"
          size="mini"
          class="mypost_header_input"
          suffix-icon="el-icon-search"
        ></el-input>-->
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="state"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i class="el-icon-search el-input__icon" slot="suffix" @click="handleIconClick"></i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </div>
      <!-- 中间文字信息 -->
      <div class="mypost_header_text">
        <ul>
          <span>排序：</span>
          <li
            class="liMenu"
            :class="idx===index?'hover':''"
            v-for="(item,idx) in menu"
            @click="changColor(item,idx)"
            :key="idx"
          >{{item}}</li>
        </ul>
      </div>
      <!-- 左侧区域 -->
      <div class="mypost_header_right">
        <div class="mypost_header_right_btn">
          <el-button-group>
            <el-button type="primary" size="mini">全部</el-button>
            <el-button size="mini">收藏夹</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <!-- 帖子部分 -->
    <div class="infinite-list-wrapper" style="overflow-y:scroll;">
      <ul v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
        <li v-for="(item,index) in dataArr" :key="index" class="list-item">
          <div style="display:flex;">
            <!-- 左侧头像 -->
            <div style="width:80px;padding:10px;">
              <div style="width:60px;height:60px;border-radius:50%;overflow:hidden;">
                <img
                  src="http://cdn.duitang.com/uploads/item/201601/08/20160108194244_JxGRy.thumb.700_0.jpeg"
                  alt
                  width="100%"
                  height="100%"
                >
              </div>
            </div>
            <!-- 右侧帖子 -->
            <div style="flex:1;padding:10px;line-height:18px;">
              <div class="mypost_center_top">
                <div class="mypost_center_top_left">
                  <h3>
                    <span>{{item.name}}&nbsp;&nbsp;</span>
                    <span>18866668888</span>
                  </h3>
                  <h4>
                    <span style="color:red;">#同步新空气#&nbsp;&nbsp;</span>
                    <span>12：20</span>
                  </h4>
                </div>
                <div class="mypost_center_top_right">
                  <div class="mypost_center_top_right_btn">
                    <el-tooltip class="item" effect="dark" content="置顶" placement="top">
                      <span class="iconfont icon-zhiding mr10"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="收藏" placement="top">
                      <span class="iconfont icon-shoucang mr10"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除该贴" placement="top">
                      <span class="iconfont icon-shanchu mr10" style="color:red;"></span>
                    </el-tooltip>
                  </div>
                </div>
              </div>

              <!-- 帖子内容 -->
              <div ref="article">
                <div class="abqc mb20 mt20">{{ value }}</div>
              </div>
              <div class="mypost_foot">
                <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                  <span class="iconfont icon-dianzan1">
                    <span class="iconfont_number">10</span>
                  </span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="评论" placement="top">
                  <span class="iconfont icon-pinglun ml10">
                    <span class="iconfont_number">10</span>
                  </span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="转发" placement="top">
                  <span class="iconfont icon-zhuanfa ml10  mr10">
                    <span class="iconfont_number">10</span>
                  </span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="!noMore" class="tac">加载中...</p>
      <p v-show="noMore" class="tac">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      //搜索框内容
      input: "",
      //排序
      menu: ["最新", "综合", "按字数", "点赞数", "评论数"],
      index: 0,
      //搜索框
      state:"",
      // 帖子
      dataArr: [
        {
          name: "张三"
        },
        {
          name: "张三"
        },
        {
          name: "张三"
        }
      ],
      loading: false,
      artWidth: 500,
      count: 0,
      value:
        "撒一我IEufuoreuhU盾深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱搜草四川"
    };
  },
  computed: {
    noMore() {
      return this.count >= 50;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  mounted() {
    // this.getAttrFn()
    //得到搜索框内容
    this.restaurants = this.loadAll();
  },
  methods: {
    load() {
      console.log(111);
      this.loading = true;
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.count++;
          this.dataArr.push({ name: "张三" + i });
        }
        this.loading = false;
      }, 2000);
    },
    getAttrFn() {
      const abj = this.$refs.article;
      const H = getComputedStyle(abj[0], false)["height"];
      const W = getComputedStyle(abj[0], false)["width"];
      this.artWidth = W;
      console.log(H);
    },
    //控制点击效果
    changColor(item, idx) {
      this.index = idx;
    },
    //搜索
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 模拟数据
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）"
        }
      ];
    }
  }
};
</script>

<style scoped lang="scss">
/* 头部搜索开始 */
.mypost_header {
  height: 50px;
  margin: 5px 10px;
  line-height: 50px;
  display: flex;
}
.mypost_header_left {
  width: 33%;
  /* background-color: red; */
}
.mypost_header_text {
  width: 42%;
  /* background-color:pink; */
}
.mypost_header_right {
  width: 25%;
  /* background-color: pink; */
  position: relative;
}
.mypost_header_right_btn {
  position: absolute;
  top: 0;
  right: 32px;
}
.mypost_header_input {
  width: 70%;
}
.mypost_header_left /deep/ .el-input__inner {
  height: 28px;
  line-height: 28px;
  border-radius: 20px;
}
.mypost_header_left /deep/.el-input__suffix {
  font-size: 24px;
  // top:-4px;
}
.mypost_header_left /deep/ .el-input__suffix:hover {
  color: #3890f4;
}
.mypost_header_text ul {
  display: flex;
  align-items: end;
  margin: 0;
  padding: 0;
  /* margin-left: 50px; */
}
.liMenu {
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}
.hover {
  color: red;
  font-weight: bold;
}
/* 头部搜索结束 */

/* 帖子头部 */
.mypost_center_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h3,
h4 {
  margin: 5px 0;
  padding: 0;
}
.infinite-list-wrapper .iconfont {
  font-size: 20px;
  cursor: pointer;
}
.iconfont_number {
  font-size: 16px;
}
.mypost_foot{
  display: flex;
  justify-content: flex-end;
}
/* 原效果 */
.list-item {
  min-height: 80px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.infinite-list-wrapper {
  height: calc(100vh - 95px);
}

.infinite-list-wrapper li {
  list-style: none;
}

.infinite-list-wrapper ul {
  margin: 0;
  padding: 0;
}
.abc {
  max-width: 918px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 搜索框 */
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
