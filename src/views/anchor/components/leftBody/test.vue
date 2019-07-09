<template>
  <div
    class="edit-div"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
    v-html="innerText"
  />
</template>
<script>
export default {
  name: 'EditDiv',
  props: {
    value: {
      type: String,
      default: ''
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    }
  },
  watch: {
    'value'() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  methods: {
    changeText() {
      console.log(this.$el.innerHTML, 6666)
      this.$emit('input', this.$el.innerHTML)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .edit-div {
    width: 100%;
    height: 100px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    &[contenteditable=true] {
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
</style>
