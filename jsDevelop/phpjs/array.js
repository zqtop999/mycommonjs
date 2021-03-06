(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function _phpCastString(value) {
  // original by: Rafał Kukawski
  //   example 1: _phpCastString(true)
  //   returns 1: '1'
  //   example 2: _phpCastString(false)
  //   returns 2: ''
  //   example 3: _phpCastString('foo')
  //   returns 3: 'foo'
  //   example 4: _phpCastString(0/0)
  //   returns 4: 'NAN'
  //   example 5: _phpCastString(1/0)
  //   returns 5: 'INF'
  //   example 6: _phpCastString(-1/0)
  //   returns 6: '-INF'
  //   example 7: _phpCastString(null)
  //   returns 7: ''
  //   example 8: _phpCastString(undefined)
  //   returns 8: ''
  //   example 9: _phpCastString([])
  //   returns 9: 'Array'
  //   example 10: _phpCastString({})
  //   returns 10: 'Object'
  //   example 11: _phpCastString(0)
  //   returns 11: '0'
  //   example 12: _phpCastString(1)
  //   returns 12: '1'
  //   example 13: _phpCastString(3.14)
  //   returns 13: '3.14'

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  switch (type) {
    case 'boolean':
      return value ? '1' : '';
    case 'string':
      return value;
    case 'number':
      if (isNaN(value)) {
        return 'NAN';
      }

      if (!isFinite(value)) {
        return (value < 0 ? '-' : '') + 'INF';
      }

      return value + '';
    case 'undefined':
      return '';
    case 'object':
      if (Array.isArray(value)) {
        return 'Array';
      }

      if (value !== null) {
        return 'Object';
      }

      return '';
    case 'function':
    // fall through
    default:
      throw new Error('Unsupported value type');
  }
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_change_key_case(array, cs) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_change_key_case/
  // original by: Ates Goral (http://magnetiq.com)
  // improved by: marrtins
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_change_key_case(42)
  //   returns 1: false
  //   example 2: array_change_key_case([ 3, 5 ])
  //   returns 2: [3, 5]
  //   example 3: array_change_key_case({ FuBaR: 42 })
  //   returns 3: {"fubar": 42}
  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
  //   returns 4: {"fubar": 42}
  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
  //   returns 5: {"FUBAR": 42}
  //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
  //   returns 6: {"FUBAR": 42}

  var caseFnc;
  var key;
  var tmpArr = {};

  if (Object.prototype.toString.call(array) === '[object Array]') {
    return array;
  }

  if (array && (typeof array === 'undefined' ? 'undefined' : _typeof(array)) === 'object') {
    caseFnc = !cs || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase';
    for (key in array) {
      tmpArr[key[caseFnc]()] = array[key];
    }
    return tmpArr;
  }

  return false;
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function array_chunk(input, size, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_chunk/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Important note: Per the ECMAScript specification,
  //      note 1: objects may not always iterate in a predictable order
  //   example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2)
  //   returns 1: [['Kevin', 'van'], ['Zonneveld']]
  //   example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true)
  //   returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
  //   example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2)
  //   returns 3: [['Kevin', 'van'], ['Zonneveld']]
  //   example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true)
  //   returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]

  var x;
  var p = '';
  var i = 0;
  var c = -1;
  var l = input.length || 0;
  var n = [];

  if (size < 1) {
    return null;
  }

  if (Object.prototype.toString.call(input) === '[object Array]') {
    if (preserveKeys) {
      while (i < l) {
        (x = i % size) ? n[c][i] = input[i] : n[++c] = {};n[c][i] = input[i];
        i++;
      }
    } else {
      while (i < l) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
        i++;
      }
    }
  } else {
    if (preserveKeys) {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][p] = input[p] : n[++c] = {};n[c][p] = input[p];
          i++;
        }
      }
    } else {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
          i++;
        }
      }
    }
  }

  return n;
};

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_column(input, ColumnKey) {
  var IndexKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // eslint-disable-line camelcase
  //   discuss at: http://locutus.io/php/array_column/
  //   original by: Enzo Dañobeytía
  //   example 1: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name')
  //   returns 1: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 2: array_column({0: {name: 'Alex', value: 1}, 1: {name: 'Elvis', value: 2}, 2: {name: 'Michael', value: 3}}, 'name')
  //   returns 2: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 3: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name', 'value')
  //   returns 3: {1: "Alex", 2: "Elvis", 3: "Michael"}
  //   example 4: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], null, 'value')
  //   returns 4: {1: {name: 'Alex', value: 1}, 2: {name: 'Elvis', value: 2}, 3: {name: 'Michael', value: 3}}

  if (input !== null && ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' || Array.isArray(input))) {
    var newarray = [];
    if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
      var temparray = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(input)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          temparray.push(input[key]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      input = temparray;
    }
    if (Array.isArray(input)) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = input.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _key = _step2.value;

          if (IndexKey && input[_key][IndexKey]) {
            if (ColumnKey) {
              newarray[input[_key][IndexKey]] = input[_key][ColumnKey];
            } else {
              newarray[input[_key][IndexKey]] = input[_key];
            }
          } else {
            if (ColumnKey) {
              newarray.push(input[_key][ColumnKey]);
            } else {
              newarray.push(input[_key]);
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    return Object.assign({}, newarray);
  }
};

},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_combine(keys, values) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_combine/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
  //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

  var newArray = {};
  var i = 0;

  // input sanitation
  // Only accept arrays or array-like objects
  // Require arrays to have a count
  if ((typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) !== 'object') {
    return false;
  }
  if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    return false;
  }
  if (typeof keys.length !== 'number') {
    return false;
  }
  if (typeof values.length !== 'number') {
    return false;
  }
  if (!keys.length) {
    return false;
  }

  // number of elements does not match
  if (keys.length !== values.length) {
    return false;
  }

  for (i = 0; i < keys.length; i++) {
    newArray[keys[i]] = values[i];
  }

  return newArray;
};

},{}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_count_values(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_count_values/
  // original by: Ates Goral (http://magnetiq.com)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: sankai
  //    input by: Shingo
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ])
  //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
  //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" })
  //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
  //   example 3: array_count_values([ true, 4.2, 42, "fubar" ])
  //   returns 3: {42:1, "fubar":1}

  var tmpArr = {};
  var key = '';
  var t = '';

  var _getType = function _getType(obj) {
    // Objects are php associative arrays.
    var t = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    t = t.toLowerCase();
    if (t === 'object') {
      t = 'array';
    }
    return t;
  };

  var _countValue = function _countValue(tmpArr, value) {
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        return;
      }
    } else if (typeof value !== 'string') {
      return;
    }

    if (value in tmpArr && tmpArr.hasOwnProperty(value)) {
      ++tmpArr[value];
    } else {
      tmpArr[value] = 1;
    }
  };

  t = _getType(array);
  if (t === 'array') {
    for (key in array) {
      if (array.hasOwnProperty(key)) {
        _countValue.call(this, tmpArr, array[key]);
      }
    }
  }

  return tmpArr;
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function array_diff(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Sanjoy Roy
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
  //   returns 1: {0:'Kevin'}

  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function array_diff_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_assoc/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: 0m3r
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function array_diff_key(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_key/
  // original by: Ates Goral (http://magnetiq.com)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //    input by: Everlasto
  //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5})
  //   returns 1: {"green":2, "blue":3, "white":4}
  //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5})
  //   returns 2: {"green":2, "blue":3, "white":4}

  var argl = arguments.length;
  var retArr = {};
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],10:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_diff_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
  //   returns 1: {b: 'brown', c: 'blue', 0: 'red'}
  //        test: skip-1

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = {};
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_diff_ukey(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_ukey/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {red: 2, purple: 4}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  // var arglm2 = arglm1 - 1
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var arr = {};
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
"use strict";

module.exports = function array_fill(startIndex, num, mixedVal) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_fill/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_fill(5, 6, 'banana')
  //   returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  var key;
  var tmpArr = {};

  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[key + startIndex] = mixedVal;
    }
  }

  return tmpArr;
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function array_fill_keys(keys, value) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_fill_keys/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  //   example 1: array_fill_keys($keys, 'banana')
  //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

  var retObj = {};
  var key = '';

  for (key in keys) {
    retObj[keys[key]] = value;
  }

  return retObj;
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function array_filter(arr, func) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_filter/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: max4ever
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: var odd = function (num) {return (num & 1);}
  //   example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
  //   returns 1: {"a": 1, "c": 3, "e": 5}
  //   example 2: var even = function (num) {return (!(num & 1));}
  //   example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even)
  //   returns 2: [ 6, , 8, , 10, , 12 ]
  //   example 3: array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
  //   returns 3: {"a":1, "c":-1}

  var retObj = {};
  var k;

  func = func || function (v) {
    return v;
  };

  // @todo: Issue #73
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
  }

  for (k in arr) {
    if (func(arr[k])) {
      retObj[k] = arr[k];
    }
  }

  return retObj;
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = function array_flip(trans) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_flip/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_flip( {a: 1, b: 1, c: 2} )
  //   returns 1: {1: 'b', 2: 'c'}

  var key;
  var tmpArr = {};

  for (key in trans) {
    if (!trans.hasOwnProperty(key)) {
      continue;
    }
    tmpArr[trans[key]] = key;
  }

  return tmpArr;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function array_intersect(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
  //   example 1: var $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
  //   example 1: var $array3 = ['green', 'red']
  //   example 1: var $result = array_intersect($array1, $array2, $array3)
  //   returns 1: {0: 'red', a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function array_intersect_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_assoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_assoc($array1, $array2)
  //   returns 1: {a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = function array_intersect_key(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_key/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_key($array1, $array2)
  //   returns 1: {0: 'red', a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    if (!arr1.hasOwnProperty(k1)) {
      continue;
    }
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (!arr.hasOwnProperty(k)) {
          continue;
        }
        if (k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_intersect_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {b: 'brown'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  // var cb0 = arguments[arglm2]
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  // cb0 = (typeof cb0 === 'string')
  //   ? $global[cb0]
  //   : (Object.prototype.toString.call(cb0) === '[object Array]')
  //     ? $global[cb0[0]][cb0[1]]
  //     : cb0

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],20:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_intersect_ukey(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_ukey/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {blue: 1, green: 3}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  // var cb0 = arguments[arglm2]
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  // cb0 = (typeof cb0 === 'string')
  //   ? $global[cb0]
  //   : (Object.prototype.toString.call(cb0) === '[object Array]')
  //     ? $global[cb0[0]][cb0[1]]
  //     : cb0

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],21:[function(require,module,exports){
"use strict";

module.exports = function array_key_exists(key, search) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_key_exists/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
  //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
  //   returns 1: true

  if (!search || search.constructor !== Array && search.constructor !== Object) {
    return false;
  }

  return key in search;
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function array_keys(input, searchValue, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_keys/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: P
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: jd
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'firstname', 'surname' ]

  var search = typeof searchValue !== 'undefined';
  var tmpArr = [];
  var strict = !!argStrict;
  var include = true;
  var key = '';

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true;
      if (search) {
        if (strict && input[key] !== searchValue) {
          include = false;
        } else if (input[key] !== searchValue) {
          include = false;
        }
      }

      if (include) {
        tmpArr[tmpArr.length] = key;
      }
    }
  }

  return tmpArr;
};

},{}],23:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_map(callback) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_map/
  // original by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: thekid
  //      note 1: If the callback is a string (or object, if an array is supplied),
  //      note 1: it can only work if the function name is in the global context
  //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
  //   returns 1: [ 1, 8, 27, 64, 125 ]

  var argc = arguments.length;
  var argv = arguments;
  var obj = null;
  var cb = callback;
  var j = argv[1].length;
  var i = 0;
  var k = 1;
  var m = 0;
  var tmp = [];
  var tmpArr = [];

  var $global = typeof window !== 'undefined' ? window : global;

  while (i < j) {
    while (k < argc) {
      tmp[m++] = argv[k++][i];
    }

    m = 0;
    k = 1;

    if (callback) {
      if (typeof callback === 'string') {
        cb = $global[callback];
      } else if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.length) {
        obj = typeof callback[0] === 'string' ? $global[callback[0]] : callback[0];
        if (typeof obj === 'undefined') {
          throw new Error('Object not found: ' + callback[0]);
        }
        cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1];
      }
      tmpArr[i++] = cb.apply(obj, tmp);
    } else {
      tmpArr[i++] = tmp;
    }

    tmp = [];
  }

  return tmpArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){
'use strict';

module.exports = function array_merge() {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_merge/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Nate
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //    input by: josh
  //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
  //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  //   example 1: array_merge($arr1, $arr2)
  //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  //   example 2: var $arr1 = []
  //   example 2: var $arr2 = {1: "data"}
  //   example 2: array_merge($arr1, $arr2)
  //   returns 2: {0: "data"}

  var args = Array.prototype.slice.call(arguments);
  var argl = args.length;
  var arg;
  var retObj = {};
  var k = '';
  var argil = 0;
  var j = 0;
  var i = 0;
  var ct = 0;
  var toStr = Object.prototype.toString;
  var retArr = true;

  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false;
      break;
    }
  }

  if (retArr) {
    retArr = [];
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i]);
    }
    return retArr;
  }

  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i];
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j];
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k];
          } else {
            retObj[k] = arg[k];
          }
        }
      }
    }
  }

  return retObj;
};

},{}],25:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_merge_recursive(arr1, arr2) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_merge_recursive/
  // original by: Subhasis Deb
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: var $arr1 = {'color': {'favorite': 'red'}, 0: 5}
  //   example 1: var $arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
  //   example 1: array_merge_recursive($arr1, $arr2)
  //   returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
  //        test: skip-1

  var arrayMerge = require('../array/array_merge');
  var idx = '';

  if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' && arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
    for (idx in arr2) {
      arr1.push(arr2[idx]);
    }
  } else if (arr1 && arr1 instanceof Object && arr2 && arr2 instanceof Object) {
    for (idx in arr2) {
      if (idx in arr1) {
        if (_typeof(arr1[idx]) === 'object' && (typeof arr2 === 'undefined' ? 'undefined' : _typeof(arr2)) === 'object') {
          arr1[idx] = arrayMerge(arr1[idx], arr2[idx]);
        } else {
          arr1[idx] = arr2[idx];
        }
      } else {
        arr1[idx] = arr2[idx];
      }
    }
  }

  return arr1;
};

},{"../array/array_merge":24}],26:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_multisort(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_multisort/
  // original by: Theriault (https://github.com/Theriault)
  // improved by: Oleg Andreyev (https://github.com/oleg-andreyev)
  //   example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6])
  //   returns 1: true
  //   example 2: var $characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'}
  //   example 2: var $jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'}
  //   example 2: array_multisort($characters, 'SORT_DESC', 'SORT_STRING', $jobs, 'SORT_ASC', 'SORT_STRING')
  //   returns 2: true
  //   example 3: var $lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams']
  //   example 3: var $firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John']
  //   example 3: var $president = [ 39, 6, 5, 10, 4, 35, 2 ]
  //   example 3: array_multisort($firstnames, 'SORT_DESC', 'SORT_STRING', $lastnames, 'SORT_ASC', 'SORT_STRING', $president, 'SORT_NUMERIC')
  //   returns 3: true
  //      note 1: flags: Translation table for sort arguments.
  //      note 1: Each argument turns on certain bits in the flag byte through addition.
  //      note 1: bits: HGFE DCBA
  //      note 1: args: Holds pointer to arguments for reassignment

  var g;
  var i;
  var j;
  var k;
  var l;
  var sal;
  var vkey;
  var elIndex;
  var lastSorts;
  var tmpArray;
  var zlast;

  var sortFlag = [0];
  var thingsToSort = [];
  var nLastSort = [];
  var lastSort = [];
  // possibly redundant
  var args = arguments;

  var flags = {
    'SORT_REGULAR': 16,
    'SORT_NUMERIC': 17,
    'SORT_STRING': 18,
    'SORT_ASC': 32,
    'SORT_DESC': 40
  };

  var sortDuplicator = function sortDuplicator(a, b) {
    return nLastSort.shift();
  };

  var sortFunctions = [[function (a, b) {
    lastSort.push(a > b ? 1 : a < b ? -1 : 0);
    return a > b ? 1 : a < b ? -1 : 0;
  }, function (a, b) {
    lastSort.push(b > a ? 1 : b < a ? -1 : 0);
    return b > a ? 1 : b < a ? -1 : 0;
  }], [function (a, b) {
    lastSort.push(a - b);
    return a - b;
  }, function (a, b) {
    lastSort.push(b - a);
    return b - a;
  }], [function (a, b) {
    lastSort.push(a + '' > b + '' ? 1 : a + '' < b + '' ? -1 : 0);
    return a + '' > b + '' ? 1 : a + '' < b + '' ? -1 : 0;
  }, function (a, b) {
    lastSort.push(b + '' > a + '' ? 1 : b + '' < a + '' ? -1 : 0);
    return b + '' > a + '' ? 1 : b + '' < a + '' ? -1 : 0;
  }]];

  var sortArrs = [[]];

  var sortKeys = [[]];

  // Store first argument into sortArrs and sortKeys if an Object.
  // First Argument should be either a Javascript Array or an Object,
  // otherwise function would return FALSE like in PHP
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    sortArrs[0] = arr;
  } else if (arr && (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object') {
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        sortKeys[0].push(i);
        sortArrs[0].push(arr[i]);
      }
    }
  } else {
    return false;
  }

  // arrMainLength: Holds the length of the first array.
  // All other arrays must be of equal length, otherwise function would return FALSE like in PHP
  // sortComponents: Holds 2 indexes per every section of the array
  // that can be sorted. As this is the start, the whole array can be sorted.
  var arrMainLength = sortArrs[0].length;
  var sortComponents = [0, arrMainLength];

  // Loop through all other arguments, checking lengths and sort flags
  // of arrays and adding them to the above variables.
  var argl = arguments.length;
  for (j = 1; j < argl; j++) {
    if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
      sortArrs[j] = arguments[j];
      sortFlag[j] = 0;
      if (arguments[j].length !== arrMainLength) {
        return false;
      }
    } else if (arguments[j] && _typeof(arguments[j]) === 'object') {
      sortKeys[j] = [];
      sortArrs[j] = [];
      sortFlag[j] = 0;
      for (i in arguments[j]) {
        if (arguments[j].hasOwnProperty(i)) {
          sortKeys[j].push(i);
          sortArrs[j].push(arguments[j][i]);
        }
      }
      if (sortArrs[j].length !== arrMainLength) {
        return false;
      }
    } else if (typeof arguments[j] === 'string') {
      var lFlag = sortFlag.pop();
      // Keep extra parentheses around latter flags check
      // to avoid minimization leading to CDATA closer
      if (typeof flags[arguments[j]] === 'undefined' || (flags[arguments[j]] >>> 4 & lFlag >>> 4) > 0) {
        return false;
      }
      sortFlag.push(lFlag + flags[arguments[j]]);
    } else {
      return false;
    }
  }

  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true);
  }

  // Sort all the arrays....
  for (i in sortArrs) {
    if (sortArrs.hasOwnProperty(i)) {
      lastSorts = [];
      tmpArray = [];
      elIndex = 0;
      nLastSort = [];
      lastSort = [];

      // If there are no sortComponents, then no more sorting is neeeded.
      // Copy the array back to the argument.
      if (sortComponents.length === 0) {
        if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
          args[i] = sortArrs[i];
        } else {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) {
              delete arguments[i][k];
            }
          }
          sal = sortArrs[i].length;
          for (j = 0, vkey = 0; j < sal; j++) {
            vkey = sortKeys[i][j];
            args[i][vkey] = sortArrs[i][j];
          }
        }
        sortArrs.splice(i, 1);
        sortKeys.splice(i, 1);
        continue;
      }

      // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
      var sFunction = sortFunctions[sortFlag[i] & 3][(sortFlag[i] & 8) > 0 ? 1 : 0];

      // Sort current array.
      for (l = 0; l !== sortComponents.length; l += 2) {
        tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
        tmpArray.sort(sFunction);
        // Is there a better way to copy an array in Javascript?
        lastSorts[l] = [].concat(lastSort);
        elIndex = sortComponents[l];
        for (g in tmpArray) {
          if (tmpArray.hasOwnProperty(g)) {
            sortArrs[i][elIndex] = tmpArray[g];
            elIndex++;
          }
        }
      }

      // Duplicate the sorting of the current array on future arrays.
      sFunction = sortDuplicator;
      for (j in sortArrs) {
        if (sortArrs.hasOwnProperty(j)) {
          if (sortArrs[j] === sortArrs[i]) {
            continue;
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            // alert(l + ':' + nLastSort);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortArrs[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Duplicate the sorting of the current array on array keys
      for (j in sortKeys) {
        if (sortKeys.hasOwnProperty(j)) {
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortKeys[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Generate the next sortComponents
      zlast = null;
      sortComponents = [];
      for (j in sortArrs[i]) {
        if (sortArrs[i].hasOwnProperty(j)) {
          if (!thingsToSort[j]) {
            if (sortComponents.length & 1) {
              sortComponents.push(j - 1);
            }
            zlast = null;
            continue;
          }
          if (!(sortComponents.length & 1)) {
            if (zlast !== null) {
              if (sortArrs[i][j] === zlast) {
                sortComponents.push(j - 1);
              } else {
                thingsToSort[j] = false;
              }
            }
            zlast = sortArrs[i][j];
          } else {
            if (sortArrs[i][j] !== zlast) {
              sortComponents.push(j - 1);
              zlast = sortArrs[i][j];
            }
          }
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(j);
      }
      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        args[i] = sortArrs[i];
      } else {
        for (j in arguments[i]) {
          if (arguments[i].hasOwnProperty(j)) {
            delete arguments[i][j];
          }
        }

        sal = sortArrs[i].length;
        for (j = 0, vkey = 0; j < sal; j++) {
          vkey = sortKeys[i][j];
          args[i][vkey] = sortArrs[i][j];
        }
      }
      sortArrs.splice(i, 1);
      sortKeys.splice(i, 1);
    }
  }
  return true;
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function array_pad(input, padSize, padValue) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_pad/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_pad([ 7, 8, 9 ], 2, 'a')
  //   returns 1: [ 7, 8, 9]
  //   example 2: array_pad([ 7, 8, 9 ], 5, 'a')
  //   returns 2: [ 7, 8, 9, 'a', 'a']
  //   example 3: array_pad([ 7, 8, 9 ], 5, 2)
  //   returns 3: [ 7, 8, 9, 2, 2]
  //   example 4: array_pad([ 7, 8, 9 ], -5, 'a')
  //   returns 4: [ 'a', 'a', 7, 8, 9 ]

  var pad = [];
  var newArray = [];
  var newLength;
  var diff = 0;
  var i = 0;

  if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
    newLength = padSize < 0 ? padSize * -1 : padSize;
    diff = newLength - input.length;

    if (diff > 0) {
      for (i = 0; i < diff; i++) {
        newArray[i] = padValue;
      }
      pad = padSize < 0 ? newArray.concat(input) : input.concat(newArray);
    } else {
      pad = input;
    }
  }

  return pad;
};

},{}],28:[function(require,module,exports){
'use strict';

module.exports = function array_pop(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_pop/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      note 1: While IE (and other browsers) support iterating an object's
  //      note 1: own properties in order, if one attempts to add back properties
  //      note 1: in IE, they may end up in their former position due to their position
  //      note 1: being retained. So use of this function with "associative arrays"
  //      note 1: (objects) may lead to unexpected behavior in an IE environment if
  //      note 1: you add back properties with the same keys that you removed
  //   example 1: array_pop([0,1,2])
  //   returns 1: 2
  //   example 2: var $data = {firstName: 'Kevin', surName: 'van Zonneveld'}
  //   example 2: var $lastElem = array_pop($data)
  //   example 2: var $result = $data
  //   returns 2: {firstName: 'Kevin'}

  var key = '';
  var lastKey = '';

  if (inputArr.hasOwnProperty('length')) {
    // Indexed
    if (!inputArr.length) {
      // Done popping, are we?
      return null;
    }
    return inputArr.pop();
  } else {
    // Associative
    for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
        lastKey = key;
      }
    }
    if (lastKey) {
      var tmp = inputArr[lastKey];
      delete inputArr[lastKey];
      return tmp;
    } else {
      return null;
    }
  }
};

},{}],29:[function(require,module,exports){
'use strict';

module.exports = function array_product(input) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_product/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_product([ 2, 4, 6, 8 ])
  //   returns 1: 384

  var idx = 0;
  var product = 1;
  var il = 0;

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null;
  }

  il = input.length;
  while (idx < il) {
    product *= !isNaN(input[idx]) ? input[idx] : 0;
    idx++;
  }

  return product;
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = function array_push(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_push/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so if you delete properties and then
  //      note 1: add back properties with the same keys (including numeric) that had
  //      note 1: been deleted, the order will be as before; thus, this function is not
  //      note 1: really recommended with associative arrays (objects) in IE environments
  //   example 1: array_push(['kevin','van'], 'zonneveld')
  //   returns 1: 3

  var i = 0;
  var pr = '';
  var argv = arguments;
  var argc = argv.length;
  var allDigits = /^\d$/;
  var size = 0;
  var highestIdx = 0;
  var len = 0;

  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i];
    }
    return inputArr.length;
  }

  // Associative (object)
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len;
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10);
        highestIdx = size > highestIdx ? size : highestIdx;
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i];
  }

  return len + i - 1;
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = function array_rand(array, num) {
  // eslint-disable-line camelcase
  //       discuss at: http://locutus.io/php/array_rand/
  //      original by: Waldo Malqui Silva (http://waldo.malqui.info)
  // reimplemented by: Rafał Kukawski
  //        example 1: array_rand( ['Kevin'], 1 )
  //        returns 1: '0'

  // By using Object.keys we support both, arrays and objects
  // which phpjs wants to support
  var keys = Object.keys(array);

  if (typeof num === 'undefined' || num === null) {
    num = 1;
  } else {
    num = +num;
  }

  if (isNaN(num) || num < 1 || num > keys.length) {
    return null;
  }

  // shuffle the array of keys
  for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // 0 ≤ j ≤ i

    var tmp = keys[j];
    keys[j] = keys[i];
    keys[i] = tmp;
  }

  return num === 1 ? keys[0] : keys.slice(0, num);
};

},{}],32:[function(require,module,exports){
"use strict";

module.exports = function array_reduce(aInput, callback) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  var lon = aInput.length;
  var res = 0;
  var i = 0;
  var tmp = [];

  for (i = 0; i < lon; i += 2) {
    tmp[0] = aInput[i];
    if (aInput[i + 1]) {
      tmp[1] = aInput[i + 1];
    } else {
      tmp[1] = 0;
    }
    res += callback.apply(null, tmp);
    tmp = [];
  }

  return res;
};

},{}],33:[function(require,module,exports){
'use strict';

module.exports = function array_replace(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_replace/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"})
  //   returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

  var retObj = {};
  var i = 0;
  var p = '';
  var argl = arguments.length;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace()');
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // (just guessing), so we make a copy here, instead of acting on arr itself
  for (p in arr) {
    retObj[p] = arr[p];
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      retObj[p] = arguments[i][p];
    }
  }

  return retObj;
};

},{}],34:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_replace_recursive(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_replace_recursive/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
  //   returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

  var i = 0;
  var p = '';
  var argl = arguments.length;
  var retObj;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // So we make a copy here, instead of acting on arr itself
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
    for (p in arr) {
      retObj.push(arr[p]);
    }
  } else {
    retObj = {};
    for (p in arr) {
      retObj[p] = arr[p];
    }
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      if (retObj[p] && _typeof(retObj[p]) === 'object') {
        retObj[p] = array_replace_recursive(retObj[p], arguments[i][p]);
      } else {
        retObj[p] = arguments[i][p];
      }
    }
  }

  return retObj;
};

},{}],35:[function(require,module,exports){
'use strict';

module.exports = function array_reverse(array, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  var isArray = Object.prototype.toString.call(array) === '[object Array]';
  var tmpArr = preserveKeys ? {} : [];
  var key;

  if (isArray && !preserveKeys) {
    return array.slice(0).reverse();
  }

  if (preserveKeys) {
    var keys = [];
    for (key in array) {
      keys.push(key);
    }

    var i = keys.length;
    while (i--) {
      key = keys[i];
      // @todo: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmpArr[key] = array[key];
    }
  } else {
    for (key in array) {
      tmpArr.unshift(array[key]);
    }
  }

  return tmpArr;
};

},{}],36:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_search(needle, haystack, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_search/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Reynier de la Rosa (http://scriptinside.blogspot.com.es/)
  //        test: skip-all
  //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'})
  //   returns 1: 'surname'
  //   example 2: array_search('3', {a: 3, b: 5, c: 7})
  //   returns 2: 'a'

  var strict = !!argStrict;
  var key = '';

  if ((typeof needle === 'undefined' ? 'undefined' : _typeof(needle)) === 'object' && needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') + (needle.multiline ? 'm' : '') + (
      // sticky is FF only
      needle.sticky ? 'y' : '');
      needle = new RegExp(needle.source, flags);
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key;
        }
      }
    }
    return false;
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      if (strict && haystack[key] === needle || !strict && haystack[key] == needle) {
        // eslint-disable-line eqeqeq
        return key;
      }
    }
  }

  return false;
};

},{}],37:[function(require,module,exports){
"use strict";

module.exports = function array_shift(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_shift/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Martijn Wieringa
  //      note 1: Currently does not handle objects
  //   example 1: array_shift(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'Kevin'

  var _checkToUpIndices = function _checkToUpIndices(arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key, since
    // we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;
      if (ct === key) {
        ct += 1;
      }
      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }

    return ct;
  };

  if (inputArr.length === 0) {
    return null;
  }
  if (inputArr.length > 0) {
    return inputArr.shift();
  }
};

},{}],38:[function(require,module,exports){
'use strict';

module.exports = function array_slice(arr, offst, lgth, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_slice/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: Relies on is_int because !isNaN accepts floats
  //   example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1)
  //   returns 1: [ 'c', 'd' ]
  //   example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
  //   returns 2: {2: 'c', 3: 'd'}

  var isInt = require('../var/is_int');

  /*
    if ('callee' in arr && 'length' in arr) {
      arr = Array.prototype.slice.call(arr);
    }
  */

  var key = '';

  if (Object.prototype.toString.call(arr) !== '[object Array]' || preserveKeys && offst !== 0) {
    // Assoc. array as input or if required as output
    var lgt = 0;
    var newAssoc = {};
    for (key in arr) {
      lgt += 1;
      newAssoc[key] = arr[key];
    }
    arr = newAssoc;

    offst = offst < 0 ? lgt + offst : offst;
    lgth = lgth === undefined ? lgt : lgth < 0 ? lgt + lgth - offst : lgth;

    var assoc = {};
    var start = false;
    var it = -1;
    var arrlgth = 0;
    var noPkIdx = 0;

    for (key in arr) {
      ++it;
      if (arrlgth >= lgth) {
        break;
      }
      if (it === offst) {
        start = true;
      }
      if (!start) {
        continue;
      }++arrlgth;
      if (isInt(key) && !preserveKeys) {
        assoc[noPkIdx++] = arr[key];
      } else {
        assoc[key] = arr[key];
      }
    }
    // Make as array-like object (though length will not be dynamic)
    // assoc.length = arrlgth;
    return assoc;
  }

  if (lgth === undefined) {
    return arr.slice(offst);
  } else if (lgth >= 0) {
    return arr.slice(offst, offst + lgth);
  } else {
    return arr.slice(offst, lgth);
  }
};

},{"../var/is_int":80}],39:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_splice(arr, offst, lgth, replacement) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_splice/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  //      note 1: Order does get shifted in associative array input with numeric indices,
  //      note 1: since PHP behavior doesn't preserve keys, but I understand order is
  //      note 1: not reliable anyways
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so use of this function may produce
  //      note 1: unexpected results in IE if you later attempt to add back properties
  //      note 1: with the same keys that had been deleted
  //   example 1: var $input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"}
  //   example 1: array_splice($input, 2)
  //   returns 1: {4: "red", 'abc': "green"}
  //   example 2: var $input = ["red", "green", "blue", "yellow"]
  //   example 2: array_splice($input, 3, 0, "purple")
  //   returns 2: []
  //   example 3: var $input = ["red", "green", "blue", "yellow"]
  //   example 3: array_splice($input, -1, 1, ["black", "maroon"])
  //   returns 3: ["yellow"]
  //        test: skip-1

  var isInt = require('../var/is_int');

  var _checkToUpIndices = function _checkToUpIndices(arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key,
    // since we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;
      if (ct === key) {
        ct += 1;
      }
      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }
    return ct;
  };

  if (replacement && (typeof replacement === 'undefined' ? 'undefined' : _typeof(replacement)) !== 'object') {
    replacement = [replacement];
  }
  if (lgth === undefined) {
    lgth = offst >= 0 ? arr.length - offst : -offst;
  } else if (lgth < 0) {
    lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
  }

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    /* if (arr.length !== undefined) {
     // Deal with array-like objects as input
    delete arr.length;
    } */
    var lgt = 0;
    var ct = -1;
    var rmvd = [];
    var rmvdObj = {};
    var replCt = -1;
    var intCt = -1;
    var returnArr = true;
    var rmvdCt = 0;
    // var rmvdLngth = 0
    var key = '';
    // rmvdObj.length = 0;
    for (key in arr) {
      // Can do arr.__count__ in some browsers
      lgt += 1;
    }
    offst = offst >= 0 ? offst : lgt + offst;
    for (key in arr) {
      ct += 1;
      if (ct < offst) {
        if (isInt(key)) {
          intCt += 1;
          if (parseInt(key, 10) === intCt) {
            // Key is already numbered ok, so don't need to change key for value
            continue;
          }
          // Deal with situation, e.g.,
          _checkToUpIndices(arr, intCt, key);
          // if encounter index 4 and try to set it to 0, but 0 exists later in loop
          arr[intCt] = arr[key];
          delete arr[key];
        }
        continue;
      }
      if (returnArr && isInt(key)) {
        rmvd.push(arr[key]);
        // PHP starts over here too
        rmvdObj[rmvdCt++] = arr[key];
      } else {
        rmvdObj[key] = arr[key];
        returnArr = false;
      }
      // rmvdLngth += 1
      // rmvdObj.length += 1;
      if (replacement && replacement[++replCt]) {
        arr[key] = replacement[replCt];
      } else {
        delete arr[key];
      }
    }
    // Make (back) into an array-like object
    // arr.length = lgt - rmvdLngth + (replacement ? replacement.length : 0);
    return returnArr ? rmvd : rmvdObj;
  }

  if (replacement) {
    replacement.unshift(offst, lgth);
    return Array.prototype.splice.apply(arr, replacement);
  }

  return arr.splice(offst, lgth);
};

},{"../var/is_int":80}],40:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_sum(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_sum/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Gilbert
  // improved by: David Pilia (http://www.beteck.it/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_sum([4, 9, 182.6])
  //   returns 1: 195.6
  //   example 2: var $total = []
  //   example 2: var $index = 0.1
  //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
  //   example 2: array_sum($total)
  //   returns 2: 67.2

  var key;
  var sum = 0;

  // input sanitation
  if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return null;
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key]);
    }
  }

  return sum;
};

},{}],41:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {c: 'blue'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = '';
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff_assoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = {};
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var cb0 = arguments[arglm2];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  cb0 = typeof cb0 === 'string' ? $global[cb0] : Object.prototype.toString.call(cb0) === '[object Array]' ? $global[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm2; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_uintersect(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_uintersect/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Demosthenes Koptsis
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var arr = {};
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],45:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_uintersect_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_uintersect_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var cb0 = arguments[arglm2];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  cb0 = typeof cb0 === 'string' ? $global[cb0] : Object.prototype.toString.call(cb0) === '[object Array]' ? $global[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm2; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          if (i === arguments.length - 3) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(require,module,exports){
'use strict';

module.exports = function array_unique(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_unique/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  //    input by: duncan
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: Michael Grier
  //      note 1: The second argument, sort_flags is not implemented;
  //      note 1: also should be sorted (asort?) first according to docs
  //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
  //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
  //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
  //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

  var key = '';
  var tmpArr2 = {};
  var val = '';

  var _arraySearch = function _arraySearch(needle, haystack) {
    var fkey = '';
    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if (haystack[fkey] + '' === needle + '') {
          return fkey;
        }
      }
    }
    return false;
  };

  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];
      if (_arraySearch(val, tmpArr2) === false) {
        tmpArr2[key] = val;
      }
    }
  }

  return tmpArr2;
};

},{}],47:[function(require,module,exports){
"use strict";

module.exports = function array_unshift(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_unshift/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Martijn Wieringa
  // improved by: jmweb
  //      note 1: Currently does not handle objects
  //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin')
  //   returns 1: 3

  var i = arguments.length;

  while (--i !== 0) {
    arguments[0].unshift(arguments[i]);
  }

  return arguments[0].length;
};

},{}],48:[function(require,module,exports){
'use strict';

module.exports = function array_values(input) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_values/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'Kevin', 'van Zonneveld' ]

  var tmpArr = [];
  var key = '';

  for (key in input) {
    tmpArr[tmpArr.length] = input[key];
  }

  return tmpArr;
};

},{}],49:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_walk(array, funcname, userdata) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_walk/
  // original by: Johnny Mast (http://www.phpvrouwen.nl)
  // bugfixed by: David
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk ([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk ('mystring', function () {})
  //   returns 2: false
  //   example 3: array_walk ({"title":"my title"}, function () {})
  //   returns 3: true

  if (!array || (typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return false;
  }

  try {
    if (typeof funcname === 'function') {
      for (var key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata);
        } else {
          funcname(array[key], key);
        }
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

},{}],50:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_walk_recursive(array, funcname, userdata) {
  // eslint-disable-line camelcase
  // original by: Hugues Peccatte
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
  //   returns 2: true
  //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
  //   returns 3: true

  if (!array || (typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return false;
  }

  if (typeof funcname !== 'function') {
    return false;
  }

  for (var key in array) {
    // apply "funcname" recursively only on arrays
    if (Object.prototype.toString.call(array[key]) === '[object Array]') {
      var funcArgs = [array[key], funcname];
      if (arguments.length > 2) {
        funcArgs.push(userdata);
      }
      if (array_walk_recursive.apply(null, funcArgs) === false) {
        return false;
      }
      continue;
    }
    try {
      if (arguments.length > 2) {
        funcname(array[key], key, userdata);
      } else {
        funcname(array[key], key);
      }
    } catch (e) {
      return false;
    }
  }

  return true;
};

},{}],51:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function arsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/arsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: The examples are correct, this is a new way
  //      note 1: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: arsort($data)
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: arsort($data)
  //   example 2: var $result = $data
  //   returns 2: {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  //        test: skip-1

  var i18lgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');
  var valArr = [];
  var valArrLen = 0;
  var k;
  var i;
  var sorter;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18lgd();
      sorter = $locutus.php.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
      break;
    default:
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;

        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }

        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
    if (sortByReference) {
      inputArr[valArr[i][0]] = valArr[i][1];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77,"../strings/strnatcmp":79}],52:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function asort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/asort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: paulo kuong
  // bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: The examples are correct, this is a new way
  //      note 1: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: asort($data)
  //   example 1: var $result = $data
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: asort($data)
  //   example 2: var $result = $data
  //   returns 2: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  var strnatcmp = require('../strings/strnatcmp');
  var i18nlgd = require('../i18n/i18n_loc_get_default');

  var valArr = [];
  var valArrLen = 0;
  var k;
  var i;
  var sorter;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(a, b);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.php.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
      break;
    default:
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77,"../strings/strnatcmp":79}],53:[function(require,module,exports){
'use strict';

module.exports = function count(mixedVar, mode) {
  //  discuss at: http://locutus.io/php/count/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Waldo Malqui Silva (http://waldo.malqui.info)
  //    input by: merabi
  // bugfixed by: Soren Hansen
  // bugfixed by: Olivier Louvignes (http://mg-crea.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  var key;
  var cnt = 0;

  if (mixedVar === null || typeof mixedVar === 'undefined') {
    return 0;
  } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
    return 1;
  }

  if (mode === 'COUNT_RECURSIVE') {
    mode = 1;
  }
  if (mode !== 1) {
    mode = 0;
  }

  for (key in mixedVar) {
    if (mixedVar.hasOwnProperty(key)) {
      cnt++;
      if (mode === 1 && mixedVar[key] && (mixedVar[key].constructor === Array || mixedVar[key].constructor === Object)) {
        cnt += count(mixedVar[key], 1);
      }
    }
  }

  return cnt;
};

},{}],54:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function current(arr) {
  //  discuss at: http://locutus.io/php/current/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: current($transport)
  //   returns 1: 'foot'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false;
  }
  var ct = 0;
  for (var k in arr) {
    if (ct === cursor) {
      return arr[k];
    }
    ct++;
  }
  // Empty
  return false;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],55:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function each(arr) {
  //  discuss at: http://locutus.io/php/each/
  // original by: Ates Goral (http://magnetiq.com)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"})
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  var pos = 0;

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        pointers[arrpos + 1] += 1;
        if (each.returnArrayOnly) {
          return [k, arr[k]];
        } else {
          return {
            1: arr[k],
            value: arr[k],
            0: k,
            key: k
          };
        }
      }
      ct++;
    }
    // Empty
    return false;
  }
  if (arr.length === 0 || cursor === arr.length) {
    return false;
  }
  pos = cursor;
  pointers[arrpos + 1] += 1;
  if (each.returnArrayOnly) {
    return [pos, arr[pos]];
  } else {
    return {
      1: arr[pos],
      value: arr[pos],
      0: pos,
      key: pos
    };
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],56:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function end(arr) {
  //  discuss at: http://locutus.io/php/end/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: J A R
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Zonneveld'
  //   example 2: end(['Kevin', 'van', 'Zonneveld'])
  //   returns 2: 'Zonneveld'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    var val;
    for (var k in arr) {
      ct++;
      val = arr[k];
    }
    if (ct === 0) {
      // Empty
      return false;
    }
    pointers[arrpos + 1] = ct - 1;
    return val;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = arr.length - 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],57:[function(require,module,exports){
'use strict';

module.exports = function in_array(needle, haystack, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/in_array/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: vlado houba
  // improved by: Jonas Sciangula Street (Joni2Back)
  //    input by: Billy
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld'])
  //   returns 1: true
  //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'})
  //   returns 2: false
  //   example 3: in_array(1, ['1', '2', '3'])
  //   example 3: in_array(1, ['1', '2', '3'], false)
  //   returns 3: true
  //   returns 3: true
  //   example 4: in_array(1, ['1', '2', '3'], true)
  //   returns 4: false

  var key = '';
  var strict = !!argStrict;

  // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
  // in just one for, in order to improve the performance
  // deciding wich type of comparation will do before walk array
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        // eslint-disable-line eqeqeq
        return true;
      }
    }
  }

  return false;
};

},{}],58:[function(require,module,exports){
'use strict';

module.exports['array_change_key_case'] = require('./array_change_key_case');
module.exports['array_chunk'] = require('./array_chunk');
module.exports['array_column'] = require('./array_column');
module.exports['array_combine'] = require('./array_combine');
module.exports['array_count_values'] = require('./array_count_values');
module.exports['array_diff'] = require('./array_diff');
module.exports['array_diff_assoc'] = require('./array_diff_assoc');
module.exports['array_diff_key'] = require('./array_diff_key');
module.exports['array_diff_uassoc'] = require('./array_diff_uassoc');
module.exports['array_diff_ukey'] = require('./array_diff_ukey');
module.exports['array_fill'] = require('./array_fill');
module.exports['array_fill_keys'] = require('./array_fill_keys');
module.exports['array_filter'] = require('./array_filter');
module.exports['array_flip'] = require('./array_flip');
module.exports['array_intersect'] = require('./array_intersect');
module.exports['array_intersect_assoc'] = require('./array_intersect_assoc');
module.exports['array_intersect_key'] = require('./array_intersect_key');
module.exports['array_intersect_uassoc'] = require('./array_intersect_uassoc');
module.exports['array_intersect_ukey'] = require('./array_intersect_ukey');
module.exports['array_key_exists'] = require('./array_key_exists');
module.exports['array_keys'] = require('./array_keys');
module.exports['array_map'] = require('./array_map');
module.exports['array_merge'] = require('./array_merge');
module.exports['array_merge_recursive'] = require('./array_merge_recursive');
module.exports['array_multisort'] = require('./array_multisort');
module.exports['array_pad'] = require('./array_pad');
module.exports['array_pop'] = require('./array_pop');
module.exports['array_product'] = require('./array_product');
module.exports['array_push'] = require('./array_push');
module.exports['array_rand'] = require('./array_rand');
module.exports['array_reduce'] = require('./array_reduce');
module.exports['array_replace'] = require('./array_replace');
module.exports['array_replace_recursive'] = require('./array_replace_recursive');
module.exports['array_reverse'] = require('./array_reverse');
module.exports['array_search'] = require('./array_search');
module.exports['array_shift'] = require('./array_shift');
module.exports['array_slice'] = require('./array_slice');
module.exports['array_splice'] = require('./array_splice');
module.exports['array_sum'] = require('./array_sum');
module.exports['array_udiff'] = require('./array_udiff');
module.exports['array_udiff_assoc'] = require('./array_udiff_assoc');
module.exports['array_udiff_uassoc'] = require('./array_udiff_uassoc');
module.exports['array_uintersect'] = require('./array_uintersect');
module.exports['array_uintersect_uassoc'] = require('./array_uintersect_uassoc');
module.exports['array_unique'] = require('./array_unique');
module.exports['array_unshift'] = require('./array_unshift');
module.exports['array_values'] = require('./array_values');
module.exports['array_walk'] = require('./array_walk');
module.exports['array_walk_recursive'] = require('./array_walk_recursive');
module.exports['arsort'] = require('./arsort');
module.exports['asort'] = require('./asort');
module.exports['count'] = require('./count');
module.exports['current'] = require('./current');
module.exports['each'] = require('./each');
module.exports['end'] = require('./end');
module.exports['in_array'] = require('./in_array');
module.exports['key'] = require('./key');
module.exports['krsort'] = require('./krsort');
module.exports['ksort'] = require('./ksort');
module.exports['natcasesort'] = require('./natcasesort');
module.exports['natsort'] = require('./natsort');
module.exports['next'] = require('./next');
module.exports['pos'] = require('./pos');
module.exports['prev'] = require('./prev');
module.exports['range'] = require('./range');
module.exports['reset'] = require('./reset');
module.exports['rsort'] = require('./rsort');
module.exports['shuffle'] = require('./shuffle');
module.exports['sizeof'] = require('./sizeof');
module.exports['sort'] = require('./sort');
module.exports['uasort'] = require('./uasort');
module.exports['uksort'] = require('./uksort');
module.exports['usort'] = require('./usort');

},{"./array_change_key_case":2,"./array_chunk":3,"./array_column":4,"./array_combine":5,"./array_count_values":6,"./array_diff":7,"./array_diff_assoc":8,"./array_diff_key":9,"./array_diff_uassoc":10,"./array_diff_ukey":11,"./array_fill":12,"./array_fill_keys":13,"./array_filter":14,"./array_flip":15,"./array_intersect":16,"./array_intersect_assoc":17,"./array_intersect_key":18,"./array_intersect_uassoc":19,"./array_intersect_ukey":20,"./array_key_exists":21,"./array_keys":22,"./array_map":23,"./array_merge":24,"./array_merge_recursive":25,"./array_multisort":26,"./array_pad":27,"./array_pop":28,"./array_product":29,"./array_push":30,"./array_rand":31,"./array_reduce":32,"./array_replace":33,"./array_replace_recursive":34,"./array_reverse":35,"./array_search":36,"./array_shift":37,"./array_slice":38,"./array_splice":39,"./array_sum":40,"./array_udiff":41,"./array_udiff_assoc":42,"./array_udiff_uassoc":43,"./array_uintersect":44,"./array_uintersect_uassoc":45,"./array_unique":46,"./array_unshift":47,"./array_values":48,"./array_walk":49,"./array_walk_recursive":50,"./arsort":51,"./asort":52,"./count":53,"./current":54,"./each":55,"./end":56,"./in_array":57,"./key":59,"./krsort":60,"./ksort":61,"./natcasesort":62,"./natsort":63,"./next":64,"./pos":65,"./prev":66,"./range":67,"./reset":68,"./rsort":69,"./shuffle":70,"./sizeof":71,"./sort":72,"./uasort":73,"./uksort":74,"./usort":75}],59:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function key(arr) {
  //  discuss at: http://locutus.io/php/key/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Riddler (http://www.frontierwebdev.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $array = {fruit1: 'apple', 'fruit2': 'orange'}
  //   example 1: key($array)
  //   returns 1: 'fruit1'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }

  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var cursor = pointers[pointers.indexOf(arr) + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        return k;
      }
      ct++;
    }
    // Empty
    return false;
  }
  if (arr.length === 0) {
    return false;
  }

  return cursor;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],60:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function krsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/krsort/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: pseudaria (https://github.com/pseudaria)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: krsort($data)
  //   example 1: var $result = $data
  //   returns 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
  //   example 2: krsort($data)
  //   example 2: var $result = $data
  //   returns 2: {3: 'Zonneveld', 2: 'van', 1: 'Kevin'}

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var tmpArr = {};
  var keys = [];
  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return b - a;
      };
      break;
    case 'SORT_REGULAR':
    default:
      // compare items normally (don't change types)
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77,"../strings/strnatcmp":79}],61:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function ksort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/ksort/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: ksort($data)
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
  //   example 2: ksort($data)
  //   example 2: var $result = $data
  //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var tmpArr = {};
  var keys = [];
  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a + 0 - (b + 0);
      };
      break;
    default:
      // case 'SORT_REGULAR': // compare items normally (don't change types)
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77,"../strings/strnatcmp":79}],62:[function(require,module,exports){
'use strict';

module.exports = function natcasesort(inputArr) {
  //  discuss at: http://locutus.io/php/natcasesort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: We cannot use numbers as keys and have them be reordered since they
  //      note 1: adhere to numerical order in some implementations
  //   example 1: var $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'}
  //   example 1: natcasesort($array1)
  //   example 1: var $result = $array1
  //   returns 1: {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}

  var strnatcasecmp = require('../strings/strnatcasecmp');
  var valArr = [];
  var k;
  var i;
  var sortByReference = false;
  var populateArr = {};

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return strnatcasecmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77,"../strings/strnatcasecmp":78}],63:[function(require,module,exports){
'use strict';

module.exports = function natsort(inputArr) {
  //  discuss at: http://locutus.io/php/natsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"}
  //   example 1: natsort($array1)
  //   example 1: var $result = $array1
  //   returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}

  var strnatcmp = require('../strings/strnatcmp');

  var valArr = [];
  var k;
  var i;
  var sortByReference = false;
  var populateArr = {};

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return strnatcmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77,"../strings/strnatcmp":79}],64:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function next(arr) {
  //  discuss at: http://locutus.io/php/next/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: next($transport)
  //   example 1: next($transport)
  //   returns 1: 'car'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor + 1) {
        pointers[arrpos + 1] += 1;
        return arr[k];
      }
      ct++;
    }
    // End
    return false;
  }
  if (arr.length === 0 || cursor === arr.length - 1) {
    return false;
  }
  pointers[arrpos + 1] += 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],65:[function(require,module,exports){
'use strict';

module.exports = function pos(arr) {
  //  discuss at: http://locutus.io/php/pos/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: pos($transport)
  //   returns 1: 'foot'

  var current = require('../array/current');
  return current(arr);
};

},{"../array/current":54}],66:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function prev(arr) {
  //  discuss at: http://locutus.io/php/prev/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: prev($transport)
  //   returns 1: false

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (pointers.indexOf(arr) === -1 || cursor === 0) {
    return false;
  }
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor - 1) {
        pointers[arrpos + 1] -= 1;
        return arr[k];
      }
      ct++;
    }
    // Shouldn't reach here
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] -= 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],67:[function(require,module,exports){
"use strict";

module.exports = function range(low, high, step) {
  //  discuss at: http://locutus.io/php/range/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: range ( 0, 12 )
  //   returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   example 2: range( 0, 100, 10 )
  //   returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  //   example 3: range( 'a', 'i' )
  //   returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  //   example 4: range( 'c', 'a' )
  //   returns 4: ['c', 'b', 'a']

  var matrix = [];
  var iVal;
  var endval;
  var plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    iVal = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    iVal = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    iVal = isNaN(low) ? 0 : low;
    endval = isNaN(high) ? 0 : high;
  }

  plus = !(iVal > endval);
  if (plus) {
    while (iVal <= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal);
      iVal += walker;
    }
  } else {
    while (iVal >= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal);
      iVal -= walker;
    }
  }

  return matrix;
};

},{}],68:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function reset(arr) {
  //  discuss at: http://locutus.io/php/reset/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Kevin'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    for (var k in arr) {
      if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
      } else {
        pointers[arrpos + 1] = 0;
      }
      return arr[k];
    }
    // Empty
    return false;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = 0;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],69:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function rsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/rsort/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: rsort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['van', 'Zonneveld', 'Kevin']
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: rsort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
  //        test: skip-1

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return b - a;
      };
      break;
    case 'SORT_REGULAR':
    default:
      // compare items normally (don't change types)
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;
  var valArr = [];

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77,"../strings/strnatcmp":79}],70:[function(require,module,exports){
'use strict';

module.exports = function shuffle(inputArr) {
  //  discuss at: http://locutus.io/php/shuffle/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
  //   example 1: ini_set('locutus.sortByReference', true)
  //   example 1: shuffle($data)
  //   example 1: var $result = $data.q
  //   returns 1: 5

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = [];

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random();
  });

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77}],71:[function(require,module,exports){
'use strict';

module.exports = function sizeof(mixedVar, mode) {
  //  discuss at: http://locutus.io/php/sizeof/
  // original by: Philip Peterson
  //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  var count = require('../array/count');

  return count(mixedVar, mode);
};

},{"../array/count":53}],72:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function sort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/sort/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: sort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['Kevin', 'Zonneveld', 'van']
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: sort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
  //        test: skip-1

  var i18nlgd = require('../i18n/i18n_loc_get_default');

  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      // leave sorter undefined, so built-in comparison is used
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = $locutus.php.locales[i18nlgd()];

      if (loc && loc.sorting) {
        // if sorting exists on locale object, use it
        // otherwise let sorter be undefined
        // to fallback to built-in behavior
        sorter = loc.sorting;
      }
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
    default:
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;

        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }

        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  var valArr = [];
  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../i18n/i18n_loc_get_default":76,"../info/ini_get":77}],73:[function(require,module,exports){
'use strict';

module.exports = function uasort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/uasort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $sorter = function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;}
  //   example 1: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uasort($fruits, $sorter)
  //   example 1: var $result = $fruits
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77}],74:[function(require,module,exports){
'use strict';

module.exports = function uksort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/uksort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uksort($data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}

  var tmpArr = {};
  var keys = [];
  var i = 0;
  var k = '';
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this.window[sorter];
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  // Sort key names
  try {
    if (sorter) {
      keys.sort(sorter);
    } else {
      keys.sort();
    }
  } catch (e) {
    return false;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77}],75:[function(require,module,exports){
'use strict';

module.exports = function usort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/usort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $stuff = {d: '3', a: '1', b: '11', c: '4'}
  //   example 1: usort($stuff, function (a, b) { return (a - b) })
  //   example 1: var $result = $stuff
  //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'}

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  try {
    valArr.sort(sorter);
  } catch (e) {
    return false;
  }
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":77}],76:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function i18n_loc_get_default() {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/i18n_loc_get_default/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net.
  //      note 1: List of locales at <http://demo.icu-project.org/icu-bin/locexp>
  //      note 1: To be usable with sort() if it is passed the `SORT_LOCALE_STRING`
  //      note 1: sorting flag: http://php.net/manual/en/function.sort.php
  //   example 1: i18n_loc_get_default()
  //   returns 1: 'en_US_POSIX'
  //   example 2: i18n_loc_set_default('pt_PT')
  //   example 2: i18n_loc_get_default()
  //   returns 2: 'pt_PT'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  return $locutus.php.locale_default || 'en_US_POSIX';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],77:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function ini_get(varname) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/ini_get/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: The ini values must be set by ini_set or manually within an ini file
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_get('date.timezone')
  //   returns 1: 'Asia/Hong_Kong'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.ini = $locutus.php.ini || {};

  if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
    if ($locutus.php.ini[varname].local_value === null) {
      return '';
    }
    return $locutus.php.ini[varname].local_value;
  }

  return '';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],78:[function(require,module,exports){
'use strict';

module.exports = function strnatcasecmp(a, b) {
  //       discuss at: http://locutus.io/php/strnatcasecmp/
  //      original by: Martin Pool
  // reimplemented by: Pierre-Luc Paour
  // reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //         input by: Devan Penner-Woelk
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcasecmp(10, 1)
  //        returns 1: 1
  //        example 2: strnatcasecmp('1', '10')
  //        returns 2: -1

  var strnatcmp = require('../strings/strnatcmp');
  var _phpCastString = require('../_helpers/_phpCastString');

  if (arguments.length !== 2) {
    return null;
  }

  return strnatcmp(_phpCastString(a).toLowerCase(), _phpCastString(b).toLowerCase());
};

},{"../_helpers/_phpCastString":1,"../strings/strnatcmp":79}],79:[function(require,module,exports){
'use strict';

module.exports = function strnatcmp(a, b) {
  //       discuss at: http://locutus.io/php/strnatcmp/
  //      original by: Martijn Wieringa
  //      improved by: Michael White (http://getsprink.com)
  //      improved by: Jack
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcmp('abc', 'abc')
  //        returns 1: 0
  //        example 2: strnatcmp('a', 'b')
  //        returns 2: -1
  //        example 3: strnatcmp('10', '1')
  //        returns 3: 1
  //        example 4: strnatcmp('0000abc', '0abc')
  //        returns 4: 0
  //        example 5: strnatcmp('1239', '12345')
  //        returns 5: -1
  //        example 6: strnatcmp('t01239', 't012345')
  //        returns 6: 1
  //        example 7: strnatcmp('0A', '5N')
  //        returns 7: -1

  var _phpCastString = require('../_helpers/_phpCastString');

  var leadingZeros = /^0+(?=\d)/;
  var whitespace = /^\s/;
  var digit = /^\d/;

  if (arguments.length !== 2) {
    return null;
  }

  a = _phpCastString(a);
  b = _phpCastString(b);

  if (!a.length || !b.length) {
    return a.length - b.length;
  }

  var i = 0;
  var j = 0;

  a = a.replace(leadingZeros, '');
  b = b.replace(leadingZeros, '');

  while (i < a.length && j < b.length) {
    // skip consecutive whitespace
    while (whitespace.test(a.charAt(i))) {
      i++;
    }while (whitespace.test(b.charAt(j))) {
      j++;
    }var ac = a.charAt(i);
    var bc = b.charAt(j);
    var aIsDigit = digit.test(ac);
    var bIsDigit = digit.test(bc);

    if (aIsDigit && bIsDigit) {
      var bias = 0;
      var fractional = ac === '0' || bc === '0';

      do {
        if (!aIsDigit) {
          return -1;
        } else if (!bIsDigit) {
          return 1;
        } else if (ac < bc) {
          if (!bias) {
            bias = -1;
          }

          if (fractional) {
            return -1;
          }
        } else if (ac > bc) {
          if (!bias) {
            bias = 1;
          }

          if (fractional) {
            return 1;
          }
        }

        ac = a.charAt(++i);
        bc = b.charAt(++j);

        aIsDigit = digit.test(ac);
        bIsDigit = digit.test(bc);
      } while (aIsDigit || bIsDigit);

      if (!fractional && bias) {
        return bias;
      }

      continue;
    }

    if (!ac || !bc) {
      continue;
    } else if (ac < bc) {
      return -1;
    } else if (ac > bc) {
      return 1;
    }

    i++;
    j++;
  }

  var iBeforeStrEnd = i < a.length;
  var jBeforeStrEnd = j < b.length;

  // Check which string ended first
  // return -1 if a, 1 if b, 0 otherwise
  return (iBeforeStrEnd > jBeforeStrEnd) - (iBeforeStrEnd < jBeforeStrEnd);
};

},{"../_helpers/_phpCastString":1}],80:[function(require,module,exports){
"use strict";

module.exports = function is_int(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/is_int/
  // original by: Alex
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
};

},{}],81:[function(require,module,exports){
phpArray=require('locutus/php/array/index');
},{"locutus/php/array/index":58}]},{},[81]);
