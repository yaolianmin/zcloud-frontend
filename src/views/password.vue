<style type="text/css">
	.background{
		
	}
	.logo{
		height:60px;
		float: left;
		margin-top: 10px;
		margin-left:25%;
	}
	.form{
		/*background-color: #ECF5FF;*/
		height: 100%;
		width:100% !important;
	}
	.word{
		float:left;
		font-size:16px;
		margin-top:38px;
		color:#38992B
	}
	.user_form{
		margin:30px auto;
	}
	.user_form input{
		width:200px;
		height: 34px;
		float: left;
		border:1px solid #DDDEE1;
		border-radius: 4px;
		padding-left: 4px;
	}
	.user_form label{
		float: left;
		height: 34px;
		width:70px;
		line-height: 34px;
	}
	.pointer:hover{
		cursor: pointer;
	}
</style>
<template>
	<div class="background">
		<div style="height:100px;background-color: #F4F6F3">
			<img src="./assert/images/yaoshi.png"class="logo">
			<p class="word">找回密码</p>
		</div>
		<div style="width:400px;height:400px;margin-top:60px;" class="user_form" v-if='type'>
			<div style="margin-top:20px;width:100%;float:left;">
				<label>用户名：</label>
				<input type="text" v-model='user' placeholder="请输入用户名">
			</div>
			<div style="margin-top:20px;width:100%;float:left">
				<label >邮箱：</label>
				<input type="text" v-model='email' placeholder="注册用户时所用的邮箱">
			</div>
			<div style="margin-top:40px;width:100%;float:left">
				<input type="submit" value="确定" style="width:100px;margin-right:70px;" @click='get_user' class="pointer">
				<input type="reset" value="取消" style="width:100px;" @click='return_login' class="pointer">
			</div>
			
		</div>
		<div style="width:400px;height:400px;" class="user_form" v-if='type2'>
			<div style="margin-top:20px;width:100%;float:left">
				<label >新密码：</label>
				<input type="password" v-model='pass' placeholder="6-10数字或字母">
			</div>
			<div style="margin-top:20px;width:100%;float:left">
				<label >确认密码：</label>
				<input type="password" v-model='re_pass' placeholder="">
			</div>
			<div style="margin-top:60px;width:100%;float:left">
				<input type="submit" value="确定" style="width:100px;margin-right:70px;" @click='get_pass' class="pointer">
				<input type="reset" value="取消" style="width:100px;" @click='return_login' class="pointer">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import util  from '../libs/util.js';
	export default {
       
        data () {
            return {
                type:true,
                type2:false,
                pass:'',
                re_pass:'',
                user:'',
                email:'',
                baseuri:'/find-passwords'
            }
        },
        methods:{
        	get_user(){
        		const user = this.user;
        		const email = this.email;
        		if(user){
        			if(email){
        				var infor = {
        					'user':user,
        					'email':email,
        					'flag':'find_self_password'
        				};
        				util.ajax.request('get',this.baseuri,infor,{},this.call_back,this.exception_callback);
        			}else{
        				this.$Message.error('邮箱不能为空'); 
        			}
        		}else{
        			this.$Message.error('用户名不能为空'); 
        		}
        	},
        	call_back(res){
        		if(res.data['state']){
        			this.$Message.error(res.data['message']); 
        		}else{
        			this.type = false;
        			this.type2 = true;
        		}
        	},
        	get_pass(){
        		var infor = {
        				'user':this.user,
        				'email':this.email,
        			    'pass':this.pass,
        			    're_pass':this.re_pass,
        				'flag':'store_self_password'
        			};
        		util.ajax.request('get',this.baseuri,infor,{},this.back_func,this.exception_callback);
        		this.$Message.success('请勿重复点击确认按钮，稍等一分钟'); 
        	},
        	back_func(res){
        		if(res.data['state']){
        			this.$Message.error(res.data['message']); 
        		}else{
        			this.$router.push({
                            name: 'login'
                    });
        		}
        	},
        	return_login(){
        		this.$router.push({
                            name: 'login'
                });
        	}
        }
    }
</script>