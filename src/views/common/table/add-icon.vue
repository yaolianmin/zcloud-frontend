<template>
	<Button type="text" icon="ios-cloud-download" @click="ButtonClick" style='font-size:14px;' title='点击下载信息'></Button>
</template>
<script>
	export default {
        name: 'AddIcon',
        methods: {
            ButtonClick (event) {
                this.$emit('click',this); 
            }
        }
	}
</script>