webpackJsonp([1],{

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(586),
  /* template */
  __webpack_require__(623),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\config\\create_model.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] create_model.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20f2d834", Component.options)
  } else {
    hotAPI.reload("data-v-20f2d834", Component.options)
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

/***/ 586:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__create_model_js__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__libs_util_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_js__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dev_manage_th_js__ = __webpack_require__(606);
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
//
//
//
//
//
//
//
//
//








//import parser from '../../libs/parser.js';




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        modelTable: __WEBPACK_IMPORTED_MODULE_0__common_table_table_list_vue___default.a,
        searchForm: __WEBPACK_IMPORTED_MODULE_1__common_search_input_search_vue___default.a,
        selectForm: __WEBPACK_IMPORTED_MODULE_2__common_form_select_form_vue___default.a,
        pageTable: __WEBPACK_IMPORTED_MODULE_3__common_pagination_page_table_vue___default.a,
        modelForm: __WEBPACK_IMPORTED_MODULE_4__common_form_best_form_vue___default.a
    },
    data: function data() {
        var _this = this;

        var validateFileinput = function validateFileinput(rule, value, callback) {

            if (value === '') {
                callback(new Error('Please upload template file!'));
            } else if (value != '') {
                callback();
            }
        };
        var validateModelname = function validateModelname(rule, value, callback) {
            if (value === '') {
                callback(new Error('Please enter model name!'));
            } else if (value != '') {
                for (var i = 0; i < _this.optionList.length; i++) {
                    if (value === _this.optionList[i].value) {
                        callback(new Error('This model name is exist!'));
                    }
                }
                callback();
            }
        };
        return {
            tableData: [],
            tableDatas: [],
            tableColumns: [],
            tableLoading: false,
            totalsize: 0,
            page_size: 10,

            newModelForm: __WEBPACK_IMPORTED_MODULE_5__create_model_js__["a" /* default */],
            modelFormData: {},
            selected_model: '',
            add_model_button: '',
            show: false,
            formDataVaildate: {
                model_name: [{ required: true, validator: validateModelname, trigger: 'change' }],
                basic_platform: [{ required: true, message: 'Please enter basic platform name!', trigger: 'blur' }],
                brand: [{ required: true, message: 'Please enter brand name!', trigger: 'blur' }]
                // template: [
                //     { required: true, validator:validateFileinput, trigger: 'blur' }
                // ]
            },
            optionList: [],
            baseuri: '/devmanagements/'
        };
    },

    methods: {
        //初始表单数据
        initFormData: function initFormData() {
            var _this2 = this;

            __WEBPACK_IMPORTED_MODULE_5__create_model_js__["a" /* default */].forEach(function (item, index) {
                _this2.$set(_this2.modelFormData, item.key, __WEBPACK_IMPORTED_MODULE_5__create_model_js__["a" /* default */][index].value);
            });
        },
        //初始表单校验规则
        initFormDataVaildate: function initFormDataVaildate() {
            var _this3 = this;

            __WEBPACK_IMPORTED_MODULE_5__create_model_js__["a" /* default */].forEach(function (item) {
                _this3.modelFormData[item.key] = '';
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
            //console.log(formDataObject.uploadFileName);
            //util.test.post('posts', formData);
            var forddata = JSON.parse(JSON.stringify(formDataObject));
            console.log(forddata);
            __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].ajax.request('post', 'http://192.168.70.167/model-test/add_newmodel', {}, forddata, function (res) {
                console.log('hello world');
            }, this.exception_callback);
            if (vaild) this.$Message.success('Success !');else this.$Message.error('Failed !');
        },
        //筛选条件发生变化
        selectChanged: function selectChanged(event) {
            this.selected_model = event;
            this.get_tabledata(this.selected_model);
        },
        //点击 + 出现添加机种的页面
        change_addbutton_status: function change_addbutton_status(msg) {
            if (this.add_model_button) {
                this.add_model_button = '';
            } else {
                this.add_model_button = msg;
            }

            //console.log('hello world');
        },
        //获取tabledata
        get_tabledata: function get_tabledata(val) {
            for (var i = 0; i < this.tableDatas.length; i++) {
                if (this.tableDatas[i].model_name == val) {
                    var devinfo = new Array(1);
                    devinfo[0] = this.tableDatas[i];
                    this.tableData = devinfo;
                }
            }
        },

        //table内容更新
        row_change: function row_change(row_data, index) {
            var _this4 = this;

            var uri = this.baseuri + row_data[index].model_name;
            this.tableLoading = true;
            var params = {
                limit: this.page_size
            };
            __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].ajax.request('patch', uri, params, row_data[index], function (res) {
                _this4.tableLoading = false;
            }, this.exception_callback);
        },

        //table数据被删除
        row_delete: function row_delete(del_data) {
            var _this5 = this;

            //console.log(del_data);
            var uri = this.baseuri;
            this.tableLoading = true;
            var params = {
                limit: this.page_size
            };
            __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].ajax.request('delete', uri, params, {}, function (res) {
                _this5.tableLoading = false;
            }, this.exception_callback);
        },

        //ajax请求返回值处理
        response_callback: function response_callback(res) {
            this.tableLoading = false;
            //this.tableData = res.data.body;
            this.tableDatas = res.data.body;

            this.totalsize = res.data.count;
            this.get_model_name_list(res.data.body);
        },

        //ajax请求错误异常处理
        exception_callback: function exception_callback(err) {
            console.log(err);
        },

        //获取model_name_list
        get_model_name_list: function get_model_name_list(val) {
            //console.log(JSON.stringify(val));
            var model_name_list = new Array(val.length);
            for (var i = 0; i < val.length; i++) {
                model_name_list[i] = {};
                model_name_list[i].label = val[i].model_name;
                model_name_list[i].value = val[i].model_name;
            }
            this.optionList = model_name_list;
        }
    },
    created: function created() {
        this.newModelForm = __WEBPACK_IMPORTED_MODULE_5__create_model_js__["a" /* default */];
        this.initFormData();

        var params = {
            limit: this.page_size
        };
        //this.tableData =
        this.tableColumns = __WEBPACK_IMPORTED_MODULE_8__dev_manage_th_js__["a" /* default */].dev_manage_list_col_th;
        this.add_model_button = __WEBPACK_IMPORTED_MODULE_8__dev_manage_th_js__["a" /* default */].this_test;
        console.log("11111111");
        console.log(__WEBPACK_IMPORTED_MODULE_8__dev_manage_th_js__["a" /* default */].this_test);

        this.tableLoading = true;
        __WEBPACK_IMPORTED_MODULE_6__libs_util_js__["a" /* default */].ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        //这里的ajax请求后台的读出所有机种的信息
        //parser.viewJson(viewData);
        //this.initFormDataVaildate();
        // this.optionList=[
        //         {
        //             label: 'ZN-7100-2DHO',
        //             value: '1022'
        //         },
        //         {
        //             label: 'AC-1027L',
        //             value: '1027'
        //         },
        //         {
        //             label: 'XN-1033',
        //             value: '1033'
        //         }
        //     ];
    }
});

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var data = {
  "setting": {
    "-devname": "XN-1022",
    "-devtype": "AP",
    "-cardnum": "2",
    "-vapnum": "8",
    "setting": [{
      "-name": "Wireless Settings",
      "setting": [{
        "-name": "RadioEnable",
        "-lable": "Enable Radio",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Yes"
        }, {
          "-value": "1",
          "-lable": "No"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "CountryCode",
        "-lable": "Country/Region",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "8",
          "-lable": "Albania"
        }, {
          "-value": "32",
          "-lable": "Argentina"
        }, {
          "-value": "51",
          "-lable": "Armenia"
        }, {
          "-value": "36",
          "-lable": "Australia"
        }, {
          "-value": "40",
          "-lable": "Austria"
        }, {
          "-value": "31",
          "-lable": "Azerbaijan"
        }, {
          "-value": "48",
          "-lable": "Bahrain"
        }, {
          "-value": "56",
          "-lable": "Belgium"
        }, {
          "-value": "70",
          "-lable": "Bosnia and Herzegovina"
        }, {
          "-value": "76",
          "-lable": "Brazil"
        }, {
          "-value": "96",
          "-lable": "Brunei Darussalam"
        }, {
          "-value": "100",
          "-lable": "Bulgaria"
        }, {
          "-value": "124",
          "-lable": "Canada"
        }, {
          "-value": "156",
          "-lable": "China"
        }, {
          "-value": "191",
          "-lable": "Croatia"
        }, {
          "-value": "196",
          "-lable": "Cyprus"
        }, {
          "-value": "203",
          "-lable": "Czech Republic"
        }, {
          "-value": "208",
          "-lable": "Denmark"
        }, {
          "-value": "818",
          "-lable": "Egypt"
        }, {
          "-value": "233",
          "-lable": "Estonia"
        }, {
          "-value": "900",
          "-lable": "European Union"
        }, {
          "-value": "246",
          "-lable": "Finland"
        }, {
          "-value": "250",
          "-lable": "France"
        }, {
          "-value": "276",
          "-lable": "Germany"
        }, {
          "-value": "300",
          "-lable": "Greece"
        }, {
          "-value": "344",
          "-lable": "Hong Kong"
        }, {
          "-value": "348",
          "-lable": "Hungary"
        }, {
          "-value": "352",
          "-lable": "Iceland"
        }, {
          "-value": "356",
          "-lable": "India"
        }, {
          "-value": "360",
          "-lable": "Indonesia"
        }, {
          "-value": "364",
          "-lable": "Iran"
        }, {
          "-value": "372",
          "-lable": "Ireland"
        }, {
          "-value": "376",
          "-lable": "Israel"
        }, {
          "-value": "380",
          "-lable": "Italy"
        }, {
          "-value": "388",
          "-lable": "Jamaica"
        }, {
          "-value": "392",
          "-lable": "Japan"
        }, {
          "-value": "400",
          "-lable": "Jordan"
        }, {
          "-value": "404",
          "-lable": "Kenya"
        }, {
          "-value": "410",
          "-lable": "Korea Republic"
        }, {
          "-value": "414",
          "-lable": "Kuwait"
        }, {
          "-value": "428",
          "-lable": "Latvia"
        }, {
          "-value": "422",
          "-lable": "Lebanon"
        }, {
          "-value": "438",
          "-lable": "Liechtenstein"
        }, {
          "-value": "440",
          "-lable": "Lithuania"
        }, {
          "-value": "442",
          "-lable": "Luxembourg"
        }, {
          "-value": "807",
          "-lable": "Macedonia"
        }, {
          "-value": "458",
          "-lable": "Malaysia"
        }, {
          "-value": "470",
          "-lable": "Malta"
        }, {
          "-value": "492",
          "-lable": "Monaco"
        }, {
          "-value": "504",
          "-lable": "Morocco"
        }, {
          "-value": "524",
          "-lable": "Nepal"
        }, {
          "-value": "528",
          "-lable": "Netherlands"
        }, {
          "-value": "554",
          "-lable": "New Zealand"
        }, {
          "-value": "558",
          "-lable": "Nicaragua"
        }, {
          "-value": "578",
          "-lable": "Norway"
        }, {
          "-value": "512",
          "-lable": "Oman"
        }, {
          "-value": "586",
          "-lable": "Pakistan"
        }, {
          "-value": "616",
          "-lable": "Poland"
        }, {
          "-value": "620",
          "-lable": "Portugal"
        }, {
          "-value": "630",
          "-lable": "Puerto Rico"
        }, {
          "-value": "634",
          "-lable": "Qatar"
        }, {
          "-value": "642",
          "-lable": "Romania"
        }, {
          "-value": "643",
          "-lable": "Russia"
        }, {
          "-value": "682",
          "-lable": "Saudi Arabia"
        }, {
          "-value": "891",
          "-lable": "Serbia and Montenegro"
        }, {
          "-value": "702",
          "-lable": "Singapore"
        }, {
          "-value": "703",
          "-lable": "Slovakia"
        }, {
          "-value": "705",
          "-lable": "Slovenia"
        }, {
          "-value": "710",
          "-lable": "South Africa"
        }, {
          "-value": "724",
          "-lable": "Spain"
        }, {
          "-value": "752",
          "-lable": "Sweden"
        }, {
          "-value": "756",
          "-lable": "Switzerland"
        }, {
          "-value": "158",
          "-lable": "Taiwan"
        }, {
          "-value": "764",
          "-lable": "Thailand"
        }, {
          "-value": "780",
          "-lable": "Trinidad and Tobago"
        }, {
          "-value": "788",
          "-lable": "Tunisia"
        }, {
          "-value": "792",
          "-lable": "Turkey"
        }, {
          "-value": "804",
          "-lable": "Ukraine"
        }, {
          "-value": "784",
          "-lable": "European Union"
        }, {
          "-value": "826",
          "-lable": "United Kingdom"
        }, {
          "-value": "840",
          "-lable": "United States"
        }, {
          "-value": "862",
          "-lable": "Venezuela"
        }, {
          "-value": "716",
          "-lable": "Zimbabwe"
        }],
        "val": [{
          "-value": "156",
          "-hidden": "false"
        }, {
          "-value": "156",
          "-hidden": "false"
        }]
      }, {
        "-name": "OperationMode",
        "-lable": "Operation Mode",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "AP Mode"
        }, {
          "-value": "2",
          "-lable": "Bridge Mode"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "WirelessMode",
        "-lable": "Wireless Mode",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "option-index",
        "rule": [{ "-option-index": "1,7" }, { "-option-index": "2,6" }],
        "options": [{
          "-value": "0",
          "-lable": "Auto (802.11b/g)"
        }, {
          "-value": "1",
          "-lable": "802.11a only"
        }, {
          "-value": "2",
          "-lable": "802.11b only"
        }, {
          "-value": "3",
          "-lable": "802.11g only"
        }, {
          "-value": "4",
          "-lable": "802.11n only"
        }, {
          "-value": "5",
          "-lable": "802.11a/n"
        }, {
          "-value": "6",
          "-lable": "802.11b/g/n"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "5",
          "-hidden": "false"
        }]
      }, {
        "-name": "Channel",
        "-lable": "Channel/Frequency",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "option-index",
        "rule": [{ "-option-index": "1~13" }, { "-option-index": "14~18" }],
        "options": [{
          "-value": "1",
          "-lable": "1 / 2.412GHz"
        }, {
          "-value": "2",
          "-lable": "2 / 2.417GHz"
        }, {
          "-value": "3",
          "-lable": "3 / 2.422GHz"
        }, {
          "-value": "4",
          "-lable": "4 / 2.427GHz"
        }, {
          "-value": "5",
          "-lable": "5 / 2.432GHz"
        }, {
          "-value": "6",
          "-lable": "6 / 2.437GHz"
        }, {
          "-value": "7",
          "-lable": "7 / 2.442GHz"
        }, {
          "-value": "8",
          "-lable": "8 / 2.447GHz"
        }, {
          "-value": "9",
          "-lable": "9 / 2.452GHz"
        }, {
          "-value": "10",
          "-lable": "10 / 2.457GHz"
        }, {
          "-value": "11",
          "-lable": "11 / 2.462GHz"
        }, {
          "-value": "12",
          "-lable": "12 / 2.467GHz"
        }, {
          "-value": "13",
          "-lable": "13 / 2.472GHzn"
        }, {
          "-value": "149",
          "-lable": "149 (5745MHz)"
        }, {
          "-value": "153",
          "-lable": "153 (5765MHz)"
        }, {
          "-value": "157",
          "-lable": "157 (5785MHz)"
        }, {
          "-value": "161",
          "-lable": "161 (5805MHz)"
        }, {
          "-value": "165",
          "-lable": "165 (5825MHz)"
        }],
        "val": [{
          "-value": "6",
          "-hidden": "false"
        }, {
          "-value": "149",
          "-hidden": "false"
        }]
      }, {
        "-name": "TransmitRate",
        "-lable": "Data Rate",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "option-index",
        "rule": [{ "-option-index": "1~13" }, { "-option-index": "1,6~29" }],
        "options": [{
          "-value": "255",
          "-lable": "Auto"
        }, {
          "-value": "27",
          "-lable": "1M"
        }, {
          "-value": "26",
          "-lable": "2M"
        }, {
          "-value": "25",
          "-lable": "5.5M"
        }, {
          "-value": "24",
          "-lable": "11M"
        }, {
          "-value": "11",
          "-lable": "6M"
        }, {
          "-value": "15",
          "-lable": "9M"
        }, {
          "-value": "10",
          "-lable": "12M"
        }, {
          "-value": "14",
          "-lable": "18M"
        }, {
          "-value": "9",
          "-lable": "24M"
        }, {
          "-value": "13",
          "-lable": "36M"
        }, {
          "-value": "8",
          "-lable": "48M"
        }, {
          "-value": "12",
          "-lable": "54M"
        }, {
          "-value": "128",
          "-lable": "MCS0-7.2[15]"
        }, {
          "-value": "129",
          "-lable": "MCS1-14.4[30]"
        }, {
          "-value": "130",
          "-lable": "MCS2-21.7[45]"
        }, {
          "-value": "131",
          "-lable": "MCS3-28.9[60]"
        }, {
          "-value": "132",
          "-lable": "MCS4-43.3[90]"
        }, {
          "-value": "133",
          "-lable": "MCS5-57.8[120]"
        }, {
          "-value": "134",
          "-lable": "MCS6-65[135]"
        }, {
          "-value": "135",
          "-lable": "MCS7-72.2[150]"
        }, {
          "-value": "136",
          "-lable": "MCS8-14.4[30]"
        }, {
          "-value": "137",
          "-lable": "MCS9-28.9[60]"
        }, {
          "-value": "138",
          "-lable": "MCS10-43.3[90]"
        }, {
          "-value": "139",
          "-lable": "MCS11-57.8[120]"
        }, {
          "-value": "140",
          "-lable": "MCS12-86.7[180]"
        }, {
          "-value": "141",
          "-lable": "MCS13-115.6[240]"
        }, {
          "-value": "142",
          "-lable": "MCS14-130[270]"
        }, {
          "-value": "143",
          "-lable": "MCS15-144.4[300]"
        }],
        "val": [{
          "-value": "255",
          "-hidden": "false"
        }, {
          "-value": "255",
          "-hidden": "false"
        }]
      }, {
        "-name": "RTSThreshold",
        "-lable": "RTS Threshold (1-2346)",
        "-tag-type": "Input",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "1-2346" }, { "-input-ranges": "1-2346" }],
        "val": [{
          "-value": "2346",
          "-hidden": "false"
        }, {
          "-value": "2346",
          "-hidden": "false"
        }]
      }, {
        "-name": "FragmentThreshold",
        "-lable": "Fragmentation Threshold (256-2346)",
        "-tag-type": "Input",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "256-2346" }, { "-input-ranges": "256-2346" }],
        "val": [{
          "-value": "2346",
          "-hidden": "false"
        }, {
          "-value": "2346",
          "-hidden": "true"
        }]
      }, {
        "-name": "BeaconInterval",
        "-lable": "Beacon Interval (20-1000)",
        "-tag-type": "Input",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "20-1000" }, { "-input-ranges": "20-1000" }],
        "val": [{
          "-value": "100",
          "-hidden": "false"
        }, {
          "-value": "100",
          "-hidden": "false"
        }]
      }, {
        "-name": "DTIMInterval",
        "-lable": "DTIM Interval (1-255)",
        "-tag-type": "Input",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "1-255" }, { "-input-ranges": "1-255" }],
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "Preamble",
        "-lable": "Preamble Type",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Long"
        }, {
          "-value": "1",
          "-lable": "Auto"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "ChannelMode",
        "-lable": "Channel Mode",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "20 MHz"
        }, {
          "-value": "1",
          "-lable": "20/40 MHz"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "true"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "ShortGIenable",
        "-lable": "Short GI",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "No"
        }, {
          "-value": "1",
          "-lable": "Yes"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "true"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "AMPDUenable",
        "-lable": "AMPDU",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "No"
        }, {
          "-value": "1",
          "-lable": "Yes"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "true"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "AMSDUenable",
        "-lable": "AMSDU",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "No"
        }, {
          "-value": "1",
          "-lable": "Yes"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "true"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "HTprotect",
        "-lable": "AMSDU",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "No"
        }, {
          "-value": "1",
          "-lable": "Yes"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "true"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "ChannelProtect",
        "-lable": "Channel Protection",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "options": [{
          "-value": "0",
          "-lable": "No Protection"
        }, {
          "-value": "1",
          "-lable": "CTS to Self"
        }, {
          "-value": "2",
          "-lable": "RTS-CTS"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "true"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }]
    }, {
      "-name": "VAP Profiles",
      "setting": [{
        "-name": "ProfileName",
        "-lable": "Security Profile Name",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "hex",
        "-rules": "none",
        "val": [{
          "-value": "Profile1",
          "-hidden": "false"
        }, {
          "-value": "Profile2",
          "-hidden": "false"
        }, {
          "-value": "Profile3",
          "-hidden": "false"
        }, {
          "-value": "Profile4",
          "-hidden": "false"
        }, {
          "-value": "Profile5",
          "-hidden": "false"
        }, {
          "-value": "Profile6",
          "-hidden": "false"
        }, {
          "-value": "Profile7",
          "-hidden": "false"
        }, {
          "-value": "Profile8",
          "-hidden": "false"
        }, {
          "-value": "Profile1",
          "-hidden": "false"
        }, {
          "-value": "Profile2",
          "-hidden": "false"
        }, {
          "-value": "Profile3",
          "-hidden": "false"
        }, {
          "-value": "Profile4",
          "-hidden": "false"
        }, {
          "-value": "Profile5",
          "-hidden": "false"
        }, {
          "-value": "Profile6",
          "-hidden": "false"
        }, {
          "-value": "Profile7",
          "-hidden": "false"
        }, {
          "-value": "Profile8",
          "-hidden": "false"
        }]
      }, {
        "-name": "VAPEnable",
        "-lable": "Enable",
        "-tag-type": "Checkbox",
        "-value-type": "integer",
        "-actual-type": "hex",
        "-rules": "none",
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "SSID",
        "-lable": "Wireless Network Name (SSID)",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "hex",
        "-rules": "none",
        "val": [{
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }, {
          "-value": "Wireless",
          "-hidden": "false"
        }]
      }, {
        "-name": "SSIDBroadcast",
        "-lable": "Broadcast Wireless Network Name (SSID)",
        "-tag-type": "group-Radio",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Yes"
        }, {
          "-value": "1",
          "-lable": "No"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "WMM",
        "-lable": "WMM Support",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Disabled"
        }, {
          "-value": "1",
          "-lable": "Enable"
        }],
        "val": [{
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }, {
          "-value": "1",
          "-hidden": "false"
        }]
      }, {
        "-name": "VapMaxStation",
        "-lable": "VAP Max Station Number(1-256)",
        "-tag-type": "Input",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "1-256" }, { "-input-ranges": "1-256" }],
        "val": [{
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }, {
          "-value": "25",
          "-hidden": "false"
        }]
      }, {
        "-name": "Authentication",
        "-lable": "Network Authentication",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "None"
        }, {
          "-value": "1",
          "-lable": "WEP"
        }, {
          "-value": "2",
          "-lable": "Legacy 802.1X"
        }, {
          "-value": "4",
          "-lable": "WPA with Radius"
        }, {
          "-value": "8",
          "-lable": "WPA2 with Radius"
        }, {
          "-value": "12",
          "-lable": "(WPA+WPA2) with Radius"
        }, {
          "-value": "16",
          "-lable": "WPA-PSK"
        }, {
          "-value": "32",
          "-lable": "WPA2-PSK"
        }, {
          "-value": "48",
          "-lable": "(WPA+WPA2)-PSK"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "Encryption",
        "-lable": "Data Encryption",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "none"
        }, {
          "-value": "1",
          "-lable": "wep"
        }, {
          "-value": "2",
          "-lable": "tkip"
        }, {
          "-value": "4",
          "-lable": "aes"
        }, {
          "-value": "6",
          "-lable": "aes+tkip"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "WepKeyType",
        "-lable": "Data Encryption",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "40",
          "-lable": "64hex"
        }, {
          "-value": "104",
          "-lable": "128hex"
        }, {
          "-value": "128",
          "-lable": "152hex"
        }],
        "val": [{
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }, {
          "-value": "40",
          "-hidden": "false"
        }]
      }, {
        "-name": "WepPassPhrase",
        "-lable": "Data Encryption",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WepKey1",
        "-lable": "Key 1",
        "-tag-type": "radio-Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WepKey2",
        "-lable": "Key 2",
        "-tag-type": "radio-Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WepKey3",
        "-lable": "Key 3",
        "-tag-type": "radio-Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WepKey4",
        "-lable": "Key 4",
        "-tag-type": "radio-Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WpaPSK",
        "-lable": "WPA Passphrase (Network Key)",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "none",
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "WirelessIsolation",
        "-lable": "Wireless Client Security Separation",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Disable"
        }, {
          "-value": "1",
          "-lable": "Unicast"
        }, {
          "-value": "4",
          "-lable": "Multicast"
        }, {
          "-value": "2",
          "-lable": "Broadcast"
        }, {
          "-value": "3",
          "-lable": "Unicast+Broadcast"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "bMonitorTestEnable",
        "-lable": " Enable Monitor Test ",
        "-tag-type": "Select",
        "-value-type": "integer",
        "-actual-type": "integer",
        "-rules": "none",
        "options": [{
          "-value": "0",
          "-lable": "Disabled"
        }, {
          "-value": "1",
          "-lable": "Enable"
        }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }, {
        "-name": "szMonitorTestUrl",
        "-lable": "Monitor Test URL",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "1-256" }, { "-input-ranges": "1-256" }],
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "ulMonitorTestHour",
        "-lable": "Monitor Test URL",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "0-23" }, { "-input-ranges": "0-23" }],
        "val": [{ "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }, { "-hidden": "false" }]
      }, {
        "-name": "ulMonitorTestHour",
        "-lable": "Monitor Test URL",
        "-tag-type": "Input",
        "-value-type": "string",
        "-actual-type": "string",
        "-rules": "input-ranges",
        "rule": [{ "-input-ranges": "1-59" }, { "-input-ranges": "1-59" }],
        "val": [{
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }, {
          "-value": "0",
          "-hidden": "false"
        }]
      }]
    }]
  }
};
/* unused harmony default export */ var _unused_webpack_default_export = (data);

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var dev_manage_list_col_th = [{
    type: 'index',
    title: '#',
    key: 'index',
    align: 'center'
}, {
    title: '机种名称',
    key: 'model_name',
    editable: true,
    align: 'center'
}, {
    title: '基础平台',
    key: 'basic_platform',
    editable: true,
    align: 'center'
}, {
    title: '品牌',
    key: 'brand',
    editable: true,
    align: 'center'
}, {
    title: '操作',
    key: 'handle',
    renderHeader: function renderHeader(h, params) {
        return h('div', [h('strong', '操作'), h('Button', {
            props: {
                type: 'text',
                //size: 'large',
                icon: 'plus'
            },
            on: {
                click: function click(event) {
                    //vm.$parent.$emit('change_button_status','true');
                    //dev_manage_list.this_node.$parent.$parent.$emit('add-click', event);
                    dev_manage_list.this_test = '1111';
                    console.log(dev_manage_list.this_test);
                    console.log("22222222222");
                    //dev_manage_list.this_node.$children[1].$el.$emit('change_button_status','true');
                }
            }
        })]);
    },
    // if (item.render_header){
    //                  item.renderHeader = (h, param) => {
    //                      return h('div', [
    //                                 h('strong', '操作'),
    //                                 h('Button', {
    //                                     props: {
    //                                         type: 'text',
    //                                         size: 'large',
    //                                         icon: 'plus'
    //                                     },
    //                                     on: {
    //                                         click: () => {
    //                                             this.$emit('change_button_status','true');
    //                                         }
    //                                     }
    //                                 })
    //                      ]);
    //                  }
    //             }
    //render_header:['button'],
    width: '200px',
    align: 'center',
    handle: ['edit', 'delete']
}];

var dev_manage_list = {};
//var this_node = {};
/* harmony default export */ __webpack_exports__["a"] = (dev_manage_list = {
    dev_manage_list_col_th: dev_manage_list_col_th,
    this_test: '',
    this_node: {}
});

/***/ }),

/***/ 623:
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
  })], 1)], 1), _vm._v(" "), _c('Row', {
    on: {
      "change_button_status": _vm.change_addbutton_status
    },
    model: {
      value: (_vm.add_model_button),
      callback: function($$v) {
        _vm.add_model_button = $$v
      },
      expression: "add_model_button"
    }
  }, [_c('model-table', {
    staticStyle: {
      "margin-top": "10px"
    },
    attrs: {
      "columnsList": _vm.tableColumns,
      "isLoading": _vm.tableLoading
    },
    on: {
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
  })], 1), _vm._v(" "), (_vm.add_model_button != '') ? _c('Row', {
    staticStyle: {
      "margin-top": "5%"
    }
  }, [_c('Col', {
    attrs: {
      "span": "8",
      "offset": "7"
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
  })], 1)], 1) : _vm._e()], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-20f2d834", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=1.chunk.js.map