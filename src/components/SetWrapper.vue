<template>
  <div :class="{'edit-wrapper': isEdit}" ref="wrapper" :id="id">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '' + new Date().getTime() + Math.random() * 1000
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    var self = this
    this.$refs.wrapper.addEventListener('click', function (event) {
      event.stopPropagation()
      if (event.currentTarget.id === self.id) {
        console.log(self._vnode.children[0].data.config)
      }
    }, false)
  }
}
</script>
<style lang="scss">
  .edit-wrapper {
    padding: 2px 4px;
    margin: 2px;
    box-shadow: 0px 0px 3px 2px #c0c0c0 inset ;
    border: 1px dotted #cc5d30;
    background-color: rgba(203, 203, 203, 0.1);
    display: inline-block;
    z-index: 9999;
    position: relative;
  }
</style>
