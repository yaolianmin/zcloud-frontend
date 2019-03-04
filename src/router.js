const routers = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/index',
        meta: {
            title: 'iView ZOAM'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: '/device',
                name: '设备管理ssss',
                component: (resolve) => require(['./views/device/device.vue'], resolve)
            },
            {
                path: '/home',
                name: '主页sssss',
                component: (resolve) => require(['./views/home/home.vue'], resolve)
            },
            {
                path: '/dev_manage',
                component: (resolve) => require(['./views/dev_manage.vue'], resolve)
            },
            {
                path: '/dev_register',
                component: (resolve) => require(['./views/device/dev_register.vue'], resolve)
            },
            {
                path: '/chart',
                component: (resolve) => require(['./views/chart.vue'], resolve)
            },
            {
                path: '/map',
                component: (resolve) => require(['./views/map.vue'], resolve)
            },
            {
                path: '/devlog',
                component: (resolve) => require(['./views/device/devlog.vue'], resolve)
            },
            {
                path: '/alertlist',
                component: (resolve) => require(['./views/alertlist.vue'], resolve)
            },
            {
                path: '/diagnosticlog',
                component: (resolve) => require(['./views/diagnosticlog.vue'], resolve)
            },
            {
                path: '/syslog',
                component: (resolve) => require(['./views/syslog.vue'], resolve)
            },
            {
                path: '/usermanage',
                component: (resolve) => require(['./views/usermanage.vue'], resolve)
            }
        ]
    },
    {
        path: '/login',
        component: (resolve) => require(['./views/login.vue'], resolve)
    }];
export default routers;