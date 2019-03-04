<style>
    @import 'user_management.less';
</style>
<template> 
    <div>
        <!-- 搜索框-->
        <Input v-model="user_names" placeholder="输入用户名" style="width:300px;margin-bottom:20px;" icon="ios-search" @on-click='get_user_infor'/>
        <!--表格区域-->
        <Table border :columns="columns" :data="datas" id='user_table' ref='table'></Table>
        <page-table :count="totalsize" :nowPage='nowpage' @on-change="changePage" @on-page-size-change="changePageSize" id='page_css'></page-table>
        <!-- 表单区域
                    说明：因这可页面有添加和修改两个表单，为了省事，把两个表单合成一个、
                         修改表单 需要隐藏一些属性 ，提交的时候，js验证的也不一样，因此
                        下面的表单会有很多标签的隐藏和显示的切换。  
        -->
        <Form ref='user_form' :model='formItem'style='margin-top:60px;' class='form' v-if="type" :rules='rules'>
            <FormItem label='用户名' prop='username' class='form_user' >
                <Input v-model='formItem.username' placeholder='请输入用户名' required class='input' :readonly="readonlys" ></Input>
            </FormItem>
            <FormItem v-model='formItem.password' label='密码' prop='password' class='form_user' v-show='pass'>
                 <Input v-model='formItem.password' placeholder='6-12位字符' type='password' class='input'></Input>
            </FormItem>
            <FormItem label='确认密码' prop='re_password' type='password' class='form_user' v-show='pass'>
               <Input v-model='formItem.re_password' placeholder='6-12位字符' type='password' class='input'></Input>
            </FormItem>
            <FormItem label='用户级别' prop='user_levels' class='form_user'>
                <Select v-model='formItem.userlevel' style='width:144px;' @on-change='get_userlevel' v-show='use_jibie'>
                   <Option v-for='item in user_level' :value='item.id'>{{item.typename}}</Option>
                </Select>
                <Input v-model='formItem.jibie_value' v-show='jibie' style='width:144px;' readonly></Input>
                <label v-show='management_user'>组管理员：</label>
                <Select v-model='formItem.usermanagement' style='width:150px;' v-show='management_user'>
                   <Option v-for='management in user_manangement' :value='management.UserName'>{{management.UserName}}</Option>
                </Select>
                <label v-show='getment'>组管理员：</label>
                <Input v-model='formItem.gentment' v-show='getment' style='width:144px;' readonly></Input>
            </FormItem>
            <FormItem label='真实姓名' prop='re_name' class='form_user'>
                <Input v-model='formItem.re_name' placeholder='请输入姓名' class='input'></Input>
            </FormItem>

            <FormItem label='固定电话' prop='landline' class='form_user'>
                <Input v-model='formItem.landline' placeholder='请输入固定电话' class='input'></Input>
            </FormItem>
            <FormItem label='手机号码' prop='phone' class='form_user'>
                <Input v-model='formItem.phone' placeholder='请输入手机号码' class='input'></Input>
            </FormItem>
            <FormItem label='住址' prop='address' class='form_user'>
                <Input v-model='formItem.address' placeholder='请输入住址' class='input'></Input>
            </FormItem>
            <FormItem label='电子邮箱' prop='Email' class='form_user'>
                <Input v-model='formItem.Email' placeholder='请输入电子邮箱' class='input'></Input>
            </FormItem>
            <!-- 管理者的权限-->
            <FormItem label="查看权限" class='form_user look_power' prop='look_power' v-show='mgt'>
                <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="Home">主页</Checkbox>
                    <Checkbox label="Alerts List">警告列表</Checkbox>
                    <Checkbox label="Devices Location">设备定位</Checkbox>
                    <Checkbox label="Devices Log">设备日志</Checkbox>
                    <Checkbox label="Diagnostic Log">诊断日志</Checkbox>
                    <Checkbox label="GDM">通用设备管理</Checkbox>
                    <Checkbox label="Statistics">统计</Checkbox>
                    <Checkbox label="Device Report">设备报表</Checkbox>
                    <Checkbox label="Network Report">网络报表</Checkbox>
                    <Checkbox label="System Log">系统日志</Checkbox>
                    <Checkbox label="User Management">用户管理</Checkbox>
                    <Checkbox label="App Report" >应用报表</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="操作权限" class='form_user cation_power' prop='look_power' v-show='mgt'>
                <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="Device Management">设备管理</Checkbox>
                    <Checkbox label="Task">任务</Checkbox>
                    <Checkbox label="Firmware Images">固件</Checkbox>
                    <Checkbox label="Task-Configuration Files">任务-配置文件</Checkbox>
                    <Checkbox label="Bandwidth Control">带宽控制</Checkbox>
                    <Checkbox label="Profiles">配置文件</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <!-- 组查看者的权限-->
            <FormItem label="查看权限"  v-show='common'>
                <ul class="user_common">
                    <li style="margin-left:40px;">主页</li>
                    <li>警告列表</li>
                    <li>设备定位</li>
                    <li style="margin-left:100px;">设备日志</li>
                    <li>通用设备管理</li>
                    <li>统计</li>
                    <li style="margin-left:100px;">设备报表</li>
                    <li>网络报表</li>
                    <li>系统日志</li>
                    <li style="margin-left:100px;">LTE-Fi Flow</li>
                    <li>LTE-Fi定位</li>
                    <li>LTE-Fi轨迹</li>
                </ul>
            </FormItem>
            <FormItem label="操作权限" v-show='common'>
                <ul class="user_common">
                    <li style="margin-left:40px;">LTE-Fi 配置</li>
                    <li>LTE-Fi 用户设置</li>
                    <li>诊断报告上传</li>
                </ul>
            </FormItem>
            <FormItem label='备注' prop='remarks' class='form_user'>
                <Input v-model="formItem.remarks" type="textarea" placeholder="请输入用户备注信息" class='textarea'></Input>
            </FormItem>
            <FormItem>
                <!--此按钮提交的是新增用户-->
                <Button type="primary" style='margin-left:130px;' @click='SubmitInformation' v-show='add'>添加</Button>
                <!--此按钮提交的是修改用户-->
                <Button type="primary" style='margin-left:130px;' @click='Submit' v-show='update'>修改</Button>
                <Button style="margin-left: 8px;margin-left:100px">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import pageTable  from '../common/pagination/page-table.vue';

    export default {
        components: {
            pageTable
        },
        data () {
            return {
                baseuri:'/user-managements',
                user_names: '',
                type:false,
                formItem:{
                    'username':'',
                    'password':'',
                    're_password':'',
                    'userlevel':'',
                    'usermanagement':'',
                    're_name':'',
                    'landline':'',
                    'phone':'',
                    'address':'',
                    'Email':'',
                    'checkbox':[],
                    'remarks':'',
                    'jibie_value':'', 
                    'gentment':'',
                },
                management_user:true,
                mgt:false,
                common:true,
                hiddens:false,
                pass:true,
                readonlys:false,
                update:false,
                jibie:false,
                add:true,
                getment:false,
                use_jibie:true,
                nowpage:1,
                totalsize:0,
                page_size: 10,
                user_level:[],
                user_manangement:[],
                rules:{  // 添加表单的验证规则（修改表单没有规则，在后台做的验证）
                    username:[
                        {required:true,message:'用户名不能为空',trigger:'blur'},
                        {pattern:/^[0-9a-zA-Z]{1,12}?$/, message:'用户名12位字符以内', trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'密码不能为空',trigger:'blur'},
                        {pattern:/^[0-9a-zA-Z]{6,12}?$/, message:'密码6-12数字、字母', trigger:'blur'}
                    ],
                    re_password:[
                        {required:true,message:'确认密码不能为空',trigger:'blur'},
                    ],
                    re_name:[
                        {required:true,message:'真实姓名',trigger:'blur'},
                        {required:true,message:'请输入您的姓名'}
                    ],
                    phone:[
                        {required:true,message:'手机号码不能为空',trigger:'blur'},
                        {pattern:/^1[0-9]{10}?$/, message:'请输入正确的手机号码', trigger:'blur'}
                    ],
                    Email:[
                        {required:true,message:'邮箱不能为空',trigger:'blur'},
                        {pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}?$/, message:'请输入正确的邮箱格式', trigger:'blur'}
                    ]
                },
                columns: [
                    {
                        title:this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title:this.$t('UserName'), //用户名
                        align: 'center',
                        key: 'UserName'
                    },
                    {
                        title:this.$t('Power'), //权限
                        align: 'center',
                        key: 'Power'
                    },
                    {
                        title:this.$t('Group')+this.$t('Administrator'), //组管理员
                        align: 'center',
                        key: 'management'
                    },
                    {
                        title:this.$t('EMail'), //电子邮箱
                        align: 'center',
                        key: 'email'
                    },
                    {   
                        title:this.$t('Operate'), //操作
                        key: 'action',
                        width: 200,
                        align: 'center',
                        renderHeader:(h, params) => {
                            return  h('div',[
                                    h('AddIcon', {
                                        on: {
                                                'click': (vm) => { // 导出此页的用户信息
                                                    this.$refs.table.exportCsv({
                                                        filename: '用户信息表'
                                                    });
                                                }
                                            }
                                    }), 
                                    h('strong', this.$t('Operate')),
                                    h('AddButton', {
                                        on: {
                                                'click-button': (vm) => { // "+" 按钮操作，获取相应的数据
                                                    if(this.type){
                                                        this.type=false; //添加用户的表单消失
                                                    }else{
                                                        let infor = {
                                                            'flag':'get_all_nas',
                                                            'username':Cookies.get('user'), 
                                                        }
                                                        util.ajax.request('get',this.baseuri,infor,{}, this.get_all_nas, this.exception_callback);
                                                        this.type=true;
                                                        this.pass = true; //密码框出现
                                                        this.readonlys = false; //可修改
                                                        this.add = true; //添加按钮出现
                                                        this.update = false; //修改按钮消失
                                                        this.use_jibie = true; //用户级别消失
                                                        this.jibie = false;      //用户级别input
                                                        this.management_user = true; //管理者的下拉框
                                                        this.getment = false;
                                                        this.mgt = false;
                                                        this.common = true;
                                                        this.formItem = { //表单数据制空（防止添加用户的时候表单中有信息）
                                                            'username':'',
                                                            'password':'',
                                                            're_password':'',
                                                            'userlevel':'',
                                                            'usermanagement':'',
                                                            're_name':'',
                                                            'landline':'',
                                                            'phone':'',
                                                            'address':'',
                                                            'Email':'',
                                                            'checkbox':[],
                                                            'remarks':'',
                                                            'jibie_value':'', 
                                                            'gentment':'',
                                                        };
                                                    }
                                                }
                                            }
                                    }),  
                            ]);
                        },
                        render: (h, params) =>{   
                            return h('div', [
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small'
                                            },
                                            style: {
                                                marginRight: '5px',
                                                height:'30px',
                                                width:'60px'
                                            },
                                            on: {
                                                click: () => { //点击 编辑按钮 获得每个用户的详细信息
                                                    let infor = {
                                                        'flag':'get_user_infor_by_id',
                                                        'uid':params.row.id
                                                    }; 

                                                    util.ajax.request('get',this.baseuri,infor,{},this.get_one_user, this.exception_callback);
                                                }
                                            }
                                        }, '编辑'),//编辑按钮
                                        h('Poptip',{
                                        props: {
                                            confirm: true,
                                            title: '您确定要删除这条数据吗?',
                                            transfer: true
                                        },
                                        on: {
                                            'on-ok': (vm) => {  // 确认删除  用户的按钮
                                                var infor = {
                                                    'flag':'delete_one_user',
                                                    'username':Cookies.get('user'), 
                                                    'uid':params.row.id,
                                                    'index':params.index
                                                };
                                                util.ajax.request('post',this.baseuri ,{},infor,this.remove_data, this.exception_callback);
                                            }
                                        }
                                        }, [
                                            h('Button', {
                                                style: {
                                                    margin: '0 5px'
                                                },
                                                props: {
                                                    type: 'error',
                                                }
                                            }, '删除')//删除按钮
                                        ])
                                    ]);
                        },
                    }      
                ],
                datas: [] //表格数据
            }
        },
        methods:{
            // 根据用户名的搜索功能
            get_user_infor(){ 
                this.nowpage = 1; //把页面变成第一页
                if(this.user_names){
                    var infor = {
                            'flag':'get_one_user_information',
                            'username':Cookies.get('user'), 
                            'search':this.user_names,
                            'page_size':this.page_size,
                            '_page':1
                    }; 
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback); 
                }else{//查询条件为空时，默认为没有条件的查询
                    var infor = {
                            'flag':'get_all_user_information',
                            'username':Cookies.get('user'), 
                            'page_size':this.page_size,
                            '_page':1 
                        };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                }
            },
            //更换页码，获得对应页码的信息
            changePage(now_page){
                if(this.user_names){ //代表条件查询换页码
                    var infor = {
                            'flag':'get_one_user_information',
                            'username':Cookies.get('user'), 
                            'search':this.user_names,
                            'page_size':this.page_size, 
                            '_page':now_page
                    };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                }else{ //表示无条件查询更换页码
                        var infor = {
                            'flag':'get_all_user_information',
                            'username':Cookies.get('user'), 
                            'page_size':this.page_size,
                            '_page':now_page 
                        };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                }
                this.nowpage = now_page; //将页面数与更改后的页码数一致
            },
            //更换每页显示的行数
            changePageSize(page_size){
                if(this.user_names){ //代表条件查询换页码
                    var infor = {
                            'flag':'get_one_user_information',
                            'username':Cookies.get('user'), 
                            'search':this.user_names,
                            'page_size':page_size, 
                            '_page':1
                    };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                }else{ //表示无条件查询更换页码
                        var infor = {
                            'flag':'get_all_user_information',
                            'username':Cookies.get('user'), 
                            'page_size':page_size,
                            '_page':1 
                        };
                    util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                }
                this.nowpage = 1; //将页面数与更改后的页码数一致
                this.page_size = page_size; //将页面的每页条数和页码显示的一致
            },
            //ajax处理所获得的的NA用户
            get_all_nas(res){
                if (res.data ==2) {
                    this.user_level =[{'typename':'组查看者','id':3}];
                    this.management_user = false;
                }else{
                    this.user_level =[{'typename':'组管理员','id':1},{'typename':'组查看者','id':2}];
                    this.user_manangement = res.data;
                }
            },
            //ajax请求错误异常处理
            exception_callback(err) {
                this.$Message.error(err); 
            },
            //ajax请求返回值处理
            response_callback(res) {
                if(res.data.state){
                    this.$Message.error(res.data['data']);
                }else{
                    this.totalsize =parseInt( res.data.data['count']); //分页的总记录数
                    this.datas = res.data.data['data']; //填充表格数据
                }
            },
            //编辑按钮的数据处理
            get_one_user(res){
                if(res.data.state){
                    this.$Message.error(res.data['data']); 
                }else{
                    this.type = true;  //编辑表单出现
                    this.pass = false; //密码框消失
                    this.readonlys = true; //不可修改
                    this.add = false; //添加按钮消失
                    this.update = true; //修改按钮出现
                    this.use_jibie = false; //用户级别
                    this.jibie = true;      //用户级别input
                    this.management_user = false; //组管理员下拉框消失
                    if(res.data['data']['Power'] == 2){ //二级用户隐藏组管理员
                        this.getment = false; 
                        this.formItem.usermanagement = res.data['data']['management'];
                        this.formItem.checkbox = res.data['data']['permission_page'];
                        this.mgt=true; //多选框出现
                        this.common=false;
                    }else if(res.data['data']['Power'] == 1){
                        this.getment = true; 
                        this.formItem.gentment = res.data['data']['management'];
                        this.mgt=false; //多选框消失
                        this.common=true;
                        this.formItem.usermanagement = '';
                    } 
                    //以下是填充数据至表单中 
                    this.formItem.jibie_value = res.data['data']['jibie'];
                    this.formItem.username = res.data['data']['UserName'];
                    this.formItem.re_name = res.data['data']['real_name'];
                    this.formItem.landline = res.data['data']['landline_telephone'];
                    this.formItem.phone = res.data['data']['mobile_phone'];
                    this.formItem.address = res.data['data']['contact_address'];
                    this.formItem.Email = res.data['data']['email'];
                    this.formItem.remarks = res.data['data']['remarks'];
                }
            },
            // 更换组员的级别功能
            get_userlevel(event){
               if(event == 1){
                    this.management_user=false; //组管理员下拉框消失
                    this.mgt=true; //组管理员的多选框出现
                    this.common=false; //普通用的权限消失
                    this.formItem.checkbox=['Home','Alerts List','Devices Location','Devices Log','Diagnostic Log','GDM','Statistics','Device Report','Network Report','System Log','User Management','App Report','Device Management','Task','Firmware Images','Task-Configuration Files','Bandwidth Control','Profiles']; //默认的把所有的权限给二级用户
               }else if(event == 2){
                    this.management_user=true; 
                    this.mgt=false;
                    this.common=true;
                    this.formItem.checkbox=[];
               }
            },
            // 提交 新增 用户表单信息
            SubmitInformation(valid){
                this.$refs.user_form.validate((valid) => {
                    if(valid){
                        if(this.formItem.userlevel){
                            if((this.formItem.userlevel != 1)&& !this.formItem.usermanagement){ //检测是否有组管理员
                               this.$Message.error('请选择组管理员');  
                            }else{
                                if(this.formItem.password == this.formItem.re_password){//检测两次密码是否一致
                                    //将两次的密码简单的加密处理
                                    let string = '';
                                    for(var i=0;i<10;i++){
                                        string = string+Math.floor((Math.random()*10));
                                    }
                                    this.formItem.password = string+this.formItem.password;
                                    this.formItem.re_password = string+this.formItem.re_password;
                                    var infor = {
                                        'flag':'add_new_user_infor',
                                        'username':Cookies.get('user'),
                                        'data':this.formItem,
                                    };
                                    // post提交的数据位置是第四位，get请求的时候，数据可以直接写到对应的第三位参数位置 
                                    util.ajax.request('post',this.baseuri,{},infor,this.add_user,this.exception_callback);
                                }else{
                                   this.$Message.error('两次密码不一样');  
                                } 
                            }
                        }else{
                           this.$Message.error('请选择用户级别'); 
                        }  
                    } 
                })
            },
            // 提交修改表单用户信息
            Submit(){
                var infor = {
                    'flag':'update_new_user_infor',
                    'username':Cookies.get('user'),
                    'data':this.formItem,
                    };
                // post提交的数据位置是第四位，get请求的时候，数据可以直接写到对应的第三位参数位置 
                util.ajax.request('post',this.baseuri,{},infor,this.update_user,this.exception_callback);
            },
            // 处理 修改 表单提交的返回值
            update_user(res){ console.log(res.data);
                if(res.data.state){
                    this.$Message.error(res.data['data']);
                }else{
                    this.type=false; //表单消失
                    this.formItem = { //表单数据制空
                        'username':'',
                        'password':'',
                        're_password':'',
                        'userlevel':'',
                        'usermanagement':'',
                        're_name':'',
                        'landline':'',
                        'phone':'',
                        'address':'',
                        'Email':'',
                        'checkbox':[],
                        'remarks':'',
                        'jibie_value':'', 
                        'gentment':'',
                    };
                    this.$Message.success(res.data['data']);  
                }
            },
            // 删除用户的函数
            remove_data (res) {
                if(res.data.state){
                    this.$Message.error(res.data['data']);
                }else{
                    this.datas.splice(res.data['index'], 1);
                    this.totalsize = this.totalsize -1;
                    this.$Message.success(res.data['data']);
                }
            },
            //ajax处理 添加 表单提交的返回值
            add_user(res){
                if(res.data.state){ //添加信息失败，把密码变回原来的密码
                    this.formItem.password = this.formItem.password.substr(10);
                    this.formItem.re_password = this.formItem.re_password.substr(10);
                    //显示错误的信息
                    this.$Message.error(res.data['data']);
                }else{
                    this.type=false; //表单消失
                    this.formItem = { //表单数据制空
                        'username':'',
                        'password':'',
                        're_password':'',
                        'userlevel':'',
                        'usermanagement':'',
                        're_name':'',
                        'landline':'',
                        'phone':'',
                        'address':'',
                        'Email':'',
                        'checkbox':[],
                        'remarks':'',
                        'jibie_value':'', 
                        'gentment':'',
                    };
                    this.$Message.success(res.data['data']);
                }  
            }
        },
        created () {
            //刚进入页面渲染表格信息
            var infor = {
                        'flag':'get_all_user_information',
                        'username':Cookies.get('user'), 
                        'page_size':this.page_size  
            };
            util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
        }
    }
</script>



