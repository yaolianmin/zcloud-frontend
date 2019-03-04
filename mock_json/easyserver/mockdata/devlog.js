let Mock  = require('mockjs');
let DevLogData = {};

var devlog = {
    'data|10' : [{
        'id|+1': 1,
        'modelname|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
        'desc|8': '@cword',
        'time': '@datetime',
        'macaddr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
        ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)',
    }]
};

DevLogData = Mock.mock(devlog);
module.exports = DevLogData;