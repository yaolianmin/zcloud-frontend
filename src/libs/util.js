import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView ZOAM';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    //'http://192.168.70.72:8888' :
    'http://192.168.70.167:80' :
    env === 'production' ?
    'http://192.168.70.167:80' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    params: {},
    respoonseType:'jsonp'
});

util.test = axios.create({
   baseURL: 'http://192.168.70.167:80/',
    // baseURL:'http://jsonplaceholder.typicode.com/'

    
    
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // }
});
/*
* 设置 axios params参数
* page: 当前页码
* limit: 每页数据条目
* sort: 排序
* order: 升序(asc)或者降序(desc)
* q: 全局搜索
* */
util.setParams = function (params) {
    util.ajax.defaults.params._page = params.page !== undefined ? params.page : 1;
    util.ajax.defaults.params._limit = params.limit;
    util.ajax.defaults.params._sort = params.sort;
    util.ajax.defaults.params._order = params.order;
    util.ajax.defaults.params.q = params.q;
    util.ajax.defaults.params._start = params.start;
    util.ajax.defaults.params._end = params.end;
    util.ajax.defaults.params._embed = params.embed;
    util.ajax.defaults.params._expand = params.expand;

    delete params.page;
    delete params.limit;
    delete params.sort;
    delete params.order;
    delete params.q;
    delete params.start;
    delete params.end;
    delete params.embed;
    delete params.expand;

    Object.keys(params).forEach(function (key) {
        util.ajax.defaults.params[key] = params[key];
    });
};

/*
* ajax请求 异常处理
* */
util.ajax.error = function (error) {
    console.log(error);
};

/*
* 生成一个ajax请求
* type: 动作类型 get/post/delete/patch/put
* url: 请求的资源位置
* params: 请求的参数
* data: 请求携带的数据 适用于post/patch/put请求
* resp_callback: 请求成功，返回200时的回调函数
* err_callback: 请求失败时回调函数
* */
util.ajax.request = function (type, url, params, data, resp_callback, err_callback) {
    util.setParams(params);
    if ('get' === type)
        util.ajax.get(url, data).then((response) => resp_callback(response)).catch((error) => util.ajax.error(error));
    else if ('post' === type)
        util.ajax.post(url, data).then((response) => resp_callback(response)).catch((error) => util.ajax.error(error));
    else if ('delete' === type)
        util.ajax.delete(url, data).then((response) => resp_callback(response)).catch((error) => util.ajax.error(error));
    else if ('patch' === type)
        util.ajax.patch(url, data).then((response) => resp_callback(response)).catch((error) => util.ajax.error(error));
    else if ('put' === type)
        util.ajax.put(url, data).then((response) => resp_callback(response)).catch((error) => util.ajax.error(error));
};

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        //console.log('###### tag 1#####',vm.$store.state.app.tagsList.filter);
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            //console.log('#### item.children #####',item.children);
            //console.log('#### item.name #####',item.name);
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        //console.log('###### tag 2#####',tag);
        tag = tag[0];
        //console.log('###### tag 3#####',tag);
        tag = tag.children ? tag.children[0] : tag;
        //console.log('###### tag 4#####',tag);
        if (argu) {
            tag.argu = argu;
        }
        if (query) {
            tag.query = query;
        }

        vm.$store.commit('increateTag', tag);

    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm){
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

export default util;