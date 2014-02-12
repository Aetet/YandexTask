(function () {

  var Diff,
      root = this;

  Diff = {
    diffQueryStringObjects: function (obj1, obj2) {
      var res = {};

      this.diffObjects(obj1, obj2, res);
      this.diffObjects(obj2, obj1, res);

      return res;
    },
    diffObjects: function (obj1, obj2, res) {
      var obj1Val,
          obj2Val,
          obj2Array;

      for (var i in obj1) {

        if (i in obj2) {

          obj1Val = obj1[i] + '';
          obj2Val = obj2[i] + '';

          if (Array.isArray(obj1[i])) {

            res[i] = {obj1: [], obj2: []};
            obj2Array = (Array.isArray(obj2[i])) ? obj2[i] : [obj2[i]];
            this.diffForArray(obj1[i], obj2Array, res[i]);

            if (res[i].obj1.length === 0 && res[i].obj2.length === 0) {
              delete res[i];
            }
          } else if (obj1Val instanceof Object) {
            throw new Error('This isnt suite for param object');
          } else if (obj1Val !== obj2Val) {

            res[i] = {
                obj1: obj2[i],
                obj2: obj1[i]
            };

          }
        } else {
          res[i] = obj1[i];
        }
      }
      return res;
    },
    diffForArray: function (arr1, arr2, res) {
      var arr1Val,
          arr2Val,
          cacheValue,
          cache = {},
          cache2 = {};
          
      for (var i = 0; i < arr1.length; i++) {
        if (!cache[arr1[i]]) {
          cache[arr1[i]] = arr1[i];
        }
      }

      for (var j = 0; j < arr2.length; j++) {
        arr2Val = arr2[j];
        cacheValue = cache[arr2Val];
        if (typeof cacheValue === 'undefined') {
          cache2[arr2Val] = arr2Val;
          res.obj1.push(arr2Val);
        } else {
          cache2[arr2Val] = arr2Val;
        }
      }

      for (var k = 0; k < arr1.length; k++) {
        arr1Val = arr1[k];
        if (typeof cache2[arr1Val] === 'undefined') {
          res.obj2.push(arr1Val);
        }
      }
  
      return res;
    }
  };

  //Экспортируем через NodeJS модуль или в глобальный объект
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Diff;
    }
    exports.Diff = Diff;
  } else {
    root.Diff = Diff;
  }

}).call(this);