"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getMemoize = getMemoize;
exports.getMemoizeRenderLayers = getMemoizeRenderLayers;
exports.getMemoizeRenderLayer = exports.getMemoizeScales = exports.getMemoizeTickCounts = exports.getMemoizeRanges = exports.getMemoizePlotRect = exports.getMemoizeDomains = exports.getMemoizeTypes = exports.getMemoizeDimArrays = void 0;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _getDimArrays = _interopRequireDefault(require("./getDimArrays"));

var _getLayer = _interopRequireDefault(require("./getLayer"));

var _getPlotRect = _interopRequireDefault(require("./getPlotRect"));

var _getForProps = require("./getForProps");

var _rerunChecks = require("./rerunChecks");

function getMemoize(rerunCheck, transformFunc) {
  var savedResult;
  var prevProps = {};
  return function memoizer(props) {
    var rerun = rerunCheck(props, prevProps);
    prevProps = props;
    if (rerun) savedResult = transformFunc(props);
    return savedResult || transformFunc(props);
  };
}

var getMemoizeDimArrays = function getMemoizeDimArrays() {
  return getMemoize(_rerunChecks.rerunCheckGetDimArrays, _getDimArrays.default);
};

exports.getMemoizeDimArrays = getMemoizeDimArrays;

var getMemoizeTypes = function getMemoizeTypes() {
  return getMemoize(_rerunChecks.rerunCheckGetTypes, _getForProps.getTypes);
};

exports.getMemoizeTypes = getMemoizeTypes;

var getMemoizeDomains = function getMemoizeDomains() {
  return getMemoize(_rerunChecks.rerunCheckGetDomains, _getForProps.getDomains);
};

exports.getMemoizeDomains = getMemoizeDomains;

var getMemoizePlotRect = function getMemoizePlotRect() {
  return getMemoize(_rerunChecks.rerunCheckGetPlotRect, _getPlotRect.default);
};

exports.getMemoizePlotRect = getMemoizePlotRect;

var getMemoizeRanges = function getMemoizeRanges() {
  return getMemoize(_rerunChecks.rerunCheckGetRanges, _getForProps.getRanges);
};

exports.getMemoizeRanges = getMemoizeRanges;

var getMemoizeTickCounts = function getMemoizeTickCounts() {
  return getMemoize(_rerunChecks.rerunCheckGetTickCounts, _getForProps.getTickCounts);
};

exports.getMemoizeTickCounts = getMemoizeTickCounts;

var getMemoizeScales = function getMemoizeScales() {
  return getMemoize(_rerunChecks.rerunCheckGetScales, _getForProps.getScales);
};

exports.getMemoizeScales = getMemoizeScales;

var getMemoizeRenderLayer = function getMemoizeRenderLayer() {
  return getMemoize(_rerunChecks.rerunCheckGetRenderLayers, _getLayer.default);
};
/* eslint-disable react/destructuring-assignment */


exports.getMemoizeRenderLayer = getMemoizeRenderLayer;

function getMemoizeRenderLayers() {
  var layersMemoize = [];
  return function memoizeForLayers(props) {
    var renderLayers = (0, _map2.default)(props.layers, function (layer, i) {
      var layerMemoize = layersMemoize[i];

      if (!layerMemoize) {
        layersMemoize[i] = getMemoizeRenderLayer();
        layerMemoize = layersMemoize[i];
      }

      return layerMemoize(Object.assign({}, props, layer));
    });
    return renderLayers;
  };
}