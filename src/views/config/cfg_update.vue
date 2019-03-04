<template>
    <div>
        <best-form :formItems="formItems"
                   v-model="formDataObject"
                   :formDataVaildate="formDataVaildate"
                   @on-click-submit="formSubmit"
        ></best-form>
    </div>
</template>

<script>
    import bestForm from '../common/form/best-form.vue';
    import util  from '../../libs/util.js';
    import devForm from './dev_register.js';

    export default {
        components: {
            bestForm
        },
        data () {
            return {
                formItems: [],
                formDataObject: {},
                formDataVaildate: {},
                baseuri: '/users/',
                users: []
            };
        },
        methods: {
            //初始表单数据
            initFormData: function () {
                devForm.forEach((item, index) => {
                    this.$set(this.formDataObject, item.key, devForm[index].value);
                });
            },
            //初始表单校验规则
            initFormDataVaildate: function () {
                devForm.forEach((item) => {
                    this.formDataVaildate[item.key] = '';
                });
            },
            //表单提交
            formSubmit: function (vaild, formDataObject) {
//                util.ajax.request('post', this.baseuri, {}, this.formDataObject, (res) => {
//                    this.$Message.success('Are you ok!');
//                });
               // this.formDataObject = formDataObject;
                if (vaild)
                    this.$Message.success('Success !');
                else
                    this.$Message.error('Failed !');
            },
            //ajax 返回成功处理
            response_callback: function (res) {
                this.users = res.data.body;
                devForm.forEach((item) => {
                    if (item.type === 'Select')
                    {
                        this.users.forEach((option) => {
                            item.options.push({
                                value: option.management,
                                label: option.management
                            });
                        });
                    }
                });
                this.formItems = devForm;
            }
        },
        watch: {
//            formDataObject: function () {
//                console.log('watch ......');
//                let self = this;
//                this.$broadcast("updateFormData", self.formDataObject);
//            }
        },
        created: function() {
            this.formItems = devForm;
            this.initFormData();
            this.initFormDataVaildate();
            util.ajax.request('get', this.baseuri, {}, {}, this.response_callback);
        }
    };
</script>