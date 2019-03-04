/*
* 表单内容
* type 表示表单类型，如Input/Select/Form/Slider等
* subtype 表示表单子类型，如DatePicker支持datetime，datetimerange
* key 表示对应数据库字段
* value 表单内容
* options 正对Select类型表单的option选项
* label 在页面显示的标签
* render 表单的渲染函数
* */
const newModel = [
    {
        type: 'Input',
        key: 'model_name',
        value: '',
        label: '机种名称'
    },
    {
        type: 'Input',
        key: 'basic_platform', //数据库字段名称
        value: '',     //选中值
        label: '基础平台'
    },
    {
        type: 'Input',
        key: 'brand',
        value: '',
        label: '品牌'
    },
    {
        type: 'Upload',
        key: 'template',
        value: '',
        label: '模板文件'
    }];

export default newModel;