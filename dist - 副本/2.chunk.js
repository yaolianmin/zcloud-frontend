webpackJsonp([2],{

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(589),
  /* template */
  __webpack_require__(630),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\device\\dev_register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dev_register.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d3f4939", Component.options)
  } else {
    hotAPI.reload("data-v-5d3f4939", Component.options)
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

/***/ 589:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_util_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__libs_validate_js__ = __webpack_require__(603);
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
        modelForm: __WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue___default.a
    },
    data: function data() {
        var validateDatetime = function validateDatetime(rule, value, callback) {
            if (value[0] === '' && value[1] === '') {
                callback(new Error('Please select start time and end time'));
            } else if (value[0] === '' && value[1] !== '') {
                callback(new Error('Please select start time'));
            } else if (value[1] === '' && value[0] !== '') {
                callback(new Error('Please select end time'));
            } else if (value[0] !== '' && value[1] !== '') {
                if (value[0] > value[1]) {
                    callback(new Error('The end time is before the start time!'));
                } else if (value[0] < value[1]) {
                    callback();
                } else {
                    callback(new Error('The start time is equal end time,please select end time again!'));
                }
            } else {
                callback();
            }
        };
        return {
            newModelForm: __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__["a" /* default */],
            modelFormData: {},
            show: false,
            formDataVaildate: {
                mac_addr: [{ required: true, validator: __WEBPACK_IMPORTED_MODULE_7__libs_validate_js__["a" /* default */].validateMac, trigger: 'blur' }],
                user_name: [{ required: true, message: 'Please select the manager', trigger: 'change' }],
                service_time: [{ required: true, validator: validateDatetime, trigger: 'blur' }],
                dev_info1: [{ required: true, message: 'Please enter a personal info1', trigger: 'blur' }],
                dev_info2: [{ required: true, message: 'Please enter a personal info2', trigger: 'blur' }]
            },
            baseuri: '/devlists/'
        };
    },

    methods: {
        //初始表单数据
        initFormData: function initFormData() {
            var _this = this;

            __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__["a" /* default */].forEach(function (item, index) {
                _this.$set(_this.modelFormData, item.key, __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__["a" /* default */][index].value);
            });
        },
        //初始表单校验规则
        initFormDataVaildate: function initFormDataVaildate() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__["a" /* default */].forEach(function (item) {
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
            //util.test.post('posts', formData);
            if (vaild) {
                this.emitForm(formData);
                this.$Message.success('Success !');
            } else {
                this.$Message.error('Failed !');
            }
        },
        emitForm: function emitForm(formData) {
            console.log(formData);
            //util.test.post('posts', formData);
            //util.ajax.request('post', '//jsonplaceholder.typicode.com/posts/', {}, registerData, this.response_callback, this.exception_callback);
            __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].ajax.request('post', this.baseuri, {}, formData, this.response_callback, this.exception_callback);
        },

        //ajax请求返回值处理
        response_callback: function response_callback(res) {},

        //ajax请求错误异常处理
        exception_callback: function exception_callback(err) {
            console.log(err);
        },

        //筛选条件发生变化
        selectChanged: function selectChanged(event) {
            this.selected_model = event;
        }
    },
    created: function created() {
        this.newModelForm = __WEBPACK_IMPORTED_MODULE_5__register_newdev_js__["a" /* default */];
        this.initFormData();
        //this.initFormDataVaildate();
    }
});

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//本文件主要内容为本网站数据校验函数集合
var validate = {};

//检测MAC地址有效性
validate.validateMac = function (rule, value, callback) {
    if (value === '') {
        callback(new Error('The  mac_addr cannot be empty'));
    } else {
        var temp = /[A-Fa-f0-9][02468aceACE]:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
        if (!temp.test(value)) {
            callback(new Error('输入的mac地址格式不正确，请以xx:xx:xx:xx:xx:xx的形式输入（xx为16进制数字,首字节必须为偶数）!'));
        }
        callback();
    }
};

/* harmony default export */ __webpack_exports__["a"] = (validate);

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var newModel = [{
    type: 'Input',
    key: 'mac_addr',
    value: '',
    label: 'MAC地址'
}, {
    type: 'Upload',
    key: 'mac_list',
    value: '',
    label: 'MACLIST'
}, {
    type: 'Select',
    key: 'user_name', //数据库字段名称
    options: [{
        label: 'ZN-7100-2DHO',
        value: '1022'
    }, {
        label: 'AC-1027L',
        value: '1027'
    }, {
        label: 'XN-1033',
        value: '1033'
    }],
    value: '', //选中值
    label: '组管理员'
}, {
    type: 'DatePicker',
    key: 'service_time',
    subtype: 'datetimerange',
    value: '',
    label: '服务期限'
}, {
    type: 'Input',
    key: 'dev_info1',
    value: '',
    label: '备注1'
}, {
    type: 'Input',
    key: 'dev_info2',
    value: '',
    label: '备注2'
}];

/* harmony default export */ __webpack_exports__["a"] = (newModel);

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Row', [_c('Col', {
    attrs: {
      "span": "8",
      "offset": "0"
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
  })], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5d3f4939", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=2.chunk.js.map