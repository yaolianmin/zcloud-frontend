/*
* 表单内容
* type 表示表单类型，如Input/Select/Form/Slider等
* subtype 表示表单子类型，如DatePicker支持datetime，datetimerange
* key 表示对应数据库字段
* value 表单内容
* options 正对Select类型表单的option选项
* label 在页面显示的标签
* render 表单的渲染函数
* */
const devreg_form = [
    {
        type: 'Input',
        key: 'mac_addr',
        value: '00:63:29:5b:34:99',
        label: 'Mac地址'
    },
    {
        type: 'Select',
        key: 'management', //数据库字段名称
        value:  [],     //选中值
        options: [],    //选项列表
        label: '组管理员'
    },
    {
        type: 'DatePicker',
        subtype: 'datetimerange',
        key: 'service_end',
        value: '2017-12-19 14:58:09',
        label: '服务期限'
    },
    {
        type: 'Input',
        key: 'dev_info1',
        value: '备注1',
        label: '备注1'
    },
    {
        type: 'Input',
        key: 'dev_info2',
        value: '备注2',
        label: '备注2'
    }];

export default devreg_form;

// const devreg_form = [
//     {
//         type: 'Input',
//         key: 'mac_addr',
//         value: '00:63:29:5b:34:99',
//         label: 'Mac地址',
//         render: (h, params) => {
//             const self = params.vm;
//             const formItem = params.formItem;
//             return h(formItem.type, {
//                 props: {
//                     type: 'text',
//                     placeholder: 'Please input Mac Addr',
//                     value: formItem.value
//                 },
//                 on: {
//                     'on-change': function (event) {
//                         formItem.value = event.target.value;
//                         self.$emit('on-change', {mac_addr: formItem.value});
//                     }
//                 }
//             });
//         }
//     },
//     {
//         type: 'Select',
//         key: 'management', //数据库字段名称
//         value:  [],     //选中值
//         options: [],    //选项列表
//         label: '组管理员',
//         render: (h, params) => {
//             const formItem = params.formItem;
//             let optionlists = [];
//             formItem.options.forEach((item) => {
//                 optionlists.push(h('Option', {
//                     props: {
//                         label: item.label,
//                         value: item.value
//                     }
//                 }));
//             });
//             return h(formItem.type, {
//                 props: {
//                     value: formItem.value
//                 }
//             },optionlists);
//         }
//     },
//     {
//         type: 'DatePicker',
//         subtype: 'datetimerange',
//         key: 'service_end',
//         value: '2017-12-19 14:58:09',
//         label: '服务期限',
//         render: (h, params) => {
//             const formItem = params.formItem;
//             return h('Row', {
//                 props: {
//                     type: 'flex',
//                     align: 'middle',
//                     justify: 'center'
//                 }
//             }, [h('Col', {
//                 props: {
//                     span: '11'
//                 }
//             }, [
//                 h(formItem.type, {
//                     props: {
//                         type: 'datetime',
//                         value: formItem.value
//                     }
//                 })
//             ]),
//                 h('Col', {
//                     props: {
//                         span: '2',
//                     }
//                 },[
//                     h('span', '-')
//                 ]),
//                 h('Col', {
//                     props: {
//                         span: '11'
//                     }
//                 }, [
//                     h(formItem.type, {
//                         props: {
//                             type: 'datetime',
//                             value: formItem.value
//                         }
//                     })
//                 ])
//             ]);
//         }
//     },
//     {
//         type: 'Input',
//         key: 'dev_info1',
//         value: '备注1',
//         label: '备注1',
//         render: (h, params) => {
//             const formItem = params.formItem;
//             return h(formItem.type, {
//                 props: {
//                     type: 'text',
//                     value: formItem.value
//                 }
//             });
//         }
//     },
//     {
//         type: 'Input',
//         key: 'dev_info2',
//         value: '备注2',
//         label: '备注2',
//         render: (h, params) => {
//             const formItem = params.formItem;
//             return h(formItem.type, {
//                 props: {
//                     type: 'text',
//                     value: formItem.value
//                 }
//             });
//         }
//     }];