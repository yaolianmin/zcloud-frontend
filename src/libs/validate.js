//本文件主要内容为本网站数据校验函数集合
let validate = {

};

//检测MAC地址有效性
validate.validateMac =  function(rule, value, callback) {
    if (value === '') {
        callback(new Error('The  mac_addr cannot be empty'));
    }
    else {
        let temp = /[A-Fa-f0-9][02468aceACE]:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
        if (!temp.test(value))
        {
            callback(new Error('输入的mac地址格式不正确，请以xx:xx:xx:xx:xx:xx的形式输入（xx为16进制数字,首字节必须为偶数）!'));
        }
        callback();
    }
};

export default validate;
