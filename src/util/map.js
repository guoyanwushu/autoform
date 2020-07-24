import { Input, Form, FormItem, Button, Table, TableColumn, Pagination, Select, Option } from 'element-ui'
var containers = {
  search: function (instance) {
    return instance.$createElement('div', {
      class: 'layout-search'
    })
  },
  table: function (instance) {
    return instance.$createElement('div', {
      style: {
        flex: 1
      }
    })
  },
  options: function (instance) {
    return instance.$createElement('div', {
      style: {
        padding: '6px'
      }
    })
  },
  pagination: function (instance) {
    return instance.$createElement('div', {
      style: {
        padding: '4px'
      }
    })
  }
}

var comps = {
  input_text: function (options, instance) {
    return instance.$createElement(Input, {
      domProps: {
        value: instance[options.value]
      },
      props: {
        label: options.label || ''
      },
      on: {
        input: function (val) {
          instance[options.value] = val
        }
      }
    })
  },
  _form_: function (options, instance) {
    return instance.$createElement(Form, {
      props: {
        model: instance[options.model],
        labelWidth: '100px',
        inline: true
      },
      ref: options.ref
    })
  },
  formItem_input_text: function (options, instance) {
    return instance.$createElement(FormItem, {
      props: {
        label: options.label + '：',
        size: 'small',
        prop: options.valueField.split('.').slice(-1)[0]
      }
    }, [instance.$createElement(Input, {
      on: {
        input: function (value) {
          setDataByKey(instance, options.valueField, value)
        }
      },
      props: {
        value: getDataByKey(instance, options.valueField)
      }
    })]
    )
  },
  formItem_select: function (options, instance) {
    if (options.url) {
      // 如果是url, 那么要在created里面去查询对应的下拉列表数据
      instance.$options.mounted.push(function () {
        setTimeout(function () {
          instance[options.options] = [{
            id: 1,
            label: '中国'
          }, {
            id: 2,
            label: '英国'
          }]
        })
      })
    }
    return instance.$createElement(Select, {
      props: {
        value: getDataByKey(instance, options.valueField),
        size: 'small'
      },
      on: {
        change: function (value) {
          setDataByKey(instance, options.valueField, value)
        }
      }
    }, instance[options.options].map(function (item) {
      return instance.$createElement(Option, {
        props: {
          key: item.id,
          label: item.label,
          value: item.id
        }
      })
    }))
  },
  button_search: function (options, instance) {
    return instance.$createElement(Button, {
      props: {
        size: 'small',
        icon: 'el-icon-search',
        type: 'primary'
      },
      on: {
        click: function () {
          instance[options.handlerName]()
        }
      }
    }, options.text)
  },
  button_reset: function (options, instance) {
    instance[options.handlerName] = function () {
      instance.$refs[options.formRef].resetFields()
    }
    return instance.$createElement(Button, {
      props: {
        size: 'small',
        icon: 'el-icon-remove'
      },
      on: {
        click: function () {
          instance[options.handlerName]()
        }
      }
    }, options.text)
  },
  button_add: function (options, instance) {
    instance[options.handlerName] = function () {
      console.log('新增')
    }
    return instance.$createElement(Button, {
      props: {
        size: 'small',
        icon: 'el-icon-circle-plus-outline'
      },
      on: {
        click: function () {
          instance[options.handlerName]()
        }
      }
    }, options.text)
  },
  button_remove: function (options, instance) {
    instance[options.handlerName] = function () {
      console.log('删除')
    }
    return instance.$createElement(Button, {
      props: {
        size: 'small',
        icon: 'el-icon-circle-plus-outline'
      },
      on: {
        click: function () {
          instance[options.handlerName]()
        }
      }
    }, options.text)
  },
  button_normal: function (options, instance) {
    return instance.$createElement(Button, {
      props: {
        size: 'small'
      },
      compDesc: '常规按钮',
      config: {
        buttonName: {
          pointer: options.text,
          inputType: 'input',
          validator: null
        }
      },
      on: {
        click: instance[options.clickHandler]
      }
    }, options.text)
  },
  table: function (options, instance) {
    return instance.$createElement(Table, {
      props: {
        data: instance[options.data],
        height: '100%',
        size: 'small',
        stripe: true,
        cellClassName: 'table-cell',
        headerCellClassName: 'table-head'
      }
    }, options.fields.map(function (item) {
      return instance.$createElement(TableColumn, {
        props: {
          label: item.label,
          prop: item.prop
        }
      })
    }))
  },
  pagination: function (options, instance) {
    return instance.$createElement(Pagination, {
      props: {
        pageSizes: [15, 30, 100, 300],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: getDataByKey(instance, options.total),
        pageSize: getDataByKey(instance, options.pageSize),
        currentPage: getDataByKey(instance, options.currentPage)
      }
    })
  }
}
// set 和 get的目的都是为了从‘searchForm.name’这种字段取值或者赋值
function getDataByKey (obj, keyStr) {
  var keyArr = keyStr.split('.')
  var value = obj
  keyArr.map(function (item) {
    value = value[item]
  })
  return value
}
function setDataByKey (obj, keyStr, currentValue) {
  var keyArr = keyStr.split('.')
  var value = obj
  keyArr.map(function (item, index) {
    if (index !== keyArr.length - 1) {
      value = value[item]
    } else {
      value[keyArr[keyArr.length - 1]] = currentValue
    }
  })
}

export { containers, comps }
