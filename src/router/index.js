import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';

//引用Vue-Router组件
Vue.use(VueRouter);
//console.debug('index.js');
//路由配置
const RouterConfig = {
    routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    //console.debug(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') {
        next(false);
        router.replace({
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        next(false);
    } else { 
        //console.debug(Cookies.get('user') + to.name);
        if(Cookies.get('find_password') && to.name === 'password'){
            next({
               
            });
        }else if (!Cookies.get('user') && to.name !== 'login') {
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') {
            Util.title();
            //console.debug('home_index');
            next({
                name: 'home_index'
            });
        }else {
            if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access !== undefined) {
                if (Util.getRouterObjByName([otherRouter, ...appRouter], to.name).access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
                } else {
                    router.replace({
                        name: 'error_403'
                    });
                    next();
                }
            } else {
                Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next);
            }
        }
    }
    iView.LoadingBar.finish();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});