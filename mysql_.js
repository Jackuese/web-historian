var mysql = require('mysql');
var fs = require('fs');
var ul = require('url');
var http = require('http');
var sql = require('sql');

 exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_html'
});

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath, 'utf-8', function(err, data){
    var results = '';
    results += data;
    results = results.toString().split("\n");
    console.log(results);
    cb(results);
  });
};

exports.downloadUrls = function(filePath){  // fp = "/testdata/sites.txt"
  var results;
  exports.readUrls(filePath, function(urls) {
    results = urls;
    for(var i = 0; i < results.length; i++ ) {
      if(!exports.fileCheck(results[i])) {
        exports.parseResult(results[i]);
        }  // ("www.google.com")
        console.log("Already have that page archived for that date");
      }
  });
};


exports.parseResult = function (result) {
  http.get("http://"+result, function(res) {
    res.on('data', function(data){
      var info = '';
      info += data;
      info = info.toString();
      exports.writeHTML(info, "./data/sites/" + result + getADate() + ".txt"); // (google's HTML, "/testdata/sites/" + "www.google.com" +".txt")
    });
  });
};

 exports.writeHTML = function (result, filePath) {
  fs.appendFile(filePath, result, function(err) {
    if (err){
      console.log(err);
    }
  });
};

var getADate = function (){
  var d = new Date();
  var date = "=";
  date += d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
  return date;
};

exports.fileCheck = function (string){
  var comp = string.split('=');
  if(getADate() === comp[1]) {
    return true;
  }
  return false;
};







// insert function

// retrieval functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
