<template>
  <div class="anchor" style="height:100%;">
    <div style="height:40px;">
      <oheader />
    </div>
    <div class="bigBox" style="margin-top:15px;">
      <div class="box" style="width:300px;background-color:#fff;margin:0 10px;">
        <leftBody />
      </div>
      <div class="box" style="flex:1;background-color:#fff;margin:0 5px;padding:0 10px;">
        <centerBody />
      </div>
      <div class="box" style="width:300px;background-color:#fff;margin:0 10px;">
        <rightBody />
      </div>
    </div>
  </div>
</template>

<script>
import oheader from './components/header'
import leftBody from './components/leftBody'
import rightBody from './components/rightBody'
import centerBody from './components/centerBody'
export default {
  name: 'Index',
  components: { oheader, centerBody, rightBody, leftBody }
}
</script>

<style lang="scss" scoped>
  .bigBox {
    display: flex;
    height: calc(100vh - 56px);
  }
  .box{
    box-shadow: 0 0 15px #ddd;
  }
</style>
