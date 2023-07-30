"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = notPlotNumber;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var checkNotPlotNumber = function checkNotPlotNumber(value) {
  return (0, _isNaN2.default)(value) || !(0, _isNumber2.default)(value);
};

function notPlotNumber(value) {
  return Array.isArray(value) ? value.some(checkNotPlotNumber) : checkNotPlotNumber(value);
}