webpackJsonp([13],{

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(617)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(591),
  /* template */
  __webpack_require__(625),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\error-page\\404.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] 404.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28a8c81a", Component.options)
  } else {
    hotAPI.reload("data-v-28a8c81a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 591:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'Error404',
    methods: {
        backPage: function backPage() {
            this.$router.go(-1);
        },
        goHome: function goHome() {
            this.$router.push({
                name: 'home_index'
            });
        }
    }
});

/***/ }),

/***/ 617:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "error404"
  }, [_c('div', {
    staticClass: "error404-body-con"
  }, [_c('Card', [_c('div', {
    staticClass: "error404-body-con-title"
  }, [_vm._v("4"), _c('span', [_c('Icon', {
    attrs: {
      "type": "ios-navigate-outline"
    }
  })], 1), _vm._v("4")]), _vm._v(" "), _c('p', {
    staticClass: "error404-body-con-message"
  }, [_vm._v("YOU  LOOK  LOST")]), _vm._v(" "), _c('div', {
    staticClass: "error404-btn-con"
  }, [_c('Button', {
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "size": "large",
      "type": "text"
    },
    on: {
      "click": _vm.goHome
    }
  }, [_vm._v("返回首页")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "width": "200px",
      "margin-left": "40px"
    },
    attrs: {
      "size": "large",
      "type": "primary"
    },
    on: {
      "click": _vm.backPage
    }
  }, [_vm._v("返回上一页")])], 1)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-28a8c81a", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=13.chunk.js.map