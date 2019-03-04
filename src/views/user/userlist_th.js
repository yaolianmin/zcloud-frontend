export const userlist_th = [
    {
        type: 'index',
        title: '顺序',
        key: 'index',
        align: 'center'
    },
    {
        title: '用户名',
        align:'center',
        key: 'UserName'
    },
    {
        title: '权限',
        align:'center',
        key: 'Power'
    },
    {
        title: '组管理员',
        align: 'center',
        key: 'management'
    },
    {
        title: '邮箱',
        align:'center',
        key: 'email'
    },
    {
        title: '操作',
        key: 'handle',
        renderHeader: (h, params) => {
            return  h('div',[
                    h('Icon', {
                    props: {
                        type: 'ios-cloud-download',
                        title:'点击下载',
                    }
                    }),
                    h('strong', '操作'),
                    h('AddButton', {
                        on: {
                            'click-button': (vm) => {
                                console.log(vm);
                                vm.$parent.$parent.$parent.$emit('change-button-status','true');
                            }
                        }
                    })
                ]);
        },
        width: '200px',
        align: 'center',
        handle: ['editForm', 'delete'],
    }
];

export default userlist_th;