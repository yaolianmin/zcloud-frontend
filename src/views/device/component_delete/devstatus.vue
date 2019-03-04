<style>
    @import './style/device.less';
</style>

<template>
    <div>
        <Tag type="dot" color="green">Online</Tag>
        <Tag type="dot" color="yellow">Alert</Tag>
        <Tag type="dot" color="red">Offline</Tag>
    </div>
</template>

<script>
    export default {
        name: 'devStatus',
        props: {

        },
        data: {}
    }
</script>