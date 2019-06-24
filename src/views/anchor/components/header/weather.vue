<template>
  <div class="weather">
    <div class="weather_one" v-for="(item,index,) in res" :key="index">
      <span>时间：{{item.date}}&nbsp;&nbsp;{{item.week}}</span><br/>
      <span>温度：{{item.tem2}}~{{item.tem1}}</span><br/><span>天气：{{item.wea}}</span><br/>
    </div>
  </div>
</template>

<script>
export default {
  name:'weather',
  data(){
    return{
      res:[]
    }
  },
  methods:{
   getweather(){
    this.$ajax.get('https://www.tianqiapi.com/api/?version=v1&city=佛山')
      .then((response)=>{
        console.log(response)
        this.res=response.data.data
        
        }).catch((response)=>{
          console.log(response);
    })
   }
  },
  mounted(){
   this.getweather()
  }
}
</script>
<style scoped>
.weather{
  height: 100px;
  width: 100%;
  display: flex;
  /* background-color:red; */
  color: #fff;
}
.weather .weather_one{
  width: 14.28%;
}
.weather_one{
  background-color:#000;
  opacity: 0.5;
}
</style>
