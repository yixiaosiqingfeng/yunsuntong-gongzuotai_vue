<template>
  <div>
    <!--<div class="div_input" @focus="abc" contenteditable="true" v-html="value" @input="value=$event.target.innerHTML">-->
    <!--&lt;!&ndash;<input type="text" v-model="value">&ndash;&gt;-->
    <!--</div>-->
    <test v-model="value" />
  </div>
</template>

<script>
import test from './test'
export default {
  name: 'Index',
  components: { test },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value() {
      console.log(this.value)
    }
  },
  methods: {
    abc() {
      console.log(6666)
    }
  }
}
</script>

<style scoped>
.div_input{
  height:60px;
  padding:5px 10px;
  border:1px solid #999;
  overflow-y:scroll;
}
</style>
