<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card :boardered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip" @click='find_password'>忘记密码？</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import util  from '../libs/util.js';
    export default{
        data() {
            return {
                form: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账户不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //设置密码普通加密方式
                        let string = '';
                        for(var i=0;i<10;i++){
                            string = string+Math.floor((Math.random()*10));
                        }
                        let data = {
                            'username':this.form.userName,
                            'password':string+this.form.password,
                            'flag':'FvXSh_Q1YnxGkpoWK1HF6hhy' //请勿更改此值，否则后端无法认证
                        };
                        util.ajax.request('get','/logins',data,{}, this.response_callback, this.exception_callback);
                    }
                });
            },
            //ajax请求返回值处理
            response_callback(res) {
                if(res.data['state']){ console.log(res.data);
                    this.$Message.error(res.data.message);

                }else{
                    Cookies.set('user', this.form.userName);
                    //Cookies.set('password','11111111');
                    //Cookies.set('access','1');
                    // 设置全局变量 语言
                    switch(res.data['language']){
                        case 'Chinese':
                            Cookies.set('language','zh-CN');
                        case 'English':
                            Cookies.set('language','en-US');
                        case 'Traditional':
                            Cookies.set('language','zh-TW');
                        default:
                            Cookies.set('language','zh-CN');
                    }
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    this.$router.push({
                            name:'home_index'
                    });
                }
            }, 
            //ajax请求错误异常处理
            exception_callback(err) {
                console.log(err);
            },
            //跳转找回密码页面
            find_password(){
                Cookies.set('find_password', '222222');
                    this.$router.push({
                                name:'password'
                        }); 
            }
        }
    }
</script>