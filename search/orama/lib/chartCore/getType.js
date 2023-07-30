"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toType = toType;
exports.default = getType;

var _maxBy2 = _interopRequireDefault(require("lodash/maxBy"));

var _countBy2 = _interopRequireDefault(require("lodash/countBy"));

var JS_TO_VIS_TYPE = {
  string: 'ordinal',
  number: 'linear',
  date: 'time'
};

function toType(value) {
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function getType(props, key) {
  if (props[key + "Type"]) return props[key + "Type"];
  var array = props[key + "Array"];
  if (!array) return undefined;
  var counter = (0, _countBy2.default)(array, toType);
  var maxName = (0, _maxBy2.default)(Object.keys(counter), function (d) {
    return counter[d];
  });
  return JS_TO_VIS_TYPE[maxName];
}