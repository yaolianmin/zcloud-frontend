const task_editModel = [
    {
        type: 'Input',
        key: 'description',
        value: '',
        label: '任务描述'
    },
    {
        type: 'Select',
        key: 'task_type', //数据库字段名称
        options: [
        {
            value: 'reboot',
            label:'重启'
        },
        {
            value: 'firmware',
            label:'固件更新'
        },
        {
            value: 'templet',
            label:'模板下发'
        },
        {
            value: 'diagnostic',
            label:'诊断'
        }],
        value: '',     //选中值
        label: '任务类型',
        disabled:false
    },
    {
        type: 'Select',
        key: 'execute_action', //数据库字段名称 执行时间
        options: [{
            value: 'now',
            label:'立即执行'
        },
        {
            value: 'schedule-on',
            label:'预约'
        }],
        value: '',     //选中值
        label: '调度方式'
    },
    {
        type: '',
        key: 'execute_time',
        subtype:'datetime',
        value: '',
        label: '预约执行时间'
    }];


const reboot_table_columns = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '设备类型',
        key: 'model_type',
        editable: false,
        align: 'center'
    },
    {
        title: '操作模式',
        key: 'opemode',
        editable: false,
        align: 'center'
    },
    {
        title: '设备型号',
        key: 'model_name',
        editable: false,
        align: 'center'
    },
    {
        title: 'MAC地址',
        key: 'mac_addr',
        editable: false,
        align: 'center'
    },
    {
        title: '设备描述',
        key: 'dev_info1',
        editable: false,
        align: 'center'
    },
    {
        title: '任务状态',
        key: 'status',
        editable: false,
        align: 'center',
        render: (h, params) => {
            const row = params.row;
            const color = row.status === "running" ? 'green' : row.status === 2 ? 'yellow' : 'blue';
            const text = row.status === "running" ? '有任务' : row.status === 2 ? 'Alert' : '无任务';
            // return h('Progress', {
            //     props: {
            //         type: 'dot',
            //         color: color,
            //         percent:5,
            //     },
            // }, text);
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                },
            }, text);
        }
    },
    {
        type: 'selection',
        width: 60,
        align: 'center'
    }
    // {
    //     title: '操作',
    //     key: 'handle',
    //     width: '200px',
    //     align: 'center',
    //     handle: ['edit']
    // }
    ];

const templet_table_columns = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '设备类型',
        key: 'model_type',
        editable: false,
        align: 'center'
    },
    {
        title: '操作模式',
        key: 'opemode',
        editable: false,
        align: 'center'
    },
    {
        title: '设备型号',
        key: 'model_name',
        editable: false,
        align: 'center'
    },
    {
        title: 'MAC地址',
        key: 'mac_addr',
        editable: false,
        align: 'center'
    },
    {
        title: '设备描述',
        key: 'dev_info1',
        editable: false,
        align: 'center'
    },
   {
        title: '任务状态',
        key: 'status',
        editable: false,
        align: 'center',
        render: (h, params) => {
            const row = params.row;
            const color = row.status === "running" ? 'green' : row.status === 2 ? 'yellow' : 'blue';
            const text = row.status === "running" ? '有任务' : row.status === 2 ? 'Alert' : '无任务';
            // return h('Progress', {
            //     props: {
            //         type: 'dot',
            //         color: color,
            //         percent:5,
            //     },
            // }, text);
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                },
            }, text);
        }
    },
    {
        title: '模板名称',
        key: 'templet_name',
        editable: true,
        renderHeader: (h, params) => {
            return h('div',[
                    h('strong', '模板名称'),
                    h('AddButton', {
                        on: {
                            'click-button': (vm) => {
                                vm.$parent.$parent.$parent.$emit('change_button_status','show');
                            }
                        }
                    })
                ]);
        },
        width: '200px',
        align: 'center',
        //align: 'center',
        selectable:true
    },
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: '操作',
        key: 'handle',
        width: '100px',
        align: 'center',
        handle: ['edit']
    }
    ];
const firmware_table_columns = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '设备类型',
        key: 'model_type',
        editable: false,
        align: 'center'
    },
    {
        title: '操作模式',
        key: 'opemode',
        editable: false,
        align: 'center'
    },
    {
        title: '设备型号',
        key: 'model_name',
        editable: false,
        align: 'center'
    },
    {
        title: 'MAC地址',
        key: 'mac_addr',
        editable: false,
        align: 'center'
    },
    {
        title: '设备描述',
        key: 'dev_info1',
        editable: false,
        align: 'center'
    },
    {
        title: '任务状态',
        key: 'status',
        editable: false,
        align: 'center',
        render: (h, params) => {
            const row = params.row;
            const color = row.status === "running" ? 'green' : row.status === 2 ? 'yellow' : 'blue';
            const text = row.status === "running" ? '有任务' : row.status === 2 ? 'Alert' : '无任务';
            // return h('Progress', {
            //     props: {
            //         type: 'dot',
            //         color: color,
            //         percent:5,
            //     },
            // }, text);
            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                },
            }, text);
        }
    },
    {
        title:"固件下载路径",
        key:'fw_path',
        editable: true,
        width: 330,
        align: 'center',
        // render: (h, params) => {
        //                 return h('div', [
        //                     h('Input', {
        //                         props: {
        //                             type: 'person'
        //                         }
        //                     }),
        //                     h('strong', params.row.name)
        //                 ]);
        //             }
    },
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: '操作',
        key: 'handle',
        width: '100px',
        align: 'center',
        handle: ['editForm']
    }
    ];

const table_columns = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        width: 60,
        align: 'center'
    },
    {
        title: '设备型号',
        key: 'model_name',
        editable: false,
        align: 'center'
    },
    {
        title: 'MAC地址',
        key: 'mac_addr',
        editable: false,
        align: 'center'
    },
    {
        title: '设备描述',
        key: 'reboot_status',
        editable: false,
        align: 'center'
        //sortable: true
    },
    {
        title: '任务状态',
        key: 'status',
        editable: false,
        align: 'center'
        //sortable: true
    }];

// const val_1 ={
//         type: 'selection',
//         width: 60,
//         align: 'center'
//     };

// const val_2 = {
//         title:"固件下载路径",
//         key:'fw_path',
//         editable: true,
//         align: 'center'
//     };

// const val_3 = {
//         title: '操作',
//         key: 'handle',
//         width: '100px',
//         align: 'center',
//         //handle: ['edit'],
//         render: (h, params) => {
//               return h('div', [
//                 h('Button', {
//                   props: {
//                     type: 'text',
//                     size: 'small'
//                   },
//                   on: {
//                     click: () => {
//                       this.remove(params)
//                     }
//                   }
//                 }, '删除')
//               ]);
//             }
//     }; 

// const val_4 = {
//         title: '模板名称',
//         key: 'templet_name',
//         editable: true,
//         align: 'center',
//         selectable:true
//     };

//tab组件的选项
function tabs_handle(dev_type){
    if(dev_type === 'AC'){
        var tabs = [
                       
                        {
                            label: '模板下发',
                            key: 'templet'
                        },
                        {
                            label: '固件更新',
                            key: 'firmware'
                        },
                        {
                            label: '重启任务',
                            key: 'reboot'
                        },
                        {
                            label: '诊断任务',
                            key: 'diagnostic'
                        }
                    ];
    }else if(dev_type === 'FAP'){
        var tabs = [
                        {
                            label: '胖AP',
                            key: 'FAP'
                        }
                    ];
    }
    return tabs;
}

var task_edit_list = {};

export default task_edit_list ={
    task_editModel:task_editModel,
    task_edit_tableColumns:table_columns,
    templet_tableColumns:templet_table_columns,
    reboot_tableColumns:reboot_table_columns,
    firmware_tableColumns:firmware_table_columns,
    
    tabs_handle:tabs_handle,
    // val_1:val_1,
    // val_2:val_2,
    // val_3:val_3,
    // val_4:val_4,
};