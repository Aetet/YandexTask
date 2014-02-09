var http = require('http');
var url = require('url');
var util = require('util');

var server = new http.Server(); // -> net.Server -> events.EventEmitter

// handler.js
server.on('request', require('./handler'));

server.listen(1337);
