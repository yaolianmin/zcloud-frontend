<style type="text/css">
    .system{
        font-size: 14px !important;
        font-family: "微软雅黑";
        margin-left: 10px;
    }
    .syslog{
        border:1px solid #CECECE;
    }
    .syslog_two{
        margin-top:-20px !important;
        border-bottom:1px solid #CECECE;
        border-right: 1px solid #CECECE;
    }
    .system_power .ivu-checkbox-group-item{
        width:250px;
        margin-left: -6px;
        border-right: 1px solid #CECECE;
        border-bottom:1px solid #CECECE;
    }
    .system_power{
         margin-top:-20px !important;
    }
    #page_css{
       position: relative;
    }
</style>
<template>
    <div>
         <Form>
            <FormItem prop='username' class='syslog'>
                <Label class='system'>系统日志</Label>
            </FormItem>
             <FormItem prop='username' class='syslog_two'>
                <Label style='float:left;margin-right:10px;'>过滤日期：</Label>
                <Col span="3">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model='begin' format="yyyy年MM月dd日"></DatePicker>
                </Col>
                <Label style='float:left;margin-left:46px;width:30px;'>至</Label>
                <Col span="3">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model='end' format="yyyy年MM月dd日"></DatePicker>
                </Col>
            </FormItem>
            <FormItem style='margin-left:4px;'>
                <CheckboxGroup class='system_power' v-model='powers'>
                    <Checkbox label="syslog_usermgt">用户管理</Checkbox>
                    <Checkbox label="syslog_userloginout">用户登录/退出</Checkbox>
                    <Checkbox label="syslog_templetoper">模板操作</Checkbox>
                    <Checkbox label="syslog_downloadfile">下载文件</Checkbox>
                    <Checkbox label="syslog_alert">系统警告</Checkbox>
                    <Checkbox label="syslog_taskmgt">任务管理</Checkbox>
                    <Checkbox label="syslog_devicemgt">设备管理</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem class='system_power'>
                <Button type="primary" @click='Submit' style='margin-left:530px;'>确定</Button>
                <Button style="margin-left: 8px;margin-left:100px">取消</Button>
            </FormItem>
        </Form>
        <!--表格区域-->
        <Table border :columns="columns" :data="datas" ref='table'></Table>
        <page-table :count="totalsize" :nowPage='nowpage' @on-change="changePage" @on-page-size-change="changePageSize" id='page_css'></page-table>
        <div style="height:20px;float:left;margin-top:60px;"></div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import util  from '../../libs/util.js';
import pageTable  from '../common/pagination/page-table.vue';

    export default {
        components: {
            pageTable
        },
        data() {
            return {
                nowpage:1,
                totalsize:0,
                page_size: 10,
                begin:'',
                end:'',
                powers:['syslog_usermgt','syslog_userloginout','syslog_templetoper','syslog_downloadfile','syslog_alert','syslog_taskmgt','syslog_devicemgt'],
                columns:[
                     {
                        title: '顺序',
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '日志描述',
                        align: 'center',
                        key: 'log_desc'

                    },
                    {
                        title: '日志时间',
                        align: 'center',
                        key: 'log_time',
                        width: 300, 
                    },
                    {
                        title: '日志来源',
                        align: 'center',
                        key: 'log_source',
                        width: 300,
                        renderHeader:(h, params) => {
                            return  h('div',[
                                    h('AddIcon', {
                                        on: {
                                                'click': (vm) => { // 导出此页的日志信息生成.csv文件
                                                    this.$refs.table.exportCsv({
                                                        filename: '日志信息表'
                                                    });
                                                }
                                            }
                                    }), 
                                    h('strong', '操作'),
                            ]);
                        },
                    }
                ], 
                datas:[],  
                baseuri:'/system-logs',
            } 
        },
        methods:{
            //表单提交数据
            Submit(){
                var date  = new Date(this.end); // 注意这里表单的时间格式不对，因此需要转化一下格式 2018-09-07
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                var end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                var begin = year+'-'+mon+'-'+day;
                
                var infor = {
                    'flag':'get_all_user_system_information', //哪种操作动作
                    'powers':this.powers, //赛选条件
                    'begin':begin, //起始时间
                    'ends':end,  //结束时间
                    'pages':1,  // 从哪行开始
                    'page_size':this.page_size, //每页显示的条数
                    'username':Cookies.get('user'), //操作者
                    'language':Cookies.get('language'), //语言种类 
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                this.nowpage = 1; 
            },
            //改变页码
            changePage(now_page){
                var date  = new Date(this.end); // 注意这里表单的时间格式不对，因此需要转化一下格式 2018-09-07
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                var end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                var begin = year+'-'+mon+'-'+day;

                var infor = {
                    'flag':'get_all_user_system_information', //哪种操作动作
                    'powers':this.powers, //赛选条件
                    'begin':begin, //起始时间
                    'ends':end,  //结束时间
                    'pages':now_page,  // 从哪行开始
                    'page_size':this.page_size, //每页显示的条数
                    'username':Cookies.get('user'), //操作者
                    'language':Cookies.get('language'), //语言种类 
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);  
                this.nowpage = now_page;
            },
            //改变每页显示的大小
            changePageSize(page_size){
                this.nowpage = 1;
                var date  = new Date(this.end); // 注意这里表单的时间格式不对，因此需要转化一下格式 2018-09-07
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                var end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                var begin = year+'-'+mon+'-'+day;

                var infor = {
                    'flag':'get_all_user_system_information', //哪种操作动作
                    'powers':this.powers, //赛选条件
                    'begin':begin, //起始时间
                    'ends':end,  //结束时间
                    'pages':1,  // 从哪行开始
                    'page_size':page_size, //每页显示的条数
                    'username':Cookies.get('user'), //操作者
                    'language':Cookies.get('language'), //语言种类 
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);  
                this.page_size = page_size;
            },
            //ajax请求错误异常处理
            exception_callback(err) {
                this.$Message.error(err); 
            },
            //ajax请求返回值处理
            response_callback(res){
               this.totalsize = res.data['count'];
               this.datas = res.data['data'];
               console.log(res.data);
            },    
        },
        created () {
            //js获得当前的时间和一个星期之前的时间 格式 2018-09-07
                var date  = new Date(); // 注意这里的表单时间获取的格式不是自己想要的，因此需要转化一下格式
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                this.end = year+'-'+mon+'-'+day;
                var dates = new Date(date.getTime() - 7 * 24 * 3600 * 1000);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                this.begin = year+'-'+mon+'-'+day;

           //刚进入页面渲染表格信息
            var infor = {
                    'flag':'get_all_user_system_information', //哪种操作动作
                    'powers':'', //赛选条件
                    'begin':this.begin, //起始时间
                    'ends':this.end,  //结束时间
                    'pages':1,  // 从哪行开始
                    'page_size':10, //每页显示的条数
                    'username':Cookies.get('user'), //操作者
                    'language':Cookies.get('language'), //语言种类 
                };
            util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback); 
        } 
    }
</script>