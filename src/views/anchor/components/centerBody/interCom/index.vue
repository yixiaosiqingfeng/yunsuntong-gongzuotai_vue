<template>
  <div>
    <div class="infinite-list-wrapper " style="overflow-y:scroll;">
      <ul
        v-infinite-scroll="load"
        class="list"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="(item,index) in dataArr" :key="index" class="list-item">
          <div style="display:flex;">
            <div style="width:80px;padding:10px;">
              <div style="width:60px;height:60px;border-radius:50%;overflow:hidden;">
                <img src="http://cdn.duitang.com/uploads/item/201601/08/20160108194244_JxGRy.thumb.700_0.jpeg" alt="" width="100%" height="100%">
              </div>
            </div>
            <div style="flex:1;padding:10px;line-height:18px;">
              <div>{{ item.name }} <span class="ml10">13898652365</span></div>
              <div>#同步新空气 <span>2019-10-6</span></div>
              <div ref="article">
                <div class="abqc">{{ value }}<span>展开</span></div>
              </div>
              <div>
                <el-button size="mini">点赞</el-button>
                <el-button size="mini">评论</el-button>
                <el-button size="mini">转发</el-button>
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
      dataArr: [
        {
          name: '张三'
        },
        {
          name: '张三'
        },
        {
          name: '张三'
        }
      ],
      loading: false,
      artWidth: 500,
      count: 0,
      value: '撒一我IEufuoreuhU盾深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱深V实地热管热佛奥我的错撒返回的深V参数爱搜的成绩搜爱车爱搜草四川'
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
  },
  methods: {
    load() {
      console.log(111)
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.count++
          this.dataArr.push({ name: '张三' + i })
        }
        this.loading = false
      }, 2000)
    },
    getAttrFn() {
      const abj = this.$refs.article
      const H = getComputedStyle(abj[0], false)['height']
      const W = getComputedStyle(abj[0], false)['width']
      this.artWidth = W
      console.log(H)
    }
  }
}
</script>

<style scoped>
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
  .abc{
    max-width:918px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
</style>
