webpackJsonp([10],{

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(620)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(595),
  /* template */
  __webpack_require__(639),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\message\\message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] message.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d8ce84dc", Component.options)
  } else {
    hotAPI.reload("data-v-d8ce84dc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 595:
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
//
//
//
//
//
//
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
    name: 'message',
    data: function data() {
        var _this = this;

        var markAsreadBtn = function markAsreadBtn(h, params) {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: function click() {
                        _this.hasreadMesList.unshift(_this.currentMesList.splice(params.index, 1)[0]);
                    }
                }
            }, '标为已读');
        };
        var deleteMesBtn = function deleteMesBtn(h, params) {
            return h('Button', {
                props: {
                    size: 'small',
                    type: 'error'
                },
                on: {
                    click: function click() {
                        _this.recyclebinList.unshift(_this.hasreadMesList.splice(params.index, 1)[0]);
                    }
                }
            }, '删除');
        };
        var restoreBtn = function restoreBtn(h, params) {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: function click() {
                        _this.hasreadMesList.unshift(_this.recyclebinList.splice(params.index, 1)[0]);
                    }
                }
            }, '还原');
        };
        return {
            currentMesList: [],
            unreadMesList: [],
            hasreadMesList: [],
            recyclebinList: [],
            currentMessageType: 'unread',
            showMesTitleList: true,
            unreadCount: 0,
            hasreadCount: 0,
            recyclebinCount: 0,
            noDataText: '暂无未读消息',
            mes: {
                title: '',
                time: '',
                content: ''
            },
            mesTitleColumns: [
            // {
            //     type: 'selection',
            //     width: 50,
            //     align: 'center'
            // },
            {
                title: ' ',
                key: 'title',
                align: 'left',
                ellipsis: true,
                render: function render(h, params) {
                    return h('a', {
                        on: {
                            click: function click() {
                                _this.showMesTitleList = false;
                                _this.mes.title = params.row.title;
                                _this.mes.time = _this.formatDate(params.row.time);
                                _this.getContent(params.index);
                            }
                        }
                    }, params.row.title);
                }
            }, {
                title: ' ',
                key: 'time',
                align: 'center',
                width: 180,
                render: function render(h, params) {
                    return h('span', [h('Icon', {
                        props: {
                            type: 'android-time',
                            size: 12
                        },
                        style: {
                            margin: '0 5px'
                        }
                    }), h('span', {
                        props: {
                            type: 'android-time',
                            size: 12
                        }
                    }, _this.formatDate(params.row.time))]);
                }
            }, {
                title: ' ',
                key: 'asread',
                align: 'center',
                width: 100,
                render: function render(h, params) {
                    if (_this.currentMessageType === 'unread') {
                        return h('div', [markAsreadBtn(h, params)]);
                    } else if (_this.currentMessageType === 'hasread') {
                        return h('div', [deleteMesBtn(h, params)]);
                    } else {
                        return h('div', [restoreBtn(h, params)]);
                    }
                }
            }]
        };
    },

    methods: {
        formatDate: function formatDate(time) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
        },
        backMesTitleList: function backMesTitleList() {
            this.showMesTitleList = true;
        },
        setCurrentMesType: function setCurrentMesType(type) {
            if (this.currentMessageType !== type) {
                this.showMesTitleList = true;
            }
            this.currentMessageType = type;
            if (type === 'unread') {
                this.noDataText = '暂无未读消息';
                this.currentMesList = this.unreadMesList;
            } else if (type === 'hasread') {
                this.noDataText = '暂无已读消息';
                this.currentMesList = this.hasreadMesList;
            } else {
                this.noDataText = '回收站无消息';
                this.currentMesList = this.recyclebinList;
            }
        },
        getContent: function getContent(index) {
            // you can write ajax request here to get message content
            var mesContent = '';
            switch (this.currentMessageType + index) {
                case 'unread0':
                    mesContent = '这是您点击的《欢迎登录iView-admin后台管理系统，来了解他的用途吧》的相关内容。';break;
                case 'unread1':
                    mesContent = '这是您点击的《使用iView-admin和iView-ui组件库快速搭建你的后台系统吧》的相关内容。';break;
                case 'unread2':
                    mesContent = '这是您点击的《喜欢iView-admin的话，欢迎到github主页给个star吧》的相关内容。';break;
                case 'hasread0':
                    mesContent = '这是您点击的《这是一条您已经读过的消息》的相关内容。';break;
                default:
                    mesContent = '这是您点击的《这是一条被删除的消息》的相关内容。';break;
            }
            this.mes.content = mesContent;
        }
    },
    mounted: function mounted() {
        this.currentMesList = this.unreadMesList = [{
            title: '欢迎登录iView-admin后台管理系统，来了解他的用途吧',
            time: 1507390106000
        }, {
            title: '使用iView-admin和iView-ui组件库快速搭建你的后台系统吧',
            time: 1507390106000
        }, {
            title: '喜欢iView-admin的话，欢迎到github主页给个star吧',
            time: 1507390106000
        }];
        this.hasreadMesList = [{
            title: '这是一条您已经读过的消息',
            time: 1507330106000
        }];
        this.recyclebinList = [{
            title: '这是一条被删除的消息',
            time: 1506390106000
        }];
        this.unreadCount = this.unreadMesList.length;
        this.hasreadCount = this.hasreadMesList.length;
        this.recyclebinCount = this.recyclebinList.length;
    },

    watch: {
        unreadMesList: function unreadMesList(arr) {
            this.unreadCount = arr.length;
        },
        hasreadMesList: function hasreadMesList(arr) {
            this.hasreadCount = arr.length;
        },
        recyclebinList: function recyclebinList(arr) {
            this.recyclebinCount = arr.length;
        }
    }
});

/***/ }),

/***/ 620:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message-main-con"
  }, [_c('div', {
    staticClass: "message-mainlist-con"
  }, [_c('div', [_c('Button', {
    attrs: {
      "size": "large",
      "long": "",
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.setCurrentMesType('unread')
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "mes-current-type-btn"
    }
  }, [_c('Icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentMessageType === 'unread'),
      expression: "currentMessageType === 'unread'"
    }],
    attrs: {
      "type": "checkmark"
    }
  })], 1), _c('span', {
    staticClass: "mes-type-btn-text"
  }, [_vm._v("未读消息")]), _c('Badge', {
    staticClass: "message-count-badge-outer",
    attrs: {
      "class-name": "message-count-badge",
      "count": _vm.unreadCount
    }
  })], 1)], 1), _vm._v(" "), _c('div', [_c('Button', {
    attrs: {
      "size": "large",
      "long": "",
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.setCurrentMesType('hasread')
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "mes-current-type-btn"
    }
  }, [_c('Icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentMessageType === 'hasread'),
      expression: "currentMessageType === 'hasread'"
    }],
    attrs: {
      "type": "checkmark"
    }
  })], 1), _c('span', {
    staticClass: "mes-type-btn-text"
  }, [_vm._v("已读消息")]), _c('Badge', {
    staticClass: "message-count-badge-outer",
    attrs: {
      "class-name": "message-count-badge",
      "count": _vm.hasreadCount
    }
  })], 1)], 1), _vm._v(" "), _c('div', [_c('Button', {
    attrs: {
      "size": "large",
      "long": "",
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.setCurrentMesType('recyclebin')
      }
    }
  }, [_c('transition', {
    attrs: {
      "name": "mes-current-type-btn"
    }
  }, [_c('Icon', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentMessageType === 'recyclebin'),
      expression: "currentMessageType === 'recyclebin'"
    }],
    attrs: {
      "type": "checkmark"
    }
  })], 1), _c('span', {
    staticClass: "mes-type-btn-text"
  }, [_vm._v("回收站")]), _c('Badge', {
    staticClass: "message-count-badge-outer",
    attrs: {
      "class-name": "message-count-badge",
      "count": _vm.recyclebinCount
    }
  })], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "message-content-con"
  }, [_c('transition', {
    attrs: {
      "name": "view-message"
    }
  }, [(_vm.showMesTitleList) ? _c('div', {
    staticClass: "message-title-list-con"
  }, [_c('Table', {
    ref: "messageList",
    attrs: {
      "columns": _vm.mesTitleColumns,
      "data": _vm.currentMesList,
      "no-data-text": _vm.noDataText
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "back-message-list"
    }
  }, [(!_vm.showMesTitleList) ? _c('div', {
    staticClass: "message-view-content-con"
  }, [_c('div', {
    staticClass: "message-content-top-bar"
  }, [_c('span', {
    staticClass: "mes-back-btn-con"
  }, [_c('Button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": _vm.backMesTitleList
    }
  }, [_c('Icon', {
    attrs: {
      "type": "chevron-left"
    }
  }), _vm._v("  返回")], 1)], 1), _vm._v(" "), _c('h3', {
    staticClass: "mes-title"
  }, [_vm._v(_vm._s(_vm.mes.title))])]), _vm._v(" "), _c('p', {
    staticClass: "mes-time-con"
  }, [_c('Icon', {
    attrs: {
      "type": "android-time"
    }
  }), _vm._v("  " + _vm._s(_vm.mes.time))], 1), _vm._v(" "), _c('div', {
    staticClass: "message-content-body"
  }, [_c('p', {
    staticClass: "message-content"
  }, [_vm._v(_vm._s(_vm.mes.content))])])]) : _vm._e()])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d8ce84dc", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=10.chunk.js.map