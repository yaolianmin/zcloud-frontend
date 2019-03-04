<template>
    <div>
        <Row>
            <Col span="8" offset="0">
                <model-form
                        ref="formRef"
                        v-model="modelFormData"
                        :formItems="newModelForm"
                        :formDataVaildate="formDataVaildate"
                        @on-click-submit="formSubmit"
                        @on-click-cancel="formCancel"
                        @on-click-upload="formHidden">
                </model-form>
            </Col>
        </Row>
        <!-- <span style="margin-left:110px;float:left;margin-top:60px;">说明：</span> -->
    </div>
</template>
<script>
    import modelTable from '../common/table/table-list.vue';
    import searchForm from '../common/search/input-search.vue';
    import selectForm from '../common/form/select-form.vue';
    import pageTable  from '../common/pagination/page-table.vue';
    import modelForm from '../common/form/best-form.vue';
    import newModelForm from './register_newdev.js';
    import util  from '../../libs/util.js';
    import valid from '../../libs/validate.js';
    import Cookies from 'js-cookie';
     export default{
        components: {
            modelTable,
            modelForm
        },
        data() {
            const validateDatetime = (rule, value, callback) => {
                if (value[0] === '' && value[1] === '') {
                    callback(new Error('Please select start time and end time'));
                }else if(value[0] === '' && value[1] !== ''){
                    callback(new Error('Please select start time'));
                }else if(value[1] === '' && value[0] !== ''){
                    callback(new Error('Please select end time'));
                }else if( value[0] !== '' && value[1] !== ''){
                    if(value[0] > value[1]){
                        callback(new Error('The end time is before the start time!'));
                    }else if(value[0] < value[1]){
                        callback();
                    }else{
                        callback(new Error('The start time is equal end time,please select end time again!'));
                    }
                }else{
                    callback();
                }              
            };
            return {
                newModelForm: [],
                options_manager:[],
                modelFormData: {},
                show: false,
                formDataVaildate:{ 
                    mac_addr: [
                        { required: true, validator: valid.validateMac, trigger: 'blur' }
                    ],
                    user_name:[
                        { required: true, message: 'Please select the manager', trigger: 'change' }
                    ],
                    service_time: [
                        { required: true, validator: validateDatetime, trigger: 'blur' }
                    ],
                    dev_info1: [
                        { required: true, message: 'Please enter a personal info1', trigger: 'blur' }
                    ],
                    dev_info2: [
                        { required: true, message: 'Please enter a personal info2', trigger: 'blur' }
                    ]
                },
                baseuri: '/device-managements'
            };
        },
        methods: {
            //初始表单数据
            initFormData: function () {
                newModelForm.forEach((item, index) => {
                    this.$set(this.modelFormData, item.key, newModelForm[index].value);
                });
            },
            //初始表单校验规则
            initFormDataVaildate: function () {
                newModelForm.forEach((item) => {
                    this.modelFormData[item.key] = '';
                });
            },
            //表单提交
            formSubmit: function (vaild, formDataObject) {
                let formData = new FormData();
                Object.keys(formDataObject).forEach((key) => {
                    formData.append(key, formDataObject[key]);
                });
                //如果有上传文件,则隐藏MAC地址一栏
                // if(formDataObject.uploadFileName){
                //     newModelForm[0].type ="hiddenInput";
                // }
                //util.test.post('posts', formData);
                formData.append('action_user',Cookies.get('user'));
                if (vaild){
                    this.emitForm(formData);
                    //this.$Message.success('Success !');
                }
                else{
                    this.$Message.error('Failed !');
                }
                
            },
            formCancel: function () {   
                newModelForm[0].type = "Input";
                
            },
            //如果有上传文件,则隐藏MAC地址一栏
            formHidden: function(){
                newModelForm[0].type ="hiddenInput";
            },
            //提交表单内容

            emitForm(formData) {
                util.ajax.request('post', this.baseuri, {}, formData, this.response_callback, this.exception_callback);
            },
            //ajax请求返回值处理
            response_callback(res) {
                if(!res.data['state']){
                    this.$Message.success(res.data['message']);
                }else{
                    this.$Message.error(res.data['message']);
                }
                console.log(res.data);
            },
            //ajax请求返回值处理 加载页面时获取管理员用户的名单
            response_callback_getmanagerlist(res) {
                //console.log(res.data.body[0]);
                this.get_manager_name_list(res.data.body);
            },
            //ajax请求错误异常处理
            exception_callback(err) {
                console.log(err);
            },
            //筛选条件发生变化
            selectChanged: function (event) {
                this.selected_model = event;
            },
            //获取管理员用户列表,构造select options
            get_manager_name_list(val){
                var manager_name_list = new Array(val.length);
                for (var i = 0; i < val.length; i++) {
                    manager_name_list[i] = {};
                    manager_name_list[i].label = val[i].UserName;
                    manager_name_list[i].value = val[i].UserName;
                }
                 newModelForm[2]['options'] = manager_name_list;
            }
        },
        created: function (){
            let uri = this.baseuri +'/' + "managerlist";
            util.ajax.request('get',  uri, {}, {}, this. response_callback_getmanagerlist, this.exception_callback);
            
            newModelForm[2]['options'] = this.options_manager;
            this.newModelForm = newModelForm;
            //this.initFormData();
            //this.initFormDataVaildate();
        }
    }   
</script>