<style>
    @import './style/device.less'
</style>
<template>
    <div class="search-input">
        <Input v-model="value" placeholder="请输入设备物理地址">
            <Button slot="append" icon="ios-search"></Button>
        </Input>
    </div>
</template>

<script>
    export default {
        props: {
            value: String
        },
        data () {
            return {};
        },
        methods: {
            updateValue: function (){
                this.$emit('input', this.value);
                this.$emit('on-change', this.value);
            }
        },
        watch: {
            value(val) {
                this.updateValue(val);
            }
        }
    }
</script>