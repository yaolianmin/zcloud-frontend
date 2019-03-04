<!-- /*
* 该组件用来实现用户信息表单
*/
<style>
    @import "./style/forms.less";
</style>
<template>
    <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户名" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="真实姓名" v-model="formValidate.realname">
                <Input placeholder="Enter your real name"></Input>
            </FormItem>
            <FormItem label="密码" v-model="formValidate.password">
                <Input type="password" placeholder="password">
                </Input>
            </FormItem>
            <FormItem label="确认密码" v-model="formValidate.confirmpasswd">
                <Input placeholder="Enter your Confirm Password"></Input>
            </FormItem>
            <FormItem label="用户级别" >
                <Select v-model="formValidate.city" placeholder="组查看者">
                    <Option value="组查看者">组查看者</Option>
                    <Option value="组管理员" selected>组管理员</Option>
                </Select>
                <span>组管理员:</span>
                <Select v-model="formValidate.city" placeholder="组管理者">
                    <Option value="zahngsan">zahngsan</Option>
                    <Option value="lisi">lisi</Option>
                    <Option value="wangwu">wangwu</Option>
                    <Option value="zhaoliu">zhaoliu</Option>
                    <Option value="xiaoqi">xiaoqi</Option>
                    <Option value="xiaoba">xiaoba</Option>
                    <Option value="xiaojiu">xiaojiu</Option>
                </Select>
            </FormItem>
            <FormItem label="固定电话" v-model="formValidate.mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="电话号码" v-model="formValidate.mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="住址" v-model="formValidate.mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="E-mail" v-model="formValidate.mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem label="查看权限" v-model="formValidate.social">
                <CheckboxGroup>
                    <Checkbox label="主页">
                        <Icon type="logo-twitter"></Icon>
                        <span>主页</span>
                    </Checkbox>
                    <Checkbox label="警告列表">
                        <Icon type="logo-facebook"></Icon>
                        <span>警告列表</span>
                    </Checkbox>
                    <Checkbox label="设备定位">
                        <Icon type="logo-github"></Icon>
                        <span>设备定位</span>
                    </Checkbox>
                    <Checkbox label="设备日志">
                        <Icon type="logo-snapchat"></Icon>
                        <span>设备日志</span>
                    </Checkbox>
                    <Checkbox label="通用设备管理">
                        <Icon type="logo-snapchat"></Icon>
                        <span>通用设备管理</span>
                    </Checkbox>
                    <Checkbox label="统计">
                        <Icon type="logo-snapchat"></Icon>
                        <span>统计</span>
                    </Checkbox>
                    <Checkbox label="设备报表">
                        <Icon type="logo-snapchat"></Icon>
                        <span>设备报表</span>
                    </Checkbox>
                    <Checkbox label="网络报表">
                        <Icon type="logo-snapchat"></Icon>
                        <span>网络报表</span>
                    </Checkbox>
                    <Checkbox label="系统日志">
                        <Icon type="logo-snapchat"></Icon>
                        <span>系统日志</span>
                    </Checkbox>
                    <Checkbox label="LTE-FiFlow">
                        <Icon type="logo-snapchat"></Icon>
                        <span>LTE-FiFlow</span>
                    </Checkbox>
                    <Checkbox label="LTE-Fi定位">
                        <Icon type="logo-snapchat"></Icon>
                        <span>LTE-Fi定位</span>
                    </Checkbox>
                    <Checkbox label="LTE-Fi轨迹">
                        <Icon type="logo-snapchat"></Icon>
                        <span>LTE-Fi轨迹</span>
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="E-mail" v-model="formValidate.remark">
                 <Input type="textarea" :rows="6" :autosize="{minRows: 4,maxRows: 4}" placeholder="Enter something..." />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>

           
        </Form>


    </div>
</template>


<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    realname: '',
                    passwd: '',
                    confirmpasswd: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    action: [],
                    date: '',
                    time: '', 
                    social: ['facebook', 'github'],
                    desc: ''
                },
                ruleValidate: {
                  
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>
 -->