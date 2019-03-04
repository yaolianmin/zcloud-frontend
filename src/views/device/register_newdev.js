const newModel = [
    {
        type: 'Input',
        key: 'mac_addr',
        value: '',
        label: 'MAC地址'
    },
    {
        type: 'Upload',
        key: 'mac_list',
        value: '',
        label: 'MACLIST'
    },
    {
        type: 'Select',
        key: 'management', //数据库字段名称
        options: [],
        value: '',     //选中值
        label: '组管理员'
    },
    {
        type: 'DatePicker',
        key: 'service_time',
        subtype:'datetimerange',
        value: '',
        label: '服务期限'
    },
    {
        type: 'Input',
        key: 'dev_info1',
        value: '',
        label: '备注1'
    },{
        type: 'Input',
        key: 'dev_info2',
        value: '',
        label: '备注2'
    }];


export default newModel;