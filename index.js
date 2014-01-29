var merge = require('merge');
var zipObject = require('zip-object');
var pathToRegexp = require('path-to-regexp');
var clone = require('clone');

var pathetic = function (table) {
  return function (pathname) {
    var keys = Object.keys(table);
    var len = keys.length;
    var i = 0;
    var paramKeys = [];
    var paramValues = [];
    var key;
    var rexp;
    
    for(i; i < len; i += 1) {
      key = keys[i];
      rexp = pathToRegexp(key, paramKeys);
      matches = pathname.match(rexp);
      
      if (matches) {
        paramValues = matches.slice(1);
        
        var value = clone(table[key]);
        value.params = function () {
          return zipObject(pluck(paramKeys, 'name'), paramValues)
        };
        
        return value;
      }
    }
  };
};

function pluck (arr, key) {
  return arr.map(mapper);
  
  function mapper (item) {
    return item[key];
  }
}

module.exports = pathetic;