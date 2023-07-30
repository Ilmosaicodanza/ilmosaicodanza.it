"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.extractDimArray = extractDimArray;
exports.getDimArraysForLayer = getDimArraysForLayer;
exports.default = getDimArraysForRoot;

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _mergeWith2 = _interopRequireDefault(require("lodash/mergeWith"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _head2 = _interopRequireDefault(require("lodash/head"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _compactData = _interopRequireDefault(require("../utils/compactData"));

var isUndefinedAccessor = function isUndefinedAccessor(value) {
  return typeof value !== 'string' || value === '';
}; // check if data is array of arrays


function tidyFlatten(data) {
  return Array.isArray((0, _head2.default)(data)) ? (0, _flatten2.default)(data) : data;
} // for a layer.data, extract the dim array using an accessor


function extractDimArray(data, accessor) {
  return (0, _compactData.default)((0, _map2.default)(tidyFlatten(data), accessor));
} // according to the local defined accessors, extract and compact the dimArrays


function getDimArraysForLayer(layer) {
  if (layer.skipExtractArrays === true) return {};
  var localAccessors = layer.localAccessors;
  return (0, _reduce2.default)(localAccessors, function (acc, accessor, key) {
    var _Object$assign;

    if (isUndefinedAccessor(accessor)) return acc;
    var dimArray = extractDimArray(layer.data, accessor);
    if ((0, _isEmpty2.default)(dimArray)) return acc;
    return Object.assign({}, acc, (_Object$assign = {}, _Object$assign[key] = dimArray, _Object$assign));
  }, {});
} // get dimension array from each layer, and merge the arrays with the same key


function getDimArraysForRoot(props) {
  var layersArrays = (0, _map2.default)(props.layers, getDimArraysForLayer);
  return _mergeWith2.default.apply(void 0, [{}].concat(layersArrays, [function (a, b) {
    if (a === undefined) return b;
    if (b === undefined) return a;
    return a.concat(b);
  }]));
}