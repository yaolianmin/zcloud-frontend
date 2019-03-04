<template>
    <div>
        <!-- 搜索框-->
        <Input v-model="mac_addr" placeholder="输入mac地址" style="width:300px;margin-bottom:20px;" icon="ios-search" @on-click='get_user_infor' />
        <Table border :columns="columns" :data="datas" id='user_table' ref='table'></Table>
        <page-table :count="totalsize" :nowPage='nowpage'  @on-change="changePage" @on-page-size-change="changePageSize" id='page_css'></page-table>
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
                baseuri: '/task-managements',
                page_size:10,
                totalsize:0,
                mac_addr:'',
                nowpage:1,
                columns: [
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '描述',
                        align: 'center',
                        key: 'description'
                    },
                    {
                        title:'MAC地址',
                        align: 'center',
                        key: 'device_mac'
                    },
                    {
                        title:'执行时间',
                        align: 'center',
                        key: 'execute_time'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status'
                    },
                    {   
                        title: this.$t('Operate'), //操作
                        key: 'action',
                        width: 200,
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
                                                    if(params.row.status =='success'){
                                                        alert('任务已完成，不能编辑');
                                                    }else if(params.row.status =='running'){
                                                        alert('任务正在执行，不能编辑');
                                                    }else if(params.row.status =='failed'){

                                                    }
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
                datas: [], //表格数据 
            }
        }, 
        methods:{
            response_callback(res){
                if(res.data['data']){
                    this.datas = res.data['data']; 
                    this.totalsize =parseInt(res.data['count']); //分页的总记录数
                }
            },
            // 切换页面
            changePage(now_page){
                var infor = {
                    'flag':'get_task_information',
                    'username':Cookies.get('user'), 
                    'page_size':this.page_size,
                    'where':this.mac_addr,
                    'pages':now_page,  
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
                this.nowpage = now_page;
            },
            // 切换页面的显示条数
            changePageSize(page_size){
                var infor = {
                    'flag':'get_task_information',
                    'username':Cookies.get('user'), 
                    'page_size':page_size,
                    'where':this.mac_addr,
                    'pages':1,  
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);

                this.nowpage = 1; //将页面数与更改后的页码数一致
                this.page_size = page_size; //将页面的每页条数和页码显示的一致
            },
            // mac地址查找
            get_user_infor(){
                var infor = {
                    'flag':'get_task_information',
                    'username':Cookies.get('user'), 
                    'page_size':this.page_size,
                    'where':this.mac_addr,
                    'pages':this.nowpage,  
                };
                 util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);  
            }
                
        },
        created () {
             //刚进入页面渲染表格信息
            var infor = {
                'flag':'get_task_information',
                'username':Cookies.get('user'), 
                'page_size':this.page_size,
                'where':'',
                'pages':1,  
            };
            util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
        }   
    }
</script>