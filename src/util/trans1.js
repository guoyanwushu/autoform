var layOut = [{
  type: 'container',
  name: 'search',
  children: [{
    type: 'component',
    comp_type: '_form_',
    model: 'searchForm',
    ref: 'searchForm',
    children: [{
      type: 'component',
      comp_type: 'formItem_input_text',
      slot: true,
      label: '学号',
      valueField: 'searchForm.schoolNumber'
    }, {
      type: 'component',
      comp_type: 'formItem_input_text',
      label: '性别',
      slot: true,
      valueField: 'searchForm.sex'
    }, {
      type: 'component',
      comp_type: 'formItem_input_text',
      label: '班级',
      slot: true,
      valueField: 'searchForm.class'
    }, {
      type: 'component',
      comp_type: 'formItem_select',
      url: '/tcs/sdsjido',
      valueField: 'searchForm.country',
      options: 'countryOptions'
    }, {
      type: 'component',
      comp_type: 'button_search',
      handlerType: 'function_table_search',
      handlerName: 'search',
      slot: true,
      text: '搜索'
    }, {
      type: 'component',
      comp_type: 'button_reset',
      handlerType: 'function_table_search_reset',
      handlerName: 'resetForm',
      slot: true,
      formRef: 'searchForm',
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
    comp_type: 'button_remove',
    handlerType: 'function_batch_remove',
    handlerName: '_batch_remove',
    text: '批量移除'
  }]
}, {
  type: 'container',
  name: 'table',
  children: [{
    type: 'component',
    comp_type: 'table',
    data: 'tableData',
    fields: [{
      label: '姓名',
      prop: 'name'
    }, {
      label: '性别',
      prop: 'sex'
    }, {
      label: '学号',
      prop: 'schoolNumber',
      formatter: function (row) {
        return '学号' + row.schoolNumber
      }
    }]
  }]
}, {
  type: 'container',
  name: 'pagination',
  children: [{
    type: 'component',
    comp_type: 'pagination',
    total: 'pages.total',
    pageSize: 'pages.pageSize',
    currentPage: 'pages.currentPage'
  }]
}]
export default layOut
