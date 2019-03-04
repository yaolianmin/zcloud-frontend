webpackJsonp([0],{

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(600),
  /* template */
  __webpack_require__(629),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\task\\task_view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] task_view.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52d24952", Component.options)
  } else {
    hotAPI.reload("data-v-52d24952", Component.options)
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

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item_form_vue__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__item_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__item_form_vue__);
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
    name: 'bestForm',
    components: {
        itemForm: __WEBPACK_IMPORTED_MODULE_0__item_form_vue___default.a
    },
    props: {
        formItems: Array,
        value: {
            type: Object
        },
        formDataVaildate: Object
    },
    data: function data() {
        return {
            localFormData: {},
            formElems: ['Input', 'Radio', 'Checkbox', 'Switch', 'Select', 'AutoComplete', 'Slider', 'DatePicker', 'TimePicker', 'Cascader', 'Transfer', 'InputNumber', 'Rate', 'Upload', 'ColorPicker'],
            upload: false
        };
    },

    methods: {
        init: function init() {
            var _this = this;

            var tempFormData = JSON.parse(JSON.stringify(this.value));
            Object.keys(tempFormData).forEach(function (item) {
                _this.$set(_this.localFormData, item, _this.value[item]);
            });
        },
        handleSubmit: function handleSubmit(name) {
            var _this2 = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    _this2.$emit('on-click-submit', true, _this2.localFormData);
                } else {
                    _this2.$emit('on-click-submit', false, _this2.localFormData);
                }
            });
        },
        handleReset: function handleReset(name) {
            this.$refs[name].resetFields();
        },

        //接收表单数据变化事件处理
        recvChange: function recvChange(key, data) {
            this.localFormData[key] = data;
        },
        beforeUpload: function beforeUpload(file) {
            this.$set(this.localFormData, 'uploadFileName', file);
            return false;
        }
    },
    created: function created() {
        this.init();
    },
    watch: {
        value: function value(data) {
            this.init();
            //console.log('change....');
        }
    }
});

/***/ }),

/***/ 572:
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
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        item: Object,
        key_word: String,
        value: Object
    },
    data: function data() {
        return {
            form_type: this.item.type,
            ItemData: this.value[this.key_word]
        };
    },

    methods: {
        formChange: function formChange(event) {
            this.$emit('form-change', this.key_word, typeof event === 'string' ? event : event.target.value);
        }
    },
    watch: {
        'value': function value() {
            console.log('helllow wor');
        }
    },
    created: function created() {}
});

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(571),
  /* template */
  __webpack_require__(576),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\form\\best-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] best-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d1f9880e", Component.options)
  } else {
    hotAPI.reload("data-v-d1f9880e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(572),
  /* template */
  __webpack_require__(575),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\common\\form\\item-form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] item-form.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-850588ac", Component.options)
  } else {
    hotAPI.reload("data-v-850588ac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.form_type === 'Input') ? _c('Input', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.value[_vm.key_word]),
      callback: function($$v) {
        _vm.$set(_vm.value, _vm.key_word, $$v)
      },
      expression: "value[key_word]"
    }
  }) : (_vm.form_type === 'Radio') ? _c('Radio', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Checkbox') ? _c('Checkbox', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Switch') ? _c('i-switch', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Select') ? _c('Select', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }, _vm._l((_vm.item.options), function(elem) {
    return _c('Option', {
      key: elem.id,
      attrs: {
        "value": elem.value,
        "label": elem.label
      }
    })
  })) : (_vm.form_type === 'AutoComplete') ? _c('AutoComplete', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Slider') ? _c('Slider', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'DatePicker') ? _c('DatePicker', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'TimePicker') ? _c('TimePicker', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Cascader') ? _c('Cascader', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Transfer') ? _c('Transfer', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'InputNumber') ? _c('InputNumber', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Rate') ? _c('Rate', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Upload') ? _c('Upload', {
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'ColorPicker') ? _c('ColorPicker', {
    on: {
      "on-change": _vm.formChange
    },
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : (_vm.form_type === 'Form') ? _c('Form', {
    model: {
      value: (_vm.ItemData),
      callback: function($$v) {
        _vm.ItemData = $$v
      },
      expression: "ItemData"
    }
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.ItemData))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-850588ac", module.exports)
  }
}

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Form', {
    ref: "bestForm",
    staticClass: "best-form",
    attrs: {
      "model": _vm.localFormData,
      "rules": _vm.formDataVaildate,
      "label-width": 160
    }
  }, [_vm._l((_vm.formItems), function(item) {
    return (_vm.formElems.includes(item.type)) ? _c('FormItem', {
      key: item.key,
      attrs: {
        "label": item.label,
        "prop": item.key
      }
    }, [(item.type === 'Input') ? _c('Input', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Radio') ? _c('Radio', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Checkbox') ? _c('Checkbox', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Switch') ? _c('i-switch', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }, [_c('span', {
      attrs: {
        "slot": "open"
      },
      slot: "open"
    }, [_vm._v("开")]), _vm._v(" "), _c('span', {
      attrs: {
        "slot": "close"
      },
      slot: "close"
    }, [_vm._v("关")])]) : (item.type === 'Select') ? _c('Select', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }, _vm._l((item.options), function(elem) {
      return _c('Option', {
        key: elem.id,
        attrs: {
          "value": elem.value,
          "label": elem.label
        }
      })
    })) : (item.type === 'AutoComplete') ? _c('AutoComplete', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Slider') ? _c('Slider', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'DatePicker') ? _c('DatePicker', {
      attrs: {
        "type": item.subtype
      },
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'TimePicker') ? _c('TimePicker', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Cascader') ? _c('Cascader', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Transfer') ? _c('Transfer', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'InputNumber') ? _c('InputNumber', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Rate') ? _c('Rate', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : (item.type === 'Upload') ? _c('Upload', {
      attrs: {
        "before-upload": _vm.beforeUpload,
        "action": '//jsonplaceholder.typicode.com/posts/'
      }
    }, [_c('Button', {
      attrs: {
        "type": "ghost",
        "icon": "ios-cloud-upload-outline"
      }
    }, [_vm._v("Select the file to upload")])], 1) : (item.type === 'ColorPicker') ? _c('ColorPicker', {
      model: {
        value: (_vm.localFormData[item.key]),
        callback: function($$v) {
          _vm.$set(_vm.localFormData, item.key, $$v)
        },
        expression: "localFormData[item.key]"
      }
    }) : _vm._e()], 1) : (item.type === 'h2') ? _c('h2', [_vm._v(_vm._s(item.label)), _c('hr')]) : (item.type === 'h3') ? _c('h3', [_vm._v(_vm._s(item.label))]) : _vm._e()
  }), _vm._v(" "), _c('FormItem', [_c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.handleSubmit('bestForm')
      }
    }
  }, [_vm._v("Submit")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-left": "8px"
    },
    attrs: {
      "type": "ghost"
    },
    on: {
      "click": function($event) {
        _vm.handleReset('bestForm')
      }
    }
  }, [_vm._v("Cancel")])], 1)], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d1f9880e", module.exports)
  }
}

/***/ }),

/***/ 578:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var parser = {};

parser.Json = function (viewData) {
    if (typeof viewData.productInfo === 'undefined' || typeof viewData.viewDesc === 'undefined') {
        console.log('data invaild');
        return false;
    }

    var viewArr = [];
    viewArr.push(viewData.productInfo);

    viewData.viewDesc.forEach(function (item) {
        if (typeof item.L !== 'undefined') {
            parser.level(item.L, viewArr);
        }
    });

    var viewJson = parser.ViewArrayData(viewArr);
    return viewJson;
};

parser.span = function (spanArr, destArr) {
    if (spanArr instanceof Array) {
        spanArr.forEach(function (item) {
            var tempdata = {};
            Object.keys(item).forEach(function (key) {
                if ('label' === key) tempdata.label = item[key];else if ('V' === key) tempdata.type = item[key];else if ('key' === key) tempdata.key = item[key];else if ('value' === key) tempdata.value = item[key];else if ('options' === key) tempdata.options = item[key];else if ('prop' === key) tempdata.prop = item[key];
            });
            destArr.push(tempdata);
        });
    }
};

//接卸L
parser.level = function (data, viewArr) {
    Object.keys(data).forEach(function (key) {
        if ('T1' === key) {
            viewArr.push({
                label: data[key],
                type: 'h2'
            });
        } else if ('T2' === key) {
            viewArr.push({
                label: data[key],
                type: 'h3'
            });
        } else if ('L' === key) {
            parser.level(data[key], viewArr);
        } else if ('span' === key) {
            parser.span(data[key], viewArr);
        }
    });
};

//解析数据
parser.ViewArrayData = function (viewArr) {
    if (viewArr.length <= 1) return false;
    var model_name = viewArr[0].model_name;
    var card_num = viewArr[0].card_num;
    var vap_num = viewArr[0].vap_num;
    var card_info = {};

    var i = 0;
    while (i < card_num) {
        card_info['card' + i] = [];
        i++;
    }

    viewArr.shift();
    viewArr.forEach(function (item) {
        var i = 0;

        for (i = 0; i < card_num; i++) {
            var temp = JSON.parse(JSON.stringify(item));
            var len = item.prop === 1 ? 1 : item.prop === 2 ? vap_num[i] : 0;
            if (item.value instanceof Array && item.value.length >= len) {
                temp.value = item.value.slice(len * i, len * (i + 1));
                card_info['card' + i].push(temp);
            } else if (temp.value === 'undefined' || !(temp.value instanceof Array)) {
                card_info['card' + i].push(temp);
            } else {
                console.log('data error, array length is short!');
                return false;
            }
        }
    });

    return card_info;
};

/* harmony default export */ __webpack_exports__["a"] = (parser);

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
* 表单内容
* type 表示表单类型，如Input/Select/Form/Slider等
* subtype 表示表单子类型，如DatePicker支持datetime，datetimerange
* key 表示对应数据库字段
* value 表单内容
* options 正对Select类型表单的option选项
* label 在页面显示的标签
* render 表单的渲染函数
* */
var newModel = [{
    type: 'Input',
    key: 'model_name',
    value: '',
    label: '机种名称'
}, {
    type: 'Input',
    key: 'basic_platform', //数据库字段名称
    value: '', //选中值
    label: '基础平台'
}, {
    type: 'Input',
    key: 'brand',
    value: '',
    label: '品牌'
}, {
    type: 'Upload',
    key: 'template',
    value: '',
    label: '模板文件'
}];

/* harmony default export */ __webpack_exports__["a"] = (newModel);

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_table_table_list_vue__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_table_table_list_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__common_table_table_list_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_search_input_search_vue__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_search_input_search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_search_input_search_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_form_select_form_vue__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_form_select_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__common_form_select_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_pagination_page_table_vue__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_pagination_page_table_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__common_pagination_page_table_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_create_model_js__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_util_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__libs_parser_js__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_viewData_js__ = __webpack_require__(608);
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
    components: {
        modelTable: __WEBPACK_IMPORTED_MODULE_0__common_table_table_list_vue___default.a,
        searchForm: __WEBPACK_IMPORTED_MODULE_1__common_search_input_search_vue___default.a,
        selectForm: __WEBPACK_IMPORTED_MODULE_2__common_form_select_form_vue___default.a,
        pageTable: __WEBPACK_IMPORTED_MODULE_3__common_pagination_page_table_vue___default.a,
        modelForm: __WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue___default.a
    },
    data: function data() {
        return {
            newModelForm: [],
            modelFormData: {},
            selected_model: '',
            show: false,
            //                formDataVaildate:{
            //                    model_name:[
            //                        { required: true, message: 'Please enter model name', trigger: 'change' }
            //                    ],
            //                    basic_platform: [
            //                        { required: true, message: 'Please enter basic platform name', trigger: 'blur' }
            //                    ],
            //                    brand: [
            //                        { required: true, message: 'Please enter brand name', trigger: 'blur' }
            //                    ],
            //                    template: [
            //                        { required: true, message: 'Please upload template file', trigger: 'blur' }
            //                    ]
            //                },
            optionList: [{
                label: 'ZN-7100-2DHO',
                value: '1022'
            }, {
                label: 'AC-1027L',
                value: '1027'
            }, {
                label: 'XN-1033',
                value: '1033'
            }]
        };
    },

    methods: {
        //初始表单数据
        initFormData: function initFormData() {
            var _this = this;

            this.newModelForm.forEach(function (item, index) {
                if (typeof item.key !== 'undefined') _this.$set(_this.modelFormData, item.key, _this.newModelForm[index].value[0]);
            });
            console.log(this.modelFormData);
        },
        //初始表单校验规则
        initFormDataVaildate: function initFormDataVaildate() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_5__config_create_model_js__["a" /* default */].forEach(function (item) {
                _this2.modelFormData[item.key] = '';
            });
        },
        //表单提交
        formSubmit: function formSubmit(vaild, formDataObject) {
            //                util.ajax.request('post', this.baseuri, {}, this.formDataObject, (res) => {
            //                    this.$Message.success('Are you ok!');
            //                });
            var formData = new FormData();
            Object.keys(formDataObject).forEach(function (key) {
                formData.append(key, formDataObject[key]);
            });

            __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].test.post('posts', formData);
            if (vaild) this.$Message.success('Success !');else this.$Message.error('Failed !');
        },
        //筛选条件发生变化
        selectChanged: function selectChanged(event) {
            this.selected_model = event;
        }
    },
    created: function created() {
        //this.newModelForm = newModelForm;
        this.newModelForm = __WEBPACK_IMPORTED_MODULE_7__libs_parser_js__["a" /* default */].Json(__WEBPACK_IMPORTED_MODULE_8__config_viewData_js__["a" /* default */]).card0;
        this.initFormData();
        //            let jsonData = parser.Json(viewData);
        //console.log(jsonData);
        //console.log(this.newModelForm);
        //this.initFormDataVaildate();
    }
});

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var viewData = {
    productInfo: {
        model_name: 'AN-1022',
        card_num: 2,
        vap_num: [8, 8]
    },
    viewDesc: [{
        L: {
            T1: 'Wireless Setting',
            span: [{
                label: 'Enable Raido',
                key: 'EnableRadio',
                V: 'Switch',
                value: [true, false],
                prop: 1
            }, {
                label: 'Country/Region',
                key: 'country',
                V: 'Select',
                value: [86, 151],
                options: [{
                    label: 'China',
                    value: 86
                }, {
                    label: 'France',
                    value: 151
                }],
                prop: 1
            }, {
                label: 'Operating Mode',
                key: 'opmode',
                V: 'Select',
                value: [3, 5],
                options: [{
                    label: '802.11b/g/n',
                    value: 3
                }, {
                    label: '802.11b',
                    value: 5
                }],
                prop: 1
            }]
        }
    }, {
        L: {
            T1: 'Vap Setting',
            L: {
                T2: 'Profile Definition',
                span: [{
                    label: 'Security Profile Name',
                    key: 'ProfileName',
                    V: 'Input',
                    value: ['vap0', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                    prop: 2
                }, {
                    label: 'Wireless Network Name(SSID)',
                    key: 'ssid',
                    V: 'Input',
                    value: ['Wireless', 'vap1', 'vap2', 'vap3', 'vap4', 'vap5', 'vap6', 'vap7', 'vap8', 'vap9', 'vap10', 'vap11', 'vap12', 'vap13', 'vap14', 'vap15'],
                    prop: 2
                }, {
                    label: 'WMM Support',
                    key: 'wmm',
                    V: 'Select',
                    value: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                    prop: 2,
                    options: [{
                        label: 'Enable',
                        value: 1
                    }, {
                        label: 'Disable',
                        value: 0
                    }]
                }]
            }
        }
    }]
};

/* harmony default export */ __webpack_exports__["a"] = (viewData);

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.selected_model === '') ? _c('div', [_c('Row', [_c('Col', {
    attrs: {
      "span": "12",
      "offset": "6"
    }
  }, [_c('select-form', {
    attrs: {
      "tips": '请选择或输入机种名称',
      "selectOption": _vm.selected_model,
      "optionList": _vm.optionList
    },
    on: {
      "select-changed": _vm.selectChanged
    }
  })], 1)], 1)], 1) : _c('div', [_c('Row', [_c('Col', {
    attrs: {
      "span": "12",
      "offset": "6"
    }
  }, [_c('select-form', {
    attrs: {
      "tips": '请选择或输入机种名称',
      "selectOption": _vm.selected_model,
      "optionList": _vm.optionList
    },
    on: {
      "select-changed": _vm.selectChanged
    }
  })], 1)], 1), _vm._v(" "), _c('Row', [_c('model-table', {
    staticStyle: {
      "margin-top": "10px"
    }
  })], 1), _vm._v(" "), _c('Row', [_c('page-table')], 1), _vm._v(" "), _c('Row', [_c('Col', {
    attrs: {
      "span": "8",
      "offset": "8"
    }
  }, [_c('model-form', {
    ref: "formRef",
    attrs: {
      "formItems": _vm.newModelForm,
      "formDataVaildate": _vm.formDataVaildate
    },
    on: {
      "on-click-submit": _vm.formSubmit
    },
    model: {
      value: (_vm.modelFormData),
      callback: function($$v) {
        _vm.modelFormData = $$v
      },
      expression: "modelFormData"
    }
  })], 1)], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-52d24952", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=0.chunk.js.map