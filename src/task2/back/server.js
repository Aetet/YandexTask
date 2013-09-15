var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('../public');
var handleServerRequest = require('./request-handler');


var server = http.createServer(
  function (req, res) {
    handleServerRequest(req, res);
    req.on('end', function () {
      fileServer.serve(req, res);
    }).resume();
  }
);

//server.on('request', handleServerRequest);

server.listen(8080);
