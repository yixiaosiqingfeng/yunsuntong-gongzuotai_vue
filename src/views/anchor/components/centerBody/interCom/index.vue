<template>
  <div>
    <!-- 顶部搜索部分 -->
    <div class="mypost_header">
      <!-- 右侧搜索框 -->
      <div class="mypost_header_left">

        <el-autocomplete
          v-model="state"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        >
          <i slot="suffix" class="el-icon-search el-input__icon" @click="handleIconClick" />
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
            v-for="(item,idx) in menu"
            :key="idx"
            class="liMenu"
            :class="idx===index?'hover':''"
            @click="changColor(item,idx)"
          >{{ item }}
          </li>
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
      <div contenteditable="true" style="height:20px;" />
      <ul v-infinite-scroll="load" class="list" infinite-scroll-disabled="disabled">
        <li v-for="(item,index) in dataArr" :key="index" class="mb5" style="line-height:1.5rem;">
          <div style="display:flex;">
            <!-- 左侧头像 -->
            <div style="width:5rem;padding:0.625rem;">
              <div style="width:3.75rem;height:3.75rem;border-radius:50%;overflow:hidden;">
                <img
                  src="http://cdn.duitang.com/uploads/item/201601/08/20160108194244_JxGRy.thumb.700_0.jpeg"
                  alt
                  width="100%"
                  height="100%"
                >
              </div>
            </div>
            <!-- 右侧帖子 -->
            <div style="flex:1;padding:10px;">
              <!--帖子标题信息-->
              <div class="mypost_center_top">
                <div class="mypost_center_top_left">
                  <div>
                    <span class="mr5 ftm14">{{ item.name }}</span>
                  </div>
                  <div class="">
                    <span class="ftm14" style="color:red;">#同步新空气#&nbsp;&nbsp;</span>
                    <span class="ftm14" style="color:#666;">12：20</span>
                  </div>
                </div>
                <!--操作按钮-->
                <div>
                  <div>
                    <el-tooltip class="item" effect="dark" content="置顶" placement="top">
                      <span class="iconfont icon-zhiding mr10" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="收藏" placement="top">
                      <span class="iconfont icon-shoucang mr10" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除该贴" placement="top">
                      <span class="iconfont icon-shanchu mr10" style="color:red;" />
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <!-- 帖子内容 -->
              <div>
                <div class="ftm16" style="color:#666;">{{ item.content }}</div>
              </div>
              <!--操作按钮-->
              <div class="mt5">
                <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                  <span class="iconfont icon-dianzan1">
                    <span class="ftm12" style="color:#999;">10</span>
                  </span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="评论" placement="top" @click.native="item.hidden=true">
                  <span class="iconfont icon-pinglun ml10">
                    <span class="ftm12" style="color:#999;">110</span>
                  </span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="转发" placement="top">
                  <span class="iconfont icon-zhuanfa ml10  mr10">
                    <span class="ftm12" style="color:#999;">10</span>
                  </span>
                </el-tooltip>
              </div>
              <!--1级回复框-->
              <div style="background-color:#f5f5f5;padding:10px 20px;" class="mt10 custom_btn">
                <div class="mt5" style="display:flex;">
                  <div style="flex:1;">
                    <el-input v-model="item.comments" placeholder="请输入内容">
                      <template slot="suffix">
                        <div class="" style="display:block;">
                          <span class="iconfont icon-biaoqing1" style="color:green;font-size:20px;" />
                        </div>
                      </template>
                    </el-input>
                  </div>
                  <div>
                    <el-button type="success" @click="oneCommentsFn(item)">评论</el-button>
                  </div>
                </div>
                <!--评论信息-->
                <div v-show="item.hidden">
                  <ul v-if="item.children&&item.children.length>0">
                    <li v-for="(tim,i) in item.children" :key="i" class="mt10">
                      <div style="display:flex;" class="mt20">
                        <div style="display:flex;">
                          <div style="width:2rem;height:2rem;border-radius:50%;overflow:hidden;">
                            <img
                              src="http://cdn.duitang.com/uploads/item/201601/08/20160108194244_JxGRy.thumb.700_0.jpeg"
                              width="100%"
                              height="100%"
                              alt=""
                            >
                          </div>
                          <span style="width:3.75rem;color:#444;" class="ml10 ftm14">{{ tim.name }}</span>
                        </div>
                        <div class="ftm14" style="border-bottom:1px solid #eee;flex:1;color:#666;">
                          <span>{{ tim.content }}</span>
                          <!--回复-->
                          <div class="mt5" style="color:#777;display:flex;justify-content: space-between;">
                            <span>07:23</span>
                            <span>
                              <span class="ftm12" onselectstart="return false" style="cursor:pointer;" @click="tim.hidden=true">回复</span>
                              <span class="iconfont icon-dianzan1 ftm14" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <!--三级评论-->
                      <ul v-if="tim.children&&tim.children.length>0" style="margin-left:6.56rem;">
                        <li v-for="(tom,a) in tim.children" :key="a" class="mt10">
                          <div style="display:flex;">
                            <div style="display:flex;">
                              <div style="width:2rem;height:2rem;border-radius:50%;overflow:hidden;">
                                <img
                                  src="http://cdn.duitang.com/uploads/item/201601/08/20160108194244_JxGRy.thumb.700_0.jpeg"
                                  width="100%"
                                  height="100%"
                                  alt=""
                                >
                              </div>
                              <span
                                style="width:3.75rem;color:#444;cursor:pointer;"
                                class="ml10 ftm14"
                                onselectstart="return false"
                                @dblclick="getName(tim,tom.name)"
                              >{{ tom.name }}</span>
                            </div>
                            <div class="ftm14" style="border-bottom:1px solid #eee;flex:1;color:#666;">
                              <span>{{ tom.content }}</span>
                              <!--回复-->
                              <div class="mt5" style="color:#777;display:flex;justify-content: space-between;">
                                <span>07:23</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <!--二级回复框-->
                      <div v-show="tim.hidden" class="mt5 custom_btn" style="display:flex;margin-left:6.56rem;">
                        <div style="flex:1;">
                          <el-input v-model="tim.comments" placeholder="请输入内容">
                            <template slot="suffix">
                              <div class="" style="display:block;">
                                <span class="iconfont icon-biaoqing1" style="color:green;font-size:20px;" />
                              </div>
                            </template>
                          </el-input>
                        </div>
                        <div>
                          <el-button type="success" @click="twoCommentsFn(tim)">评论</el-button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="tac mt5" style="color:#999;">
                    查看更多
                  </div>
                </div>

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
  name: 'Index',
  data() {
    return {
      vale: '',
      // 搜索框内容
      input: '',
      // 排序
      menu: ['最新', '综合', '按字数', '点赞数', '评论数'],
      index: 0,
      // 搜索框
      state: '',
      // 帖子
      dataArr: [
        {
          name: '张三',
          content: '撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错深V参数爱搜',
          hidden: false,
          comments: '',
          children: [
            {
              name: '周某人',
              content: '看热个看热个够就是看热个够就是大看热个够就是大大看热个够就是大看热个够就是大看热个够就是看热个够就是大看热个够就是大大够看热个够就是大就是看热个够就是大大V',
              children: [
                {
                  name: '年某人',
                  content: '程度反而被小城镇把个你看见行政村'
                },
                {
                  name: '钱某人',
                  content: '程度反而被小城镇把个你看见行政村'
                }
              ],
              hidden: false,
              comments: ''
            },
            {
              name: '李某人',
              content: '看委管托管人将文件',
              hidden: false,
              comments: ''
            }
          ]
        },
        {
          name: '张三',
          hidden: false,
          content: '哈哈哈ID深V破碎的覅偶怕我放到个就是大V扫已服务器',
          comments: ''
        },
        {
          name: '张三',
          hidden: false,
          content: '个看到数据库vreg9i90股份类别离开神盾局刹车时间',
          comments: ''
        }
      ],
      loading: false,
      artWidth: 500,
      count: 0
    }
  },
  computed: {
    noMore() {
      return this.count >= 50
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
    // this.getAttrFn()
    // 得到搜索框内容
    this.restaurants = this.loadAll()
  },
  methods: {
    oneCommentsFn(obj) {
      if (!obj.children) {
        this.$set(obj, 'children', [])
      }
      obj.children.unshift(
        {
          name: '李某人',
          content: obj.comments,
          hidden: false,
          comments: ''
        }
      )
      obj.comments = ''
    },
    twoCommentsFn(obj) {
      if (!obj.children) {
        this.$set(obj, 'children', [])
      }
      obj.children.unshift(
        {
          name: '李某人',
          content: obj.comments,
          hidden: false,
          comments: ''
        }
      )
      obj.comments = ''
    },
    getName(obj, name) {
      obj.comments = '@' + name + '：'
      return false
    },
    load() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.count++
          this.dataArr.push({ name: '张三' + i })
        }
        this.loading = false
      }, 2000)
    },
    // 控制点击效果
    changColor(item, idx) {
      this.index = idx
    },
    // 搜索
    handleSelect(item) {
      console.log(item)
    },
    handleIconClick(ev) {
      console.log(ev)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
        // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
            0
        )
      }
    },
    // 模拟数据
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  /* 头部搜索开始 */
  .mypost_header {
    height: 40px;
    margin: 5px 10px;
    line-height: 40px;
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

  .mypost_header_left /deep/ .el-input__suffix {
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

  .infinite-list-wrapper .iconfont {
    cursor: pointer;
    font-size: 1.1rem;
  }

  /* 原效果 */

  .infinite-list-wrapper {
    height: calc(100vh - 150px);
  }

  .infinite-list-wrapper li {
    list-style: none;
  }

  .infinite-list-wrapper ul {
    margin: 0;
    padding: 0;
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
<style lang="scss">
  .custom_btn {
    .el-input__suffix {
      display: flex;
      align-items: center;
    }
    .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .el-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
