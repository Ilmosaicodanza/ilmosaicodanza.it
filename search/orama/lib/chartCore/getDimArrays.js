"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getDimArrays;
exports.wrapUpNewProps = void 0;

var _mapKeys2 = _interopRequireDefault(require("lodash/mapKeys"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _getDimArraysForRoot = _interopRequireDefault(require("./getDimArraysForRoot"));

var _mergeDimArrays = _interopRequireDefault(require("./mergeDimArrays"));

/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, fill}`) defined on the props.layers the dimArrays are created and assigned to a new props object.
Dimension arrays are also grouped according to accessorsGroups
*/
// add 'Array' sufix to dimArrays, add groupedKeys props
var wrapUpNewProps = function wrapUpNewProps(dimArrays) {
  return Object.assign({}, (0, _mapKeys2.default)(dimArrays, function (value, key) {
    return key + "Array";
  }), {
    groupedKeys: (0, _keys2.default)(dimArrays)
  });
}; // used outside of the module on the Chart props transform flow


exports.wrapUpNewProps = wrapUpNewProps;

function getDimArrays(props) {
  if (props.groupedKeys) return {};
  return wrapUpNewProps((0, _mergeDimArrays.default)((0, _getDimArraysForRoot.default)(props), props.accessorsGroups));
}