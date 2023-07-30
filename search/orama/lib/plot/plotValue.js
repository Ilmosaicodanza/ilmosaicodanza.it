"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = plotValue;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isDatum = _interopRequireDefault(require("../utils/isDatum"));

var _getScaleKeyByHash = _interopRequireDefault(require("./getScaleKeyByHash"));

/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.

Plot values returns the value to be plotted from the input.
It has the following resolution order:
1. ${key}Value on the props
2. scaled data accessed with the accessor
3. ${key}Value on the data
4. defaultValue from arguments
5. value of datum[accessor] (can be undefined)
*/
function plotValue(props, datum, idx, key, defaultValue) {
  var scaleKey = (0, _getScaleKeyByHash.default)(props, key);
  var accessor = props[key],
      value = props[key + "Value"],
      scale = props[scaleKey + "Scale"];
  if (typeof value === 'function') return value(props, datum, idx);
  if ((0, _isDatum.default)(value)) return value;
  var objValue = (0, _get2.default)(datum, accessor);

  if (scale) {
    var mappedValue = scale(objValue);
    if ((0, _isDatum.default)(mappedValue) && (0, _isDatum.default)(objValue)) return mappedValue;
  }

  if ((0, _isDatum.default)(objValue)) return objValue;
  var objKeyValue = (0, _get2.default)(datum, key + "Value");
  if ((0, _isDatum.default)(objKeyValue)) return objKeyValue;
  return defaultValue || objValue;
}