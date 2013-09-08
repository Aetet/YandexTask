var parsingModule = {
  /**
   * Преобразуем query-string к виду JS объекта
   * @param query-string, который мы будем преобразовывать
   */
  parse: function (queryForParse) {
    if (!queryForParse) {
      return {}
    }
    queryForParse = queryForParse + '';

    var self ,
        items,
        paramLen, 
        pair, 
        key, 
        value,
        paramArray;
    self = this;
    //Обработка случая, если у нас еще и фрагмент затесался неведомым образом
    queryForParse = self.sliceFragment(queryForParse);
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
   * @param string Строка, содержащая query и fragment строку
   */
  sliceFragment: function (string) {
    string += '';
    var fragmentPosition = string.indexOf('#');
    (fragmentPosition >= 0) ? 
      string = string.slice(0, fragmentPosition) :
      string;
    
    return string;
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
