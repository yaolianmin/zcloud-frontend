import Main from '.././views/Main.vue';

export const loginRouter = { // 登录页面的信息
    path: '/login',
    name: 'login',
    meta: {
        title: 'Cloudatix Operation Administration Maintenance Manager' 
    },
    component: (resolve) => require(['./../views/login.vue'], resolve)
};
export const passwordRouter = { // 找回密码页面的信息
    path: '/password',
    name: 'password',
    meta: {
        title: 'Cloudatix Operation Administration Maintenance Manager' 
    },
    component: (resolve) => require(['./../views/password.vue'], resolve)
};

export const page404 = { //访问不存在的页面
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: (resolve) => require(['./../views/error-page/404.vue'], resolve)
};

export const page403 = { //权限不足的页面
    path: '/403',
    name: 'error-403',
    meta: {
        title: '403-权限不足'
    },
    component: (resolve) => require(['./../views/error-page/403.vue'], resolve)
};

export const page500 = { //服务器出错的页面
    path: '/500',
    name: 'error-500',
    meta: {
        title: '500-服务端错误'
    },
    component: (resolve) => require(['./../views/error-page/500.vue'], resolve)
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        //{ path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['.././views/own-space/own-space.vue'], resolve); } },
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['.././views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home',
        title: {i18n: 'home'},
        name: 'home',
        component: Main,
        children: [
            { path: 'home_index', title: '主页', name: 'home_index', component: resolve => { require(['.././views/home/home.vue'], resolve); } }
        ]
    },
    {
        path: '/device',
        title: '设备管理',
        name: 'device',
        component: Main,
        children: [
            { path: 'dev_register', title: '设备注册', name: 'dev_register', component: resolve => { require(['.././views/device/dev_register.vue'], resolve); } },
            { path: 'dev_list', title: '设备列表', name: 'dev_list', component: resolve => { require(['.././views/device/dev_list.vue'], resolve); }},
            { path: 'dev_log', title: '设备日志', name: 'dev_log', component: resolve => { require(['.././views/device/dev_log.vue'], resolve); }}
        ]
    },
    {
        path: '/config',
        title: '配置管理',
        name: 'config',
        component: Main,
        children: [
            { path: 'cfg_edit', title: '模板管理', name: 'cfg_edit', component: resolve => { require(['.././views/config/cfg_edit.vue'], resolve); } },
            //{ path: 'cfg_update', title: '配置更新', name: 'cfg_update', component: resolve => { require(['.././views/config/cfg_update.vue'], resolve); }},
            { path: 'create_model', title: '机种管理', name: 'create_model', component: resolve => { require(['.././views/config/create_model.vue'], resolve)}}
        ]
    },
    {
        path: '/task',
        title: '任务管理',
        name: 'task',
        component: Main,
        children: [
            { path: 'task_edit', title: '任务编辑', name: 'task_edit', component: resolve => { require(['.././views/task/task_edit.vue'], resolve); } },
            { path: 'task_view', title: '任务列表', name: 'task_view', component: resolve => { require(['.././views/task/task_view.vue'], resolve); } },
        ]
    },
    {
        path: '/statistics',
        title: '统计和报表',
        name: 'statistics',
        component: Main,
        children: [
            { path: 'statistic', title: '统计', name: 'statistic', component: resolve => { require(['.././views/statistics/statistic.vue'], resolve); } },
            { path: 'report', title:'设备报表', name: 'report', component: resolve => { require(['.././views/statistics/report.vue'], resolve); } }
        ]
    },
    {
        path: '/user',
        title: '用户管理',
        name: 'usermanage',
        component: Main,
        children: [
             { path: 'group_mgmt', title: '组管理', name: 'group_manage', component: resolve => { require(['.././views/user/group_manage.vue'], resolve); } },
            { path: 'user_management', title: '用户管理', name: 'user_management', component: resolve => { require(['.././views/user/user_management.vue'], resolve); } }
        ]
    },
    {
        path: '/commondev',
        title: '通用设备管理',
        name: 'commondev',
        component: Main,
        children: [
            { path: 'common', title: '通用设备管理', name: 'common', component: resolve => { require(['.././views/commondev/common_dev.vue'], resolve); } }
        ]
    },
    {
        path: '/system',
        title: '系统',
        name: 'system',
        component: Main,
        children: [
             // { path: 'sys_manage', title: '系统管理', name: 'sys_manage', component: resolve => { require(['.././views/system/sys_manage.vue'], resolve); } },
            { path: 'sys_log', title: '系统日志', name: 'sys_log', component: resolve => { require(['.././views/system/sys_log.vue'], resolve); } }
        ]
    },
    {
        path: '/alert',
        title: '警告',
        name: 'alert',
        component: Main,
        children: [
            { path: 'alert_log', title: '警告列表', name: 'alert_log', component: resolve => { require(['.././views/alert/alert_log.vue'], resolve); } },
            // { path: 'alert_log', title: '警告列表', name: 'alert_log', component: resolve => { require(['.././views/alert/alert_log.vue'], resolve); } }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    passwordRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];

//console.debug('router.js');