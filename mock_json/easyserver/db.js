// /mock/db.js
let fs = require('fs');
let path = require('path');
let devListData = require('./mockdata/devinfo.js');
let tempTableData = require('./mockdata/templet.js');
let devLogData = require('./mockdata/devlog.js');

//data path
let DevLists = path.join(__dirname, './datajson/devlists.json');
let DevLogs = path.join(__dirname, './datajson/devlogs.json');
let Templets = path.join(__dirname, './datajson/templets.json');


fs.writeFile(DevLists, JSON.stringify(devListData)
    , {flags:'w', encoding:'utf-8', mode:'0777'}, function(err){
    if (err){
        console.log('devlist文件写入失败');
    }
    else{
        console.log('devlist文件写入成功');
    }
});

fs.writeFile(DevLogs, JSON.stringify(devLogData)
    , {flags:'w', encoding:'utf-8', mode:'0777'}, function(err){
    if (err){
        console.log('devlog文件写入失败');
    }
    else{
        console.log('devlog文件写入成功');
    }
});

fs.writeFile(Templets, JSON.stringify(tempTableData)
    , {flags:'w', encoding:'utf-8', mode:'0777'}, function(err){
    if (err){
        console.log('templet文件写入失败');
    }
    else{
        console.log('templet文件写入成功');
    }
});

module.exports = function() {
    return {
        'view_devinfo': devListData,
        'view_devlog': devLogData,
        'view_tempinfo': tempTableData
    };
}