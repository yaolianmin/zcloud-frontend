<template>
	<img src="../../config/edit.png" @click="ButtonClick" title='修改信息' id='dis' />
</template>
<script>
	export default {
        name: 'Edit',
        methods: {
            ButtonClick (event) {
                this.$emit('click-button',this); 
            }
        }
	}
</script>