var parseModule = require('./parseModule');
var queryStringBuilder = function (obj, urlForParse) {
    var res = '',
        paramValue,
        url,
        fragmentSliced,
        fragment,
        urlParamPosition = urlForParse.indexOf('?');
    fragmentSliced = parseModule.sliceFragment(urlForParse);
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
/*
var obj = {
    Sith: ["Darth", "Sidius", "Anakin"],
    Jedi: ["ObiVan", "Quai-gon", "Mace Vindoo"],
    Yoda: "Master"
};
var queryString = queryStringBuilder(obj, 'http://google.com');
console.log(queryString);
*/

module.exports = queryStringBuilder;