
/*function test(vm){
	//console.log('########vm.selected_model#########',vm.selected_model);
}*/


//model弹框
function instance (vm,type) {
    const title = '提示';
    const content = '<p>请首先编辑并保存Wireless Setting，之后再更改VAP Profiles</p>';
    switch (type) {
        case 'info':
            vm.$Modal.info({
                title: title,
                content: content
            });
            break;
        case 'success':
            vm.$Modal.success({
                title: title,
                content: content
            });
            break;
        case 'warning':
            vm.$Modal.warning({
                title: title,
                content: content
            });
            break;
        case 'error':
            vm.$Modal.error({
                title: title,
                content: content
            });
            break;
    }
}

//判断对象是否为空
function isEmptyObject (obj) {
    for (var key in obj) {
        return false;//不为空
    }
    return true;//为空
}

//tab组件的选项
function tabs_handle(dev_type){
	if(dev_type === 'AC'){
        var tabs = [
                        {
                            label: '无线控制器',
                            key: 'AC',
                            name: 'AC'
                        },
                        {
                            label: '瘦AP',
                            key: 'TAP',
                            name: 'TAP'
                        }
                    ];
    }else if(dev_type === 'FAP'){
        var tabs = [
                        {
                            label: '胖AP',
                            key: 'FAP',
                            name: 'FAP'
                        }
                    ];
    }
    return tabs;
}

//将字符串数据处理为数组数据
function get_vapdata(vm,row_data){
    //console.log('######row_data#######',row_data);
    //console.log('######row_data.Authentication#######',row_data.Authentication);
    if(row_data.ProfileName && row_data.SSID && row_data.Authentication){//值非空才继续
        //console.log('######row_data.ProfileName#######',row_data.ProfileName);
        //console.log('######row_data.Authentication#######',row_data.Authentication);
        var vap_profile_name = row_data.ProfileName.split(',');
        var vap_ssid = row_data.SSID.split(',');
        var vap_security = row_data.Authentication.split(',');
        //console.log('#####vap_security#####',vap_security);

        var vap_securityInt=[];
        vap_security.forEach(function(data,index,arr){
                //vap_securityInt.push(+data);//需要转换为整形数组
                vap_securityInt.push(data);//不需要转换为整形数组
        });
        //console.log('#####vap_securityInt#####',vap_securityInt);
        var vap_authentication = [];
        vm.templetForm_vap.forEach((item, index) => {
            if ((item.key) === 'Authentication' ){
                item.options.forEach((item2, index2) => {
                    vap_securityInt.forEach((item3, index3) => {
                        var authval = item3.split('-');
                        var authArr = [];
                        authval.forEach(function(data4,index4,arr4){
                                authArr.push(+data4);//需要转换为整形数组
                        });
                        if(authArr[0] === item2.value){
                            vap_authentication[index3] = item2.label;
                            //console.log('#####item2.value#####',item2.value);
                        }
                    });
                });
            }
            
        });
        //console.log('######vap_authentication#########',vap_authentication);
        var vap_num = vm.templetData_json.productInfo.vap_num;
        var card0_vapnum = vap_num[0];
        var card1_vapnum = vap_num[1];
        //console.log('####vap_num#####',vap_num);
        resolve_vap(vm,vap_profile_name,vap_ssid,vap_authentication,card0_vapnum,card1_vapnum,vm.selectcard);
    }
    
}


//解析vap列表
function resolve_vap(vm,vap_profile_name,vap_ssid,vap_authentication,num0,num1,cdnum) {
    var vap_array = [];
    var num = num0+num1;
    //console.log('######cdnum#######',cdnum);
    if(cdnum === 0){
        for (var i=0; i<num0; i++){
            var vap_object = {};
            vm.$set(vap_object, 'ProfileName', vap_profile_name[i]);
            vm.$set(vap_object, 'SSID', vap_ssid[i]);
            vm.$set(vap_object, 'Authentication', vap_authentication[i]);
            //console.log('####vap_object########',vap_object);
            vap_array.push(vap_object);
        }
    }else if(cdnum === 1){
        for (var i=num1; i<num; i++){
            //console.log('####num1 num########',num1,num);
            var vap_object = {};
            vm.$set(vap_object, 'ProfileName', vap_profile_name[i]);
            vm.$set(vap_object, 'SSID', vap_ssid[i]);
            vm.$set(vap_object, 'Authentication', vap_authentication[i]);
            vap_array.push(vap_object);
        }
    }
    //console.log('####vap_array########',vap_array[0]);
    vm.vaptableData = vap_array;
}


//新增vap--列表
function defalut_vap(vm,cdnum){
    var vap_num = vm.templetData_json.productInfo.vap_num;
    var card0_vapnum = vap_num[0];
    var card1_vapnum = vap_num[1];
    var vap_array = [];
    var vap_profile_name;
    var vap_ssid;
    var vap_security;
    var vap_authentication = [];
    vm.templetForm_vap.forEach((item, index) => {
        if (typeof(item.key) !== 'undefined'){
            if(item.key === 'ProfileName'){
                vap_profile_name = item.value;
            }
            if(item.key === 'SSID'){
                vap_ssid = item.value;
            }
            if(item.key === 'Authentication'){
                vap_security = item.value;
                item.options.forEach((item2, index2) => {
                    //console.log('#####item2#####',item2);
                    vap_security.forEach((item3, index3) => {
                        var authval = item3.split('-');
                        var authArr = [];
                        authval.forEach(function(data4,index4,arr4){
                                authArr.push(+data4);//需要转换为整形数组
                        });

                        if(authArr[0] === item2.value){
                            //vap_authentication.push(item2.label);
                            vap_authentication[index3] = item2.label;
                        }
                    });
                });
            }
            
        }
    });

    if(cdnum === 0){
        for (var i=0; i<card0_vapnum; i++){
            var vap_object = {};
            vm.$set(vap_object, 'ProfileName', vap_profile_name[i]);
            vm.$set(vap_object, 'SSID', vap_ssid[i]);
            vm.$set(vap_object, 'Authentication', vap_authentication[i]);
            vap_array.push(vap_object);
        }
    }
    else if(cdnum === 1){
        for (var i=0; i<card1_vapnum; i++){
            var vap_object = {};
            vm.$set(vap_object, 'ProfileName', vap_profile_name[i]);
            vm.$set(vap_object, 'SSID', vap_ssid[i]);
            vm.$set(vap_object, 'Authentication', vap_authentication[i]);
            vap_array.push(vap_object);
        }
    }
    vm.vaptableData = vap_array;

}


function templateData_handle(StrData){
    //console.log('###### StrData111 ######',StrData);
    var dataIntArr=[];
    if(StrData == null || StrData == undefined || StrData == ""){
        //console.log('###### StrData222 ######',StrData);
        return dataIntArr;
    }else{
        //console.log('###### StrData333 ######',StrData);
        var dataStrArr=StrData.split(",");//分割成字符串数组
        dataStrArr.forEach(function(data,index,arr){
            if(data == "true" || data == "false"){
                data = data ==="false" ? false : true;//将字符串true、false 转换为布尔值
            }
            if(parseInt(data) == data)//需要转换为整形数组
                dataIntArr.push(+data);
            else if(parseInt(data) !== data)//不需要转换为整形数组
                dataIntArr.push(data);

        });
        return dataIntArr;
    } 
    
}

//追加配置的wireless参数
function wireless_Submit(vm,formDataObject,card_num){
	let formData = new FormData();
	Object.keys(formDataObject).forEach((key) => {
        formData.append(key, formDataObject[key]);
    });
    formData.append('model_name', vm.selected_model);
    formData.append('cardid', vm.selectcard);
    formData.append('cardnum', card_num);
    //console.log('#### formData #####',formData);
    return formData;
}

/*
追加wireless setting 默认值
num = 0 ;追加card 0 的默认值
num = 1 ;追加card 1 的默认值
*/
function wireless_formData(vm,formData,num){
	vm.templetForm_wireless.forEach((item, index) => {
	    if (typeof(item.key) !== 'undefined' && item.key !== 'template_name' && typeof(num) === 'undefined'){
	        formData.append(item.key, item.value);
	    }else if(typeof(item.key) !== 'undefined' && item.key !== 'template_name' && typeof(num) !== 'undefined'){
	    	formData.append(item.key+num, item.value);
	    }
	});
	return formData;
}

/*
追加 vap 默认值
num = 0 ;追加card 0 的默认值
num = 1 ;追加card 1 的默认值
*/
function vap_formData(vm,formData,num){
	vm.templetForm_vap.forEach((item, index) => {
        if (typeof(item.key) !== 'undefined' && typeof(num) === 'undefined'){
            formData.append(item.key, item.value);
        }else if(typeof(item.key) !== 'undefined' && typeof(num) !== 'undefined'){
        	formData.append(item.key+num, item.value);
        }
    });

	return formData;
}

//追加配置的vap参数
/*
WepKeyVal 模板js描述文件中的key，同时对应数据库中的字段
key1 key2 key3 key4 表示WEP加密方式中的四个值
choice 表示当前选择的是哪个key值
key1 key2 key3 key4 choice 通过“-”相连，形成字符串数据。
*/
/*
Authentication 表示 网络认证方式&加密方式,同时对应数据库中的字段
数据格式为 “0-0” 第一个0表示网络认证方式的value ,第二个0表示加密方式的value,中间用“-”隔开 
*/
function vap_Submit(vm,formDataObject){
	let formData = new FormData();
    var WepKeyArr=[];
    var wepkeyval;
    var Authval;
    Object.keys(formDataObject).forEach((key) => {
        //console.log('#### key ###',key);
        //console.log('#### formDataObject[key] ###',formDataObject[key]);
        if(key !== "key1" && key !== "key2" && key !== "key3" && key !== "key4" && key !== "choice" && key !== "Authentication"){
            formData.append(key, formDataObject[key]);
        }
        else{
            if(key == "key1")
                WepKeyArr.push(formDataObject[key]);
            else if(key == "key2")
                WepKeyArr.push(formDataObject[key]);
            else if(key == "key3")
                WepKeyArr.push(formDataObject[key]);
            else if(key == "key4")
                WepKeyArr.push(formDataObject[key]);
            else if(key == "choice"){
                if(formDataObject[key] == "key1")
                    WepKeyArr.push(1);
                else if(formDataObject[key] == "key2")
                    WepKeyArr.push(2);
                else if(formDataObject[key] == "key3")
                    WepKeyArr.push(3);
                else if(formDataObject[key] == "key4")
                    WepKeyArr.push(4);
            }
            else if(key == "Authentication"){
                //console.log('#### Authentication ###',formDataObject[key]);
                Authval = formDataObject[key].join('-');
                //console.log('#### Authval ###',Authval);
                formData.append('Authentication', Authval);
            }
            wepkeyval = WepKeyArr.join('-');
            //console.log('#### WepKeyArr ###',WepKeyArr);
            //console.log('#### wepkeyval ###',wepkeyval);

            formData.append('WepKeyVal', wepkeyval);
        }
        
    });
    formData.append('model_name', vm.selected_model);
    formData.append('template_name', vm.edit_templet_data['template_name']);
    formData.append('cardid', vm.selectcard);
    formData.append('vap_num', vm.edit_vapnum);

    return formData;
}


export default {
	instance,
	isEmptyObject,
	tabs_handle,
	get_vapdata,
	defalut_vap,
	templateData_handle,
	wireless_Submit,
	wireless_formData,
	vap_formData,
	vap_Submit
}