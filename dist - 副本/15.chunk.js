webpackJsonp([15],{

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(599),
  /* template */
  __webpack_require__(634),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\task\\task_edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] task_edit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b084237", Component.options)
  } else {
    hotAPI.reload("data-v-6b084237", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            switch1: false
        };
    },

    methods: {
        change: function change(status) {
            this.$Message.info('开关状态：' + status);
        }
    }
});

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i-switch', {
    on: {
      "on-change": _vm.change
    },
    model: {
      value: (_vm.switch1),
      callback: function($$v) {
        _vm.switch1 = $$v
      },
      expression: "switch1"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6b084237", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=15.chunk.js.map