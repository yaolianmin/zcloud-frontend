let Mock  = require('mockjs');
let TempListData = {};

var templist = {
    'data|100' : [{
        'index|+1': 1,
        'status|0-2': 1,
        'macaddr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
        ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)',
        'devtype|0-2': 1,
        'devname|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
        'cfgname': 'cfg_@word(5)',
        'endtime': '@datetime',
        'info1|8': '@cword',
        'info2|8': '@cword',
        'group': 'group_@word(5)',
        'groupviewer': '@first',
        'admin': '@first'
        //'action|0-2': 1
    }]
};

TempListData = Mock.mock(templist);
module.exports = TempListData;