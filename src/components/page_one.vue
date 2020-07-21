<template>
  <div class="layout-container preview__container" @dragover.native="handelDragOver" @drop.native="handleDrop">
    <div class="layout-search preview__height" @dragover.native="handelDragOver" @drop.native="handleDrop">
      <slot name="search"></slot>
    </div>
    <div class="layout-options preview__height" @dragover.native="handelDragOver" @drop.native="handleDrop">
      <slot name="options"></slot>
    </div>
    <div class="layout-table" @dragover.native="handelDragOver" @drop.native="handleDrop">
      <slot name="table"></slot>
    </div>
    <div class="layout-pagination preview__height" @dragover.native="handelDragOver" @drop.native="handleDrop">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handelDragOver (event) {
      event.preventDefault()
    },
    handleDrop () {
      debugger
    }
  }
}
</script>
<style>
  .preview__container {
    box-sizing: border-box;
    border: 2px dashed #81ffcf;
  }
  .preview__height {
    height: 44px;
    border: 1px solid #ccc;
    margin: 2px 0;
  }
  .layout-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .layout-search {
    padding: 8px 8px 0;
  }
  .layout-options {
    padding: 6px;
  }
  .layout-table {
    flex: 1
  }
  .layout-pagination {
    padding: 4px;
  }
</style>
