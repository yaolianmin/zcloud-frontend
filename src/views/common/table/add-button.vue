<template>
	<Button type="text" icon="plus" @click="ButtonClick" title='点击添加信息' id='dis'></Button>
</template>
<script>
	export default {
        name: 'AddButton',
        methods: {
            ButtonClick (event) {
                this.$emit('click-button',this); 
            }
        }
	}
</script>