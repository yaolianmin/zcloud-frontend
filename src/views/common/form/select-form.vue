/*
*该组件实现选择表单
*/
<style>
    @import './style/form.less';
</style>

<template>
    <div class="select_form">
        <Select :placeholder="tips" :clearable="clearable" filterable
                :value="selectOption"
                @on-change="selectChanged">
            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>

<script>
    export default {
        name: "selectForm",
        props: {
            clearable: Boolean,
            optionList: Array,
            selectOption: String,
            tips: {
                type: String,
                default: "请选择"
            }
        },
        methods: {
            selectChanged: function (event) {
                this.$emit('select-changed', event);
            },
        },
        data() {
            return {};
        },
        created: function () {
            //this.optionList = this.cityList;
        }
    }
</script>