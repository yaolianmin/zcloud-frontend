<style>
    @import '../user/user_management.less';
</style>
<template>
    <div>
          <Input v-model="mac_addr" placeholder="输入设备Mac地址" style="width:300px;margin-bottom:20px;" icon="ios-search" @on-click='get_device_infor'/>
           <Table border :columns="columns" :data="datas" id='user_table' ref='table'></Table>
            <div>
                <Tag type="dot" color="green" >Online </Tag>
                <Tag type="dot" color="yellow">Alert  </Tag>
                <Tag type="dot" color="red"   >Offline</Tag> 
                <page-table :count="totalsize" :nowPage='nowpage' @on-change="changePage" @on-page-size-change="changePageSize" id='page_css'></page-table>
            </div>
            <div>
                <Form ref='mac_addr' :model='formItem'style='margin-top:40px;' class='form' v-if="hides" >
                    <FormItem label='Mac地址' class='form_user' >
                        <Input v-model='formItem.mac'  required class='input' readonly ></Input>
                    </FormItem>
                    <FormItem  label='服务开始时间'  class='form_user'>
                        <DatePicker v-model='formItem.time_be' type='date'  class='input'></DatePicker>
                    </FormItem>
                    <FormItem label='服务结束时间'   class='form_user' >
                       <DatePicker v-model='formItem.time_end' type='date' class='input'></DatePicker>
                    </FormItem>
                    <FormItem label='经度' class='form_user'>
                        <Input v-model='formItem.re_y'  class='input'></Input>
                    </FormItem>

                    <FormItem label='纬度'  class='form_user'>
                        <Input v-model='formItem.re_x'  class='input'></Input>
                    </FormItem>
                    <FormItem label='备注1'  class='form_user'>
                        <Input v-model='formItem.remark1' class='input'></Input>
                    </FormItem>
                    <FormItem label='备注2'  class='form_user'>
                        <Input v-model='formItem.remark2' class='input'></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style='margin-left:130px;' @click='SubmitInformation'>修改</Button>
                        <Button style="margin-left: 8px;margin-left:100px">取消</Button>
                    </FormItem>
                </Form>
            </div>
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
        data(){
            return {
                baseuri:'/device-managements',
                mac_addr:'',
                totalsize:0,
                nowpage:1,
                page_size:10,
                hides:false,
                formItem:{
                    'mac':'',
                    'time_be':'',
                    'time_end':'',
                    're_y':'',
                    're_x':'',
                    'remark1':'',
                    'remark2':'',
                },
                columns:[
                    {
                        title:'位置',
                        type: 'index',
                        key: 'index',
                        align: 'center',
                        width:'65'
                    },
                    {
                        title: 'MAC地址',
                        key: 'mac_addr',
                        align: 'center',
                        width:'138'
                    },
                    {
                        title: '状态',
                        key: 'device_status',
                        align: 'center',
                        width:'126px',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.device_status == 1 ? 'green' : row.device_status == 2 ? 'yellow' : 'red';
                            const text = row.device_status == 1 ? 'Online' : row.device_status == 2 ? 'Alert' : 'Offline';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    width:'70',
                                    color: color
                                },
                            }, text);
                        }
                    },
                    {
                        title: '设备类型',
                        key: 'model_type',
                        align: 'center',
                        width:'90'
                    },
                    {
                        title: '设备名称',
                        key: 'model_name',
                        align: 'center'
                    },
                    {
                        title: '模板名称',
                        key: 'last_templet_name',
                        align: 'center',
                        width:'100px'
                    },
                    {
                        title: '结束日期',
                        key: 'service_end',
                        align: 'center',
                    },
                    {
                        title: '备注1',
                        key: 'dev_info1',
                        align: 'center',
                    },
                    {
                        title: '备注2',
                        key: 'dev_info2',
                        align: 'center',
                    },
                    {
                        title: '组',
                        key: 'group_name',
                        align: 'center',
                    },
                    {
                        title: '组查看者',
                        key: 'user_name',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'handle',
                        width: '170',
                        align: 'center',
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
                                            this.hides = true;
                                            this.formItem.mac = params.row.mac_addr;
                                            this.formItem.time_be = params.row.service_start;
                                            this.formItem.time_end = params.row.service_end;
                                            this.formItem.re_y = params.row.pox_Y;
                                            this.formItem.re_x = params.row.pos_X;
                                            this.formItem.remark1 = params.row.dev_info1;
                                            this.formItem.remark2 = params.row.dev_info2;
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
                                                    'flag':'delete_device_mac',
                                                    'user':Cookies.get('user'),
                                                    'mac_addr':params.row.mac_addr
                                                };
                                                util.ajax.request('get',this.baseuri, infor, {}, this.delete_callback, this.exception_callback);
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
                datas:[],
            }  
        },
        methods:{
            // 搜索框操作
            get_device_infor(){
                if(this.mac_addr){
                    var params = {
                        'flag':'get_user_device',
                        'pages':1,
                        'page_size':this.page_size,
                        'condition':this.mac_addr,
                        'user':Cookies.get('user')
                    };
                    this.nowpage = 1;
                    util.ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
                }
            },
            // ajax返回处理函数
            response_callback(res){
                this.datas = res.data['data'];
                this.totalsize = parseInt(res.data['count']);
            },
            // 下一页操作 
            changePage(pag){
                var params = {
                    'flag':'get_user_device',
                    'pages':pag,
                    'page_size':this.page_size,
                    'condition':this.mac_addr,
                    'user':Cookies.get('user')
                };
                this.nowpage = pag;
                util.ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
            },
            // 改变每一页的大小操作
            changePageSize(sizes){
                var params = {
                    'flag':'get_user_device',
                    'pages':this.nowpage,
                    'page_size':sizes,
                    'condition':this.mac_addr,
                    'user':Cookies.get('user')
                };
                this.page_size = sizes;
                util.ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
            },
            // ajax删除设备返回操作
            delete_callback(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']); 
                }else{
                    this.$Message.success(res.data['message']);
                    this.$router.push({
                            name: 'dev_list'
                    });
                }
            },
            // 修改按钮
            SubmitInformation(){
                var date  = new Date(this.formItem.time_be); // 注意这里表单的时间格式不对，因此需要转化一下格式 2018-09-07
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());
                var beg = year+'-'+mon+'-'+day;

                var date  = new Date(this.formItem.time_end); // 注意这里表单的时间格式不对，因此需要转化一下格式 2018-09-07
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());
                var end = year+'-'+mon+'-'+day;

                if(beg > end){
                    this.$Message.error('您的服务时间不合理，请重新设置');
                }else{
                    if(!this.formItem.mac){
                        this.$Message.error('请您添加设备名称后再提交');
                    }else{
                        var infor ={
                            'flag':'update_mac_infor',
                            'user':Cookies.get('user'),
                            'mac':this.formItem.mac,
                            'time_be':beg,
                            'time_end':end,
                            're_x':this.formItem.re_x,
                            're_y':this.formItem.re_y,
                            'remark1':this.formItem.remark1,
                            'remark2':this.formItem.remark2,

                        };
                        util.ajax.request('get', this.baseuri, infor, {}, this.update_callback, this.exception_callback);
                    }
                }
            },
            update_callback(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']);

                }else{
                    this.$Message.success(res.data['message']); 
                    this.hides = false;
                    var params = {
                        'flag':'get_user_device',
                        'pages':this.nowpage,
                        'page_size':this.page_size,
                        'condition':this.mac_addr,
                        'user':Cookies.get('user')
                    };
                    util.ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
                }
            }  
        },
        created: function() {
            var params = {
                'flag':'get_user_device',
                'pages':1,
                'page_size':10,
                'condition':'',
                'user':Cookies.get('user')
            };
            util.ajax.request('get', this.baseuri, params, {}, this.response_callback, this.exception_callback);
        }
    }

</script>
