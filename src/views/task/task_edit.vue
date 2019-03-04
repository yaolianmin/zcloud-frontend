<template>
    <div>
        <div style="height:280px;">
            <Form ref='user_form' :model='formItem' style='margin-top:10px;' class='form' >
                <FormItem label='描述' prop='description' class='form_user' >
                    <Input v-model='formItem.description'  required class='input'></Input>
                </FormItem>
                <FormItem label='任务类型' class='form_user' >
                    <Select v-model='formItem.task_type' style='width:360px;' @on-change='get_task_type'>
                        <Option value='1'>重启</Option>
                        <Option value='2'>固件更新</Option>
                        <Option value='3'>模板下发</Option>
                        <Option value='4'>诊断</Option>
                    </Select>
                </FormItem>
                <FormItem label='调度方式'  class='form_user' >
                    <Select v-model='formItem.select_type' style='width:360px;' @on-change='change_select_type'>
                        <Option value='1'>立即</Option>
                        <Option value='2'>预约</Option>
                    </Select>
                </FormItem>
                <FormItem prop='username' class='form_user'  label='时间' v-if='ifshow'>
                    <Date-picker type="datetime" placeholder="选择日期和时间" style="width: 200px"  v-model='formItem.time'></Date-picker>
                </FormItem> 
                <FormItem>
                    <Button type="primary" style='margin-left:130px;' @click='submit_task'>添加</Button>
                    <Button style="margin-left: 8px;margin-left:100px">取消</Button>
                </FormItem>  
            </Form>
        </div>
        <div >
            <Table border :columns="columns1" :data="datas1"  ref='table' v-show='table_page1'></Table>
            <Table border :columns="columns2" :data="datas2"  ref='table' v-show='table_page2'></Table>
            <Table border :columns="columns3" :data="datas3"  ref='table' v-show='table_page3'></Table>
            <Table border :columns="columns4" :data="datas4"  ref='table' v-show='table_page4'></Table>
            <page-table :count="totalsize" :nowPage='nowpage'  id='page_css'  v-show='task_types'></page-table>
        </div>
    </div>
</template>
<script type="text/javascript">
    import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import pageTable  from '../common/pagination/page-table.vue';
    export default {
        components: {
            pageTable
        },
        data () {
            return {
                formItem:{
                    description:'',
                    task_type:'',
                    select_type:'',
                    time:'',
                },
                baseuri:'/task-managements',
                ifshow:false,
                page_size:10,
                totalsize:0,
                nowpage:1,
                table_mac:[], //这个数据是固件更新的时候提交的表格数据
                table_info:{}, //这个数据是固件更新的时候提交的表格数据
                table_mac1:[], //这个数据是模板下发的时候提交的表格数据
                table_info1:{}, //这个数据是模板下发的时候提交的表格数据
                task_types:false,
                table_page1:false,
                table_page2:false,
                table_page3:false,
                table_page4:false,
                // 重启方式的表格
                columns1:[
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title:'模板名称',
                        align: 'center',
                        key: 'model_name'
                    },
                    {
                        title:'MAC地址',
                        align: 'center',
                        key: 'mac_addr'
                    },
                    {
                        title:'重启',
                        align: 'center',
                        render:(h,params) => { 
                            return h('div',[ 
                                h('Checkbox',{ 
                                    props:{ 
                                        value:'是',
                                    }, 
                                    on: { 
                                        'on-change': (vm)=>{
                                            var infor = {
                                                'flag':'edit_task_reboot', //哪种操作动作
                                                'username':Cookies.get('user'), //操作者
                                                'reboot_id':params.row.id, // 重启的设备id
                                                'status':vm,               //是否重启
                                            };
                                            util.ajax.request('post',this.baseuri,{},infor,this.edit_callback, this.exception_callback);
                                        }
                                    }, 
                                },'是') 
                            ]) 
                        }

                    },
                ],  
                //固件更新
                columns2:[
                    {
                        title:'设备类型',
                        align: 'center',
                        key: 'model_name'
                    },
                    {
                        title:'MAC地址',
                        align: 'center',
                        key: 'mac_addr'
                    },
                    {
                        title:'设备描述',
                        align: 'center',
                        key: 'dev_info1'
                    },
                    {
                        title:'升级',
                        align: 'center',
                        width: 100, 
                        render:(h,params) => { 
                            return h('div',[ 
                                h('Checkbox',{ 
                                    props:{ 
                                        value:'',
                                    }, 
                                    on: { 
                                        'on-change': (vm)=>{
                                            /*
                                             * 说明：此处的值不能获得table表格中input框更改后的值，
                                             *      只能获得当前的勾选状态，同理，当input内容改变
                                             *      时，也无法获得当前的勾选状态，只能获得当前更改的
                                             *      内容，因此，当两个状态发生改变的时候，需要把对方的信息
                                             *      绑定起来，这里用到了json数据的更改
                                             */   
                                            if(vm){
                                                this.table_mac.push(params.row.mac_addr);
                                                if(!(params.row.mac_addr in this.table_info)){ // 判断这个数据是否在json数据中
                                                    this.table_info[params.row.mac_addr] = params.row.fw_path;

                                                }  
                                            }else{
                                                var len = this.table_mac.length;
                                                for(var i=0;i<len;i++){
                                                    if(params.row.mac_addr == this.table_mac[i]){
                                                        this.table_mac.splice(i,1);
                                                    }
                                                }
                                            }
                                        }
                                    }, 
                                },'') 
                            ]) 
                        }
                    },
                    {
                        title:'固件下载路径',
                        align: 'center',
                        render:(h,params) => {
                            return h('Input',{
                                props: {
                                    value:params.row.fw_path,
                                    size:'small',
                                    type:'text'
                                },
                                on:{
                                    'on-blur':(vm)=>{
                                       // vm.target.value 是修改后input的值
                                       this.table_info[params.row.mac_addr] = vm.target.value;
                                    }
                                }
                            })
                        }
                    },
                ],
                //模板下发
                columns3:[
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title:'设备类型',
                        align: 'center',
                        key: 'model_type',
                        width: 100, 
                    },
                    {
                        title:'MAC地址',
                        align: 'center',
                        key: 'mac_addr'
                    },
                    {
                        title:'设备型号',
                        align: 'center',
                        key: 'model_name'
                    },
                    {
                        title:'模板属性',
                        align: 'center',
                        key: 'tmp_type',
                        width: 100, 
                    },
                    {
                        title:'模板名称',
                        align: 'center',
                        key: 'tmp_name',
                        render: (h, params) => {
                            return h('Select', {
                                props:{
                                    value: params.row.tmp_name[0]['templet_name'],
                                },
                                on: {
                                    'on-change':(event) => {
                                        
                                    }
                                },
                            },

                            params.row.tmp_name.map(function (aa) {//
                                    return h('Option', {
                                        props: {
                                            value: aa.templet_name//绑定的值
                                        }
                                    }, aa.templet_name);//显示的值
                            })
                            );
                        }
                    },
                    {
                        title:'下发',
                        align: 'center',
                        key: 'hair',
                        width: 100, 
                        render:(h,params) => {
                            return h('Checkbox',{ 
                                    props:{ 
                                        value:'',
                                    }, 
                                    on: { 
                                        'on-change': (vm)=>{
                                            /*
                                             * 说明：此处的值不能获得table表格中input框更改后的值，
                                             *      只能获得当前的勾选状态，同理，当input内容改变
                                             *      时，也无法获得当前的勾选状态，只能获得当前更改的
                                             *      内容，因此，当两个状态发生改变的时候，需要把对方的信息
                                             *      绑定起来，这里用到了json数据的更改
                                             */   
                                            if(vm){
                                                this.table_mac1.push(params.row.mac_addr);
                                                if(!(params.row.mac_addr in this.table_info)){ // 判断这个数据是否在json数据中
                                                    this.table_info[params.row.mac_addr] = params.row.fw_path;

                                                }  
                                            }else{
                                                var len = this.table_mac.length;
                                                for(var i=0;i<len;i++){
                                                    if(params.row.mac_addr == this.table_mac[i]){
                                                        this.table_mac.splice(i,1);
                                                    }
                                                }
                                            }
                                        }
                                    }, 
                                },'') 
                        }
                    },
                ], 
                //诊断
                columns4:[
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title:'模块名称',
                        align: 'center',
                        key: 'Power'
                    },
                    {
                        title:'MAC地址',
                        align: 'center',
                        key: 'management'
                    },
                    {
                        title:'设备描述',
                        align: 'center',
                        key: 'management'
                    },
                    {
                        title:'诊断',
                        align: 'center',
                        key: 'email',
                        render:(h,params) => { 
                            return h('div',[ 
                                h('Checkbox',{ 
                                    props:{ 
                                        value:'是'
                                    }, 
                                    on: { 
                                        'on-change': ''
                                        
                                    }, 
                                },'是') 
                            ]) 
                        }
                    },
                ],
                datas1:[],
                datas2:[],
                datas3:[],
                datas4:[],
            }
        },
        methods:{
            // 选择任务的类型
            get_task_type(type){
                if(type == '1'){
                    this.task_types = true;
                    this.table_page1 = true;
                    this.table_page2 = false;
                    this.table_page3 = false;
                    this.table_page4 = false;
    
                }else if(type == '2'){
                    this.task_types = false;
                    this.table_page1 = false;
                    this.table_page2 = true;
                    this.table_page3 = false;
                    this.table_page4 = false;
            
                }else if(type == '3'){
                    this.task_types = true;
                    this.table_page1 = false;
                    this.table_page2 = false;
                    this.table_page3 = true;
                    this.table_page4 = false;

                }else if(type == '4'){
                    this.task_types = true;
                    this.table_page1 = false;
                    this.table_page2 = false;
                    this.table_page3 = false;
                    this.table_page4 = true;
                }

                if(!document.getElementById('group_').innerHTML){
                    alert('请先添加网站头部的组名');
                }else{
                    var infor = {
                        'flag':'get_task_type_information', //哪种操作动作
                        'task_type':type, //任务类型
                        'pages':1,  // 从哪行开始
                        'page_size':this.page_size, //每页显示的条数
                        'username':Cookies.get('user'), //操作者
                        'grop_look':document.getElementById('group_user').innerHTML, // 组查看者
                        'grop_name':document.getElementById('group_').innerHTML, // 组名
                    };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                } 
            },
            response_callback(res){
                switch(res.data['task_type']){
                    case 1:   // 重启
                        this.datas1 = res.data.data;
                        break;
                    case 2:  //固件更新
                        this.datas2 = res.data.data;
                        break;
                    case 3:  //模板下发
                        this.datas3 = res.data.data;
                        break;
                    case 4:  //诊断
                        this.datas4 = res.data.data;
                        break;
                }
                this.totalsize = parseInt(res.data['count']);
               
                console.log(res.data);
            },
            change_select_type(type){
                if(type == '1'){
                    this.ifshow = false;
                }else if(type == '2'){
                    this.ifshow = true;
                }
            },
            //提交任务按钮操作
            submit_task(){
                if(this.formItem.description){ // 任务描述
                    if(this.formItem.select_type){ 
                        if(this.formItem.select_type == 2){// 表示预约。此时需要处理时间的格式
                            var date  = new Date(this.formItem.time); // 换成时间戳提交
                            var times = date.getTime(); 
                        }
                        this.formItem.time = times;
                        var group_look = document.getElementById('group_user').innerHTML; // 组查看者
                        var grop_name = document.getElementById('group_').innerHTML;      // 组名
                        // 判断哪种 任务类型
                        switch(this.formItem.task_type){ 
                            case '1':   // 重启
                                var infor = {
                                    'flag':'submit_task_information', //哪种操作动作
                                    'data':this.formItem, 
                                    'username':Cookies.get('user'),   //操作者
                                    'grop_look':group_look,
                                    'grop_name':grop_name
                                };
                                break;
                            case '2':  // 固件更新
                                var infor = {
                                    'flag':'fw_upgrade_update_info',
                                    'form_data':this.formItem,
                                    'table_mac':this.table_mac, // 表格提交的mac数据
                                    'table_info':this.table_info, // 表格提交的路径数据
                                    'username':Cookies.get('user'), 
                                    'grop_look':group_look,
                                    'grop_name':grop_name 
                                };
                                break;
                            case '3': // 模板下发
                                var infor = {
                                    'flag':'submit_task_information', 
                                    'data':this.formItem, 
                                    'username':Cookies.get('user'), 
                                    'grop_look':group_look,
                                    'grop_name':grop_name
                                };
                                break;
                            case '4': // 诊断
                                var infor = {
                                    'flag':'submit_task_information', 
                                    'data':this.formItem, 
                                    'username':Cookies.get('user'), 
                                    'grop_look':group_look,
                                    'grop_name':grop_name
                                };
                                break;
                            default:
                                this.$Message.error('请选择任务的类型');
                        }
                        // 发送ajax请求
                        if(this.formItem.select_type){

                            util.ajax.request('post',this.baseuri,{},infor,this.submit_callback, this.exception_callback);
                        }
                    }else{
                        this.$Message.error('请选择任务的调度方式');
                    }
                }else{
                    this.$Message.error('请添加任务的名称');
                }
            },
            submit_callback(res){

                console.log(res.data);
            },
            edit_callback(res){
                if(!res.data['state']){
                    this.$Message.success(res.data['data']);
                }
                console.log(res.data);
            }
        }
    }
</script>















































































































<!-- <template>
    <div>
        <div>
            <Row>
            <search-form @on-change="handleSearch"></search-form>
            <task_edit-table v-model="tableData" 
                        :columnsList="tableColumns" 
                        :isLoading="tableLoading"
                        @on-change="select_all" 
                        @select-one="select_one"
                        :optionsList="selectList"
                        @change_button_status="change_editbutton_status" 
                        style="margin-top: 10px">
            </task_edit-table> 
                <page-table 
                    :count="totalsize" 
                    @on-change="changePage" 
                    @on-page-size-change="changePageSize">
                </page-table>
            </Row>
        </div>
        <Row v-if="edit_task_button != 'none'">
            <Col span="8" offset="7">
                <task_edit-form
                        ref="formRef"
                        v-model="modelFormData"
                        :formItems="newModelForm"
                        :formDataVaildate="formDataVaildate"
                        @on-click-submit="formSubmit"
                        @select-changed="selectChanged"
                        >
                </task_edit-form>
            </Col>
        </Row> 
    </div>
</template>
<script>
    import searchForm from '../common/search/input-search.vue';
    import task_editForm from '../common/form/best-form.vue';
    import task_editTable from '../common/table/table-list.vue';
    import pageTable  from '../common/pagination/page-table.vue';
    import task_editModel_th from './task_edit.js';
    import util  from '../../libs/util.js';

    var current_username = document.cookie.split(";")[0].split("=")[1];//定义全局变量获取当前登录用户名
    export default {
        components: {
            searchForm,
            task_editForm,
            task_editTable,
            pageTable

        },
        data () {
            return {
                newModelForm: [],
                modelFormData: {},
                formDataVaildate:{
                    description:[
                        { required: true, message: 'Please enter task description!', trigger: 'change' }
                    ],
                    task_type: [
                        { required: true, message: 'Please enter task type name!', trigger: 'change' }
                    ],
                    fw_path: [
                        { required: true, message: 'Please enter ftp server!', trigger: 'change' }
                    ],
                    templet_name: [
                        { required: true, message: 'Please enter ftp server!', trigger: 'change' }
                    ]
                },
                tableData: [],
                tableColumns: [],
                totalsize: 0,
                page_size: 10,
                select_taskType:'',
                tableLoading:false,
                table_rowdata:[],
                edit_task_button:"none",
                baseuri: '/task-managements',
                selectList: {
                    templet_name: [
                        {
                            value: 'default1',
                            label: 'default1',
                            selectable: true
                        },
                        {
                            value: 'default2',
                            label: 'default2'
                        },
                        {
                            value: 'default3',
                            label: 'default3'
                        },
                        {
                            value: 'default4',
                            label: 'default4'
                        }
                    ]
                }
            }
        },
        methods: {
            //切换页码
            changePage (current) {
                let uri = this.baseuri +'/' + 'task_edit_view';
                let params = {
                    username: current_username,
                    page: current,
                    limit: this.page_size
                };
                this.tableLoading = true;
                util.ajax.request('get', uri, params, {}, this.response_callback, this.exception_callback);
            },
            //改变pagesize
            changePageSize (page_size) {
                let uri = this.baseuri +'/' + 'task_edit_view';
                this.page_size = page_size;
                let params = {
                    username: current_username,
                    limit: this.page_size
                };
                this.tableLoading = true;
                util.ajax.request('get', uri, params, {}, this.response_callback, this.exception_callback);
            },
            //依据mac地址模糊查询搜索设备
            handleSearch:function (val) {
                let uri = this.baseuri +'/' + 'task_edit_view';
                let params = {
                    username: current_username,
                    mac_addr_like: val,
                    limit: this.page_size
                };
                util.ajax.request('get', uri, params, {}, this.response_callback, this.exception_callback);
            },
            select_all: function(){
                console.log("this select all");
            },
            select_one: function (selection){
                 //选中了才能赋值
                if(selection){
                   this.table_rowdata = selection; 
                }
                //console.log(this.table_rowdata);
            },
            //控制显示任务编辑表单
            change_editbutton_status: function (event) {
                if(this.edit_task_button =="none"){
                        this.edit_task_button = "show";
                }else{
                        this.edit_task_button = "none";
                }
            },
            selectChanged: function(event){
                if(event === "now")
                {
                    if(this.select_taskType === "templet"){
                        task_editModel_th.task_editModel_templet[4].type = "none";
                    }else if(this.select_taskType === "firmware"){
                        task_editModel_th.task_editModel_fw[4].type = "none";
                    }else{
                        task_editModel_th.task_editModel_one[3].type = "none";
                    }
                }else if(event === "schedule-on"){
                    if(this.select_taskType === "templet"){
                        task_editModel_th.task_editModel_templet[4].type = "DatePicker";
                    }else if(this.select_taskType === "firmware"){
                        task_editModel_th.task_editModel_fw[4].type = "DatePicker";
                    }else{
                       task_editModel_th.task_editModel_one[3].type = "DatePicker";
                    }
                }else if(event === "templet"){
                    this.newModelForm = task_editModel_th.task_editModel_templet;
                    this.select_taskType = event;
                    //这里可以在一开始加载页面时，获取某类设备的已有模板
                    task_editModel_th.task_editModel_templet[2].options = this.selectList.templet_name;   
                }else if(event === "firmware"){
                    //task_editModel_th.task_editModel_fw[2].value = this.table_rowdata[0]["fw_path"];
                    this.newModelForm = task_editModel_th.task_editModel_fw;
                    this.select_taskType = event;
                    
                    //console.log(this.table_rowdata[0]["fw_path"]);
                }else if(event === "reboot" || event === "diagnostic"){
                    this.newModelForm = task_editModel_th.task_editModel_one;
                    this.select_taskType = event;
                }
            },
            //切换任务类型标签
            tab_task_handle (event) {
                console.log('########tab task event############',event);
                if(event === 0){
                    this.tableData = this.get_tabledata();    
                    //this.tableColumns = task_editModel_th.templet_tableColumns;
                }else if(event === 1){
                    this.tableData = this.get_tabledata();
                    //this.tableColumns = task_editModel_th.firmware_tableColumns;
                }else if(event === 2 || event === 3){
                    this.tableData = this.get_tabledata();
                    //this.tableColumns = task_editModel_th.reboot_tableColumns;
                }
            },
            get_tabledata:function(){
                 //根据不同任务类型去读取不同任务内容
                let params = {
                    username: current_username,
                    limit: this.page_size,
                    //task_type:task_type
                };
                //设置urL
                let uri = this.baseuri +'/' + 'task_edit_view';
                this.tableLoading =false;
                util.ajax.request('get', uri, params, {}, this.response_callback, this.exception_callback);
            },
            //表单提交
            formSubmit: function (vaild, formDataObject) {
                if (vaild){
                    console.log(this.table_rowdata[0]);
                    if(this.table_rowdata.length != 0)
                    {
                        //数组里面有多个设备应该多少提交？还是后台做处理
                       // let formData = new FormData();
                        formDataObject.execute_time = this.date_change(formDataObject.execute_time);
                        // for(var i=0;i<this.table_rowdata.length;i++){
                        //     this.$set(formDataObject, 'group_name', this.table_rowdata[i]["group_name"]);
                        //     this.$set(formDataObject, 'reviewer', this.table_rowdata[i]["user_name"]);
                        //     this.$set(formDataObject, 'username', current_username);
                        //     this.$set(formDataObject, 'device_mac', this.table_rowdata[i]["mac_addr"]);
                        //     this.$set(formDataObject, 'status', 'success');
                        //     console.log(formDataObject);
                        //     let formData = JSON.parse(JSON.stringify(formDataObject));
                        //     util.ajax.request('post',  this.baseuri, {}, formData, this.response_callback, this.exception_callback);
                        // }

                        this.$set(formDataObject,'select_table_rowdata',this.table_rowdata);
                        //从模板任务和固件更新任务切换时，要清除之前的formDataObject中的模板名和固件更新的ftp server地址
                        if(formDataObject.task_type === "reboot" ||formDataObject.task_type === "diagnostic"){
                            delete formDataObject.templet_name;
                            delete formDataObject.fw_path;
                        }
                        let formData = JSON.parse(JSON.stringify(formDataObject));
                        // let params = {
                        //     username: current_username,
                        //     select_table_rowdata:this.table_rowdata
                        // };
                        util.ajax.request('post',  this.baseuri, {}, formData, this.response_callback, this.exception_callback);
                        console.log(formDataObject);
                        this.$Message.success('Success !');
                    }else{
                        this.$Message.error('请选择要下发任务的设备 ！！!');
                    }
                    
                }else{
                    this.$Message.error('Failed !');
                }
            },
            //将UTC时间 转换成 2018-03-16 00:00:00 格式
            date_change(i_date) {
                var date = new Date(i_date);
                var Y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var H = date.getHours();
                var i = date.getMinutes();
                var s = date.getSeconds();
                if (m < 10) {
                    m = '0' + m;
                }
                if (d < 10) {
                    d = '0' + d;
                }
                if (H < 10) {
                    H = '0' + H;
                }
                if (i < 10) {
                    i = '0' + i;
                }
                if (s < 10) {
                    s = '0' + s;
                }
                var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
                return t;
            },
            //ajax请求返回值处理
            response_callback(res) {
                this.tableLoading = false;
                this.tableData = res.data.body;
                this.totalsize = Number(res.data.count);
                console.log(res.data.body);
                console.log("this is response_callback");
            },
            //ajax请求错误异常处理
            exception_callback(err) {
                console.log(err);
            }
        },
        created: function (){
                this.newModelForm = task_editModel_th.task_editModel_one;
                this.tableData = this.get_tabledata();
                this.tableColumns = task_editModel_th.templet_tableColumns;
        },
        watch: {
            tableColumns (data) {

                console.log("##this is watch###\n");
            }
        }
    }
</script> -->