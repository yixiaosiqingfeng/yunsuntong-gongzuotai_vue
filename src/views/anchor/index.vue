<template>
  <div class="anchor" style="height:100%;">
    <div>
      <oheader />
    </div>
    <div class="bigBox" style="margin-top:15px;">
      <div
        ref="leftBox"
        class="box"
        style="position:relative;background-color:#fff;margin:0 10px;min-width:300px;"
        :style="{width:leftW+'px'}"
      >
        <div style="position:absolute;right:-15px;top:0;bottom:0;width:15px;cursor:e-resize;" @mousedown="leftMove" />
        <leftBody />
      </div>
      <div class="box" style="flex:1;background-color:#fff;margin:0 5px;min-width:800px;">
        <centerBody />
      </div>
      <div
        ref="rightBox"
        class="box"
        style="position:relative;background-color:#fff;margin:0 10px;min-width:300px;"
        :style="{width:rightW+'px'}"
      >
        <div style="position:absolute;left:-15px;top:0;bottom:0;width:15px;cursor:e-resize;" @mousedown="rightMove" />
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
  components: { oheader, centerBody, rightBody, leftBody },
  data() {
    return {
      leftW: 300,
      rightW: 300
    }
  },
  methods: {
    leftMove(ev) {
      const event = ev || window.event
      const disX = event.clientX
      const _this = this
      const objLeft = this.$refs.leftBox
      const initX = parseInt(getComputedStyle(objLeft, false)['width'])
      document.onmousemove = function(ev) {
        const event = ev || window.event
        const X = event.clientX
        const l = X - disX
        _this.leftW = initX + l
        return false
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    rightMove(ev) {
      const event = ev || window.event
      const disX = event.clientX
      const _this = this
      const objright = this.$refs.rightBox
      const initX = parseInt(getComputedStyle(objright, false)['width'])
      document.onmousemove = function(ev) {
        const event = ev || window.event
        const X = event.clientX
        const l = X - disX
        _this.rightW = initX + (-l)
        return false
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .bigBox {
    display: flex;
    height: calc(100vh - 46px);
  }

  .box {
    box-shadow: 0 0 15px #ddd;
  }
</style>
