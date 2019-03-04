/*
*该组件实现搜索输入框
*/
<style>
    @import './style/search.less'
</style>
<template>
    <div class="search-input">
        <Input v-model="value"
               :placeholder="tips"
               icon="ios-search"
               @on-click="buttonClick"
               @on-enter="buttonClick"
        >
        </Input>
    </div>
</template>

<script>
    export default {
        name: 'inputSearch',
        props: {
            tips: {
                type: String,
                default: '请输入设备物理地址'
            }
        },
        data () {
            return {
                value: ''
            };
        },
        methods: {
            updateValue: function (){
                this.$emit('input', this.value);
                this.$emit('on-change', this.value);
            },
            buttonClick: function (){
                this.$emit('input', this.value);
                this.$emit('on-change', this.value);
            }
        },
//        watch: {
//            value() {
//                this.updateValue();
//            }
//        }
    }
</script>