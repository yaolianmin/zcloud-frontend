<style>
    @import '../user/user_management.less';
    .form_users{
        margin-top: -18px !important;
    }
    .form_users label{
        width:140px !important;
    }
    .card2 label{
        width:140px !important;
        text-align: left !important;
    }
    .pass input{
        width:238px !important;
    }
    
</style>
<template>
    <div style="margin-top:30px;">
        <!-- 头部设备类型区域 -->
        <Form>
            <FormItem class='fromitem'>
                <Label class='label'>设备类型:</Label>
                <Select v-model="seelect" style="width:200px">
                    <Option v-for="item in managements" :value="item.type">{{ item.type}}</Option>
                </Select>
            </FormItem>
            <Input v-model='card_ids' v-if='tmp_id'></Input>
            <Input v-model='dev_type' v-if='tmp_id'></Input>
            <FormItem class='fromitem' > 
                <Label class='label'>设备模块：</Label>
                <RadioGroup v-model="phone">
                    <Radio v-for='models in model_names' :label="models.name">
                        <span>{{models.name}}</span>
                    </Radio>
                    
                </RadioGroup>
            </FormItem>
        </Form>
        <!--templet配置文件区域-->
        <Table border :columns="columns" :data="datas" ref='table'></Table>
        <!--基本配置文件区域-->
        <div style="position: absolute;left: 50%;margin-left: -300px;" v-if='add_temp'>
            <header style="height:30px;font-size:16px;margin-top:20px;">基本设备</header>
            <Form ref='user_form' :model='formItem' style='margin-top:10px;' >
                <FormItem label='模板名称'  class='form_user form_users' >
                    <Input v-model='formItem.model_na' placeholder='请输入模板名称' required class='input' v-if='add_te'></Input>
                    <Input v-model='formItem.update_model_na' placeholder='请输入模板名称' required class='input' readonly v-if='up_te'></Input>
                </FormItem>
                <FormItem label='卡片索引'  class='form_user form_users' >
                    <Input v-model='formItem.card1' required class='input' value='Card1' readonly> </Input>
                </FormItem>
                <FormItem label='无线模式'  class='form_user form_users' >
                    <Select v-model='formItem.wireless1' style='width:360px;' >
                        <Option value='0'>802.11b/g (Auto)</Option>
                        <Option value='6'>802.11b/g/n</Option>
                    </Select>
                </FormItem>
                <FormItem label='信道/频率' class='form_user form_users' >
                    <Select v-model='formItem.channels1' style='width:360px;' >
                        <Option value='1'>1 (2412MHz)</Option>
                        <Option value='2'>2 (2417MHz)</Option>
                        <Option value='3'>3 (2422MHz)</Option>
                        <Option value='4'>4 (2427MHz)</Option>
                        <Option value='5'>5 (2432MHz)</Option>
                        <Option value='6'>6 (2437MHz)</Option>
                        <Option value='7'>7 (2442MHz)</Option>
                        <Option value='8'>8 (2447MHz)</Option>
                        <Option value='9'>9 (2452MHz)</Option>
                        <Option value='10'>10 (2457MHz)</Option>
                        <Option value='11'>11 (2462MHz)</Option>
                        <Option value='12'>12 (2467MHz)</Option>
                        <Option value='13'>13 (2472MHz)</Option>
                    </Select>
                </FormItem>
                 <FormItem label='速率' class='form_user form_users' >
                    <Select v-model='formItem.speed' style='width:360px;' >
                        <Option value='255'>Auto</Option>
                        <Option value='27'>1Mbps</Option>
                        <Option value='26'>2Mbps</Option>
                        <Option value='25'>5.5Mbps</Option>
                        <Option value='24'>11Mbps</Option>
                        <Option value='11'>6Mbps</Option>
                        <Option value='15'>9Mbps</Option>
                        <Option value='10'>12Mbps</Option>
                        <Option value='14'>18Mbps</Option>
                        <Option value='9'>24Mbps</Option>
                        <Option value='13'>36Mbps</Option>
                        <Option value='8'>48Mbps</Option>
                        <Option value='12'>54Mbps</Option>
                        <Option value='128'>MCS0-7.2[15]</Option>
                        <Option value='129'>MCS1-14.4[30]</Option>
                        <Option value='130'>MCS2-21.7[45]</Option>
                        <Option value='131'>MCS3-28.9[60]</Option>
                        <Option value='132'>MCS4-43.3[90]</Option>
                        <Option value='133'>MCS5-57.8[90]</Option>
                        <Option value='134'>MCS6-65[135]</Option>
                        <Option value='135'>MCS7-72.2[150]</Option>
                        <Option value='136'>MCS8-14.4[30]</Option>
                        <Option value='137'>MCS9-28.9[60]</Option>
                        <Option value='138'>MCS10-43.3[90]</Option>
                        <Option value='139'>MCS11-57.8[120]</Option>
                        <Option value='140'>MCS12-86.7[180]</Option>
                        <Option value='141'>MCS13-115.6[240]</Option>
                        <Option value='142'>MCS14-115.6[270]</Option>
                        <Option value='143'>MCS15-115.6[300]</Option>
                    </Select>
                </FormItem>
                <FormItem label='启用自动功率调节模式'  class='form_user form_users' >
                    <RadioGroup v-model="formItem.power">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='启用自动频率调节模式' class='form_user form_users'>
                    <RadioGroup v-model="formItem.rate">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='频率自动调节模式'  class='form_user form_users' >
                    <Select v-model='formItem.rate_type' style='width:360px;'>
                        <Option value='0'>开始</Option>
                        <Option value='1'>运行</Option>
                    </Select>
                </FormItem>
                <FormItem label='频率自动调节间隔（60-86400）'  class='form_user form_users' >
                     <Input v-model='formItem.rate_time' value='3600'  class='input'></Input>
                </FormItem>
                 <FormItem label='卡片索引'    style='margin-top:20px;' class='card2'>
                    <Input v-model='formItem.card2' required class='input' value='Card2' readonly> </Input>
                </FormItem>
                <FormItem label='无线模式'  class='form_user form_users' >
                    <Select v-model='formItem.wireless2' style='width:360px;' >
                        <Option value='0'>802.11b/g (Auto)</Option>
                        <Option value='6'>802.11b/g/n</Option>
                        <Option value='1'>802.11a only</Option>
                        <Option value='5'>802.11a/n</Option>
                        <Option value='9'>802.11ac</Option>
                    </Select>
                </FormItem>
                <FormItem label='信道/频率'  class='form_user form_users' >
                    <Select v-model='formItem.channels2' style='width:360px;' >
                        <Option value='36'>36 (5180MHz)</Option>
                        <Option value='40'>40 (5200MHz)</Option>
                        <Option value='44'>44 (5220MHz)</Option>
                        <Option value='48'>48 (5240MHz)</Option>
                        <Option value='52'>52 (5260MHz)</Option>
                        <Option value='56'>56 (5280MHz)</Option>
                        <Option value='60'>60 (5300MHz)</Option>
                        <Option value='64'>64 (5320MHz)</Option>
                        <Option value='100'>100 (550MHz)</Option>
                        <Option value='104'>104 (5520MHz)</Option>
                        <Option value='108'>108 (5540MHz)</Option>
                        <Option value='112'>112 (5560MHz)</Option>
                        <Option value='116'>116 (5580MHz)</Option>
                        <Option value='120'>120 (5600MHz)</Option>
                        <Option value='124'>124 (5620MHz)</Option>
                        <Option value='128'>128 (5640MHz)</Option>
                        <Option value='132'>132 (5660MHz)</Option>
                        <Option value='136'>136 (5680MHz)</Option>
                        <Option value='140'>140 (5700MHz)</Option>
                        <Option value='149'>149 (5745MHz)</Option>
                        <Option value='153'>163 (5765MHz)</Option>
                        <Option value='157'>157 (5785MHz)</Option>
                        <Option value='161'>161 (5805MHz)</Option>
                        <Option value='165'>165 (5825MHz)</Option>
                    </Select>
                </FormItem>
                <FormItem label='速率'  class='form_user form_users' >
                    <Select v-model='formItem.speed2' style='width:360px;' >
                        <Option value='255'>Auto</Option>
                        <Option value='11'>6Mbps</Option>
                        <Option value='15'>9Mbps</Option>
                        <Option value='10'>12Mbps</Option>
                        <Option value='14'>18Mbps</Option>
                        <Option value='9'>24Mbps</Option>
                        <Option value='13'>36Mbps</Option>
                        <Option value='8'>48Mbps</Option>
                        <Option value='12'>54Mbps</Option>
                        <Option value='128'>MCS0-7.2[15]</Option>
                        <Option value='129'>MCS1-14.4[30]</Option>
                        <Option value='130'>MCS2-21.7[45]</Option>
                        <Option value='131'>MCS3-28.9[60]</Option>
                        <Option value='132'>MCS4-43.3[90]</Option>
                        <Option value='133'>MCS5-57.8[90]</Option>
                        <Option value='134'>MCS6-65[135]</Option>
                        <Option value='135'>MCS7-72.2[150]</Option>
                    </Select>
                </FormItem>
                <FormItem label='启用自动功率调节模式' class='form_user form_users' >
                    <RadioGroup v-model="formItem.power2">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='启用自动频率调节模式' class='form_user form_users' >
                    <RadioGroup v-model="formItem.rate2">
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='频率自动调节模式'  class='form_user form_users' >
                    <Select v-model='formItem.rate_type2' style='width:360px;' >
                        <Option value='0'>开始</Option>
                        <Option value='1'>运行</Option>
                    </Select>
                </FormItem>
                <FormItem label='频率自动调节间隔'  class='form_user form_users' >
                     <Input v-model='formItem.rate_time2' value='3600'  class='input'></Input>
                </FormItem>
                <div style='height:2px;background-color:#000;margin-top:-18px;'></div>
                <header style="height:30px;font-size:16px;margin-top:10px;margin-bottom:10px;">用户访问控制</header>
                <FormItem label='网络门户设置'  class='form_user form_users' >
                    <CheckboxGroup v-model="formItem.door">
                        <Checkbox label="1">启用网络门户</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label='MAC认证' class='form_user form_users' >
                    <RadioGroup v-model="formItem.renzheng" >
                        <Radio label="1">开启</Radio>
                        <Radio label="0">关闭</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label='黑白名单设置'  class='form_user form_users' >
                    <CheckboxGroup v-model="formItem.black" >
                        <Checkbox label="1">启用自动黑白名单</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label='黑白名单URL'  class='form_user form_users' >
                    <Input v-model='formItem.black_url' value='http://bwlist' class='input'></Input>
                </FormItem>
                <FormItem label='自动更新时间（小时）'  class='form_user form_users' >
                    <Input v-model='formItem.time_up' value='12' class='input'></Input>
                </FormItem>
                <FormItem label='RadiusDesk设置'  class='form_user form_users' >
                    <CheckboxGroup v-model="formItem.RadiusDesk">
                        <Checkbox label="1">启用RadiusDesk</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label='更新指令URL'  class='form_user form_users' >
                    <Input v-model='formItem.up_url' value='http://121.40.202.208/cake2/rd_cake/webroot/files/heartbeat.php' class='input'></Input>
                </FormItem>
                <FormItem label='自动更新时间（小时）' class='form_user form_users' >
                    <Input v-model='formItem.time_ups' value='12' class='input'></Input>
                </FormItem>
                 <Input v-model='formItem.tmp_id' value='' class='input' v-if='tmp_id'></Input>
                <FormItem label='获取参数URL'  class='form_user form_users' >
                    <Input v-model='formItem.get_url' value='http://121.40.202.208/cake2/rd_cake/nas/get_coova_detail' class='input'></Input>
                </FormItem>
                 <FormItem>
                <Button type="primary" style='margin-left:130px;' v-show='add' @click='add_templet'>添加</Button>
                <Button type="primary" style='margin-left:130px;'  v-show='update' @click='edit_templet'>修改</Button>
                <Button style="margin-left: 8px;margin-left:100px">取消</Button>
            </FormItem>
            </Form>
        </div>
        <!--虚拟配置文件区域-->
        <div v-show='vap_temp'>
            <div style='height:2px;background-color:#000;margin-top:18px;'></div>
            <header style="height:30px;font-size:16px;margin-top:10px;">虚拟AP配置文件[default]</header> 
            <div>
                <Button type="primary" id='button1' @click='card_function'>Card1</Button>
                <Button  id='button2' @click='card2_function'>Card2</Button>
                <Input v-model='card' v-if='tmp_id'></Input>
            </div>
            <Table border :columns="column" :data="dats" ref='table'></Table> 
            <!--虚拟配置文件信息区域-->
            <div style="position: absolute;left: 50%;margin-left: -300px;"  v-if='vap_info'>
                <Form ref='user_form' :model='formItem2' style='margin-top:40px;' >
                    <FormItem label='配置文件名称'  class='form_user form_users' >
                        <Input v-model='formItem2.wireless_name' value='' class='input'></Input>
                    </FormItem>
                    <FormItem label='无线网络名称'  class='form_user form_users' >
                        <Input v-model='formItem2.wireless_flags' value='' class='input'></Input>
                    </FormItem>
                    <FormItem label='广播无线网络名称'  class='form_user form_users' >
                        <RadioGroup v-model="formItem2.wireless_broadcast" >
                            <Radio label="1">是</Radio>
                            <Radio label="0">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label='网络认证模式'  class='form_user form_users' >
                        <Select v-model='formItem2.renzheng_type' style='width:360px;' @on-change='get_pass_patten'>
                            <Option value='0'>开放系统</Option>
                            <Option value='1'>共享密钥</Option>
                            <Option value='16'>WPA-PSK</Option>
                            <Option value='32'>WPA2-PSK</Option>
                            <Option value='48'>WAP-PSK & WPA2-PSK</Option>
                        </Select>
                    </FormItem>
                    <FormItem label='数据加密'  class='form_user form_users' >
                        <Select v-model='formItem2.data_encryption' style='width:360px;' >
                            <Option value='0' v-show='kaifang'>不加密</Option>
                            <Option value='40' v-show='kai'>64位WEP</Option>
                            <Option value='104' v-show='kai'>128位WEP</Option>
                            <Option value='128' v-show='kai'>152位WEP</Option>
                            <Option value='255' v-show='tkip'>TKIP</Option>
                            <Option value='254' v-show='aes'>AES</Option>
                            <Option value='253' v-show='ts'>TKIP+AES</Option>
                        </Select>
                    </FormItem>
                    <FormItem label='密码'  class='form_user form_users pass' >
                        <Input v-model='formItem2.pass'  class='input' :disabled ='dis'></Input> 
                    </FormItem> 
                    <Button type="primary" style="margin-left:410px;margin-top:-90px;z-index:999;" @click='creat_password' v-show='radi'>生成密钥</Button>
                    <FormItem label=''  class='form_user form_users' v-show='radi'>
                        <RadioGroup  style="width:500px;margin-left:140px;" v-model="formItem2['choice']">
                            <Radio label="key1" name='sex'>
                                <span>key1</span>
                            </Radio>
                            <Input v-model="formItem2.k1" :disabled ='dis'style='width:200px;margin-left:-90px;'></Input>
                            <br>
                            <Radio label="key2" name='sex'>
                                <span>key2</span>
                            </Radio>
                            <Input  v-model="formItem2.k2" :disabled ='dis' style='width:200px;margin-left:-90px;'></Input>
                            <br>
                            <Radio label="key3" name='sex'>
                                <span>key3</span>
                            </Radio>
                            <Input v-model="formItem2.k3" :disabled ='dis' style='width:200px;margin-left:-90px;'></Input>
                            <br>
                            <Radio label="key4" name='sex'>
                                <span>key4</span>
                            </Radio>
                            <Input v-model="formItem2.k4" :disabled ='dis' style='width:200px;margin-left:-90px;'></Input>
                        </RadioGroup>
                </FormItem>
                <Input v-model='formItem2.tmp_id' value='' class='input' v-if='tmp_id'></Input>
                <Input v-model='formItem2.card_vap_num' value='' class='input' v-if='tmp_id'></Input>
                <Button type="primary" style='margin-left:130px;' @click='creat_vap_temp'>确定</Button>
                <Button style="margin-left: 8px;margin-left:100px">取消</Button>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import channel from '../device/channel.js';
    import md5 from '../../../node_modules/md5.js/index.js';
    export default {
         data () {
            return {
                localFormData: {},
                add_te:true,
                up_te:false,
                add_temp:false,
                tmp_id:false,
                vap_temp:false,
                seelect:'',
                card_ids:'',
                dev_type:'',
                managements:[{'type':'FAP'},{'type':'CPE'}],
                phone: '',
                model_names:[],
                formItem:{
                    'model_na':'',
                    'tmp_id':'',
                    'update_model_na':'',
                    'card1':'Card1',
                    'wireless1':'0',
                    'channels1':'1',
                    'speed':'255',
                    'power':'0',
                    'rate':'0',
                    'rate_type':'0',
                    'rate_time':'3600',
                    'card2':'Card2',
                    'wireless2':'1',
                    'channels2':'36',
                    'speed2':'255',
                    'power2':'0',
                    'black':[],
                    'rate2':'0',
                    'rate_type2':'0',
                    'rate_time2':'3600',
                    'door':[],
                    'renzheng':'0',
                    'black_url':'http://bwlist',
                    'time_up':'12',
                    'RadiusDesk':[],
                    'time_ups':'12',
                    'up_url':'http://121.40.202.208/cake2/rd_cake/webroot/files/heartbeat.php',
                    'get_url':'http://121.40.202.208/cake2/rd_cake/nas/get_coova_detail'
                },
                add:true,
                update:false,
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
                        key: 'templet_name',
                        width: 210, 

                    },
                    {
                        title: '无限模式',
                        align: 'center',
                        key: 'wireless_model',
                    },
                    {
                        title: '信道/频率',
                        align: 'center',
                        key: 'channels',
                        width: 270, 
                    },
                    {
                        title: '编辑胖AP',
                        align: 'center',
                        key: 'mac_addr',
                        width: 170,
                        render: (h, params) =>{   
                            return h('div', [
                                        h('Edit', {
                                            style: {
                                               
                                            },
                                            on: {
                                                'click-button': (vm) => { //点击 编辑按钮 获得每个用户的详细信息
                                                   if(params.row.id){
                                                        // 让修改页面显示
                                                        this.add_temp = true;
                                                        this.vap_temp = false;
                                                        this.add_te = false; // 添加模板名消失
                                                        this.up_te = true;  // 修改模板名出现
                                                        this.formItem.tmp_id = params.row.id; 
                                                        this.formItem.update_model_na = params.row.templet_name; 
                                                        if( this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7){ 
                                                            console.log(params.row.wireless_model2);
                                                            this.formItem.wireless1 = params.row.wireless_model1; // 无线模式1
                                                            this.formItem.wireless2 = params.row.wireless_model2; // 无线模式2
                                                            this.formItem.channels1 = params.row.channels1;     // 信道1
                                                            this.formItem.channels2 = params.row.channels2;     // 信道2
                                                        }else{
                                                            this.formItem.wireless1 = params.row.wireless_model;
                                                            this.formItem.channels1 = params.row.channels; 
                                                        }
                                                        this.add = false;   // 添加按钮
                                                        this.update = true; // 修改按钮
                                                       
                                                        // 发送数据库请求
                                                        var infor = {
                                                            'flag':'get_this_templete_infor',
                                                            'temp_id':params.row.id,
                                                            'user_name':Cookies.get('user'),
                                                        }
                                                        util.ajax.request('get','/books',infor,{}, this.submit_get_temp, this.exception_callback);
                                                   }else{
                                                        this.$Message.error('这个模板显示id错误，请联系管理员');
                                                   }
                                                }
                                            }
                                        }),//编辑按钮
                                    ]);
                        },
                    },
                    {
                        title: '编辑虚拟AP',
                        align: 'center',
                        key: 'processed',
                        width: '170',
                        render: (h, params) =>{   
                            return h('div', [
                                        h('Edit', {
                                            style: {
                                               
                                            },
                                            on: {
                                                'click-button': (vm) => { //点击 编辑按钮 
                                                   this.formItem2.tmp_id = params.row.id;
                                                   this.vap_temp = true;
                                                   this.add_temp = false;
                                                }
                                            }
                                        }),//编辑按钮
                                    ]);
                        }, 
                    },
                    {
                        title: this.$t('Operate'),
                        key: 'handle',
                        width: '170',
                        align: 'center',
                        renderHeader:(h, params) => {
                            return  h('div',[
                                    h('strong', this.$t('Operate')),
                                    h('AddButton', {
                                        on: {
                                                'click-button': (vm) => { // "+" 按钮操作，获取相应的数据
                                                    if(!this.phone){
                                                        this.$Message.error('请添加设备模块后，在添加相应的模板');
                                                    }else{
                                                        if(this.seelect == 'FAP'){
                                                            if(this.add_temp){
                                                                this.add_temp = false;
                                                            }else{
                                                                this.add_temp = true;
                                                                this.add_te = true; // 添加模板名出现
                                                                this.up_te = false;  // 修改模板名消失
                                                                this.add = true;   // 添加按钮
                                                                this.update = false; // 修改按钮
                                                                this.formItem ={
                                                                    'model_na':'',
                                                                    'tmp_id':'',
                                                                    'update_model_na':'',
                                                                    'card1':'Card1',
                                                                    'wireless1':'0',
                                                                    'channels1':'1',
                                                                    'speed':'255',
                                                                    'power':'0',
                                                                    'rate':'0',
                                                                    'rate_type':'0',
                                                                    'rate_time':'3600',
                                                                    'card2':'Card2',
                                                                    'wireless2':'1',
                                                                    'channels2':'36',
                                                                    'speed2':'255',
                                                                    'power2':'0',
                                                                    'black':[],
                                                                    'rate2':'0',
                                                                    'rate_type2':'0',
                                                                    'rate_time2':'3600',
                                                                    'door':[],
                                                                    'renzheng':'0',
                                                                    'black_url':'http://bwlist',
                                                                    'time_up':'12',
                                                                    'RadiusDesk':[],
                                                                    'time_ups':'12',
                                                                    'up_url':'http://121.40.202.208/cake2/rd_cake/webroot/files/heartbeat.php',
                                                                    'get_url':'http://121.40.202.208/cake2/rd_cake/nas/get_coova_detail'
                                                                } 
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                    }),  
                            ]);
                        },
                        render: (h, params) =>{   
                            return h('div', [
                                h('Poptip',{
                                    props: {
                                        confirm: true,
                                        title: '您确定要删除这条数据吗?',
                                        transfer: true
                                    },
                                    on: {
                                        'on-ok': (vm) => {  // 确认删除  用户的按钮
                                            if(params.row.templet_name == 'default'){
                                                alert('默认模板不能删除');
                                            }else{
                                                var infor = {
                                                    'flag':'del_templet_information',
                                                    'temp_id':params.row.id,
                                                    'user_name':Cookies.get('user'),
                                                    'card_id':this.card_ids
                                                }
                                                util.ajax.request('post','/books',{},infor, this.add_callback, this.exception_callback);
                                            }
                                            
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
                dats:[
                    {'index':1,'templet_name':'profile1','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':2,'templet_name':'profile2','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':3,'templet_name':'profile3','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':4,'templet_name':'profile4','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':5,'templet_name':'profile5','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':6,'templet_name':'profile6','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':7,'templet_name':'profile7','wireless_flag':'Wireless','safe':'Open System'},
                    {'index':8,'templet_name':'profile8','wireless_flag':'Wireless','safe':'Open System'}
                ],
                column:[
                    {
                        title: '顺序',
                        key: 'index',
                        align: 'center',
                        width: 100, 
                    },
                    {
                        title: '配置文件名称',
                        align: 'center',
                        key: 'templet_name',
                        width: 240, 

                    },
                    {
                        title: '服务集标识',
                        align: 'center',
                        key: 'wireless_flag',
                    },
                    {
                        title: '安全',
                        align: 'center',
                        key: 'safe',
                        width: 270, 
                    },
                    {
                        title: '编辑',
                        align: 'center',
                        width: 270, 
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
                                        click: (vm) => { //点击 编辑按钮 获得每个用户的详细信息
                                            this.formItem2.card_vap_num = params.row.index;
                                            this.vap_info = true;
                                            this.formItem2.wireless_name = params.row.templet_name;
                                        }
                                    }
                                }, '编辑'),//编辑按钮 
                            ]);
                        },
                    },
                ],
                 formItem2:{
                    'wireless_name':'profile1',
                    'wireless_flags':'Wireless',
                    'wireless_broadcast':'0',
                    'renzheng_type':'0',
                    'data_encryption':'0',
                    'pass':'',
                    'choice':'key1',
                    'card_vap_num':'',
                    'tmp_id':'',
                    'k1':'',
                    'k2':'',
                    'k3':'',
                    'k4':'',

                },
                dis:true,
                card:'1',
                tkip:false,
                kaifang:true,
                kai:true,
                ts:false,
                aes:false,
                radi:true,
                vap_info:false,
            }
        },
        methods:{
            submit_callback(res){
              console.log(res.data);
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    this.seelect = res.data['dev_type'][0]['type'];
                    this.managements = res.data['dev_type'];
                    this.phone = res.data['model_name'][this.seelect][0]['name'];
                    this.model_names = res.data['model_name'][this.seelect];
                    this.card_ids = res.data['card_id'][this.seelect][0];
                    this.dev_type = res.data['TYPE'][this.seelect][0];
                    // 处理table表格的信息
                    if(res.data['fap_templet']){
                        var len = res.data['fap_templet'].length;
                        for(var i = 0;i<len;i++){
                            res.data['fap_templet'][i]['index'] = i+1;
                            if(this.dev_type == '1028' || this.dev_type == '1029'){
                                if(this.card_ids == 1 || this.card_ids == 5){

                                    res.data['fap_templet'][i]['wireless_model'] = res.data['fap_templet'][i]['VAP0_SSID'];
                                    res.data['fap_templet'][i]['channels'] = channel['apnetauth_1028_1029'][res.data['fap_templet'][i]['catdIdMain']['VAP0_Auth']];

                                }else if( this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7){

                                    res.data['fap_templet'][i]['wireless_model'] = '卡1：'+res.data['fap_templet'][i]['VAP0_SSID']+' 卡2：'+res.data['fap_templet'][i]['catdIdMain']['VAP0_SSID'];

                                    res.data['fap_templet'][i]['channels'] = '卡1：'+channel['apnetauth_1028_1029'][res.data['fap_templet'][i]['VAP0_Auth']]+'卡2：'+channel['apnetauth_1028_1029'][res.data['fap_templet'][i]['catdIdMain']['VAP0_Auth']];
                                    //以下四个参数是为了编辑的时候不需要再次的循环获得，
                                    res.data['fap_templet'][i]['wireless_model1'] = res.data['fap_templet'][i]['VAP0_SSID'];
                                    res.data['fap_templet'][i]['wireless_model2'] = res.data['fap_templet'][i]['catdIdMain']['VAP0_SSID']
                                    res.data['fap_templet'][i]['channels1'] = res.data['fap_templet'][i]['VAP0_Auth'];
                                    res.data['fap_templet'][i]['channels2'] = res.data['fap_templet'][i]['catdIdMain']['VAP0_Auth'];
                                }
                                
                            }else{
                                if( this.dev_type == '1022' || this.dev_type == '1023' || this.dev_type == '224' || this.dev_type == 'ac1028'){
                                    if(this.card_ids == 1 || this.card_ids == 5){

                                        res.data['fap_templet'][i]['wireless_model'] = channel['wirelessmode_2G_5G'][res.data['fap_templet'][i]['WirelessMode']];
                                        

                                    }else if( this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7){

                                        res.data['fap_templet'][i]['wireless_model'] = '卡1：'+channel['wirelessmode_2G_5G'][res.data['fap_templet'][i]['WirelessMode']]+' 卡2：'+channel['wirelessmode_2G_5G'][res.data['fap_templet'][i]['catdIdMain']['Channel']];

                                         //以下四个参数是为了编辑的时候不需要再次的循环获得，
                                        res.data['fap_templet'][i]['wireless_model1'] = res.data['fap_templet'][i]['WirelessMode'];
                                        res.data['fap_templet'][i]['wireless_model2'] = res.data['fap_templet'][i]['catdIdMain']['Channel'];
                                   

                                    }   
                                }else if( this.dev_type == '1025' ||  this.dev_type == '1027' ||  this.dev_type == '1033' ||  this.dev_type == 'AC1027L' ||  this.dev_type == '1030' ||  this.dev_type == '1031'){
                                        if( this.card_ids == 1 || this.card_ids == 5 || this.phone == 'ZCOM_1027L_O' || this.phone == 'AS220-C01'){

                                             res.data['fap_templet'][i]['wireless_model'] = channel['wirelessmode_2G_5G_1025_1027'][res.data['fap_templet'][i]['WirelessMode']];
                                            
                                        }else if(this.phone == 'SP220-C01' || this.phone == 'SP220-C02'){

                                             res.data['fap_templet'][i]['wireless_model'] = channel['wirelessmode_2G_5G_SP220'][res.data['fap_templet'][i]['WirelessMode']];

                                        }else if(this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7){

                                             res.data['fap_templet'][i]['wireless_model'] = '卡1：'+channel['wirelessmode_2G_5G_1025_1027'][res.data['fap_templet'][i]['WirelessMode']]+' 卡2：'+channel['wirelessmode_2G_5G_1025_1027'][res.data['fap_templet'][i]['catdIdMain']['WirelessMode']];

                                              //以下四个参数是为了编辑的时候不需要再次的循环获得，
                                            res.data['fap_templet'][i]['wireless_model1'] = res.data['fap_templet'][i]['WirelessMode'];
                                            res.data['fap_templet'][i]['wireless_model2'] = res.data['fap_templet'][i]['catdIdMain']['WirelessMode'];
                                            
                                        }

                                }
                                if(this.dev_type == "1027"  || this.dev_type == "1025" || this.dev_type == "1022" || this.dev_type == "1023" || this.dev_type == "224" || this.dev_type == "ac1028" || this.dev_type == "AC1027L"){

                                    if( this.card_ids == 1 ||this.card_ids == 5 || this.phone == "ZCOM_1027L_O" || this.phone == "AS220-C01" || this.phone == "SP220-C01" || this.phone == "SP220-C02")

                                        res.data['fap_templet'][i]['channels'] = channel['channel_frequency'][res.data['fap_templet'][i]['Channel']];

                                    else if( this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7 ) {

                                        res.data['fap_templet'][i]['channels'] = '卡1：'+channel['channel_frequency'][res.data['fap_templet'][i]['Channel']]+' 卡2：'+channel['channel_frequency'][res.data['fap_templet'][i]['catdIdMain']['Channel']]; 

                                         //以下四个参数是为了编辑的时候不需要再次的循环获得，
                                        res.data['fap_templet'][i]['channels1'] = res.data['fap_templet'][i]['Channel'];
                                        res.data['fap_templet'][i]['channels2'] = res.data['fap_templet'][i]['catdIdMain']['Channel'];
                                    }
                                
                                }else{
                                    if( this.card_ids == 1 || this.card_ids == 5 )
                                        res.data['fap_templet'][i]['channels'] = channel['channel_frequency_1025_1027'][res.data['fap_templet'][i]['Channel']];

                                    else if( this.card_ids == 3 || this.card_ids == 11 || this.card_ids == 15 || this.card_ids == 7 ) {
                        
                                         res.data['fap_templet'][i]['channels'] = '卡1：'+channel['channel_frequency_1025_1027'][res.data['fap_templet'][i]['Channel']]+' 卡2：'+channel['channel_frequency_1025_1027'][res.data['fap_templet'][i]['catdIdMain']['Channel']];

                                          //以下四个参数是为了编辑的时候不需要再次的循环获得，
                                        res.data['fap_templet'][i]['channels1'] = res.data['fap_templet'][i]['Channel'];
                                        res.data['fap_templet'][i]['channels2'] = res.data['fap_templet'][i]['catdIdMain']['Channel'];
                                    }
                                }
                            }

                        }
                    }
                } 
                this.datas =res.data['fap_templet'];
            },
            submit_get_temp(res){
                if(!res.data['state']){
                    if(res.data['PortalEnable'] ==1){   // 处理网络门户设置
                       this.formItem.door=['1']; 
                    }else{
                        this.formItem.door= []; 
                    }

                    if(res.data['EnableAutoCfgBlackWhiteList'] ==1){ // 处理黑白名单设置
                        this.formItem.black = ['1'];  
                    }else{
                        this.formItem.black= []; 
                    } 
                    if(res.data['EnableRadiusDesk'] == 1){ //处理RadiusDesk设置
                        this.formItem.RadiusDesk = ['1'];  
                    }else{
                        this.formItem.RadiusDesk= []; 
                    } 

                    this.formItem.renzheng = res.data['MacAuth'];
                    this.formItem.black_url = res.data['BlackWhiteListURL'];
                    this.formItem.time_up = res.data['BWLAutoUpdateTimeHour'];
                    this.formItem.up_url = res.data['UpdateCommandURL'];
                    this.formItem.time_ups = res.data['RDAutoUpdateTimeHour'];
                    this.formItem.get_url = res.data['RDGetParameterURL'];
                }else{
                    this.$Message.error(res.data['message']);
                }
            },
            //添加胖AP模板
            add_templet(){
                if(this.formItem.model_na){
                    var infor = {
                        'flag':'add_templet_information',
                        'data':this.formItem,
                        'user_name':Cookies.get('user'),
                        'card_id':this.card_ids,
                        'model_name':this.phone,
                        'dev_type':this.dev_type,
                    }
                    util.ajax.request('post','/books',{},infor, this.add_callback, this.exception_callback);
                }else{
                    this.$Message.error('请添加模板名');
                }  
            },
            add_callback(res){
                if(!res.data['state']){
                    this.$router.go(0);
                }else{
                    this.$Message.error(res.data['message']);
                }
            },
            // 编辑模板信息操作
            edit_templet(){
                if(this.formItem.tmp_id){
                    // 发送数据库请求
                    var infor = {
                        'flag':'edit_templet_information',
                        'data':this.formItem,
                        'user_name':Cookies.get('user'),
                        'card_id':this.card_ids,
                    }
                    util.ajax.request('post','/books',{},infor, this.edit_callback, this.exception_callback);
                }else{
                    this.$Message.error('您修改的模板没有id，请联系管理员');
                }
            },
            edit_callback(res){
                if(res.data['state']){
                    this.$Message.error(res.data['message']);
                }else{
                    this.add_temp = false;
                    this.$router.push({
                            name: 'sys_manage'
                    });
                }
            },
            //切换card1
            card_function(){
                document.getElementById('button1').className='ivu-btn ivu-btn-primary';
                document.getElementById('button2').className='ivu-btn';
                this.card = 1;
            },
            //切换card1
            card2_function(){
                document.getElementById('button1').className='ivu-btn';
                document.getElementById('button2').className='ivu-btn ivu-btn-primary';
                this.card = 2;
            },
            //更换加密的方式
            get_pass_patten(rel){
                if(rel == 0){ 
                    this.kaifang = true;
                    this.kai = true;
                    this.tkip = false;
                    this.formItem2.data_encryption = '0';
                    this.dis = true;
                    this.ts = false;
                    this.aes = false;

                    this.radi = true;

                }else if(rel == 1){
                    this.kaifang = false;
                    this.kai = true;
                    this.tkip = false;
                    this.formItem2.data_encryption = '40';
                    this.dis = false;
                    this.ts = false;
                    this.aes = false;

                    this.radi = true;

                }else if(rel == 16){
                    this.kaifang = false;
                    this.kai = false;
                    this.tkip = false;
                    this.formItem2.data_encryption = '254';
                    this.dis = false;
                    this.ts = false;
                    this.aes = true;

                    this.radi = false;

                }else if(rel == 32){
                    this.kaifang =false;
                    this.kai = false;
                    this.tkip =  true;
                    this.aes = false;
                    this.ts = false;
                    this.formItem2.data_encryption = '255';
                    this.dis = false;

                    this.radi = false;
                }else if(rel == 48){
                    this.kaifang = false;
                    this.kai = false;
                    this.tkip = false;
                    this.ts = true;
                    this.aes = false;
                    this.formItem2.data_encryption = '253';
                    this.dis = false;

                    this.radi = false;
                }
            },
            //生成密钥按钮
            creat_password(){
                var infor = {
                    'pass':this.formItem2.pass,
                    'type':this.formItem2.data_encryption,
                    'flag':'get_md5s_password'
                }
                util.ajax.request('get','/books',infor,{}, this.password_callback, this.exception_callback);
            },
            password_callback(res){
                if(res.data){
                   this.formItem2.k1 = res.data['key1'];
                   this.formItem2.k2 = res.data['key2'];
                   this.formItem2.k3 = res.data['key3'];
                   this.formItem2.k4 = res.data['key4'];
                }
                console.log(res.data);
            },
            //创建虚拟VAP按钮
            creat_vap_temp(){
                var infor = {
                    'flag':'add_vap_templete',
                    'user_name':Cookies.get('user'),
                    'data':this.formItem2,
                    'card':this.card
                };
                util.ajax.request('post','/books',{},infor, this.add_vap_callback, this.exception_callback);
            },
            add_vap_callback(res){
                if(!res.data['state']){
                    this.$router.go(0);
                }else{
                    this.$Message.error(res.data['message']);
                }
                console.log(res.data);
            }
        },
        created () {
            var infor = {
                'user_name':Cookies.get('user'),
                'flag':'get_dev_type_under_grp'
            }
            util.ajax.request('get','/books',infor,{}, this.submit_callback, this.exception_callback);

        }
    }
</script>

<style>
    
</style>