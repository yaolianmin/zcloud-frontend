
var cfg_edit = {};

const cfg_edit_col_th = [
    {
        type: 'index',
        title: '#',
        key: 'id',
        width: '200px',
        align: 'center'
    },
    {
        title: 'Model Name',
        key: 'model_name',
        //editable: true,
        align: 'center'
    },
    {
        title: 'Templet Name',
        key: 'template_name',
        //editable: true,
        align: 'center'
    },
    {
        title: '操作',
        key: 'handle',
        renderHeader: (h, params) => {
            return h('div',[
                    h('strong', '操作'),
                    h('AddButton', {
                        on: {
                            'click-button': (vm) => {
                                vm.$parent.$parent.$parent.$emit('change-button-status','true');
                            }
                        }
                    })
                ]);
        },
        width: '200px',
        align: 'center',
        handle: ['editForm', 'delete']
    }
];

const cfg_vap_edit_col_th = [
    {
        type: 'index',
        title: '#',
        key: 'id',
        width: '200px',
        align: 'center'
    },
    {
        title: 'Profile Name',
        key: 'ProfileName',
        //editable: true,
        align: 'center'
    },
    {
        title: 'SSID',
        key: 'SSID',
        //editable: true,
        align: 'center'
    },
    {
        title: 'Network Authentication',
        key: 'Authentication',
        //editable: true,
        align: 'center'
    },
    {
        title: '操作',
        key: 'handle',
        width: '200px',
        align: 'center',
        handle: ['editForm']
    }
];


export default cfg_edit = {
    cfg_edit_col_th: cfg_edit_col_th,
    cfg_vap_edit_col_th: cfg_vap_edit_col_th
};