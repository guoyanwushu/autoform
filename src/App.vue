<script>
import { containers, comps } from './util/map.js'
import SetWrapper from './components/SetWrapper'
import settings from './util/trans1'
export default {
  data () {
    return {
      isEdit: true,
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
  beforeCreate () {
    this.nodeArrForAdding = []
  },
  mounted () {
    this.domHtml = document.createElement('div')
    this.domHtml.setAttribute('id', 'app')
  },
  methods: {
    addComponent: function () {
      // 测试一波动态添加组件
      console.log(this._render())
      this.nodeArrForAdding.push(this.$createElement('p', '这是我新加的组件呢，铁子们'))
      this._update(this._render(), false)
    },
    removeComponent: function () {
      this.nodeArrForAdding = []
      this._update(this._render(), false)
    },
    // 根据元素tag名, 把组件名提取出来，比如生成的vNode的tag名是这种vue-component-42-ElFormItem
    getTagName: function (orignName) {
      var _nameArr = orignName.split('-').slice(-1)[0].split('')
      var _targetName = []
      _nameArr.forEach(function (item, index) {
        if (item.toLowerCase() !== item && index !== 0) {
          _targetName.push('-' + item.toLowerCase())
        } else {
          _targetName.push(item.toLowerCase())
        }
      })
      return _targetName.join('')
    },
    transToNode: function (setting, parentNode) {
      // 生成vNdoe树， 然后把vNode树一编译，perfect
      var self = this
      if (setting.type === 'container') {
        let node = containers[setting.name](self)
        const realnode = node
        var _hnode = document.createElement('div')
        if (node.data.style) {
          for (var key in node.data.style) {
            _hnode.style.setProperty(key, node.data.style[key])
          }
        }
        if (parentNode.matchDom) {
          parentNode.matchDom.append(_hnode)
        }
        node.matchDom = _hnode
        if (self.isEdit) {
          node = self.$createElement(SetWrapper, {
            style: node.data.style
          }, [node])
        }
        parentNode.children ? parentNode.children.push(node) : parentNode.children = [node]
        if (setting.children.length) {
          setting.children.map(function (item) {
            self.transToNode(item, realnode)
          })
        }
      } else {
        // 分两种情况, 一种父组件是普通的标签元素，子元素是存在children里面。一种父组件是组件，子元素是存在componentOptions.children
        // 里面
        let node = comps[setting.comp_type](setting, self)
        if (setting.comp_type === 'button_normal') {
          // console.log(node)
        }
        const realnode = node
        var _node = document.createElement(self.getTagName(node.tag))
        var props = node.data.props
        for (var propName in props) {
          if (typeof props[propName] === 'object') {
            _node.setAttribute(':' + propName, setting[propName])
          } else if (typeof props[propName] === 'number' || typeof props[propName] === 'boolean') {
            _node.setAttribute(':' + propName, props[propName])
          } else {
            _node.setAttribute(propName, props[propName])
          }
          // 问题，prop也分两种，一种是静态的，一种是动态的.在生成模板代码的时候，怎么去区分这两种呢?
        }
        if (parentNode.matchDom) {
          parentNode.matchDom.append(_node)
        }
        node.matchDom = _node
        if (self.isEdit) {
          node = self.$createElement(SetWrapper, [node])
        }
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
            self.transToNode(item, realnode)
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
    root.matchDom = document.createElement('div')
    settings.map(function (item) {
      self.transToNode(item, root)
    })
    this.nodeArrForAdding.map(function (item) {
      if (item && !item.added) {
        root.children.push(item)
        item.added = true
      }
    })
    // console.log(root.matchDom)
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
