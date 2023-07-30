"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getScaleKeyByHash;

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _memoize2 = _interopRequireDefault(require("lodash/memoize"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _defaults = require("../defaults");

var generateAccessorGroupHash = (0, _memoize2.default)(function (accessorsGroups) {
  return (0, _reduce2.default)(accessorsGroups, function (acc, values, key) {
    (0, _each2.default)(values, function (d) {
      acc[d] = key; // eslint-disable-line no-param-reassign
    });
    return acc;
  }, {});
}); // used to return the main key for a group of accessors
// for example, x, x0, x1 and x2 all will return 'x'

function getScaleKeyByHash(props, key) {
  var _props$accessorsGroup = props.accessorsGroups,
      accessorsGroups = _props$accessorsGroup === void 0 ? _defaults.ACCESSORS_GROUPS : _props$accessorsGroup;
  var hash = generateAccessorGroupHash(accessorsGroups);
  return hash[key] || key;
}