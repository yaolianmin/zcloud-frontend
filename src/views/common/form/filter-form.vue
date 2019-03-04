<style>
    /*@import './style/form.less'*/
    .filter_pop {
        width: 200px;
        height: auto;
        text-align:center
    }

    .select_comp {
        margin: 2px 2px 2px 20px;
        width: 100px;
    }
</style>

<template>
        <Poptip placement="bottom" v-model="visible">
            <Icon type="funnel" color="#bbbec4" style="margin:3px"></Icon>
                <div slot="content" class="filter_pop">
                    <tabel>
                        <tr>
                            <span>{{ filter_groupnameone }}</span>
                            <Select placeholder="请选择" class="select_comp" label-in-value clearable ref="select1" @on-change="select_change('logType', $event)">
                                <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </tr>
                        <tr>
                            <span>{{ group_name }}</span>
                            <Select placeholder="请选择" class="select_comp" label-in-value clearable ref="select2" @on-change="select_change('groupType', $event)">
                                <Option v-for="item in optionList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </tr>
                        <tr>
                            <button type="button" class="ivu-btn ivu-btn-text ivu-btn-small" @click="Filterhandle('filter')">
                                <span>筛选</span>
                            </button>
                            <button type="button" class="ivu-btn ivu-btn-text ivu-btn-small" @click="Resethandle('reset')">
                                <span>重置</span>
                            </button>
                        </tr>
                    </tabel>
                </div>
        </Poptip>
</template>


<script>
    export default {
        name: 'poptipComp',
        props: {
            optionList: Array,
            optionList2: Array,
            filter_groupnameone: String,
            group_name: String
        },
        data () {
            return {
                visible: false,
                filter_value: {}
            };
        },
        created: function () {
            //this.init();
        },
        methods: {
            select_change: function (key, event){
                this.$set(this.filter_value, key, event.value);
                //this.$emit('select-change', this, event.value, key);
            },
            Filterhandle (val) {
                let params = {
                    handle: val,
                    filter_val: this.filter_value
                }; 
                this.visible = false;
                this.$emit('select-change', this, params);
            },
            Resethandle (val) {
                this.visible = false;
                
                this.$refs.select1.clearSingleSelect();
                this.$refs.select2.clearSingleSelect();
                this.$emit('handle_reset',this, val);
            }
        }
    };
</script>
