let parser = {};

parser.Json = function (viewData) {
    if ((typeof(viewData.productInfo) === 'undefined') || (typeof(viewData.viewDesc) === 'undefined')) {
        console.log('data invaild');
        return false;
    }

    let viewArr = [];
    viewArr.push(viewData.productInfo);

    viewData.viewDesc.forEach((item) => {
        if (typeof (item.L) !== 'undefined')
        {
            parser.level(item.L, viewArr);
        }
    });

    let viewJson = parser.ViewArrayData(viewArr);
    return viewJson;
};

parser.span = function (spanArr, destArr) {
    if (spanArr instanceof Array){
        spanArr.forEach((item) => {
           var tempdata = {};
           Object.keys(item).forEach((key) => {
              if ('label' === key)
                 tempdata.label = item[key];
              else if ('V' === key)
                 tempdata.type = item[key];
              else if ('key' === key)
                 tempdata.key = item[key];
              else if ('value' === key)
                 tempdata.value = item[key];
              else if ('options' === key)
                 tempdata.options = item[key];  
              else if ('prop' === key)
                 tempdata.prop = item[key];
           });
           destArr.push(tempdata);
           //console.log('############destArr################',destArr);
       });
    }
};

//接卸L
parser.level = function (data, viewArr) {
    Object.keys(data).forEach((key) => {
        if('T1' === key)
        {
            viewArr.push({
                label: data[key],
                type: 'h2'
            });
        }
        else if('T2' === key)
        {
            viewArr.push({
                label: data[key],
                type: 'h3'
            });
        }
        else if ('L' === key)
        {
           parser.level(data[key], viewArr);
        }
        else if ('span' === key)
        {
           parser.span(data[key], viewArr);
        }
    });
};

//解析数据
parser.ViewArrayData = function (viewArr) {
    if (viewArr.length <= 1)
        return false;
    let model_name = viewArr[0].model_name;
    let card_num = viewArr[0].card_num;
    let vap_num = viewArr[0].vap_num;
    let card_info = {};

    var i = 0;
    while(i < card_num)
    {
        card_info['card'+i] = [];
        i++;
    }

    viewArr.shift();
    viewArr.forEach((item) => {
        var i = 0;

        for (i = 0; i < card_num; i++)
        {
            var temp = JSON.parse(JSON.stringify(item));
            var len = (item.prop === 1) ? 1 : ((item.prop === 2) ? vap_num[i] : 0);
            if ((item.value instanceof Array) && (item.value.length >= len) && (typeof(item.options) !== 'undefined'))
            {
                temp.value = item.value.slice(len * i, len * (i+1));
                temp.options = item.options[i];
                card_info['card'+i].push(temp);
            }
            else if((item.value instanceof Array) && (item.value.length >= len) && (typeof(item.options) === 'undefined'))
            {
                temp.value = item.value.slice(len * i, len * (i+1));
                card_info['card'+i].push(temp);
            }
            else if ( ( (typeof(temp.value) === 'undefined') && (typeof(temp.options) === 'undefined')) || !(temp.value instanceof Array))
            {
                card_info['card'+i].push(temp);
            }
            else
            {
                console.log('data error, array length is short!');
                return false;
            }
        }
    });
    return card_info;
};

export default parser;