var diffQuery = require('../task2/back/diffQuery');
var queryParserModule = require('../task1/parseQuery');
function URI(uriString) {
  function _parts() {
    return {
        path: null,
        query: null,
        fragment: null,
    };
  }
  if (!(this instanceof URI)) {
    return new URI(uriString);
  }
  if (typeof uriString === 'string') {
    this.parts = _parts();
    this.parseURI = parseURI;
    this.parseURI(uriString, this.parts);
    this.parts.queryParams = queryParserModule.parseQuery(this.parts.query);
  } else {
    throw 'incorrect input data for parsing';
  }
}
/**
 * Парсим поступивший URI выделяя фрагмент, запрос и путь
 * @param queryString Строка для парсинга
 * @param parts Объект, содержащий части нашей URI
 **/
function parseURI(queryString, parts) {
  
  if (!parts) {
    parts = {
      path: null,
      query: null,
      fragment: null
    };
  } 
  if (!queryString) {
    return parts;
  }
  var fragmentPosition = queryString.indexOf('#');
  if (fragmentPosition > -1) {
    parts.fragment = queryString.substring(fragmentPosition + 1);
    queryString = queryString.substring(0,fragmentPosition);
  }
  var queryPosition = queryString.indexOf('?');
  if (queryPosition > -1) {
    parts.query = queryString.substring(queryPosition + 1);
    queryString = queryString.substring(0, queryPosition);
  }
  parts.path = queryString;

  return parts;
}
URI.parseQuery = queryParserModule.parseQuery; 
URI.sliceFragment = queryParserModule.sliceFragment;
URI.normalizeQuery = queryParserModule.normalizeQuery;
URI.decodeQuery = queryParserModule.decodeQuery;
URI.diffQuery = diffQuery;
module.exports = URI;
