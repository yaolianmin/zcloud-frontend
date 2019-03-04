webpackJsonp([16],{

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(597),
  /* template */
  __webpack_require__(626),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\system\\sys_log.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sys_log.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-306884af", Component.options)
  } else {
    hotAPI.reload("data-v-306884af", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

//import add from '../common/content/add.vue';
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            //v1:'',
            //v2:''
        };
    },

    /*components:{
        add
    },*/
    methods: {
        openModal: function openModal() {
            this.$Modal.confirm();
        }
    }
});

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Button', {
    on: {
      "click": _vm.openModal
    }
  }, [_vm._v("弹出模态框")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-306884af", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=16.chunk.js.map