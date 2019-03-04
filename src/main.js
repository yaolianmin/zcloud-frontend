import Vue from 'vue';
import iView from 'iview';
//import VueRouter from 'vue-router';
//import Routers from './router';
import {router} from './router/index';
import {appRouter} from "./router/router";
import Util from './libs/util';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

/******************************************************/
//语言配置
import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
/*****************************************************/


//import Promise from 'Promise';
import md5 from 'md5.js';
/*
 **自定义组件加载
****************************************************************/
import filterForm from './views/common/form/filter-form.vue';
Vue.component('FilterForm',filterForm);

import addButton from './views/common/table/add-button.vue';
Vue.component('AddButton',addButton);

import editButton from './views/common/table/edit-button.vue';
Vue.component('EditButton',editButton);

import addIcon from './views/common/table/add-icon.vue';
Vue.component('AddIcon',addIcon);

import Radios from './views/common/table/radios.vue';
Vue.component('Radios',Radios);

import Edit from './views/common/table/edit.vue';
Vue.component('Edit',Edit);
/******************************************************************/


//window.Promise = Promise; //兼容IE浏览器
//Vue.use(VueRouter);

Vue.use(VueI18n);
Vue.use(iView);

/*********************************语言配置*****************************************/
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
localStorage.setItem('lang', 'zh-CN');
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
/************************************语言配置***********************/


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    VueI18n,
    template:'<App/>',
    mounted () {
        console.debug('main mounted...');
        this.currentPageName = this.$route.name;
        //console.debug(this.$route.name);
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
    }
});