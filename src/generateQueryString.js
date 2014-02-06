var generateQueryString = function (obj, url) {
    var res = '',
        paramValue,
        urlParamPosition = url.indexOf('?');
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
    return url + res;
};
var obj = {
    Sith: ["Darth", "Sidius", "Anakin"],
    Jedi: ["ObiVan", "Quai-gon", "Mace Vindoo"],
    Yoda: "Master"
};
var queryString = generateQueryString(obj, 'http://google.com');
console.log(queryString);

module.exports = generateQueryString;