<style>
    @import './style/form.less';
</style>

<template>
    <div>
        <Form ref="betterForm" :model="formDataObject" :rules="formDataVaildate" class="better-form" :label-width="80">
            <FormItem v-for="item in formItems" :key="item.id" :label="item.label" :prop="item.key">
                <form-render :parent="vm" :key="item.key" :formItem="item" :render="item.render"></form-render>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('betterForm')">Submit</Button>
                <Button type="ghost" @click="handleReset('betterForm')" style="margin-left: 8px">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import formRender from './form-render.js';

    export default {
        name: "betterForm",
        components: {
          formRender
        },
        props: {
            formItems: Array,
            formDataObject: Object,
            formDataVaildate: Object,
            formSubmit: Function
        },
        data () {
            return {
                vm: {}
            };
        },
        methods: {
            init() {
                this.vm = this;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$emit('on-click-submit', true, this.formDataObject);
                    } else {
                        this.$emit('on-click-submit', false, this.formDataObject);
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created: function () {
            this.init();
        }
    };
</script>