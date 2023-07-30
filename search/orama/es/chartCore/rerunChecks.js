import _some from "lodash/some";
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


export var getRerunCheckForNames = function getRerunCheckForNames(keyNames, rootNames) {
  return function (props, prevProps) {
    var checkRootNames = _some(rootNames, function (name) {
      return props["" + name] !== prevProps["" + name];
    });

    if (checkRootNames) return true;
    if (!keyNames) return false;
    return _some(props.groupedKeys, function (key) {
      return _some(keyNames, function (name) {
        return props["" + key + name] !== prevProps["" + key + name];
      });
    });
  };
};
export var rerunCheckGetTypes = getRerunCheckForNames(['Type', 'Array']);
export var rerunCheckGetDomains = getRerunCheckForNames(['Domain', 'Array', 'Type', 'ZeroBased']);
export var rerunCheckGetPlotRect = getRerunCheckForNames(['Array', 'ShowTicks', 'ShowLabel'], ['width', 'height', 'margin', 'proportion']);
export var rerunCheckGetRanges = getRerunCheckForNames(['Range', 'Type', 'Array'], ['plotRect']);
export var rerunCheckGetTickCounts = getRerunCheckForNames(['TickCount', 'Range', 'TickSpace']);
export var rerunCheckGetScales = getRerunCheckForNames(['Type', 'Domain', 'Range', 'TickCount', 'Nice']);
export var rerunCheckGetRenderLayers = getRerunCheckForNames(['Array', 'Domain', 'Range', 'Scale'], ['data']); // check change for root and layers on: accessors, data, and skipExtractArrays

export function rerunCheckGetDimArrays(props, prevProps) {
  // now there are layers
  if (!prevProps.layers && props.layers) return true; // for each layer

  var layerCheck = _some(props.layers, function (layer, i) {
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