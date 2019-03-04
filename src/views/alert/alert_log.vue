<style type="text/css">
	.fromitem{
		border-bottom:1px solid #CECECE;
		margin-top: -16px;
	}
	.label{
		width:200px;
		float: left;
		text-align: right;
		/*border-right: 1px solid #CECECE;	*/
		margin-right: 16px;
		height: auto;
	}
	.fromitem .ivu-checkbox-wrapper{
		float: left;
		width:200px;
		border:1px solid #CECECE;
	}
	.chechbox{
		float:left;
		max-width:860px !important;
	}
</style>
<template>
	<div>
		<Form>
			<FormItem prop='username' class='syslog'>
                <Label class='system'>警告日志</Label>
            </FormItem>
            <FormItem class='fromitem'>
            	<Label class='label'>组查看者：</Label>
            	<Select v-model="select" style="width:200px">
            		<Option value='全选' key='0'>全选</Option>
			        <Option v-for="item in managements" :value="item.user" :key="item.user">{{ item.user}}</Option>
			    </Select>
            </FormItem>
            <FormItem class='fromitem' > 
            	<Label class='label'>物理地址过滤：</Label>
            	<Input type='text' placeholder='请输入物理地址' style="float:left;width:200px;" v-model='mac'></Input>
            	<p style="float:left:margin-left:20px;">(AA:BB:CC:DD:EE:FF)</p>
            </FormItem>
            <FormItem class='fromitem'> 
            	<Label class='label'>日期过滤：</Label>
            	<Col span="3">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model='begin' format="yyyy年MM月dd日"></DatePicker>
                </Col>
                <Label style='float:left;margin-left:6px;width:30px;'>至</Label>
                <Col span="3">
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model='end' format="yyyy年MM月dd日"></DatePicker>
                </Col>
            </FormItem>
            <FormItem style='margin-top:-16px;'> 
            	<Button type="primary"  style='margin-left:530px;' @click='alert_submit'>确定</Button>
                <Button style="margin-left: 8px;margin-left:100px">取消</Button>
            </FormItem>
		</Form>
		<Table border :columns="columns" :data="datas" ref='table'></Table>
        <page-table :count="totalsize" :nowPage='nowpage' @on-change="changePage" @on-page-size-change="changePageSize" id='page_css'></page-table>
	</div>
</template>
<script type="text/javascript">
	import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import pageTable  from '../common/pagination/page-table.vue';

	export default {
		components: {
            pageTable,
            Cookies,
            util
        },
        data () {
            return {
            	select:'全选',
            	begin:'',
            	end:'',
                item:[],
                mac:'',
            	managements:[],
                columns:[
                    {
                        title: '顺序',
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '模板名称',
                        align: 'center',
                        key: 'model_name',
                        width: 140, 

                    },
                    {
                        title: '描述',
                        align: 'center',
                        key: 'log_desc',
                    },
                    {
                        title: '时间',
                        align: 'center',
                        key: 'time',
                        width: 170, 
                    },
                    {
                        title: '设备物理地址',
                        align: 'center',
                        key: 'mac_addr',
                        width: 170, 
                    },
                    {
                        title: '已处理',
                        align: 'center',
                        key: 'processed',
                        width: 100, 
                    }
                ],
                datas:[],
                nowpage:1,
                totalsize:0,
                page_size: 10,
                baseuri:'/alerts'
            }
        },
        methods:{
        	//ajax请求错误异常处理
            exception_callback(err) {
                this.$Message.error(err); 
            },
            //ajax请求返回值处理
            response_callback(res){
                if(res.data['user']['user_name']){
                    this.managements = res.data['user']['user_name'];
                }
                this.datas = res.data['log']['datas'];
                this.totalsize = parseInt(res.data['log']['count'][0]['count(id)']);
                //console.log(res.data);
            },
            changePage(aa){
                 //js获得当前的时间和一个星期之前的时间 格式 2018-09-07
                var date  = new Date(this.end); // 注意这里的表单时间获取的格式不是自己想要的，因此需要转化一下格式
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                this.end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                this.begin = year+'-'+mon+'-'+day;
                if(this.select == '全选'){
                    var looks = '';
                }else{
                    var looks = this.select;
                }
                // 获得mac
                var inforssss = {
                    'flag':'get_dev_log_information',
                    'username':Cookies.get('user'),
                    'mac_addr':this.mac,
                    'time_be':this.begin, 
                    'time_end':this.end,
                    'pages':aa,
                    'page_size':this.page_size,
                    'group_look':looks,  
                };
                this.nowpage = aa;
                util.ajax.request('get',this.baseuri,inforssss,{}, this.submit_callback, this.exception_callback);

            },
            changePageSize(bb){
                 //js获得当前的时间和一个星期之前的时间 格式 2018-09-07
                var date  = new Date(this.end); // 注意这里的表单时间获取的格式不是自己想要的，因此需要转化一下格式
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                this.end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                this.begin = year+'-'+mon+'-'+day;
                if(this.select == '全选'){
                    var looks = '';
                }else{
                    var looks = this.select;
                }
                // 获得mac
                var inforssss = {
                    'flag':'get_dev_log_information',
                    'username':Cookies.get('user'),
                    'mac_addr':this.mac,
                    'time_be':this.begin, 
                    'time_end':this.end,
                    'pages':this.nowpage,
                    'page_size':bb,
                    'group_look':looks,  
                };
                this.page_size = bb;
                util.ajax.request('get',this.baseuri,inforssss,{}, this.submit_callback, this.exception_callback);
            },
            alert_submit(){
                 //js获得当前的时间和一个星期之前的时间 格式 2018-09-07
                var date  = new Date(this.end); // 注意这里的表单时间获取的格式不是自己想要的，因此需要转化一下格式
                var year = date.getFullYear();
                var mon = (date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1);
                var day = date.getDate()<10?('0'+(date.getDate())):(date.getDate());

                this.end = year+'-'+mon+'-'+day;
                var dates = new Date(this.begin);

                var year = dates.getFullYear();
                var mon = (dates.getMonth()+1)<10?('0'+(dates.getMonth()+1)):(dates.getMonth()+1);
                var day = dates.getDate()<10?('0'+(dates.getDate())):(dates.getDate());
                this.begin = year+'-'+mon+'-'+day;
                if(this.select == '全选'){
                    var looks = '';
                }else{
                    var looks = this.select;
                }
                // 获得mac
                var inforssss = {
                    'flag':'get_dev_log_information',
                    'username':Cookies.get('user'),
                    'mac_addr':this.mac,
                    'time_be':this.begin, 
                    'time_end':this.end,
                    'pages':this.nowpage,
                    'page_size':this.page_size,
                    'group_look':looks,  
                };
                util.ajax.request('get',this.baseuri,inforssss,{}, this.submit_callback, this.exception_callback);
            },
            submit_callback(resul){
                if(resul.data['user']['user_name']){
                    this.managements = resul.data['user']['user_name'];
                }
                this.datas = resul.data['log']['datas'];
                this.totalsize = parseInt(resul.data['log']['count'][0]['count(id)']);
                console.log(resul.data);
            },
            checkAllGroupChange(aa){

                console.log(aa);
            }
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
            //刚进入页面获得表格的信息
            var infor = {
                        'flag':'get_dev_log_information',
                        'username':Cookies.get('user'),
                        'group_look':'',
                        'mac_addr':'',
                        'time_be':this.begin, 
                        'time_end':this.end,
                        'pages':1,
                        'page_size':this.page_size  
            };
            util.ajax.request('get',this.baseuri,infor,{}, this.response_callback, this.exception_callback);
        }
    }
</script>