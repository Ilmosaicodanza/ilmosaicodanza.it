"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.omitGroups = omitGroups;
exports.default = mergeDimArrays;

var _values2 = _interopRequireDefault(require("lodash/values"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _defaults = require("../defaults");

var _compactData = _interopRequireDefault(require("../utils/compactData"));

function omitGroups(dimArrays, accessorsGroups) {
  return (0, _omit2.default)(dimArrays, (0, _flatten2.default)((0, _values2.default)(accessorsGroups)));
} // merge keys according to their groups, e.g. 'x', 'x0', 'x1' get merged into one xArray


function mergeDimArrays(dimArrays, accessorsGroups) {
  if (accessorsGroups === void 0) {
    accessorsGroups = _defaults.ACCESSORS_GROUPS;
  }

  return (0, _reduce2.default)(accessorsGroups, function (acc, group, key) {
    var _Object$assign;

    var mergedDimArray = (0, _reduce2.default)(group, function (acc2, d) {
      return (0, _compactData.default)(acc2.concat(dimArrays[d]));
    }, []);
    if (mergedDimArray.length === 0) return acc;
    return Object.assign({}, acc, (_Object$assign = {}, _Object$assign[key] = mergedDimArray, _Object$assign));
  }, omitGroups(dimArrays, accessorsGroups));
}