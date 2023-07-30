import _reduce from "lodash/reduce";
import _mergeWith from "lodash/mergeWith";
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _head from "lodash/head";
import _flatten from "lodash/flatten";
import compactData from '../utils/compactData';

var isUndefinedAccessor = function isUndefinedAccessor(value) {
  return typeof value !== 'string' || value === '';
}; // check if data is array of arrays


function tidyFlatten(data) {
  return Array.isArray(_head(data)) ? _flatten(data) : data;
} // for a layer.data, extract the dim array using an accessor


export function extractDimArray(data, accessor) {
  return compactData(_map(tidyFlatten(data), accessor));
} // according to the local defined accessors, extract and compact the dimArrays

export function getDimArraysForLayer(layer) {
  if (layer.skipExtractArrays === true) return {};
  var localAccessors = layer.localAccessors;
  return _reduce(localAccessors, function (acc, accessor, key) {
    var _Object$assign;

    if (isUndefinedAccessor(accessor)) return acc;
    var dimArray = extractDimArray(layer.data, accessor);
    if (_isEmpty(dimArray)) return acc;
    return Object.assign({}, acc, (_Object$assign = {}, _Object$assign[key] = dimArray, _Object$assign));
  }, {});
} // get dimension array from each layer, and merge the arrays with the same key

export default function getDimArraysForRoot(props) {
  var layersArrays = _map(props.layers, getDimArraysForLayer);

  return _mergeWith.apply(void 0, [{}].concat(layersArrays, [function (a, b) {
    if (a === undefined) return b;
    if (b === undefined) return a;
    return a.concat(b);
  }]));
}