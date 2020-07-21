<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div>
          <el-button @click="addQueryPage">新增查询表单容器</el-button>
          <el-button draggable="true" @dragstart.native="dragstart">文字输入框</el-button>
        </div>
      </el-col>
      <el-col :span="16">
        <draggable
          class="syllable_ul"
          element="div"
          :options="{group:'row', animation:150}"
          :no-transition-on-drag="true"
        >
          <component :is="pageContainer"></component>
        </draggable>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageContainer: ''
    }
  },
  methods: {
    addQueryPage: function () {
      this.pageContainer = require('./components/page_one.vue').default
    },
    dragstart (event) {
      event.dataTransfer.setData('Text', 'page_one')
    }
  }
}
</script>
<style lang="scss">
  html,body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .el-row {
    height: 100%;
  }
  .el-col {
    height: 100%;
  }
</style>
