<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink ? '60px' : '200px'}">
            <div class="main-header">
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div v-show='groups' style="border:1px solid #FOFOFO;width:170px" id='groupss'>
                    <Row>
                        <label style='display:inline-block;width:auto;'>组管理员:</label>
                        <span  style='width:90px;border:none;' id='group_managemant'></span>
                    </Row>
                    <Row>
                        <label style='display:inline-block;width:auto;'>组查看者:</label>
                        <span  style='width:90px;border:none;' id='group_user'></span>
                    </Row>
                    <Row>
                        <label style='display:inline-block;width:auto;'>组名:</label>
                        <span style='width:90px;border:none;' id='group_'></span>
                    </Row>
                </div>
                <div class="header-avator-con">
                    <message-tip v-model="mesCount"></message-tip> 
                    <div class="group_name"  @mouseout='lose_group' @mouseover='get_group'>
                        <label>组名：</label>
                        <Input v-model="group_name" placeholder="" style="width: 120px" readonly id='group_name' />
                    </div>
                    <Row style='margin-top:-44px;margin-left:34px;'>
                        <Select v-model="model3" style="width:100px" @on-change='change_language'>
                            <Option value="en">Engliah</Option>
                            <Option value="chinese" Select>中文简体</Option>
                            <Option value="fanti">中文繁體</Option>
                        </Select>
                    </Row>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="#">
                                    <span class="main-user-name" style="text-align:left">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownspace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import shrinkableMenu from './main-components/sidemenu/sidemenu.vue';
    import Cookies from 'js-cookie';
    import util from '../libs/util.js';
    import BreadcrumbNav from "./main-components/breadcrumb-nav.vue";
    import MessageTip from "./main-components/message-tip.vue";

    export default {
        components: {
            MessageTip,
            BreadcrumbNav,
            shrinkableMenu
        },
        data () {
            return {
                groups:false,
                group_name:'',
                shrink: false,
                userName: Cookies.get('user'),
                mesCount: 3,
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                model3:'中文简体'
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList;  // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath;  // 当前面包屑数组
            },
            avatorPath () {
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            }
        },
        methods: {
            init() {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    Cookies.remove('user');
                    //Cookies.remove('language');
                    // 退出登录
                    //this.$store.commit('logout', this);
                    //this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                            name: 'login'
                    });
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) {  //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                // console.log(val)
            },
            beforePush (name) {
                if (name === 'accesstest_index') {
                    return false;
                } else {
                    return true;
                }
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            },
            // 填充组名数据
            call_backs(res){
                if(!res.data['state']){
                    this.group_name = res.data['data']['usr_grp_sel_group'];
                    document.getElementById('group_managemant').innerHTML = res.data['data']['usr_grp_sel_mgt'];
                    document.getElementById('group_user').innerHTML = res.data['data']['usr_grp_sel_reviewer'];
                    document.getElementById('group_').innerHTML = res.data['data']['usr_grp_sel_group'];
                }

                // if(!this.group_name){
                //     //this.$Message.error('请添加组名');
                    
                //     this.$router.push({
                //             name: 'group_manage'
                //     });
                //     alert('请添加组名');
                // }
            },
            get_group(){
                this.groups = true;
            },
            lose_group(){
                this.groups = false;
            },
            // 更换语言的操作
            change_language(language){
                if(language == 'en'){
                    //类似于超全局变量cookie,只适用于高版本的浏览器
                    localStorage.setItem('lang','en-US');   
                }else if(language == 'chinese'){
                    localStorage.setItem('lang','zh-CN');
                }else if(language == 'fanti'){
                    localStorage.setItem('lang','zh-CN');
                }
                // 执行switchLang函数，参数数语言
                this.$store.commit('switchLang',window.localStorage.lang);
                this.$router.push({
                    name: this.$route.name
                });
                console.log(window.localStorage.lang);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name);  // 在切换语言时用于刷新面包屑
            }
        },
        mounted() {
            //this.init();
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            //获得该用户的组名
            var infor = {
                'flag':'get_user_group_name',
                'user':Cookies.get('user')
            }
            util.ajax.request('get','/group-managements',infor,{}, this.call_backs, this.exception_callback);
        }
    };
</script>