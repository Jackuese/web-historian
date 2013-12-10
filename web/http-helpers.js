var path = require('path');
var fs = require('fs');
var url = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveStaticAssets = function(res, folder, asset) {
  firstRun(res,folder);
  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or ones archived from others...), css, or anything that doesn't change often.)
};

var firstRun = function(res, ur) {
  if(ur === '/') {
    res.writeHead(200, headers);
    var output = '';
    fs.readFile('./web/public/index.html', 'utf8', function (err, data){
      output += data;
      res.end(output);
    });
    } else {
      res.writeHead(200, headers);
      fs.readFile('./data/sites' + ur, 'utf8', function (err, data){
        output += data;
        console.log("This is Google" + data);
        res.end(output);
      });
    }
};

var readArchive = function (res, ur){
  // look at the file containing the list of urls (./data/sites.txt)
  // if it finds an address matching the queried site (/www.google.com)
  // it should go through the site archive at ./data/sites and send the html for the chosen site back
};
// As you go through, keep thinking about what helper functions you can put here!