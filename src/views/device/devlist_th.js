const devstat_enum = [
    {
        label: 'Offline',
        value: 0
    },
    {
        label: 'Online',
        value: 1
    },
    {
        label: 'Alert',
        value: 2
    }];

const devtype_enum = [
    {
        label: 'AP',
        value: 0
    },
    {
        label: 'AC',
        value: 1
    },
    {
        label: 'LTE-Fi',
        value: 2
    }];

const devlist_col_th = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        align: 'center'
    },
    {
        title: 'MAC地址',
        key: 'mac_addr',
        align: 'center'
    },
    {
        title: '状态',
        key: 'device_status',
        align: 'center',
        filters: devstat_enum,
        filterMethod: (value, row) => {
            if (value === 0) {
                return row.device_status === 0;
            } else if (value === 1) {
                return row.device_status === 1;
            } else if (value === 2) {
                return row.device_status === 2;
            }
        },
        render: (h, params) => {
            const row = params.row;
            const color = row.device_status === 1 ? 'green' : row.device_status === 2 ? 'yellow' : 'red';
            const text = row.device_status === 1 ? 'Online' : row.device_status === 2 ? 'Alert' : 'Offline';

            return h('Tag', {
                props: {
                    type: 'dot',
                    color: color
                },
            }, text);
        }
    },
    {
        title: '设备类型',
        key: 'model_type',
        align: 'center',
        // filters: devtype_enum,
        // filterMethod: (value, row) => {
        //     if (value === 0) {
        //         return row.model_type === devtype_enum[0].label;
        //     } else if (value === 1) {
        //         return row.model_type === devtype_enum[1].label;
        //     } else if (value === 2) {
        //         return row.model_type === devtype_enum[2].label;
        //     }
        // },
        // render: (h, params) => {
        //     const row = params.row;
        //     const idx = row.model_type;
        //     const devtypeArr = [
        //         {
        //             idx: 0,
        //             name: 'AP'
        //         },
        //         {
        //             idx: 1,
        //             name: 'AC'
        //         },
        //         {
        //             idx: 2,
        //             name: 'LTE-Fi'
        //         }];
        //     return h('span', typeof(idx) === 'string' ? idx : devtypeArr[idx].name);
        // }
    },
    {
        title: '设备名称',
        key: 'model_name',
        align: 'center'
    },
    {
        title: '模板名称',
        key: 'last_templet_name',
        align: 'center'
    },
    {
        title: '结束日期',
        key: 'service_end',
        align: 'center',
        sortable: true
    },
    {
        title: '备注1',
        key: 'dev_info1',
        align: 'center',
        editable: true,
        selectable: false
    },
    {
        title: '备注2',
        key: 'dev_info2',
        align: 'center',
        editable: true,
        selectable: false
    },
    {
        title: '组',
        key: 'group_name',
        align: 'center',
        editable: true,
        selectable: true
    },
    {
        title: '组查看者',
        key: 'user_name',
        align: 'center',
        editable: true,
        selectable: true
    },
    // {
    //     title: '管理员',
    //     key: 'management',
    //     align: 'center'
    // },
    {
        title: '操作',
        key: 'handle',
        width: '200px',
        align: 'center',
        handle: ['edit', 'delete']
    }];

var filter = {
    device_status: [],
    model_type: []
};

var devlist = {};

export default devlist = {
    devlist_col_th: devlist_col_th,
    filter: filter,
    devstat_enum: devstat_enum,
    devtype_enum: devtype_enum
};