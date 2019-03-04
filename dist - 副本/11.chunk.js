webpackJsonp([11],{

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(615)

var Component = __webpack_require__(33)(
  /* script */
  __webpack_require__(594),
  /* template */
  __webpack_require__(622),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Work\\iView-ZOAM\\src\\views\\login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0502efbc", Component.options)
  } else {
    hotAPI.reload("data-v-0502efbc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_js_cookie__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


//console.debug('login...');
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            form: {
                userName: 'zoam_admin',
                password: ''
            },
            rules: {
                userName: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        };
    },

    methods: {
        handleSubmit: function handleSubmit() {
            var _this = this;

            this.$refs.loginForm.validate(function (valid) {
                if (valid) {
                    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('user', _this.form.userName);
                    __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('password', _this.form.password);
                    _this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    if (_this.form.userName === 'zoam_admin') {
                        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('access', 0);
                    } else {
                        __WEBPACK_IMPORTED_MODULE_0_js_cookie___default.a.set('access', 1);
                    }
                    _this.$router.push({
                        name: 'home_index'
                    });
                    //console.debug(this.$router);
                }
            });
        }
    }
});

/***/ }),

/***/ 615:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login",
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "login-con"
  }, [_c('Card', {
    attrs: {
      "boardered": false
    }
  }, [_c('p', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "log-in"
    }
  }), _vm._v("\n                欢迎登录\n            ")], 1), _vm._v(" "), _c('div', {
    staticClass: "form-con"
  }, [_c('Form', {
    ref: "loginForm",
    attrs: {
      "model": _vm.form,
      "rules": _vm.rules
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "userName"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "请输入用户名"
    },
    model: {
      value: (_vm.form.userName),
      callback: function($$v) {
        _vm.$set(_vm.form, "userName", $$v)
      },
      expression: "form.userName"
    }
  }, [_c('span', {
    attrs: {
      "slot": "prepend"
    },
    slot: "prepend"
  }, [_c('Icon', {
    attrs: {
      "size": 16,
      "type": "person"
    }
  })], 1)])], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "prop": "password"
    }
  }, [_c('Input', {
    attrs: {
      "type": "password",
      "placeholder": "请输入密码"
    },
    model: {
      value: (_vm.form.password),
      callback: function($$v) {
        _vm.$set(_vm.form, "password", $$v)
      },
      expression: "form.password"
    }
  }, [_c('span', {
    attrs: {
      "slot": "prepend"
    },
    slot: "prepend"
  }, [_c('Icon', {
    attrs: {
      "size": 14,
      "type": "locked"
    }
  })], 1)])], 1), _vm._v(" "), _c('FormItem', [_c('Button', {
    attrs: {
      "type": "primary",
      "long": ""
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v("登录")])], 1)], 1), _vm._v(" "), _c('p', {
    staticClass: "login-tip"
  }, [_vm._v("请输入任意用户名和密码即可")])], 1)])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0502efbc", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=11.chunk.js.map