var parsingModule = {
  /**
   * Преобразуем query-string к виду JS объекта
   * @param query-string, который мы будем преобразовывать
   */
  parse: function (queryForParse) {
    if (!queryForParse) {
      return {};
    }
    queryForParse = queryForParse + '';

    var self ,
        items,
        paramLen,
        pair,
        key,
        value,
        url,
        paramArray;
    self = this;
    //Обработка случая, если у нас еще и фрагмент затесался неведомым образом
    url = self.sliceFragment(queryForParse).url;

    queryForParse = url;
    queryForParse = self.normalizeQuery(queryForParse);

    if (!queryForParse) {
      return {};
    }

    paramArray = queryForParse.split('&');

    items = {};
    paramLen = paramArray.length;
    for (var i = 0; i < paramLen; i++) {
      pair = paramArray[i].split('=');
      key = self.decodeQuery(pair.shift());
      //Если знака = нет, то значению выдается null
      value = pair.length ? self.decodeQuery(pair.join('=')) : null;

      if (items[key]) {
        if (items[key] instanceof Array) {
          items[key].push(value);
        } else {
          items[key] = [items[key]];
          items[key].push(value);
        }
      } else {
        items[key] = value;
      }
    }

    return items;
  },

  /**
   * Если <code>string</code> содержит фрагмент, то он будет отсечен,
   * если <code>string</code> не содержит фрагмент, то строка останется неизменной
   * @param {object} Возвращает объект содержащий url и удаленный из него fragment
   */
  sliceFragment: function (string) {
    string += '';
    var fragment;
    var fragmentPosition = string.indexOf('#');

    if (fragmentPosition >= 0) {
      fragment = string.slice(fragmentPosition, string.length);
      string = string.slice(0, fragmentPosition);
    } else {
      fragment = '';
    }
     
    return {url: string, fragment: fragment};
  },
  /**
   * Нормализуем строку, избавляемся от всех ? стоящих в начале,
   * Избавляемся от &, которые предшествуют параметрам в начале,
   * Избавляемся от висящего & в конце строки,
   * Удаляем несколько повторяющихся подряд &
   * @param string query-string для преобразования
   */
  normalizeQuery: function (string) {
    var queryForNormalize = string;
    return queryForNormalize.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');
  },
  /**
   * Декодируем строку и приводим ее к unicode
   * @param string строка, которую будем декодировать
   */
  decodeQuery:function (string) {
    string += '';
    try {
        return decodeURIComponent(string);
    } catch(e) {
        //Если стандартный декодер провалился, то возвращаем строку как есть
        return string;
    }
  }
};
module.exports = parsingModule;
