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
  waiter(res, folder);
  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or ones archived from others...), css, or anything that doesn't change often.)
};

exports.writeAddress = function(res, path, asset ) {
  res.writeHead(201, headers);
  asset.on('data', function(data) {
    var urlinput = '';
    urlinput += data;
    urlinput += "\n";
     fs.appendFile('../data/sites.txt', urlinput, function(err) {
     });
    res.end('[]');
  });
};

var waiter = function(res, ur) { // fix it later to do actual archival retrieval ; it currently only grabs one copy . Refer to workers/lib. 
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
        if(err) {
          res.writeHead(404, headers);
          res.end();
          return;
        }
        res.writeHead(200, headers);
        output += data;
        res.end(output);
      });
    }
};




