<template>
	<Button type="text" icon="edit" @click="ButtonClick"></Button>
</template>
<script>
	export default {
        name: 'EditButton',
        methods: {
            ButtonClick (event) {
                this.$emit('click-button',this); 
            }
        }
	}
</script>