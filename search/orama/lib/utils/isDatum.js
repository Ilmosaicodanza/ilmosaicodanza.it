"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = isDatum;

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

function isDatum(value) {
  return value != null && !(0, _isNaN2.default)(value);
}