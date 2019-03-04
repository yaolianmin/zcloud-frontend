<template>
    <div >
        <!--Row>
            <search-form :tips="'请输入机种名称'"></search-form>
        </Row-->
        <div v-if="selected_model === ''">
            <Row>
                <Col span="12" offset="6">
                    <select-form :tips="'请选择或输入机种名称'" :selectOption="selected_model"
                                 @select-changed="selectChanged"
                                 
                                 :optionList="optionList"></select-form>
                </Col>
            </Row>
        </div>
        <div v-else >
            <Row>
                <Col span="12" offset="6">
                    <select-form :tips="'请选择或输入机种名称'" :selectOption="selected_model"
                                 @select-changed="selectChanged"
                                 :optionList="optionList"></select-form>
                </Col>
            </Row>
            <Row >
                <model-table id="ss" v-model="tableData" 
                            :columnsList="tableColumns" 
                            :isLoading="tableLoading"
                            @on-change="row_change" 
                            @on-delete="row_delete" 
                            style="margin-top: 10px"
                            @change_button_status="change_addbutton_status"
                            >
                </model-table>
            </Row>
            <!--<Row>
                <page-table></page-table>
            </Row>-->
            <Row id="demo" v-if="add_model_button != 'none'" style ="margin-top:5%" >
                <Col span="8" offset="7">
                    <model-form
                            ref="formRef"
                            v-model="modelFormData"
                            :formItems="newModelForm"
                            :formDataVaildate="formDataVaildate"
                            @on-click-submit="formSubmit">
                    </model-form>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import modelTable from '../common/table/table-list.vue';
    import searchForm from '../common/search/input-search.vue';
    import selectForm from '../common/form/select-form.vue';
    import pageTable  from '../common/pagination/page-table.vue';
    import modelForm from '../common/form/best-form.vue';
    import newModelForm from './create_model.js';
    import util  from '../../libs/util.js';
    //import parser from '../../libs/parser.js';
    import viewData from './data.js';

    import product_management_th from './product_management_th.js';
    import qs from 'qs';
    import axios from 'axios';

    export default{
        components: {
            modelTable,
            searchForm,
            selectForm,
            pageTable,
            modelForm
        },
        data() {
            const validateFileinput = (rule, value, callback) => {
                
                if(value === ''){
                    callback(new Error('Please upload template file!'));
                }else if(value != ''){
                    callback();
                }
            };
            const validateModelname = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('Please enter model name!'));
                }else if(value != ''){
                    if(this.action_flag === "add"){
                        for(var i=0;i<this.optionList.length;i++){
                            if(value === this.optionList[i].value){
                                callback(new Error('This model name is exist!'));
                            }
                        }
                    }
                    callback();
                }
             };
            return {
                tableData:[],
                tableDatas:[],
                tableColumns: [],
                tableLoading: false,
                totalsize: 0,
                page_size: 10,

                newModelForm: {},
                modelFormData: {},
                selected_model: '',
                add_model_button: "none",
                show: false,
                formDataVaildate:{ 
                    model_name:[
                        { required: true, validator:validateModelname, trigger: 'change' }
                    ],
                    basic_platform: [
                        { required: true, message: 'Please enter basic platform name!', trigger: 'blur' }
                    ],
                    brand: [
                        { required: true, message: 'Please enter brand name!', trigger: 'blur' }
                    ],
                    // template: [
                    //     { required: true, validator:validateFileinput, trigger: 'blur' }
                    // ]
                },
                optionList:[],
                action_flag:'',
                update_id:'',
                baseuri:'/product-managements'
            };
        },
        methods: {
            //初始表单数据
            initFormData: function () {
                // newModelForm.forEach((item, index) => {
                //     delete this.modelFormData[item.key];
                //     this.$set(this.modelFormData, item.key, newModelForm[index].value);
                //     
                // });

                this.tableColumns = product_management_th.product_management_list_col_th;
                this.tableLoading = true;
                //这里用的restful 原生的get 方法 直接用index方法获取的数据
                util.ajax.request('get', this.baseuri, {}, {}, this.response_callback, this.exception_callback);
            },
            // //初始表单校验规则
            // initFormDataVaildate: function () {
            //     newModelForm.forEach((item) => {
            //         this.modelFormData[item.key] = '';
            //     });
            // },
            //表单提交
            formSubmit: function (vaild, formDataObject) {
                //新增一个机种
                if (vaild){
                    if(this.action_flag === "add"){
                        if(formDataObject.uploadFileName){
                            formDataObject.template = formDataObject.uploadFileName.name;
                        } else{
                            return this.$Message.error('Please upload product template file !');
                        } 
                    }else{
                        if(formDataObject.uploadFileName){
                            formDataObject.template = formDataObject.uploadFileName.name;
                            //设置URL
                            let update_uri = this.baseuri +'/updateTemplate/' + this.update_id;
                            //更新机种配置文件
                            let formData = new FormData();
                            Object.keys(formDataObject).forEach((key) => {
                                formData.append(key, formDataObject[key]);
                            });

                            console.log("##### has uploadFiles #####\n");
                            util.ajax.request('post', update_uri, {}, formData, this.response_callback_addmodel, this.exception_callback);
                            return;
                        }else{
                            //设置URL
                            let update_uri = this.baseuri +'/' + this.update_id;
                            //不更新机种配置文件
                            let formData = JSON.parse(JSON.stringify(formDataObject));
                            util.ajax.request('patch', update_uri, {}, formData, this.response_callback_addmodel, this.exception_callback);
                            return;
                        } 
                    }   

                    //新增机种时同时要上传机种的配置文件,所以必须以formData提交
                    let formData = new FormData();
                    Object.keys(formDataObject).forEach((key) => {
                        formData.append(key, formDataObject[key]);
                    });
                    util.ajax.request('post', this.baseuri, {}, formData, this.response_callback_addmodel,this.exception_callback);
                   
                }else{
                    //this.$Message.error('Failed !');
                }
                // if (vaild)
                //     this.$Message.success('Success !');
                // else
                //     this.$Message.error('Failed !');
            },
            //添加新机种成功后的响应处理
            response_callback_addmodel(res) {
                this.initFormData();
                //this.selected_model = res.data.model_name;
                //console.log(res.data.model_name);
                
                //this.get_tabledata(this.selected_model);
                //this.selectChanged(res.data.model_name);
                this.add_model_button = "none";
                this.action_flag = '';
            },
            //筛选条件发生变化
            selectChanged: function (event) {
                this.selected_model = event;
                this.get_tabledata(this.selected_model);
                //筛选框改变,要隐藏model_from
                this.add_model_button = "none";
                this.action_flag = '';
            },
            //点击 + 出现添加机种的页面
            change_addbutton_status: function(msg) {
                //设置model_name可修改
                if(newModelForm[0].key == "model_name"){
                    newModelForm[0].readonly = false;
                }
                newModelForm.forEach((item, index) => {
                    delete this.modelFormData[item.key];
                    this.$set(this.modelFormData, item.key, '');
                });
                //点击新增按钮时，如何之前是编辑页面,此时就不隐藏页面
                if(this.action_flag === "add" || this.action_flag === ''){
                    if(this.add_model_button =="none"){
                        this.add_model_button = "show";
                    }else{
                        this.add_model_button = "none";
                    }
                }else if(this.action_flag === "update" && this.add_model_button === "none")
                {
                    this.add_model_button = "show";
                }
                //表示这是新增的动作
                this.action_flag = "add";  
            },
            //获取tabledata
            get_tabledata(val){
                for(var i = 0;i < this.tableDatas.length;i++){
                    if(this.tableDatas[i].model_name == val){
                        var product_info = new Array(1);
                        product_info[0] = this.tableDatas[i];
                        this.tableData = product_info;
                    }
                }
            },
            //table内容更新
            row_change (row_data, index) {
                 //设置URL
                 //let uri = this.baseuri +'/' + row_data[index].id;
                 this.update_id = row_data[index].id;
                //document.querySelector("#demo").style.display = "none";
                //点击编辑按钮时，如果之前是新增页面,此时就不隐藏页面
                if(this.action_flag === "update" || this.action_flag === ''){
                    if(this.add_model_button =="none"){
                    this.add_model_button = "show";
                    }else{
                        this.add_model_button = "none";
                    }
                }else if(this.action_flag === "add" && this.add_model_button === "none")
                {
                   this.add_model_button = "show"; 
                }
                //表示这是更新的动作
                this.action_flag = "update";
                
                var val = row_data[index];
                
                newModelForm.forEach((item, index) => {
                    if(newModelForm[index].key == "model_name"){
                        newModelForm[index].value = val.model_name;
                        //更新数据时model_name不能修改
                        newModelForm[index].readonly = true;
                    }
                    if(newModelForm[index].key == "basic_platform"){
                        newModelForm[index].value = val.basic_platform;
                    }
                    if(newModelForm[index].key == "brand"){
                        newModelForm[index].value = val.brand;
                    }
                 });
                this.set_fromdata();
              
               //this.tableLoading = true;
                //将表单数据变成json格式,否则后端处理不了
                //let formData = JSON.parse(JSON.stringify(row_data[index]));
                //发送请求
                //util.ajax.request('patch', uri, {}, formData, (res) => {this.tableLoading = false;this.initFormData();}, this.exception_callback);
            },
            set_fromdata(){
                newModelForm.forEach((item, index) => {
                    delete this.modelFormData[item.key];
                    this.$set(this.modelFormData, item.key, newModelForm[index].value);
                    
                });
            },
            //table数据被删除
            row_delete (del_data) {
                //设置urL
                let uri = this.baseuri +'/' + del_data.id;
                this.tableLoading = true;
                //发送数据
                util.ajax.request('delete', uri, {}, {}, (res) => {this.tableLoading = false;this.initFormData();}, this.exception_callback);

            },
            //ajax请求返回值处理
            response_callback(res) {
                this.tableLoading = false;
                //this.totalsize = res.data.count;
                this.tableDatas = res.data.body;
                this.get_model_name_list(res.data.body);
            },
            //ajax请求错误异常处理
            exception_callback(err) {
                console.log(err);
            },
            //获取所有机种名model_name_list
            get_model_name_list(val){
                var model_name_list = new Array(val.length);
                for (var i = 0; i < val.length; i++) {
                    model_name_list[i] = {};
                    model_name_list[i].label = val[i].model_name;
                    model_name_list[i].value = val[i].model_name;
                }
                this.optionList = model_name_list;
            }

        },
        created: function (){
            this.newModelForm = newModelForm;
            this.initFormData();
            //parser.viewJson(viewData);
            //this.initFormDataVaildate();
        }
    }
</script>