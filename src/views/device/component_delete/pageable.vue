<style>
    @import './style/device.less'
</style>
<template>
    <div class="page-list">
        <Page :total="count" show-total show-elevator @on-change="changePage"></Page>
    </div>
</template>

<script>
    export default {
        name: 'pageTable',
        props: {
            count: Number
        },
        methods: {
            changePage (current) {
                this.$emit('on-change', current);
            }
        }
    }
</script>