let Mock  = require('mockjs');
let DevListData = [];

var devlist = {
    'data|100' : [{
        //'index|+1': 1,
        'device_status|0-2': 1,
        'mac_addr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
        ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)',
        'model_type|0-2': 1,
        'model_name|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
        'last_templet_name': 'cfg_@word(5)',
        'service_end': '@datetime',
        'dev_info1|8': '@cword',
        'dev_info2|8': '@cword',
        'group_name': 'group_@word(5)',
        'user_name': '@first',
        'management': '@first'
    }]
};

DevListData = Mock.mock(devlist);
module.exports = DevListData;