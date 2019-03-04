webpackJsonp([4],{

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(587),
  /* template */
  __webpack_require__(638),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\device\\dev_list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dev_list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6827698", Component.options)
  } else {
    hotAPI.reload("data-v-d6827698", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(559)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(556),
  /* template */
  __webpack_require__(562),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\form\\select-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] select-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6afeb2e1", Component.options)
  } else {
    hotAPI.reload("data-v-6afeb2e1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "selectForm",
    props: {
        clearable: Boolean,
        optionList: Array,
        selectOption: String,
        tips: {
            type: String,
            default: "请选择"
        }
    },
    methods: {
        selectChanged: function selectChanged(event) {
            this.$emit('select-changed', event);
        }
    },
    data: function data() {
        return {};
    },

    created: function created() {
        //this.optionList = this.cityList;
    }
});

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__form_select_form_vue__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__form_select_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__form_select_form_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var editFormButton = function editFormButton(vm, h, currentRow, index) {
    return h('Button', {
        props: {
            type: 'primary'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': function click() {
                vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
            }
        }
    }, '编辑');
};

var editButton = function editButton(vm, h, currentRow, index) {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': function click() {
                if (!currentRow.editting) {
                    if (currentRow.edittingCell) {
                        for (var name in currentRow.edittingCell) {
                            currentRow.edittingCell[name] = false;
                            vm.edittingStore[index].edittingCell[name] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                } else {
                    vm.edittingStore[index].saving = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    var edittingRow = vm.edittingStore[index];
                    edittingRow.editting = false;
                    edittingRow.saving = false;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }
    }, currentRow.editting ? '保存' : '编辑');
};
var deleteButton = function deleteButton(vm, h, currentRow, index) {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {
            'on-ok': function onOk() {
                var delTableData = vm.thisTableData.splice(index, 1);
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-delete', delTableData[0]);
            }
        }
    }, [h('Button', {
        style: {
            margin: '0 5px'
        },
        props: {
            type: 'error',
            placement: 'top'
        }
    }, '删除')]);
};
var incellEditBtn = function incellEditBtn(vm, h, param) {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: function click(event) {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        })]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: function click(event) {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};
var saveIncellEditBtn = function saveIncellEditBtn(vm, h, param) {
    return h('Button', {
        props: {
            type: 'text',
            icon: 'checkmark'
        },
        on: {
            click: function click(event) {
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            }
        }
    });
};
var cellInput = function cellInput(vm, h, param, item) {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change': function onChange(event) {
                var key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'tableComp',
    components: {
        selectForm: __WEBPACK_IMPORTED_MODULE_0__form_select_form_vue___default.a
    },
    props: {
        refs: String,
        columnsList: Array,
        isLoading: {
            type: Boolean,
            default: false
        },
        value: Array,
        url: String,
        editIncell: {
            type: Boolean,
            default: false
        },
        hoverShow: {
            type: Boolean,
            default: false
        },
        optionsList: {},
        size: String
    },
    data: function data() {
        return {
            columns: [],
            thisTableData: [],
            edittingStore: [],
            select_val: String
        };
    },
    created: function created() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            var vm = this;
            var editableCell = this.columnsList.filter(function (item) {
                if (item.editable) {
                    if (item.editable === true) {
                        return item;
                    }
                }
            });

            var cloneData = JSON.parse(JSON.stringify(this.value));
            var res = [];
            res = cloneData.map(function (item, index) {
                var isEditting = false;
                if (_this.thisTableData[index]) {
                    if (_this.thisTableData[index].editting) {
                        isEditting = true;
                    } else {
                        for (var cell in _this.thisTableData[index].edittingCell) {
                            if (_this.thisTableData[index].edittingCell[cell] === true) {
                                isEditting = true;
                            }
                        }
                    }
                }
                if (isEditting) {
                    return _this.thisTableData[index];
                } else {
                    _this.$set(item, 'editting', false);
                    var edittingCell = {};
                    editableCell.forEach(function (item) {
                        edittingCell[item.key] = false;
                    });
                    _this.$set(item, 'edittingCell', edittingCell);
                    return item;
                }
            });
            this.thisTableData = res;
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            this.columnsList.forEach(function (item) {
                if (item.editable) {
                    item.render = function (h, param) {
                        var currentRow = _this.thisTableData[param.index];
                        if (!currentRow.editting) {
                            if (_this.editIncell) {
                                return h('Row', {
                                    props: {
                                        type: 'flex',
                                        align: 'middle',
                                        justify: 'center'
                                    }
                                }, [h('Col', {
                                    props: {
                                        span: '22'
                                    }
                                }, [!currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(_this, h, param, item)]), h('Col', {
                                    props: {
                                        span: '2'
                                    }
                                }, [currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(_this, h, param) : incellEditBtn(_this, h, param)])]);
                            } else {
                                return h('span', currentRow[item.key]);
                            }
                        } else {
                            if (item.selectable) {
                                return h(__WEBPACK_IMPORTED_MODULE_0__form_select_form_vue___default.a, {
                                    props: {
                                        clearable: true,
                                        optionList: _this.optionsList[item.key],
                                        select_val: _this.optionsList[item.key][0].value
                                    },
                                    on: {
                                        'on-change': function onChange(event) {
                                            var key = param.column.key;
                                            vm.edittingStore[param.index][key] = event.target.value;
                                        }
                                    }
                                });
                            } else {
                                return h('Input', {
                                    props: {
                                        type: 'text',
                                        value: currentRow[item.key]
                                    },
                                    on: {
                                        'on-change': function onChange(event) {
                                            var key = param.column.key;
                                            vm.edittingStore[param.index][key] = event.target.value;
                                        }
                                    }
                                });
                            }
                        }
                    };
                }
                if (item.handle) {
                    item.render = function (h, param) {
                        var currentRowData = _this.thisTableData[param.index];
                        if (item.handle.length === 2) {
                            if (item.handle[0] !== 'editForm' && item.handle[1] !== 'editForm') {
                                return h('div', [editButton(_this, h, currentRowData, param.index), deleteButton(_this, h, currentRowData, param.index)]);
                            } else {
                                return h('div', [editFormButton(_this, h, currentRowData, param.index), deleteButton(_this, h, currentRowData, param.index)]);
                            }
                        } else if (item.handle.length === 1) {
                            if (item.handle[0] === 'edit') {
                                return h('div', [editButton(_this, h, currentRowData, param.index)]);
                            } else if (item.handle[0] === 'editForm') {
                                return h('div', [editFormButton(_this, h, currentRowData, param.index)]);
                            } else {
                                return h('div', [deleteButton(_this, h, currentRowData, param.index)]);
                            }
                        }
                    };
                }
            });
        },
        handleBackdata: function handleBackdata(data) {
            var clonedData = JSON.parse(JSON.stringify(data));
            clonedData.forEach(function (item) {
                delete item.editting;
                delete item.edittingCell;
                delete item.saving;
            });
            return clonedData;
        },
        filter_change: function filter_change(filter) {
            this.$emit('click-filter-change', filter.key, filter._filterChecked);
        },
        sort_change: function sort_change(sort) {
            this.$emit('click-sort-change', sort.key, sort.order);
        },
        filter_Change: function filter_Change(event) {
            this.$emit('customized-filter-change', event);
        },
        add_tableRow: function add_tableRow(event) {
            console.log(event);
        }
    },
    watch: {
        value: function value(data) {
            this.init();
        }
    },
    mounted: {}
});

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 559:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(558)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(557),
  /* template */
  __webpack_require__(561),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\table\\table-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] table-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f8be256", Component.options)
  } else {
    hotAPI.reload("data-v-0f8be256", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Table', {
    attrs: {
      "columns": _vm.columnsList,
      "data": _vm.thisTableData,
      "loading": _vm.isLoading,
      "highlight-row": "",
      "border": "",
      "small": "",
      "stripe": "",
      "size": _vm.size
    },
    on: {
      "on-filter-change": _vm.filter_change,
      "on-sort-change": _vm.sort_change,
      "customized-filter-change": _vm.filter_Change,
      "add-click": _vm.add_tableRow
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0f8be256", module.exports)
  }
}

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "select_form"
  }, [_c('Select', {
    attrs: {
      "placeholder": _vm.tips,
      "clearable": _vm.clearable,
      "filterable": "",
      "value": _vm.selectOption
    },
    on: {
      "on-change": _vm.selectChanged
    }
  }, _vm._l((_vm.optionList), function(item) {
    return _c('Option', {
      key: item.value,
      attrs: {
        "value": item.value
      }
    }, [_vm._v(_vm._s(item.label))])
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6afeb2e1", module.exports)
  }
}

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'inputSearch',
    props: {
        tips: {
            type: String,
            default: '请输入设备物理地址'
        }
    },
    data: function data() {
        return {
            value: ''
        };
    },

    methods: {
        updateValue: function updateValue() {
            this.$emit('input', this.value);
            this.$emit('on-change', this.value);
        },
        buttonClick: function buttonClick() {
            this.$emit('input', this.value);
            this.$emit('on-change', this.value);
        }
    }
    //        watch: {
    //            value() {
    //                this.updateValue();
    //            }
    //        }
});

/***/ }),

/***/ 564:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(564)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(563),
  /* template */
  __webpack_require__(566),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\search\\input-search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] input-search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42e677aa", Component.options)
  } else {
    hotAPI.reload("data-v-42e677aa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "search-input"
  }, [_c('Input', {
    attrs: {
      "placeholder": _vm.tips,
      "icon": "ios-search"
    },
    on: {
      "on-click": _vm.buttonClick,
      "on-enter": _vm.buttonClick
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-42e677aa", module.exports)
  }
}

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'pageTable',
    props: {
        count: Number
    },
    methods: {
        changePage: function changePage(current) {
            this.$emit('on-change', current);
        },
        pageSizeChange: function pageSizeChange(page_size) {
            this.$emit('on-page-size-change', page_size);
        }
    }
});

/***/ }),

/***/ 568:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(568)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(567),
  /* template */
  __webpack_require__(570),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\pagination\\page-table.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] page-table.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07e9e8fe", Component.options)
  } else {
    hotAPI.reload("data-v-07e9e8fe", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page-list"
  }, [_c('Page', {
    attrs: {
      "total": _vm.count,
      "show-total": "",
      "show-elevator": "",
      "show-sizer": ""
    },
    on: {
      "on-change": _vm.changePage,
      "on-page-size-change": _vm.pageSizeChange
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-07e9e8fe", module.exports)
  }
}

/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'tagDevStatus',
    props: {},
    data: {}
});

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_search_input_search_vue__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_search_input_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_search_input_search_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_table_table_list_vue__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_table_table_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_table_table_list_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pagination_page_table_vue__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_pagination_page_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_pagination_page_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_tag_tag_devstatus_vue__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_tag_tag_devstatus_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__common_tag_tag_devstatus_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_util_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__ = __webpack_require__(609);
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        searchForm: __WEBPACK_IMPORTED_MODULE_0__common_search_input_search_vue___default.a,
        devTable: __WEBPACK_IMPORTED_MODULE_1__common_table_table_list_vue___default.a,
        pageTable: __WEBPACK_IMPORTED_MODULE_2__common_pagination_page_table_vue___default.a,
        devStatus: __WEBPACK_IMPORTED_MODULE_3__common_tag_tag_devstatus_vue___default.a
    },
    data: function data() {
        return {
            tableData: [],
            totalsize: 0,
            page_size: 10,
            tableColumns: [],
            tableLoading: false,
            baseuri: '/devlists/',
            selectList: {
                group_name: [{
                    value: 'group1',
                    label: 'group1',
                    selectable: true
                }, {
                    value: 'group2',
                    label: 'group2'
                }, {
                    value: 'group3',
                    label: 'group3'
                }, {
                    value: 'group4',
                    label: 'group4'
                }],
                user_name: [{
                    value: 'user1',
                    label: 'user1'
                }, {
                    value: 'user2',
                    label: 'user2',
                    selectable: true
                }, {
                    value: 'user3',
                    label: 'user3'
                }]
            }
        };
    },

    methods: {
        //ajax获取数据
        getDevListData: function getDevListData(params) {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.get('/devlist', {
                params: params
            }).then(function (response) {
                _this.tableLoading = false;
                _this.tableData = response.data.body;
                _this.totalsize = response.data.count;
            }).catch(function (error) {
                console.debug(error);
            });
        },

        //切换页码
        changePage: function changePage(current) {
            var params = {
                page: current,
                limit: this.page_size
            };
            this.tableLoading = true;
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        },

        //改变pagesize
        changePageSize: function changePageSize(page_size) {
            this.page_size = page_size;
            var params = {
                limit: this.page_size
            };
            this.tableLoading = true;
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        },

        //依据mac地址搜索设备
        handleSearch: function handleSearch(val) {
            var params = {
                mac_addr_like: val,
                limit: this.page_size
            };
            this.tableLoading = true;
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        },

        //改变过滤条件
        changeFilter: function changeFilter(column_key, checked_filter) {
            var params = {
                device_status: [],
                model_type: [],
                limit: this.page_size
            };
            __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].filter[column_key] = checked_filter;
            __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].filter.device_status.forEach(function (val) {
                __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].devstat_enum.forEach(function (item) {
                    if (item.value === val) params.device_status.push(item.value);
                });
            });
            __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].filter.model_type.forEach(function (val) {
                __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].devtype_enum.forEach(function (item) {
                    if (item.value === val) params.model_type.push(item.label);
                });
            });
            this.tableLoading = true;
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        },

        //改变排序
        changeSort: function changeSort(column_key, sort_order) {
            var params = {
                limit: this.page_size,
                sort: column_key,
                order: sort_order
            };
            this.tableLoading = true;
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        },

        //table内容更新
        row_change: function row_change(row_data, index) {
            var _this2 = this;

            var uri = this.baseuri + row_data[index].mac_addr;
            this.tableLoading = true;
            var params = {
                limit: this.page_size
            };
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('patch', uri, params, row_data[index], function (res) {
                _this2.tableLoading = false;
            }, this.exception_callback);
        },

        //table数据被删除
        row_delete: function row_delete(del_data) {
            var _this3 = this;

            //console.log(del_data);
            var uri = this.baseuri + del_data.mac_addr;
            this.tableLoading = true;
            var params = {
                limit: this.page_size
            };
            __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('delete', uri, params, {}, function (res) {
                _this3.tableLoading = false;
            }, this.exception_callback);
        },

        //ajax请求返回值处理
        response_callback: function response_callback(res) {
            this.tableLoading = false;
            this.tableData = res.data.body;
            this.totalsize = res.data.count;
        },

        //ajax请求错误异常处理
        exception_callback: function exception_callback(err) {
            console.log(err);
        }
    },
    created: function created() {
        var params = {
            limit: this.page_size
        };
        this.tableColumns = __WEBPACK_IMPORTED_MODULE_5__devlist_th_js__["a" /* default */].devlist_col_th;
        this.tableLoading = true;
        __WEBPACK_IMPORTED_MODULE_4__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
    }
});

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var devstat_enum = [{
    label: 'Offline',
    value: 0
}, {
    label: 'Online',
    value: 1
}, {
    label: 'Alert',
    value: 2
}];

var devtype_enum = [{
    label: 'AP',
    value: 0
}, {
    label: 'AC',
    value: 1
}, {
    label: 'LTE-Fi',
    value: 2
}];

var devlist_col_th = [{
    type: 'index',
    title: '#',
    key: 'index',
    align: 'center'
}, {
    title: 'MAC地址',
    key: 'mac_addr',
    align: 'center'
}, {
    title: '状态',
    key: 'device_status',
    align: 'center',
    filters: devstat_enum,
    filterMethod: function filterMethod(value, row) {
        if (value === 0) {
            return row.device_status === 0;
        } else if (value === 1) {
            return row.device_status === 1;
        } else if (value === 2) {
            return row.device_status === 2;
        }
    },
    render: function render(h, params) {
        var row = params.row;
        var color = row.device_status === 1 ? 'green' : row.device_status === 2 ? 'yellow' : 'red';
        var text = row.device_status === 1 ? 'Online' : row.device_status === 2 ? 'Alert' : 'Offline';

        return h('Tag', {
            props: {
                type: 'dot',
                color: color
            }
        }, text);
    }
}, {
    title: '设备类型',
    key: 'model_type',
    align: 'center',
    filters: devtype_enum,
    filterMethod: function filterMethod(value, row) {
        if (value === 0) {
            return row.model_type === devtype_enum[0].label;
        } else if (value === 1) {
            return row.model_type === devtype_enum[1].label;
        } else if (value === 2) {
            return row.model_type === devtype_enum[2].label;
        }
    },
    render: function render(h, params) {
        var row = params.row;
        var idx = row.model_type;
        var devtypeArr = [{
            idx: 0,
            name: 'AP'
        }, {
            idx: 1,
            name: 'AC'
        }, {
            idx: 2,
            name: 'LTE-Fi'
        }];
        return h('span', typeof idx === 'string' ? idx : devtypeArr[idx].name);
    }
}, {
    title: '设备名称',
    key: 'model_name',
    align: 'center'
}, {
    title: '模板名称',
    key: 'last_templet_name',
    align: 'center'
}, {
    title: '结束日期',
    key: 'service_end',
    align: 'center',
    sortable: true
}, {
    title: '备注1',
    key: 'dev_info1',
    align: 'center',
    editable: true,
    selectable: false
}, {
    title: '备注2',
    key: 'dev_info2',
    align: 'center',
    editable: true,
    selectable: false
}, {
    title: '组',
    key: 'group_name',
    align: 'center',
    editable: true,
    selectable: true
}, {
    title: '组查看者',
    key: 'user_name',
    align: 'center',
    editable: true,
    selectable: true
}, {
    title: '管理员',
    key: 'management',
    align: 'center'
}, {
    title: '操作',
    key: 'handle',
    width: '200px',
    align: 'center',
    handle: ['edit', 'delete']
}];

var filter = {
    device_status: [],
    model_type: []
};

var devlist = {};

/* harmony default export */ __webpack_exports__["a"] = (devlist = {
    devlist_col_th: devlist_col_th,
    filter: filter,
    devstat_enum: devstat_enum,
    devtype_enum: devtype_enum
});

/***/ }),

/***/ 614:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(614)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(584),
  /* template */
  __webpack_require__(640),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\tag\\tag-devstatus.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tag-devstatus.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f0ae2810", Component.options)
  } else {
    hotAPI.reload("data-v-f0ae2810", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout-content-main"
  }, [_c('search-form', {
    on: {
      "on-change": _vm.handleSearch
    }
  }), _vm._v(" "), _c('dev-table', {
    attrs: {
      "columnsList": _vm.tableColumns,
      "isLoading": _vm.tableLoading,
      "optionsList": _vm.selectList
    },
    on: {
      "click-filter-change": _vm.changeFilter,
      "click-sort-change": _vm.changeSort,
      "on-change": _vm.row_change,
      "on-delete": _vm.row_delete
    },
    model: {
      value: (_vm.tableData),
      callback: function($$v) {
        _vm.tableData = $$v
      },
      expression: "tableData"
    }
  }), _vm._v(" "), _c('page-table', {
    attrs: {
      "count": _vm.totalsize
    },
    on: {
      "on-change": _vm.changePage,
      "on-page-size-change": _vm.changePageSize
    }
  }), _vm._v(" "), _c('dev-status')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d6827698", module.exports)
  }
}

/***/ }),

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Tag', {
    attrs: {
      "type": "dot",
      "color": "green"
    }
  }, [_vm._v("Online ")]), _vm._v(" "), _c('Tag', {
    attrs: {
      "type": "dot",
      "color": "yellow"
    }
  }, [_vm._v("Alert  ")]), _vm._v(" "), _c('Tag', {
    attrs: {
      "type": "dot",
      "color": "red"
    }
  }, [_vm._v("Offline")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f0ae2810", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=4.chunk.js.map