<template>
    <div>
        <Form ref="bestForm" :model="localFormData" :rules="formDataVaildate" class="best-form" :label-width="160">
            <FormItem v-for="item in formItems" v-if="formElems.includes(item.type)" :key="item.key" :label="item.label" :prop="item.key">
                <Input v-if="item.type === 'Input'" v-model="localFormData[item.key]" :readonly="item.readonly"></Input>
                <Input v-else-if="item.type === 'Input_tname'" v-model="localFormData[item.key]" :disabled="inputStatus"></Input>
                <input-button v-if="item.type === 'Input_WepPassphrase'" v-model="localFormData" :dataEncry="dataEncry"></input-button>
                <Input v-if="item.type === 'Input_WpaPassphrase'" v-model="localFormData[item.key]" :disabled="wpaStatus"></Input>
                <RadioGroup v-else-if="item.type === 'Radio'" v-model="localFormData[item.key]">
                    <Radio label="1">yes</Radio>
                    <Radio label="0">no</Radio>
                </RadioGroup>
                <RadioGroup v-else-if="item.type === 'Radio_able'" v-model="localFormData[item.key]">
                    <Radio label="1">Enable</Radio>
                    <Radio label="0">Disable</Radio>
                </RadioGroup>
                <RadioGroup v-else-if="item.type === 'Input_WepKeyVal'" v-model="localFormData['choice']" vertical style="width:500px">
                    <Radio label="key1" :disabled="wepStatus">
                        <span>key1</span>
                        <Input v-model="localFormData['key1']" :disabled="wepStatus"></Input>
                    </Radio>
                    <br>
                    <Radio label="key2" :disabled="wepStatus">
                        <span>key2</span>
                        <Input v-model="localFormData['key2']" :disabled="wepStatus"></Input>
                    </Radio>
                    <br>
                    <Radio label="key3" :disabled="wepStatus">
                        <span>key3</span>
                        <Input v-model="localFormData['key3']" :disabled="wepStatus"></Input>
                    </Radio>
                    <br>
                    <Radio label="key4" :disabled="wepStatus">
                        <span>key4</span>
                        <Input v-model="localFormData['key4']" :disabled="wepStatus"></Input>
                    </Radio>
                </RadioGroup>
                
                <Checkbox v-else-if="item.type === 'Checkbox'" v-model="localFormData[item.key]"></Checkbox>
                <Switch v-else-if="item.type === 'Switch'" v-model="localFormData[item.key]">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </Switch>
                <Select v-else-if="item.type === 'Select'" :disabled="item.disabled" v-model="localFormData[item.key]" @on-change="selectChanged">
                    <Option v-for="elem in item.options" :key="elem.value" :value="elem.value" :label="elem.label"></Option>
                </Select>
                <Cascader v-else-if="item.type === 'Cascader'" :data="item.options" v-model="localFormData[item.key]" @on-change="cascaderChange"></Cascader>
                <AutoComplete v-else-if="item.type === 'AutoComplete'" v-model="localFormData[item.key]"></AutoComplete>
                <Slider v-else-if="item.type === 'Slider'" v-model="localFormData[item.key]"></Slider>
                <DatePicker v-else-if="item.type === 'DatePicker'" :type="item.subtype" v-model="localFormData[item.key]"></DatePicker>
                <TimePicker v-else-if="item.type === 'TimePicker'" v-model="localFormData[item.key]"></TimePicker>
                <Transfer v-else-if="item.type === 'Transfer'" v-model="localFormData[item.key]"></Transfer>
                <InputNumber v-else-if="item.type === 'InputNumber'" v-model="localFormData[item.key]"></InputNumber>
                <Rate v-else-if="item.type === 'Rate'" v-model="localFormData[item.key]"></Rate>
                <!--<Upload v-else-if="item.type === 'Upload'"
                        :before-upload="beforeUpload"
                        :action="'//jsonplaceholder.typicode.com/posts/'">
                    <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                </Upload>-->
                <div v-else-if="item.type === 'Upload'">
                    <Upload
                        :action="'//jsonplaceholder.typicode.com/posts/'"
                        :before-upload="beforeUpload"
                        :format="['jpg','jpeg','png']"
                        :accept="'jpg'">
                        <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
                    </Upload>
                    <div v-if="filename !== null">{{ filename }}</div> 
                 </div>
                <!--input type="file" v-else-if="item.type === 'Upload'"-->
                <ColorPicker v-else-if="item.type === 'ColorPicker'" v-model="localFormData[item.key]"></ColorPicker>
            </FormItem>
            <h2 v-else-if="item.type === 'h2'">{{ item.label }}<hr/></h2>
            <h3 v-else-if="item.type === 'h3'">{{ item.label }}</h3>
            <div v-else-if="item.type === 'example'" style="color:red">{{ item.label }}</div>
            <FormItem>
                <Button type="primary" @click="handleSubmit('bestForm')">Submit</Button>
                <Button type="ghost" @click="handleReset('bestForm')" style="margin-left: 8px">Cancel</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import itemForm from './item-form.vue';
    import radioInput from './radio-input.vue';
    import inputButton from './input-button.vue';

    export default {
        name: 'bestForm',
        components: {
            itemForm,
            radioInput,
            inputButton
        },
        props: {
            formItems: Array,
            value: {
                type: Object
            },
            formDataVaildate: Object,
            inputStatus: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                filename: '',
                localFormData: {},
                formElems: [
                    'Input',
                    'Input_tname',
                    'Input_WepPassphrase',
                    'Input_WpaPassphrase',
                    'Radio',
                    'Radio_able',
                    'Input_WepKeyVal',
                    'Checkbox',
                    'Switch',
                    'Select',
                    'AutoComplete',
                    'Slider',
                    'DatePicker',
                    'TimePicker',
                    'Cascader',
                    'Transfer',
                    'InputNumber',
                    'Rate',
                    'Upload',
                    'ColorPicker',
                    'title'
                ],
                upload: false,
                wepStatus: false,
                wpaStatus: false,
                dataEncry: ''
            };
        },
        methods: {
            init() {
                let tempFormData = JSON.parse(JSON.stringify(this.value));
                
                Object.keys(tempFormData).forEach((item) => {
                    //console.log('###########item############',item);
                    //console.log('###########this.value[item]############',this.value[item]);
                    if(item == "Authentication"){
                        //console.log('###########this.value[item]############',this.value[item]);
                        this.dataEncry = this.value[item][1];
                        if(this.value[item][0] == 0 && this.value[item][1] !== 0){//Open System & !none
                            this.wepStatus = false;
                            this.wpaStatus = true;
                        }
                        else if(this.value[item][0] == 0 && this.value[item][1] == 0){//Open System & none
                            this.wepStatus = true;
                            this.wpaStatus = true;
                        }
                        else if(this.value[item][0] == 1 && this.value[item][1] !== 0){//Shared Key & !none
                            this.wepStatus = false;
                            this.wpaStatus = true;
                        }
                        else if(this.value[item][0] == 1 && this.value[item][1] == 0){//Shared Key & none
                            this.wepStatus = true;
                            this.wpaStatus = true;
                        }
                        else if(this.value[item][0] == 16){//WPA-PSK
                            this.wepStatus = true;
                            this.wpaStatus = false;
                        }
                        else if(this.value[item][0] == 32){//WPA2-PSK
                            this.wepStatus = true;
                            this.wpaStatus = false;
                        }
                        else if(this.value[item][0] == 48){//WPA-PSK & WPA2-PSK
                            this.wepStatus = true;
                            this.wpaStatus = false;
                        }
                    }
                    this.$set(this.localFormData, item, this.value[item]);
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$emit('on-click-submit', true, this.localFormData);
                    } else {
                        this.$emit('on-click-submit', false, this.localFormData);
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$emit('on-click-cancel', true);
                this.filename = null;
                this.$set(this.localFormData, 'uploadFileName', '');
            },
            //接收表单数据变化事件处理
            recvChange (key, data) {
                this.localFormData[key] = data;
            },
            beforeUpload (file){
                this.$set(this.localFormData, 'uploadFileName', file);
                this.filename = file.name;
                this.$emit('on-click-upload',true);
                //console.log(this.localFormData.['template']);
                return false;
            },
            selectChanged (event) {
                this.$emit('select-changed',event);
            },
            cascaderChange (value,selectedData) {
                //console.log('#####value#######',value);
                //console.log('######selectedData#######',selectedData);
                this.dataEncry = value[1];
                if(value[0] == 0 && value[1] !== 0){//Open System & !none
                    this.wepStatus = false;
                    this.wpaStatus = true;
                }
                else if(value[0] == 0 && value[1] == 0){//Open System & none
                    this.wepStatus = true;
                    this.wpaStatus = true;
                }
                else if(value[0] == 1 && value[1] !== 0){//Shared Key & !none
                    this.wepStatus = false;
                    this.wpaStatus = true;
                }
                else if(value[0] == 1 && value[1] == 0){//Shared Key & none
                    this.wepStatus = true;
                    this.wpaStatus = true;
                }
                else if(value[0] == 16){//WPA-PSK
                    this.wepStatus = true;
                    this.wpaStatus = false;
                }
                else if(value[0] == 32){//WPA2-PSK
                    this.wepStatus = true;
                    this.wpaStatus = false;
                }
                else if(value[0] == 48){//WPA-PSK & WPA2-PSK
                    this.wepStatus = true;
                    this.wpaStatus = false;
                }
            }
        },
        created: function () {
            this.init();
        },
        watch: {
            value (data) {
                //console.log('###########data############',data);
                //console.log('change....');
                this.init();
            }
        }
    };
</script>