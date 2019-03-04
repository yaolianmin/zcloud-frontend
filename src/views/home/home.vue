<template>
    <div class="layout-content-main">
        <Row style="background: #eee;padding:20px">
            <Col span="11">
                <Card :bordered="false">
                    <p slot="title">System Information</p>
                    <span style="float:left;width:200px;">系统版本号:</span> <span>{{version}}</span>
                    <p style="height:10px"></p>
                    <span style="float:left;width:200px;">系统运行时长:</span> <span>{{start_time}}</span>
                    <p style="height:10px"></p>
                    <span style="float:left;width:200px;">系统时间:</span> <span>{{time}}</span>
                    <p style="height:10px"></p>
                </Card>
            </Col>
            <Col span="11" offset="2">
                <Card shadow>
                    <p slot="title">Device Information</p>
                     <span style="float:left;width:200px;">在线:</span> <span>{{online}}</span>
                    <p style="height:10px"></p>
                    <span style="float:left;width:200px;">离线:</span> <span>{{offline}}</span>
                    <p style="height:10px"></p>
                    <span style="float:left;width:200px;">客户端:</span> <span>{{client}}</span>
                    <p style="height:10px"></p>
                </Card>
            </Col>
        </Row>
        <div id='supers' style="display:none">
             <Row>
                <Col span="11" >
                    <div id="cpuChart" style="height: 400px;width: 500px"></div>
                </Col>
                <Col span="11" offset="2">
                    <div id="memChart" style="height: 400px;width: 500px"></div>
                </Col>
            </Row>
        </div>
        <div>
             <Row>
                <Col span="11">
                    <div id="devChart" style="height: 400px;width: 500px"></div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import util  from '../../libs/util.js';
    import Cookies from 'js-cookie';
    import echarts from 'echarts';
    export default {
        data () {
            return {
                baseuri:'/homes',
                version:'  ',
                start_time:'  ',
                time:'  ',
                online:'0',
                offline:'0',
                client:'0',
                cpu_used:'70',
                cpu_unsed:'30',
                mem_used:'80',
                mem_unsed:'20',
                dev_used:'',
                dev_unsed:'',
            }
        },
        mounted(){
            //this.drawLinedevice('devChart');
            //this.drawLinecpu('cpuChart');
            //this.drawLinemem('memChart');
        },
        methods: {
            //cpu的饼状图
            drawLinecpu(id){
                let myChart = echarts.init(document.getElementById(id));
                myChart.setOption({
                    title: {
                        text: 'CPU使用率',
                        subtext: 'demo',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['已使用', '未使用']
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: this.cpu_used, name:'已使用'},
                            {value: this.cpu_unsed, name:'未使用'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    }]
                });
            },
             //内存的饼状图
            drawLinemem(id){
                let myChart = echarts.init(document.getElementById(id));
                myChart.setOption({
                    title: {
                        text: '内存使用率',
                        subtext: 'demo',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['已使用', '未使用']
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: this.mem_used, name:'已使用'},
                            {value: this.mem_unsed, name:'未使用'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    }]
                });
            },
            // 设备使用率的饼状图
            drawLinedevice(id){
                let myChart = echarts.init(document.getElementById(id));
                myChart.setOption({
                    title: {
                        text: '设备使用率',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {},
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['已使用', '未使用']
                    },
                    series: [{
                        name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: this.dev_used, name:'已使用'},
                            {value: this.dev_unsed, name:'未使用'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }
                        }
                    }]
                });
            },
            // 填充组名数据
            call_backs(ress){
                if(ress.data){ 
                    // 显示组信息
                    document.getElementById('group_name').children[1].value =  ress.data['data']['usr_grp_sel_group'];
                    document.getElementById('group_managemant').innerHTML = ress.data['data']['usr_grp_sel_mgt'];
                    document.getElementById('group_user').innerHTML = ress.data['data']['usr_grp_sel_reviewer'];
                    document.getElementById('group_').innerHTML =  ress.data['data']['usr_grp_sel_group'];
                    // 显示系统信息
                    this.version = ress.data['version'];
                    this.start_time = ress.data['satat_time'][0]+'天 -'+ress.data['satat_time'][1]+'时 -'+ress.data['satat_time'][2]+'分';
                    var date = new Date();
                    this.time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

                    // 判断是否为超级管理员,显示CPU和内存
                    if(ress.data['power']>10){
                        document.getElementById('supers').style.display='block';
                        this.cpu_used = (ress.data['memC'][0]);
                        this.cpu_unsed = (100 - ress.data['memC'][0]);
                        this.mem_used = (ress.data['memC'][1]);
                        this.mem_unsed = (100 - ress.data['memC'][1]);

                        this.drawLinecpu('cpuChart');
                        this.drawLinemem('memChart');
                    }
                    // 获得设备的信息
                    if(!document.getElementById('group_').innerHTML){
                        this.$router.push({
                            name: 'group_manage'
                        });
                        alert('请添加组名');
                    }else{
                        var infor  = {
                            'flag':'get_online_num',
                            'user':Cookies.get('user'),
                            'management':document.getElementById('group_managemant').innerHTML,
                            'group_look':document.getElementById('group_user').innerHTML,
                            'group_name':document.getElementById('group_').innerHTML
                        };
                        util.ajax.request('get',this.baseuri,infor,{}, this.get_online_infor, this.exception_callback);
                    }
                }


            },
            //填充设备信息
            get_online_infor(res){
                this.online = res.data[0];
                this.offline = res.data[1];
                this.client = res.data[2];
                if(res.data[1]){
                    this.dev_used = (this.online/(this.online+this.offline))*100;
                 }else{
                    this.dev_used =0;
                 }
               
                this.dev_unsed = 100-this.dev_used;
                this.drawLinedevice('devChart');
            }
        },
        created () {
            //获得该用户的组名
            var infor1 = {
                'flag':'get_system_infor',
                'user':Cookies.get('user'),
            } 
            util.ajax.request('get',this.baseuri,infor1,{}, this.call_backs, this.exception_callback);
        }
    }
</script>