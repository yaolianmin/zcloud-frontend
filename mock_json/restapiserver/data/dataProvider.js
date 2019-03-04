var data = require('./data.js');

var modules = {
    data: data
};

module.exports = {
    execute: function(m, f, args) {
        console.log(m+" "+f);
        console.log(modules[m]);
        return modules[m][f].call(modules[m], args);
    }
};