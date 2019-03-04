let Mock  = require('mockjs');

var db = {};
db = Mock.mock({
    /**
     * @api {get} /devlists Request Device Lists.
     * @apiName GetDevice
     * @apiGroup Device
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname Lastname of the User.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Done"
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */
    'devlists|50': [{
        'id|+1': 1,
        'device_status|0-2': 1,
        'mac_addr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
        ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)',
        'model_type|1': ['AP', 'AC', 'LTE-Fi'],
        'model_name|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
        'last_templet_name': 'cfg_@word(5)',
        'service_end': '@datetime',
        'dev_info1|8': '@cword',
        'dev_info2|8': '@cword',
        'group_name': 'group_@word(5)',
        'user_name': '@first',
        'management': '@first'
    }],
    'devlogs|50': [{
        'id|+1': 1,
        'model_name|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
        'log_desc|8': '@cword',
		'log_level|1': ['0', '1', '2'],
        'time': '@datetime',
        'user_name|1': ['username1', 'username2', 'username3', 'username4', 'username5', 'username6'],
        'dev_group|1': ['group1', 'group2', 'group3', 'group4', 'group5', 'group6'],
        'mac_addr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
        ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)'
    }],
	'grouplists|50': [{
        'id|+1': 1,
        'group_list|1': ['group1', 'group2', 'group3', 'group4', 'group5', 'group6'],
		'user_name|1': ['username1', 'username2', 'username3', 'username4', 'username5', 'username6'],
		'management|1': ['management1', 'management2', 'management3', 'management4', 'management5', 'management6']
    }],
    'users|50': [{
        'id|+1': 1,
        'user_name|1': ['Tom', 'Pig', 'Goge', 'Candy', 'Lily'],
        'management|1': ['Harden', 'Pual', 'James', 'Kobe', 'Wade']
    }],
    'templates|15':[{
            'id|+1': 1,
            'model_name|1': ['ZN-7100-2DHO', 'AC-1027L', 'XN-1033'],
            'template_name|1':['default1','default2','default3','default4','default5'],
            'wireless_mode|1':['1,4','2,5','3,6'],
            'channel_frequency|1':['1,5','2,6','3,7','4,8'],
            'profiles_name|1': [
                                "name0-1,name1-1,name2-1,name3-1,name4-1,name5-1,name6-1,name7-1,name0-2,name1-2,name2-2,name3-2,name4-2,name5-2,name6-2,name7-2",
                                "test0-1,test1-1,test2-1,test3-1,test4-1,test5-1,test6-1,test7-1,test0-2,test1-2,test2-2,test3-2,test4-2,test5-2,test6-2,test7-2",
                                "lad0,lad1,lad2,lad3,lad4,lad5,lad6,lad7,lad0-2,lad1-2,lad2-2,lad3-2,lad4-2,lad5-2,lad6-2,lad7-2"
            ],
            'ssid|1':[
                    "ssid0,ssid1,ssid2,ssid3,ssid4,ssid5,ssid6,ssid7,ssid0-2,ssid1-2,ssid2-2,ssid3-2,ssid4-2,ssid5-2,ssid6-2,ssid7-2",
                    "zwa0,zwa1,zwa2,zwa3,zwa4,zwa5,zwa6,zwa7,zw0,zw1,zw2,zw3,zw4,zw5,zw6,zw7",
                    "templet0,templet1,templet2,templet3,templet4,templet5,templet6,templet7,templet0-2,templet1-2,templet2-2,templet3-2,templet4-2,templet5-2,templet6-2,templet7-2"
            ],
            'security|1':[
                "Open System,WPA-PSK,WPA2-PSK,Shared Key,WPA-PSK & WPA2-PSK,WPA-PSK,Open System,Shared Key,Open System,WPA-PSK,WPA2-PSK,Shared Key,WPA-PSK & WPA2-PSK,WPA-PSK,Open System,Shared Key"
            ]
    }],
    'devmanagements|5': [{
        'id|+1': 1,
        'model_name|1': ['XN-1032', 'XN-1033', 'AC-1027L', 'ZAC-1023-2-9', 'XN-1034'],
        'basic_platform|1': ['A', 'B', 'C', 'D', 'E'],
        'brand|1': ['123', '234', '345', '456', '567']
    }],
    'dev_card_ids|5': [{
        'id|+1': 1,
        'model_name|1': ['ZN-7100-2DHO', 'AC-1027L', 'XN-1033'],
        'card_num|1': ['2'],
        'vap_num|1': ['8,8']
    }],

});
console.log(JSON.stringify(db));


// module.exports = {
//     view_devinfo: Mock.mock({
//         "data|20": [{
//             'id|+1': 1,
//             'device_status|0-2': 1,
//             'mac_addr': '@character("0123456789ABCDEF")@character("02468ACE"):@string("0123456789ABCDEF", 2)' +
//             ':@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2):@string("0123456789ABCDEF", 2)',
//             'model_type|0-2': 1,
//             'model_name|1': ['AN-1022', 'AC-1027L', 'ZAC-1023-2-9', 'ZCN-1523-2-8', 'AC-1030', 'XN-1033'],
//             'last_templet_name': 'cfg_@word(5)',
//             'service_end': '@datetime',
//             'dev_info1|8': '@cword',
//             'dev_info2|8': '@cword',
//             'group_name': 'group_@word(5)',
//             'user_name': '@first',
//             'management': '@first'
//         }]
//     })
// };