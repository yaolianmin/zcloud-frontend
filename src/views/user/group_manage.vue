<style type="text/css">
    .look_group{
        max-width: 600px;
        position: relative; 
        top:20px;
        left:50%;
        margin-left:-200px; 
    }
    .look_group label{
        width:90px;
    }
    .looks_group .ivu-select-dropdown{
        position: absolute;
        top:35px !important;
        left: 0px;
    }
    .inputs label{
        float: left !important;
    }
    .inputs .ivu-input-type{
        width:200px;
        margin-left: -26px;
        float: left;
    }
</style>
<template>
    <div>
        <Table border :columns="columns" :data="datas" id='user_table' ref='table'></Table>
        <!--添加组设备-->
        <div v-if='add_group' style="margin-bottom:160px;" class='look_group'>
            <div class="looks_group">   
                <label>组管理员：</label>
                <Select v-model="model1" style="width:200px" @on-change='change_management'>
                    <Option v-for="item in cityList" :value="item.management" :key="item.management">{{ item.management }}</Option>
                </Select>
            </div>
            <div style="margin-top:20px;">   
                <label>组查看者：</label>
                <Select v-model="model12" style="width:200px">
                    <Option v-for="items in group_look" :value="items.value" :key="items.value">{{ items.value }}</Option>
                </Select>
            </div>
            <div style="margin-top:20px;width:100%" class="inputs">
                <label>组名：</label>
                <Input v-model='groupname' placeholder='请输入组名' required ></Input>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;" class="inputs">
                <label>备注：</label>
                <Input v-model='remarks' placeholder='组名备注信息'></Input>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;">
                <Button type="primary" style='' @click='Submit1'>确定</Button>
                <Button style="margin-left:100px">取消</Button>
            </div>
        </div>
        <!--查看组设备-->
        <div v-if='look_group' style="margin-bottom:160px;" class='look_group'>
            <div class="looks_group inputs">   
                <label style='line-height:30px;'>组管理员：</label>
                <Input v-model='mgt' placeholder='请输入组名' readonly ></Input>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;" class="looks_groups">   
                <label>组查看者：</label>
                <Select v-model="model123" style="width:200px" @on-change='get_gourps'>
                    <Option v-for="itemss in group_look" :value="itemss.value" :key="itemss.value">{{ itemss.value }}</Option>
                </Select>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;width:100%" class="inputs">
                <label>组名：</label>
                <RadioGroup v-model="single">
                   <Radio v-for='gps in groupss' :label="gps.value"></Radio>
                </RadioGroup>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:30px;">
                <Button type="primary" style='' @click='Submit2'>确定</Button>
                <Button style="margin-left:120px">取消</Button>
            </div>
        </div>
        <!--编辑组设备-->
        <div v-if='edit_group' class='look_group'>
            <div class="looks_group inputs">   
                <label style='line-height:30px;'>组管理员：</label>
                <Input v-model='mgt' placeholder='请输入组名' readonly ></Input>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;" class="looks_groups">   
                <label>组查看者：</label>
                <Select v-model="model1234" style="width:200px" @on-change='get_gourpss'>
                    <Option v-for="itemsss in group_looks" :value="itemsss.value" :key="itemsss.value">{{ itemsss.value }}</Option>
                </Select>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;width:100%" class="">
                <label>组名：</label>
                <RadioGroup v-model="singles" @on-change='get_name_infor'>
                   <Radio v-for='gps in groupsss' :label="gps.value"></Radio>
                </RadioGroup>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:40px;" class="edit_inpit inputs" v-show='infors'> 
                <label style='line-height:30px;'>组名：</label>
                <Input v-model='groupnam' placeholder='请输入组名'></Input>
            </div>
            <div style="clear:both;"></div>
            <div style="margin-top:20px;" class="edit_inpit inputs" v-show='infors'> 
                <label style='line-height:30px;'>备注：</label>
                <Input v-model='groupnam_remark' placeholder='请输入组名备注'></Input>
            </div>
            <Input v-if='group_id' v-model='group_ids'></Input>
            <div style="clear:both;"></div>
            <div style="margin-top:30px;" v-show='infors'>
                <Button type="primary" style='' @click='Submit3'>确定</Button>
                <Button style="margin-left:120px" @click='Submit4' type='error'>删除</Button>
            </div>
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
                baseuri:'/group-managements',
                add_group:false,
                look_group:false,
                edit_group:false,
                single:'',
                singles:'',
                mgt:'',
                show:true,
                groupss:[],
                columns: [
                    {
                        title: this.$t('Order'), //顺序
                        key: 'index',
                        align: 'center',
                        width: 150, 
                    },
                    {
                        title: '组管理者', //用户名
                        align: 'center',
                        key: 'management'
                    },
                    {   
                        title: this.$t('Operate'), //操作
                        key: 'action',
                        width: 300,
                        align: 'center',
                        renderHeader:(h, params) => {
                            return  h('div',[
                                    h('strong', this.$t('Operate')),
                                    h('AddButton', {
                                        on: {
                                                'click-button': (vm) => { // "+" 按钮操作，获取相应的数据
                                                    if(this.add_group){
                                                        this.add_group = false;
                                                        this.look_group = false;
                                                        this.edit_group = false;
                                                    }else{
                                                        this.add_group = true;
                                                        this.look_group = false;
                                                        this.edit_group = false;

                                                        this.cityList = this.datas;
                                                        this.model1 = document.getElementById('group_managemant').innerHTML;
                                                        if(this.model1){ //防止意外，没有组管理者
                                                            var infor = {
                                                                'flag':'get_group_lookers',
                                                                'user':this.model1
                                                            } 
                                                            util.ajax.request('get',this.baseuri,infor,{}, this.back_group, this.exception_callback);
                                                        }else{
                                                            this.$Message.error('你还没有组管理员，请联系管理员');
                                                        }
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
                                                size: 'small',
                                                id:'bianji'
                                            },
                                            style: {
                                                marginRight: '5px',
                                                height:'30px',
                                                width:'60px'
                                            },
                                            on: {
                                                click: () => { //点击 编辑按钮 获得每个用户的详细信息
                                                    this.add_group = false;
                                                    this.look_group = false;
                                                    this.edit_group = true;
                                                    this.infors = false;

                                                    this.mgt = params.row.management;
                                                    if(this.mgt){ //防止意外，没有组管理者
                                                        var infor = {
                                                            'flag':'get_group_lookers',
                                                            'user':params.row.management
                                                        } 
                                                        util.ajax.request('get',this.baseuri,infor,{}, this.back_look_g, this.exception_callback);
                                                    }else{
                                                        this.$Message.error('你还没有组管理员，请联系管理员');
                                                    }

                                                }
                                            }
                                        }, '编辑'),//编辑按钮 
                                        h('Button', {
                                            props: {
                                                type: 'primary',
                                                size: 'small',
                                            },
                                            style: {
                                                marginRight: '5px',
                                                height:'30px',
                                                width:'60px',
                                            },
                                            on: {
                                                click: () => { //点击 查看按钮 获得每个用户的详细信息
                                    
                                                        this.add_group = false;
                                                        this.look_group = true;
                                                        this.edit_group = false;

                                                        this.mgt = params.row.management;
                                                        if(this.mgt){ //防止意外，没有组管理者
                                                            var infor = {
                                                                'flag':'get_group_lookers',
                                                                'user':params.row.management
                                                            } 
                                                            util.ajax.request('get',this.baseuri,infor,{}, this.back_look_group, this.exception_callback);
                                                        }else{
                                                            this.$Message.error('你还没有组管理员，请联系管理员');
                                                        }
                                                }
                                            }
                                        }, '提交'),//编辑按钮
                                    ]);
                        },
                    }    
                ],
                datas: [],
                cityList: [],
                group_look:[],
                model1: '',
                model12:'',
                model123:'',
                groups:'',
                groupname:'',
                remarks:'',
                groupnam:'',
                groupnam_remark:'',
                infors:false,
                group_ids:'',
                group_id:false,
                model1234:'',
                groupsss:'',
                group_looks:[],

            };
        },
    	methods:{
            //ajax请求错误异常处理
            exception_callback(err) {
                this.$Message.error(err); 
            },
            call_back(res){
                // 表示三级用户
                if(!res.data['user_poewer']){
                    document.getElementById('dis').style.display = 'none';
                }
                //console.log(document.getElementById('group_name').children[1].value);
                this.datas = res.data['manages']; 
                document.getElementById('group_name').children[1].value =  res.data['group']['usr_grp_sel_group'];
                document.getElementById('group_managemant').innerHTML = res.data['group']['usr_grp_sel_mgt'];
                document.getElementById('group_user').innerHTML = res.data['group']['usr_grp_sel_reviewer'];
                document.getElementById('group_').innerHTML = res.data['group']['usr_grp_sel_group'];
            },
            //添加组名按钮
            Submit1(){
                if(this.groupname.length<25){ // 不让组名的长度过长
                    var infor = {
                        'flag':'store_group_name',
                        'management':this.model1,
                        'group_look':this.model12,
                        'group_name':this.groupname,
                        'remarks':this.remarks
                    }
                    util.ajax.request('post',this.baseuri,{},infor,this.back, this.exception_callback);
                }else{
                    this.$Message.error('组名长度过长')
                }
            },
            // 处理每个组管理的查看者和组名
            back_group(res){
                if(res.data){
                    this.group_look = res.data['group_look'];
                    this.model12 = res.data['group_look'][0]['value']; 
                }
            },
            change_management(managements){
                var infor = {
                    'flag':'get_group_lookers',
                    'user':managements
                } 
                util.ajax.request('get',this.baseuri,infor,{}, this.back_group, this.exception_callback);
            },
            back(res){
                this.$Message.success(res.data);
            },
            call_group(res){
                 var length = res.data['group_name'][this.model123].length; // 获得该查看者的多少组名
                    var arr = [];
                    for(var i=0;i<length;i++){
                       arr.push({'value':res.data['group_name'][this.model123][i]});
                    }
                    this.groupss = arr;
            },
            call_group_name(res){
                this.singles = '';
                if(!this.infors){console.log(res.data);

                    // var length = res.data.group_name[this.model1234].length; // 获得该查看者的多少组名
                    // var arr = [];
                    // for(var i=0;i<length;i++){
                    //     arr.push({'value':res.data.group_name[this.model1234][i]});
                    // }
                    //this.groupsss = arr;
                    this.groupsss = res.data;
                    
                }else{ // 这里特别的注意，因刚点击编辑按钮，已经触发了事件，当点击组名后再次的更改组查看者，就会报错
                    var infor = {
                        'flag':'get_group_look_group_name',
                        'groupname':this.model1234
                    };
                    util.ajax.request('get',this.baseuri,infor,{}, this.back_groups, this.exception_callback);
                }


            },
            back_groups(res){
                this.groupsss = res.data;
                this.groupnam = '';
                this.groupnam_remark = '';
                this.group_ids = '';
                this.single = '';
            },
            // 处理查看组名的ajax函数
            back_look_group(res){
                if(res.data){ 
                    this.group_look = res.data['group_look'];
                    this.model123 = res.data['group_look'][0]['value']; 
                    var length = res.data['group_name'][this.model123].length; // 获得该查看者的多少组名
                    var arr = [];
                    for(var i=0;i<length;i++){
                       arr.push({'value':res.data['group_name'][this.model123][i]});
                    }
                    this.groupss = arr;
                }
            },
            // 处理编辑组名的ajax函数
            back_look_g(res){
                if(res.data){
                    this.group_looks = res.data['group_look'];
                    this.model1234 = res.data['group_look'][0]['value']; 
                    var length = res.data['group_name'][this.model1234].length; // 获得该查看者的多少组名
                    var arr = [];
                    for(var i=0;i<length;i++){
                       arr.push({'value':res.data['group_name'][this.model1234][i]});
                    }
                    this.groupsss = arr;
                }
            },
            // 获得每个组查看者的组名
            get_gourps(group_looks){
                var infor = {
                    'flag':'get_group_loogk_group_name',
                    'group_look':group_looks
                }
                util.ajax.request('get',this.baseuri,infor,{}, this.call_group, this.exception_callback);
            },
            // 获得每个组查看者的组名
            get_gourpss(group_lookss){
                var infor = {
                    'flag':'get_group_look_group_name',
                    'groupname':group_lookss
                };
                util.ajax.request('get',this.baseuri,infor,{}, this.call_group_name, this.exception_callback);
            },
            get_name_infor(aa){
                if(document.getElementById('dis').style.display !='none'){ // 表示三级用户以上，
                    var infor = {
                        'flag':'get_group_name_infor',
                        'group_look':this.model1234,
                        'group_name':aa
                    };
                    util.ajax.request('get',this.baseuri,infor,{}, this.get_infor, this.exception_callback);
                }else{
                    this.$Message.error('您无权编辑组名');
                }
            },
            Submit2(){
                if(this.single){
                    var infor = {
                        'flag':'submit_group_name',
                        'self':Cookies.get('user'),
                        'management':this.mgt,
                        'look':this.model123,
                        'group_n':this.single
                    };
                    util.ajax.request('post',this.baseuri,{},infor, this.back_come, this.exception_callback);
                }else{
                    this.$Message.error('请选择某个组名后再提交');
                }
            },
            back_come(res){
                document.getElementById('group_name').children[1].value =  this.single;
                document.getElementById('group_managemant').innerHTML = this.mgt;
                document.getElementById('group_user').innerHTML = this.model123;
                document.getElementById('group_').innerHTML = this.single;
                this.look_group = false;
            },
            get_infor(res){
                this.infors = true;
                this.groupnam = res.data['name'];
                this.groupnam_remark = res.data['remark'];
                this.group_ids = res.data['id'];
            },
            // 组名的修改提交按钮
            Submit3(){
               if(this.groupnam){
                    if(this.group_ids){
                        var infor = {
                            'flag':'updata_group_name_infor',
                            'look':this.model1234,
                            'group_id':this.group_ids,
                            'groupnames':this.groupnam,
                            'remark':this.groupnam_remark
                        };
                        util.ajax.request('post',this.baseuri,{},infor, this.update_back_come, this.exception_callback);
                    }else{
                        this.$Message.error('您修改的这条记录没有id');
                    }
               }else{
                    this.$Message.error('组名不能为空')
               }
            },
            update_back_come(res){
                if(res.data =='success'){
                    this.edit_group = false;
                    this.infors = false;
                    this.$Message.success('操作成功');
                }
            },
            //删除组名的操作
            Submit4(){
                if(confirm('are you sure delete this group')){
                    //判断此次删除的是否是网站头部已选中的组名,故需要把网站的组名带上       
                    if(this.group_ids){
                        var infor = {
                            'flag':'delete_group',
                            'user':Cookies.get('user'),
                            'group_id':this.group_ids,
                            'mgter':document.getElementById('group_managemant').innerHTML,
                            'group_names':document.getElementById('group_').innerHTML,
                            'groupers':document.getElementById('group_user').innerHTML,
                        }
                        util.ajax.request('post',this.baseuri,{},infor, this.delete_back_come, this.exception_callback);
                    }else{
                        this.$Message.error('此条组名没有id,无法删除');
                    }
                }
            },
            delete_back_come(res){
                if(res.data.state){ //表示需要去除头部的组名
                    document.getElementById('group_name').children[1].value = '';
                    document.getElementById('group_managemant').innerHTML = '';
                    document.getElementById('group_user').innerHTML = '';
                    document.getElementById('group_').innerHTML = '';
                }else{
                    this.$router.push({
                            name: 'group_manage'
                    });
                }
            }
            
    	},
    	created () {
           var infor = {
                'flag':'get_user_group_management',
                'user':Cookies.get('user'),
            } 
            util.ajax.request('get',this.baseuri,infor,{}, this.call_back, this.exception_callback);
        }
    }
	
</script>