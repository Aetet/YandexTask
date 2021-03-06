var url = require('url');
var util = require('util');
var fs = require('fs');

module.exports = function(req, res) {

  console.log(req.url);
  var parseModule = require('./QueryParser');
  console.log('parseModule', parseModule);
  var urlParsed = url.parse(req.url, true);

  if (urlParsed.pathname == '/') {
    console.log('parsed is: %J', urlParsed);
    var stream = fs.createReadStream('index.html');

    stream
      .on('readable', function() {
        var content = stream.read();
        res.write(content);
      })
      .on('end', function() {
        res.end();
      })
      .on('error', function() {
        res.statusCode = 404;
        res.end("Not Found");
      });

    return;
  }

  res.end(urlParsed.query.message);
};
