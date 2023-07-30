"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.layerMapper = layerMapper;
exports.default = getLocalKeys;

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _defaults = require("../defaults");

function layerMapper(layer) {
  var localAccessors = (0, _pick2.default)(layer, layer.accessorsNames || _defaults.ACCESSORS_NAMES);
  return Object.assign({}, layer, {
    localAccessors: localAccessors,
    localKeys: (0, _keys2.default)(localAccessors)
  });
}

function getLocalKeys(props) {
  return {
    layers: (0, _map2.default)(props.layers, layerMapper)
  };
}