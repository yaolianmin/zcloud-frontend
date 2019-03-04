/*
*该组件实现设备状态标签示例
*/
<style>
    @import './style/tag.less';
</style>

<template>
    <div>
        <Tag type="dot" color="green" >Online </Tag>
        <Tag type="dot" color="yellow">Alert  </Tag>
        <Tag type="dot" color="red"   >Offline</Tag>
    </div>
</template>

<script>
    export default {
        name: 'tagDevStatus',
        props: {

        },
        data: {}
    }
</script>