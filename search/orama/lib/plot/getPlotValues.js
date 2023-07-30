"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getPlotValues;

var _zipObject2 = _interopRequireDefault(require("lodash/zipObject"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _defaults = require("../defaults");

var _plotValue = _interopRequireDefault(require("./plotValue"));

var keys = _defaults.ACCESSORS_NAMES.concat(_defaults.ACCESSORS_NAMES_NON_SCALABLE);

function getPlotValues(props, datum, idx, defaults) {
  if (props === void 0) {
    props = {};
  }

  if (datum === void 0) {
    datum = {};
  }

  if (defaults === void 0) {
    defaults = {};
  }

  var values = (0, _map2.default)(keys, function (key) {
    return (0, _plotValue.default)(props, datum, idx, key, defaults[key]);
  });
  var result = (0, _zipObject2.default)(keys, values);
  result.data = datum;
  return result;
}