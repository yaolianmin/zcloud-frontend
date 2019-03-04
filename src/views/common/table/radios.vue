<style type="text/css">
	.radius{
		margin-top:30px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #2D8CF0;
        border:none;
	}
	.radius2{
		margin-top:30px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #FFFFFF;
        border: 1px solid #7D7D7D;
	}
</style>
<template>
	<div class="rad">
		<button class='radius' @click='func' v-show='bt1'></button>
		<button class='radius2' @click='func2' v-show='bt2'></button>
	</div>
</template>
<script>
	export default {
        name: 'Radio',
        data(){
        	return {
        		bt1:false,
        		bt2:true
        	}
        },
        methods: {
            ButtonClick (event) {
                this.$emit('click',this); 
            },
            func(event){
				 this.$emit('click',this); 
			},
			func2(event){
				 this.$emit('click',this); 
			}
        }
	}
</script>