<style type="text/css">
	#top_dev{
		border:1px solid CECECE;
		height:30px;
		background-color:#F8F8F9;
		line-height: 30px;
		margin-left: 2px;

	}
	.rad{
		margin-top:-24px;
	}
    #page_css{
        float: right;
        text-align: 
    }
    #common_dev{
       /* border:1px solid red;*/
        width:360px;
        text-align: center;
        margin:0 auto;
        margin-top: 30px;

    }
    #common_dev input{

        width:200px;
    }
</style>

<template>

	<div> 
		 <div id='top_dev'>设备列表</div>
		 <Table border :columns="columns" :data="datas" id='user_table' ref='table'></Table>
		<Page :total="count" show-total show-elevator   :current='nowPage' id = 'page_css' @on-change='change_now_page'></Page>
	   <div style="margin-top:50px;">
	     	<div id='top_dev'>通用设备列表</div>
		    <Table border :columns="columns2" :data="datas2" id='user_table' ref='table2'></Table>
            <div>
                <Tag type="dot" color="green" >Online </Tag>
                <Tag type="dot" color="yellow">Alert  </Tag>
                <Tag type="dot" color="red"   >Offline</Tag> 
                <Page :total="count2" show-total show-elevator  :current='nowPage2' id = 'page_css'></Page>
            </div>

	   </div>
       <!--添加通用设备信息-->
       <div id='common_dev' v-show='add_shebei'>
            <Form :model="formItem" :label-width="80">
                <FormItem label="物理地址">
                    <Input v-model="formItem.add_mac_addr" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="IP地址">
                    <Input v-model="formItem.add_ip" placeholder="Enter something..."></Input>
                </FormItem>
                 <FormItem label="设备mac地址" v-if='eidt_id'>
                    <Input v-model="formItem.amc_management" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="位置信息">
                    <Input v-model="formItem.add_indexof" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="描述信息">
                    <Input v-model="formItem.add_desc" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" style='margin-left:-30px;' @click='Submit_add'>添加</Button>
                    <Button style="margin-left: 8px;margin-left:100px">取消</Button>
                </FormItem>

            </Form>
       </div>
       <!--编辑通用设备-->
        <div id='common_dev' v-show='edit_shebei'>
            <Form :model="formItem_edit" :label-width="80">
                <FormItem label="物理地址">
                    <Input v-model="formItem_edit.edit_mac" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="IP地址">
                    <Input v-model="formItem_edit.edit_ip" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="位置信息">
                    <Input v-model="formItem_edit.edit_infor" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="描述信息">
                    <Input v-model="formItem_edit.edit_desc" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="id" v-if='eidt_id'>
                    <Input v-model="formItem_edit.edit_ids" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" style='margin-left:-30px;' @click='Submit_edit'>修改</Button>
                    <Button style="margin-left: 8px;margin-left:100px">取消</Button>
                </FormItem>

            </Form>
        </div>
	</div>
</template>
<script type="text/javascript">
    import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import devStatus  from '../common/tag/tag-devstatus.vue';
	export default{
		data(){
			return {
                add_shebei:false,
                edit_shebei:false,
                formItem:{
                    add_mac_addr:'',
                    add_ip:'',
                    add_indexof:'',
                    add_desc:'',
                    amc_management:''
                },
                 formItem_edit:{
                    edit_mac:'',
                    edit_ip:'',
                    edit_infor:'',
                    edit_desc:'',
                    edit_ids:''
                },
				columns: [
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '选择', //用户名
                        align: 'center',
                        width:150,
                        key: 'choose',
                        render: (h, params) =>{  
                            let fa = false;
                            return h('div', [
                                        h('Radios', {
                                        	props:{
                                        		lineHeight:40
                                        	},
                                        	on: {
                                                click: () => { //点击 编辑按钮 获得每个用户的详细信息
                                                	let ids = params.row.index -1;
                                                	var length = document.getElementsByClassName('radius').length;
                                                	for(var i=0; i<length; i++){
                                                		if( i != ids){
                                                			document.getElementsByClassName('radius')[i].style.display = 'none';
                                                			document.getElementsByClassName('radius2')[i].style.display = 'inline-block';	
                                                		}
                                                	}
                                                    if(document.getElementsByClassName('radius')[ids].style.display == 'none'){
                                                   		document.getElementsByClassName('radius')[ids].style.display = 'inline-block';
                                                   		document.getElementsByClassName('radius2')[ids].style.display = 'none';
                                                         this.formItem.amc_management = params.row.mac_addr;
                                                    }else{
                                                    	document.getElementsByClassName('radius')[ids].style.display = 'none';
                                                    	document.getElementsByClassName('radius2')[ids].style.display = 'inline-block';
                                                       this.formItem.amc_management = '';
                                                    }
                                                }
                                            }

                                        })
                                    ]);
                        },
                    },
                    {
                        title: '物理地址', //权限
                        align: 'center',
                        width:'40%',
                        key: 'mac_addr'
                    },
                    {
                        title:'模块名称', //组管理员
                        align: 'center',
                        key: 'model_name'
                    },
                    {
                        title:'在线状态', //组管理员
                        align: 'center',
                        key: 'device_status',
				        render: (h, params) => {
				            const row = params.row;
				            const color = row.device_status == 1 ? 'green' : row.device_status == 2 ? 'yellow' : 'red';
				            const text = row.device_status == 1 ? 'Online' : row.device_status == 2 ? 'Alert' : 'Offline';

				            return h('Tag', {
				                props: {
				                    type: 'dot',
				                    color: color
				                },
				            }, text);
				        }
                    }
                ],
                datas:[],
                columns2:[
                	{
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '物理地址', //物理地址
                        key: 'management_dev_mac',
                        align: 'center',
                    },
                    {
                        title:'IP地址', //顺序
                        key: 'management_dev_ip',
                        align: 'center',
                    },
                    {
                        title: '管理设备物理地址', //顺序
                        key: 'dev_mac',
                        align: 'center',
                    },
                    {
                        title:'位置信息', //顺序
                        key: 'magement_position',
                        align: 'center',
                    },
                    {
                        title:'描述信息', //顺序
                        key: 'management_comment',
                        align: 'center',
                    },
                    {
                        title: '在线状态', //顺序
                        key: 'statue',
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.statue == 1 ? 'green' : row.statue == 2 ? 'yellow' : 'red';
                            const text = row.statue == 1 ? 'Online' : row.statue == 2 ? 'Alert' : 'Offline';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                },
                            }, text);
                        }
                    },
                    {
                        title:'操作', //顺序
                        key: 'edit',
                        align: 'center',
                        width:'200',
                        renderHeader:(h, params) => {
                            return  h('div',[
                                    h('strong', this.$t('Operate')),
                                    h('AddButton', {
                                        on: {
                                                'click-button': (vm) => { // "+" 按钮操作，获取相应的数据
                                                     this.add_shebei = true;
                                                     this.edit_shebei = false;
                                       
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

                                                    this.add_shebei = false;
                                                    this.edit_shebei = true;
                                                    this.formItem_edit.edit_mac = params.row.management_dev_mac;
                                                    this.formItem_edit.edit_ip = params.row.management_dev_ip;
                                                    this.formItem_edit.edit_infor = params.row.magement_position;
                                                    this.formItem_edit.edit_desc =  params.row.management_comment;
                                                    this.formItem_edit.edit_ids = params.row.id;
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
                                                //初始化数据
                                                var infor = {
                                                    'flag':'delete_common_device',
                                                    'dev_id':params.row.id,
                                                    'username':Cookies.get('user'),
                                                };
                                                util.ajax.request('post',this.baseuri,{},infor, this.response_delete_back, this.exception_callback);
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
                            ])
                        }
                    }
                ],
                datas2:[],
                count:1,
                nowPage:1,
                count2:1,
                nowPage2:1,
                totalsize:1,
                page_size: 10,
                eidt_id:false,
                baseuri:'/common-devs'
			}
		},
		methods:{
			change_now_page(pa){
                //刚进入页面渲染表格信息
                var infor = {
                            'flag':'get_common_dev_infor',
                            'username':Cookies.get('user'), 
                            'pages':pa,
                            'page_size':10,  
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
    			},
			// changePageSize(){
				
			// },
            response_callback(res){
                //表示有问题
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    this.datas = res.data['device'];
                    this.datas2 = res.data['common_dev'];
                    this.count = parseInt(res.data['dev_count']);
                    this.count2 = res.data['com_count'];
                } 
            },
            //添加通用设备信息
            Submit_add(){
                //guo率不合理的数据
                const mac_regs = /^[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}$/;
                const ip_reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                const rel = mac_regs.test(this.formItem.add_mac_addr);
                const rel_ip = ip_reg.test(this.formItem.add_ip);
                if(!rel){
                    this.$Message.error('mac格式不正确，请重新填写');
                }
                if(!rel_ip){
                    this.$Message.error('IP地址格式不正确,请重新填写');
                }
                if(!this.formItem.amc_management){
                    this.$Message.error('请您选择一个设备管理');
                }else{
                    //初始化数据
                    var infor = {
                        'flag':'add_common_device',
                        'manage_mac':this.formItem.add_mac_addr,
                        'mac_ip':this.formItem.add_ip,
                        'mac_index':this.formItem.add_indexof,
                        'mac_desc':this.formItem.add_desc,
                        'dev_mac':this.formItem.amc_management,
                        'username':Cookies.get('user'),
                    };
                    util.ajax.request('post',this.baseuri,{},infor, this.response_add_back, this.exception_callback);
                }
            },
            // 添加设备的返回函数
            response_add_back(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    this.edit_shebei = false;
                    this.formItem_edit.edit_mac = '';
                    this.formItem_edit.edit_ip = '';
                    this.formItem_edit.edit_infor = '';
                    this.formItem_edit.edit_desc = '';
                    this.formItem_edit.edit_ids ='';
                }
            },
            // 编辑按钮的提交
            Submit_edit(){
                //guo率不合理的数据
                const mac_regs = /^[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}$/;
                const ip_reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                const rel = mac_regs.test(this.formItem_edit.edit_mac);
                const rel_ip = ip_reg.test(this.formItem_edit.edit_ip);
                if(!rel){
                    this.$Message.error('mac格式不正确，请重新填写');
                }
                if(!rel_ip){
                    this.$Message.error('IP地址格式不正确,请重新填写');
                }
                if(!this.formItem_edit.edit_ids){
                    this.$Message.error('这个设备没有id选择，请刷新网页');
                }else{
                    //初始化数据
                    var infor = {
                        'flag':'edit_common_device',
                        'manage_mac':this.formItem_edit.edit_mac,
                        'mac_ip':this.formItem_edit.edit_ip,
                        'mac_index':this.formItem_edit.edit_infor,
                        'mac_desc':this.formItem_edit.edit_desc,
                        'edit_id':this.formItem_edit.edit_ids,
                        'username':Cookies.get('user'),
                    };
                    util.ajax.request('post',this.baseuri,{},infor, this.response_edit_back, this.exception_callback);
                }
            },
            response_edit_back(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    location.reload() 
                }
             console.log(res.data);
            },
            response_delete_back(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    location.reload() 
                }
            }
		},
        created () {
            //刚进入页面渲染表格信息
            var infor = {
                        'flag':'get_common_dev_infor',
                        'username':Cookies.get('user'), 
                        'pages':1,
                        'page_size':10,  
            };
            util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
        },
       
	}
</script>