"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getDomain;

var _uniq2 = _interopRequireDefault(require("lodash/uniq"));

var _min2 = _interopRequireDefault(require("lodash/min"));

var _max2 = _interopRequireDefault(require("lodash/max"));

var _defaults = require("../defaults");

function getDomain(props, key) {
  if (props[key + "Domain"]) return props[key + "Domain"];
  var array = props[key + "Array"],
      _props$ = props[key + "Type"],
      type = _props$ === void 0 ? _defaults.TYPE : _props$,
      zeroBased = props[key + "ZeroBased"];
  if (type === 'ordinal') return (0, _uniq2.default)(array);
  if (zeroBased) return [Math.min((0, _min2.default)(array), 0), Math.max((0, _max2.default)(array), 0)];
  return [(0, _min2.default)(array), (0, _max2.default)(array)];
}