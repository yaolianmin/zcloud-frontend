
var filter = {
    model_name: [],
    customized_filter: {}
};

var devlog = {};

const devlog_type = [
    {
        label: '普通',
        value: 0
    },
    {
        label: '有线',
        value: 1
    },
    {
        label: '无线',
        value: 2
    }
];

const devmodel_name = [
    {
        label: 'AC-1027L',
        value: 0
    },
    {
        label: 'AC-1030',
        value: 1
    }
];

const devlog_col_th = [
    {
        type: 'index',
        title: '#',
        key: 'id',
        align: 'center'
    },
    {
        title: 'Mac Addr',
        key: 'mac_addr',
        align: 'center'
    },
    {
        title: 'Model Name',
        key: 'model_name',
        align: 'center',
        filters: devmodel_name,
        //filterMultiple: false,//单选
        filterMethod: (value, row) => {
            //console.log("#########value########",value,"#########row########",row);
            if (value === 0) {
                return row.model_name === devmodel_name[0].label;
            } else if (value === 1) {
                return row.model_name === devmodel_name[1].label;
            }
        },
        render: (h, params) => {
            const row = params.row;
            const idx = row.model_name;
            const modelnameArr = [
                {
                    idx: 0,
                    name: 'AC-1027L'
                },
                {
                    idx: 1,
                    name: 'AC-1030'
                }];
            return h('span', typeof(idx) === 'string' ? idx : modelnameArr[idx].name);
        }
    },
    {
        title: 'Description',
        key: 'log_desc',
        align: 'center',
        renderHeader: (h, params) => {
            const column = params.column;
            const optionArr = [
                {
                    label: '普通',
                    value: 0
                },
                {
                    label: '有线',
                    value: 1
                },
                {
                    label: '无线',
                    value: 2
                }
            ];
            const groupArr = [
                {
                    label: 'group1',
                    value: 'group1'
                },
                {
                    label: 'group2',
                    value: 'group2'
                },
                {
                    label: 'group3',
                    value: 'group3'
                }
            ];
            return h('span', [
                h('span',column.title),
                //FileterForm已被注册为全局组件
                h('FilterForm', {
                    props: {
                        optionList: optionArr,
                        optionList2: groupArr,
                        filter_groupnameone: "日志类型 : ",
                        group_name: "分组名称 : "
                    },
                    on: {
                            // 'select-change': (vm, value, key) => {
                            //     vm.$set(filter.customized_filter, key, value);
                            //     vm.$parent.$parent.$emit('customized-filter-change', filter.customized_filter);
                            // }
                            'select-change': (vm, event) => {
                                if(event.filter_val.logType !== undefined)
                                    vm.$set(filter.customized_filter, 'logType', event.filter_val.logType);
                                if(event.filter_val.groupType !== undefined)
                                    vm.$set(filter.customized_filter, 'groupType', event.filter_val.groupType);
                                
                                vm.$parent.$parent.$emit('customized-filter-change', filter.customized_filter);
                            },
                            'handle_reset': (vm, event) => {
                                vm.$parent.$parent.$emit('customized-filter-change', event);
                            }
    　　　　　　　　}
                })
            ]);
        }
    },
    {
        title: 'Time',
        key: 'time',
        align: 'center',
        sortable: 'true'
    }
];


export default devlog = {
    devlog_col_th: devlog_col_th,
    filter: filter,
    devmodel_name: devmodel_name
};