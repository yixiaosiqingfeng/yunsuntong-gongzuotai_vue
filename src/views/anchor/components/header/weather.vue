<template>
  <div class="weatherBox">
    <div v-for="(item,index,) in res" :key="index" style="flex:1;display:flex;align-items: center;font-size:12px;justify-content: center;">
      <div>
        <span class="iconfont" :class="tianqiIcon(item.wea_img)" style="font-size:50px;color:#fff;" />
      </div>
      <div style="line-height:20px;" class="ml10">
        <div>{{ item.tem }}-{{ item.tem2 }}<span class="ml10">{{ item.wea }}</span></div>
        <div>{{ item.week }}<span class="ml10">{{ item.date }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      res: []
    }
  },
  mounted() {
    this.getweather()
  },
  methods: {
    getweather() {
      this.$ajax.get('https://www.tianqiapi.com/api/?version=v1&city=中国')
        // this.$ajax.get('http://wthrcdn.etouch.cn/weather_mini?city=北京市')
        .then((response) => {
          console.log(JSON.parse(JSON.stringify(response.data.data)))
          this.res = response.data.data
        }).catch((response) => {
          console.log(response)
        })
    },
    tianqiIcon(str) {
      switch (str) {
        case 'yun':
          return 'icon-yintian'
        case 'lei':
          return 'icon-tianqi1'
        default:
          return 'icon-tianqi2'
      }
    }
  }
}
</script>
<style scoped>
  .weatherBox {
    flex:1;
    display: flex;
    align-items: center;
    color:#dee74c;
  }
</style>
