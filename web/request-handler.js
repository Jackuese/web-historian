var path = require('path');
var helpers = require('./http-helpers');
var file = require('fs');
var url = require('url');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var firstTime = true;

module.exports.handleRequest = function (req, res) {
  console.log(exports.datadir);
  var parsedURL = url.parse(req.url);
  switcher[req.method](res, parsedURL.pathname, req);
};

var switcher = {
  'GET' : helpers.serveStaticAssets,
  'POST': helpers.writeAddress
};

