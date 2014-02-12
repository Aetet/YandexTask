(function () {
  var QueryParser,
      queryStringBuilder,
      root = this;

  QueryParser = root.QueryParser;

  //делаем require парсера строки запроса для утильных функций вне зависимости от окружения
  //NodeJS или браузер
  if (!QueryParser && (typeof require !== 'undefined')) {
    QueryParser = require('./QueryParser');
  }

  queryStringBuilder = function (obj, urlForParse) {
    var res = '',
        paramValue,
        url,
        fragmentSliced,
        fragment,
        urlParamPosition = urlForParse.indexOf('?');

    fragmentSliced = QueryParser.sliceFragment(urlForParse);
    url = fragmentSliced.url;
    fragment = fragmentSliced.fragment;

    if ((urlParamPosition > -1) && (url.length > urlParamPosition)) {
      res += '&';
    } else {
      res += '?';
    }

    for (var i in obj) {
      paramValue = obj[i];
      if (Array.isArray(paramValue)) {
        for (var j = 0; j < paramValue.length; j++) {
            res += i + '=' + paramValue[j] + '&';
        }
      } else {
        res += i + '=' + paramValue + '&';
      }
    }

    res = res.slice(0, res.length - 1);
    return url + res + fragment;
  };

  //Экспортируем через NodeJS модуль или глобальный объект
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = queryStringBuilder;
    }
    exports.queryStringBuilder = queryStringBuilder;
  } else {
    root.queryStringBuilder = queryStringBuilder;
  }

}).call(this);