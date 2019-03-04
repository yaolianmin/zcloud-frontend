<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 341px;
        height: 51px;
        border-radius: 3px;
        float: left;
        position: relative;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        float: right;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 5px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 15px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .demo-badge-alone{
        background: #5cb85c !important;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
                <img src="/dist/logo.png"/>
            </div>
            <div class="layout-nav" style="text-align: center;">
                <Poptip trigger="hover" placement="bottom" style="vertical-align: middle">
                    <div class="demo-avatar">
                        <Avatar style="background-color: #87d068">User</Avatar>
                    </div>
                    <div slot="content">
                        <!--Dropdown style="margin-left: 20px"-->
                            <DropdownMenu slot="list">
                                <DropdownItem><a href="#">组管理</a></DropdownItem>
                                <DropdownItem><a href="#">用户信息</a></DropdownItem>
                                <DropdownItem><Badge count="5"><a href="#">消息</a></Badge></DropdownItem>
                                <DropdownItem><a href="#">语言</a></DropdownItem>
                                <DropdownItem divided><a href="#">退出</a></DropdownItem>
                            </DropdownMenu>
                        <!--/Dropdown-->
                    </div>
                </Poptip>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <Col span="4">
                <Menu active-name="1-2" theme="dark" style="height: 100%" width="auto" :open-names="['1']">
                    <!--div class="layout-logo-left"></div-->
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-home"></Icon>
                            <router-link :to="'home'">{{$t('home')}}</router-link>
                        </template>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="alert"></Icon>
                            警告
                        </template>
                        <MenuItem name="2-1"><router-link :to="'alertlist'">警告列表</router-link></MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="wifi"></Icon>
                            设备
                        </template>
                        <MenuItem name="3-1"><router-link :to="'dev_register'">设备注册</router-link></MenuItem>
                        <MenuItem name="3-2"><router-link :to="'dev_manage'">设备管理</router-link></MenuItem>
                        <MenuItem name="3-3"><router-link :to="'map'">设备定位</router-link></MenuItem>
                        <MenuItem name="3-4"><router-link :to="'devlog'">设备日志</router-link></MenuItem>
                        <MenuItem name="3-5"><router-link :to="'diagnosticlog'">诊断日志</router-link></MenuItem>
                    </Submenu>
                    <Submenu name="12">
                        <template slot="title">
                            <Icon type="wifi"></Icon>
                            LTE-Fi
                        </template>
                        <MenuItem name="12-1"><router-link :to="'dev_register'">配置</router-link></MenuItem>
                        <MenuItem name="12-2"><router-link :to="'dev_manage'">用户设置</router-link></MenuItem>
                        <MenuItem name="12-3"><router-link :to="'map'">流量</router-link></MenuItem>
                        <MenuItem name="12-4"><router-link :to="'devlog'">定位</router-link></MenuItem>
                        <MenuItem name="12-5"><router-link :to="'diagnosticlog'">轨迹</router-link></MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            通用设备管理
                        </template>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            任务
                        </template>
                        <MenuItem name="5-1"><router-link :to="'chart'">任务</router-link></MenuItem>
                        <MenuItem name="5-2">带宽控制</MenuItem>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            配置文件
                        </template>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon type="arrow-graph-up-right"></Icon>
                            统计和报表
                        </template>
                        <MenuItem name="7-1"><router-link :to="'chart'">统计</router-link></MenuItem>
                        <MenuItem name="7-2">设备报表</MenuItem>
                        <MenuItem name="7-3">网络报表</MenuItem>
                        <MenuItem name="7-4">应用报表</MenuItem>
                    </Submenu>
                    <Submenu name="8">
                        <template slot="title">
                            <Icon type="network"></Icon>
                            虚拟局域网
                        </template>
                        <MenuItem name="8-1">服务器配置</MenuItem>
                        <MenuItem name="8-2">客户端列表</MenuItem>
                    </Submenu>
                    <Submenu name="9">
                        <template slot="title">
                            <Icon type="key"></Icon>
                            许可证密钥
                        </template>
                    </Submenu>
                    <Submenu name="10">
                        <template slot="title">
                            <Icon type="android-phone-portrait"></Icon>
                            pocketAP
                        </template>
                        <MenuItem name="10-1">默认模板</MenuItem>
                        <MenuItem name="10-2">网页文件</MenuItem>
                        <MenuItem name="10-3">日志文件</MenuItem>
                    </Submenu>
                    <Submenu name="11">
                        <template slot="title">
                            <Icon type="ios-person"></Icon>
                            系统
                        </template>
                        <MenuItem name="11-1"><router-link :to="'usermanage'">用户管理</router-link></MenuItem>
                        <MenuItem name="11-2"><router-link :to="'syslog'">系统日志</router-link></MenuItem>
                        <MenuItem name="11-3">硬盘空间检测</MenuItem>
                    </Submenu>
                </Menu>
                </Col>
                <Col span="20">
                <div>
                    <Breadcrumb class="layout-breadcrumb">
                        <BreadcrumbItem href="#">Home</BreadcrumbItem>
                        <BreadcrumbItem href="#">Components</BreadcrumbItem>
                        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                    <!--Table :data="tableData1" :columns="tableColumns1" stripe></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="100" :current="1" @on-change="changePage"></Page>
                        </div>
                    </div-->
                <router-view></router-view>
                </Col>
            </Row>
        </div>
        <div class="layout-copy">
            版权所有 &copy; <a href="#">南京智威亚通信技术有限公司</a>
            <br>
            地址: 南京市玄武区玄武大道699-22号 江苏软件园30栋4楼
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>