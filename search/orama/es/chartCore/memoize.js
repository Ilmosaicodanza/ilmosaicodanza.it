import _map from "lodash/map";
import getDimArrays from './getDimArrays';
import getLayer from './getLayer';
import getPlotRect from './getPlotRect';
import { getDomains, getRanges, getScales, getTickCounts, getTypes } from './getForProps';
import { rerunCheckGetDimArrays, rerunCheckGetTypes, rerunCheckGetDomains, rerunCheckGetRanges, rerunCheckGetPlotRect, rerunCheckGetTickCounts, rerunCheckGetScales, rerunCheckGetRenderLayers } from './rerunChecks';
export function getMemoize(rerunCheck, transformFunc) {
  var savedResult;
  var prevProps = {};
  return function memoizer(props) {
    var rerun = rerunCheck(props, prevProps);
    prevProps = props;
    if (rerun) savedResult = transformFunc(props);
    return savedResult || transformFunc(props);
  };
}
export var getMemoizeDimArrays = function getMemoizeDimArrays() {
  return getMemoize(rerunCheckGetDimArrays, getDimArrays);
};
export var getMemoizeTypes = function getMemoizeTypes() {
  return getMemoize(rerunCheckGetTypes, getTypes);
};
export var getMemoizeDomains = function getMemoizeDomains() {
  return getMemoize(rerunCheckGetDomains, getDomains);
};
export var getMemoizePlotRect = function getMemoizePlotRect() {
  return getMemoize(rerunCheckGetPlotRect, getPlotRect);
};
export var getMemoizeRanges = function getMemoizeRanges() {
  return getMemoize(rerunCheckGetRanges, getRanges);
};
export var getMemoizeTickCounts = function getMemoizeTickCounts() {
  return getMemoize(rerunCheckGetTickCounts, getTickCounts);
};
export var getMemoizeScales = function getMemoizeScales() {
  return getMemoize(rerunCheckGetScales, getScales);
};
export var getMemoizeRenderLayer = function getMemoizeRenderLayer() {
  return getMemoize(rerunCheckGetRenderLayers, getLayer);
};
/* eslint-disable react/destructuring-assignment */

export function getMemoizeRenderLayers() {
  var layersMemoize = [];
  return function memoizeForLayers(props) {
    var renderLayers = _map(props.layers, function (layer, i) {
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