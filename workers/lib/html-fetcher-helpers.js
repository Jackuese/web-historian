var fs = require('fs');
var ul = require('url');

exports.readUrls = function(filePath, cb){
  // var fpath = ul.parse(filePath).pathname;
  // console.log("HERE")
  fs.readFile(filePath, 'utf-8', function(err, data){
    var results = '';
    results += data;
    results = results.toString().split("\n");
    console.log(results);
    cb(results);
  });
};

exports.downloadUrls = function(urls){
  // fixme
};
