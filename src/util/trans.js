var layOut = [{
  type: 'container',
  name: 'search',
  children: [{
    type: 'component',
    name: '_form_',
    children: [{
      type: 'component',
      comp_type: 'input_text',
      label: '学号',
      valueField: 'schoolNumber'
    }, {
      type: 'component',
      comp_type: 'input_text',
      label: '性别',
      valueField: 'sexy'
    }, {
      type: 'component',
      comp_type: 'input_text',
      label: '班级',
      valueField: 'class'
    }, {
      type: 'component',
      comp_type: 'button_search',
      handlerType: 'function_table_search',
      handlerName: 'search',
      text: '搜索'
    }, {
      type: 'component',
      comp_type: 'button_reset',
      handlerType: 'function_table_search_reset',
      handlerName: 'resetForm',
      text: '重置'
    }]
  }]
}, {
  type: 'container',
  name: 'options',
  children: [{
    type: 'component',
    comp_type: 'button_add',
    handlerType: 'function_option_add',
    handlerName: '_add',
    text: '新增'
  }, {
    type: 'component',
    component: 'button_remove',
    handlerType: 'function_batch_remove',
    handlerName: '_batch_remove',
    text: '批量移除'
  }]
}, {
  type: 'container',
  name: 'table',
  children: [{
    type: 'component',
    component: 'table',
    tableFields: [{
      type: 'index'
    }, {
      label: '姓名',
      field: 'name'
    }, {
      label: '学号',
      field: 'schoolNumber'
    }]
  }]
}, {
  type: 'container',
  name: 'pagination',
  children: [{
    type: 'component',

  }]
}]
