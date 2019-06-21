<template>
  <div>
    <div class="box">
      <div style="margin-right:5px;" @click="inHost">进入主持人工作台</div>
      <div style="margin-left:5px;" @click="inEditor">进入小编工作台</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    async inHost() {
      await this.$store.dispatch('user/updataRoles')
      this.$router.push({ name: 'anchor', params: { roles: ['editor', 'admin'] }})
    },
    async inEditor() {
      await this.$store.dispatch('user/updataRoles')
      this.$router.push({ name: 'edit', params: { roles: ['hoster', 'admin'] }})
    }
  }
}
</script>
<style>
  .box{
    position:absolute;
    top:50%;
    left:50%;
    margin-left:-200px;
    margin-top:-100px;
    width:400px;
    height:200px;
    display:flex;
  }
  .box>div{
    flex:1;
    height:150px;
    border:1px solid #eee;
    cursor:pointer;
  }
</style>
