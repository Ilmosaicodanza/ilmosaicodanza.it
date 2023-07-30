"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.rerunCheckGetDimArrays = rerunCheckGetDimArrays;
exports.rerunCheckGetRenderLayers = exports.rerunCheckGetScales = exports.rerunCheckGetTickCounts = exports.rerunCheckGetRanges = exports.rerunCheckGetPlotRect = exports.rerunCheckGetDomains = exports.rerunCheckGetTypes = exports.getRerunCheckForNames = void 0;

var _some2 = _interopRequireDefault(require("lodash/some"));

var hasOwnProperty = Object.prototype.hasOwnProperty;

function shallowEqual(objA, objB) {
  if (objA === objB) return true;
  if (typeof objA !== 'object' || objA === null) return false;
  if (typeof objB !== 'object' || objB === null) return false;
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i += 1) {
    if (!hasOwnProperty.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) return false;
  }

  return true;
}
/* eslint-disable react/destructuring-assignment */


var getRerunCheckForNames = function getRerunCheckForNames(keyNames, rootNames) {
  return function (props, prevProps) {
    var checkRootNames = (0, _some2.default)(rootNames, function (name) {
      return props["" + name] !== prevProps["" + name];
    });
    if (checkRootNames) return true;
    if (!keyNames) return false;
    return (0, _some2.default)(props.groupedKeys, function (key) {
      return (0, _some2.default)(keyNames, function (name) {
        return props["" + key + name] !== prevProps["" + key + name];
      });
    });
  };
};

exports.getRerunCheckForNames = getRerunCheckForNames;
var rerunCheckGetTypes = getRerunCheckForNames(['Type', 'Array']);
exports.rerunCheckGetTypes = rerunCheckGetTypes;
var rerunCheckGetDomains = getRerunCheckForNames(['Domain', 'Array', 'Type', 'ZeroBased']);
exports.rerunCheckGetDomains = rerunCheckGetDomains;
var rerunCheckGetPlotRect = getRerunCheckForNames(['Array', 'ShowTicks', 'ShowLabel'], ['width', 'height', 'margin', 'proportion']);
exports.rerunCheckGetPlotRect = rerunCheckGetPlotRect;
var rerunCheckGetRanges = getRerunCheckForNames(['Range', 'Type', 'Array'], ['plotRect']);
exports.rerunCheckGetRanges = rerunCheckGetRanges;
var rerunCheckGetTickCounts = getRerunCheckForNames(['TickCount', 'Range', 'TickSpace']);
exports.rerunCheckGetTickCounts = rerunCheckGetTickCounts;
var rerunCheckGetScales = getRerunCheckForNames(['Type', 'Domain', 'Range', 'TickCount', 'Nice']);
exports.rerunCheckGetScales = rerunCheckGetScales;
var rerunCheckGetRenderLayers = getRerunCheckForNames(['Array', 'Domain', 'Range', 'Scale'], ['data']); // check change for root and layers on: accessors, data, and skipExtractArrays

exports.rerunCheckGetRenderLayers = rerunCheckGetRenderLayers;

function rerunCheckGetDimArrays(props, prevProps) {
  // now there are layers
  if (!prevProps.layers && props.layers) return true; // for each layer

  var layerCheck = (0, _some2.default)(props.layers, function (layer, i) {
    // should skip
    if (layer.skipExtractArrays) return false;
    var prevLayer = prevProps.layers[i]; // new layer

    if (!prevLayer) return true; // new data on the layer

    if (layer.data !== prevLayer.data) return true; // new accessors on the layer

    return !shallowEqual(layer.localAccessors, prevLayer.localAccessors);
  });
  if (layerCheck) return true;
  return false;
}