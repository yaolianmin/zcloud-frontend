const product_management_list_col_th = [
    {
        type: 'index',
        title: '#',
        key: 'index',
        align: 'center'
    },
    {
        title: '机种名称',
        key: 'model_name',
        editable: false,
        align: 'center'
    },
    {
        title: '基础平台',
        key: 'basic_platform',
        editable: false,
        align: 'center'
    },
    {
        title: '品牌',
        key: 'brand',
        editable: false,
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
                                vm.$parent.$parent.$parent.$emit('change_button_status','show');
                            }
                        }
                    })
                ]);
        },
        width: '200px',
        align: 'center',
        handle: ['editForm', 'delete']
    }];


// const validateModelname = function(rule, value, callback) => {
//                 if(value === ''){
//                     callback(new Error('Please enter model name!'));
//                 }else if(value != ''){
//                     for(var i=0;i<this.optionList.length;i++){
//                         if(value === this.optionList[i].value){
//                             callback(new Error('This model name is exist!'));
//                         }
//                     }
//                     callback();
//                 }
//              };


// var validate_th ={};

//      validate_th.create_model_form_validate_th={
//                     model_name:[
//                         { required: true, validator:validateModelname, trigger: 'change' }
//                     ],
//                     basic_platform: [
//                         { required: true, message: 'Please enter basic platform name!', trigger: 'blur' }
//                     ],
//                     brand: [
//                         { required: true, message: 'Please enter brand name!', trigger: 'blur' }
//                     ],
//     };

var product_management_list = {};

export default product_management_list = {
    product_management_list_col_th: product_management_list_col_th,
    //create_model_form_validate_th:validate_th.create_model_form_validate_th,
   
};