<template>
  <div class="anchor" style="height:100%;">
    <div style="height:40px;">
      <oheader />
    </div>
    <div class="bigBox">
      <div class="box" style="width:300px;">
        <leftBody />
      </div>
      <div class="box" style="flex:1;">
        <centerBody />
      </div>
      <div class="box" style="width:300px;">
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
    height: calc(100vh - 40px);
  }
</style>
