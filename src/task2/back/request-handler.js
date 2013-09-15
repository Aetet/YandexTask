var Parser = require('../../task1/parseModule');
var previousFormSubmission = '';
module.exports = function (req, res) {

  var url = req.url;
  var parsedURL = new Parser(url);
  if (parsedURL.parts.path === '/submit') {
    console.log('previously url', previousFormSubmission, 'now url', url);
    previousInSaw = url;
    console.log('parsedURL', parsedURL);
    console.log('req.url', url);

    res.end('hey hoe');
  }
  
};
