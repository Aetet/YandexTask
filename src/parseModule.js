var parsingModule = {
  parse: function (queryForParse) {
    var queryForParse = string;
    //Обработка случая, если у нас еще и фрагмент затесался неведомым образом
    queryForParse = this.sliceFragment(queryForParse);
    //Нормализуем строку и избавляемся от мусора
    queryForParse = this.normalizeQuery(queryForParse);

    if (!queryForParse) {
      return {};
    }


    return {};
  },

  /**
   * Если <code>string</code> содержит фрагмент, то он будет отсечен,
   * если <code>string</code> не содержит фрагмент, то строка останется неизменной
   * @param string Строка, содержащая query и fragment строку
   */
  sliceFragment: function (string) {
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
  }
};
module.exports = parsingModule;
