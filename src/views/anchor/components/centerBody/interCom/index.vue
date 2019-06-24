<template>
  <div>
    <div class="infinite-list-wrapper " style="overflow-y:scroll;">
      <ul
        v-infinite-scroll="load"
        class="list"
        infinite-scroll-disabled="disabled"
      >
        <li v-for="(item,index) in dataArr" :key="index" class="list-item">{{ item.name }}</li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
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
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 100
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  mounted() {
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.dataArr.push({ name: '张三' + i })
        }
        this.loading = false
      }, 2000)
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
    height: calc(100vh - 120px);
  }

  .infinite-list-wrapper li {
    list-style: none;
  }

  .infinite-list-wrapper ul {
    margin: 0;
    padding: 0;
  }
</style>
