"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = compactData;

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _isDatum = _interopRequireDefault(require("./isDatum"));

// same as _.compact, but keep the zeros, they are important for dataVis
function compactData(array) {
  return (0, _filter2.default)(array, _isDatum.default);
}