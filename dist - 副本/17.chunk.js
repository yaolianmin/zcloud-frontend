webpackJsonp([17],{

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(593),
  /* template */
  __webpack_require__(633),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\home\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64c82be2", Component.options)
  } else {
    hotAPI.reload("data-v-64c82be2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_echarts__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

console.debug('home page...');

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },
    mounted: function mounted() {
        this.drawLine('cpuChart');
        this.drawLine('memChart');
        this.drawLine('devChart');
        this.drawLine('clientChart');
    },

    methods: {
        drawLine: function drawLine(id) {
            var myChart = __WEBPACK_IMPORTED_MODULE_0_echarts___default.a.init(document.getElementById(id));
            myChart.setOption({
                title: {
                    text: 'CPU使用率',
                    subtext: 'demo',
                    x: 'center'
                },
                tooltip: {},
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['已使用', '未使用']
                },
                series: [{
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{ value: 6, name: '已使用' }, { value: 4, name: '未使用' }],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    }
                }]
            });
        }
    }
});

/***/ }),

/***/ 633:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout-content-main"
  }, [_c('Row', {
    staticStyle: {
      "background": "#eee",
      "padding": "20px"
    }
  }, [_c('Col', {
    attrs: {
      "span": "11"
    }
  }, [_c('Card', {
    attrs: {
      "bordered": false
    }
  }, [_c('p', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("System Information")]), _vm._v(" "), _c('p', [_vm._v("系统版本号:")]), _vm._v(" "), _c('p', [_vm._v("系统运行时长:")]), _vm._v(" "), _c('p', [_vm._v("系统时间:")])])], 1), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "11",
      "offset": "2"
    }
  }, [_c('Card', {
    attrs: {
      "shadow": ""
    }
  }, [_c('p', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("Device Information")]), _vm._v(" "), _c('p', [_vm._v("在线:")]), _vm._v(" "), _c('p', [_vm._v("离线:")]), _vm._v(" "), _c('p', [_vm._v("客户端:")])])], 1)], 1), _vm._v(" "), _c('Row', [_c('Col', {
    attrs: {
      "span": "11"
    }
  }, [_c('div', {
    staticStyle: {
      "height": "400px",
      "width": "500px"
    },
    attrs: {
      "id": "cpuChart"
    }
  })]), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "11",
      "offset": "2"
    }
  }, [_c('div', {
    staticStyle: {
      "height": "400px",
      "width": "500px"
    },
    attrs: {
      "id": "memChart"
    }
  })])], 1), _vm._v(" "), _c('Row', [_c('Col', {
    attrs: {
      "span": "11"
    }
  }, [_c('div', {
    staticStyle: {
      "height": "400px",
      "width": "500px"
    },
    attrs: {
      "id": "devChart"
    }
  })]), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "11",
      "offset": "2"
    }
  }, [_c('div', {
    staticStyle: {
      "height": "400px",
      "width": "500px"
    },
    attrs: {
      "id": "clientChart"
    }
  })])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-64c82be2", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=17.chunk.js.map