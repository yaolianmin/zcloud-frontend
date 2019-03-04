<template>
    <div>
        <Input v-if="form_type === 'Input'" v-model="value[key_word]" @on-change="formChange"></Input>
        <Radio v-else-if="form_type === 'Radio'" v-model="ItemData" @on-change="formChange"></Radio>
        <Checkbox v-else-if="form_type === 'Checkbox'" v-model="ItemData" @on-change="formChange"></Checkbox>
        <Switch v-else-if="form_type === 'Switch'" v-model="ItemData" @on-change="formChange"></Switch>
        <Select v-else-if="form_type === 'Select'" v-model="ItemData" @on-change="formChange">
            <Option v-for="elem in item.options" :key="elem.id" :value="elem.value" :label="elem.label"></Option>
        </Select>
        <AutoComplete v-else-if="form_type === 'AutoComplete'" v-model="ItemData" @on-change="formChange"></AutoComplete>
        <Slider v-else-if="form_type === 'Slider'" v-model="ItemData" @on-change="formChange"></Slider>
        <DatePicker v-else-if="form_type === 'DatePicker'" v-model="ItemData" @on-change="formChange"></DatePicker>
        <TimePicker v-else-if="form_type === 'TimePicker'" v-model="ItemData" @on-change="formChange"></TimePicker>
        <Cascader v-else-if="form_type === 'Cascader'" v-model="ItemData" @on-change="formChange"></Cascader>
        <Transfer v-else-if="form_type === 'Transfer'" v-model="ItemData" @on-change="formChange"></Transfer>
        <InputNumber v-else-if="form_type === 'InputNumber'" v-model="ItemData" @on-change="formChange"></InputNumber>
        <Rate v-else-if="form_type === 'Rate'" v-model="ItemData" @on-change="formChange"></Rate>
        <Upload v-else-if="form_type === 'Upload'" v-model="ItemData"></Upload>
        <ColorPicker v-else-if="form_type === 'ColorPicker'" v-model="ItemData" @on-change="formChange"></ColorPicker>
        <Form v-else-if="form_type === 'Form'" v-model="ItemData"></Form>
        <span>{{ ItemData }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            item: Object,
            key_word: String,
            value: Object
        },
        data() {
            return {
                form_type: this.item.type,
                ItemData: this.value[this.key_word]
            };
        },
        methods: {
            formChange: function (event) {
                this.$emit('form-change', this.key_word,
                    typeof(event) === 'string' ? event : event.target.value);
            }
        },
        watch: {
          'value': function() {
              console.log('helllow wor');
          }
        },
        created: function () {
        }
    };
</script>