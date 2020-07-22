<script>
import { containers, comps } from './util/map.js'
import settings from './util/trans1'
export default {
  data () {
    return {
      pageContainer: '',
      name: '',
      searchForm: {
        class: '',
        sex: '',
        schoolNumber: '',
        country: 2
      },
      tableData: [{
        sex: '女',
        name: '小美',
        schoolNumber: '123232'
      }, {
        sex: '男',
        name: '王大锤',
        schoolNumber: '9278781'
      }],
      pages: {
        total: 1,
        currentPage: 1,
        pageSize: 30
      },
      countryOptions: []
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    transToNode: function (setting, parentNode) {
      // 生成vNdoe树， 然后把vNode树一编译，perfect
      var self = this
      if (setting.type === 'container') {
        const node = containers[setting.name](self)
        parentNode.children ? parentNode.children.push(node) : parentNode.children = [node]
        if (setting.children.length) {
          setting.children.map(function (item) {
            self.transToNode(item, node)
          })
        }
      } else {
        // 分两种情况, 一种父组件是普通的标签元素，子元素是存在children里面。一种父组件是组件，子元素是存在componentOptions.children
        // 里面
        const node = comps[setting.comp_type](setting, self)
        if (!parentNode.componentOptions) {
          // 父节点是元素节点
          parentNode.children = parentNode.children || []
          parentNode.children.push(node)
        } else {
          parentNode.componentOptions.children = parentNode.componentOptions.children || []
          parentNode.componentOptions.children.push(node)
        }
        if (setting.children && setting.children.length) {
          setting.children.map(function (item) {
            self.transToNode(item, node)
          })
        }
      }
    }
  },
  render (c) {
    var self = this
    var root = c('div', {
      domProps: {
        id: 'app'
      }
    })
    settings.map(function (item) {
      self.transToNode(item, root)
    })
    return root
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
    display: flex;
    flex-direction: column;
  }
  .el-row {
    height: 100%;
  }
  .el-col {
    height: 100%;
  }
  .layout-search {
    padding: 8px 8px 0;
    border-bottom:1px solid #EBEEF5;
    .el-form-item__content .el-select {
      width: 200px;
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 8px !important;
    }
  }
  .table-head {
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
    font-size: 14px;
  }
  .el-table--small th{
    padding: 8px 0!important;
  }
  .el-table--small td{
    padding: 5px 0!important;
  }
  /*
    element table组件中el-table元素上cell-class-name属性对应的值，手动挂载，会在对应的元素上添加该类
  */
  .table-cell {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
</style>
