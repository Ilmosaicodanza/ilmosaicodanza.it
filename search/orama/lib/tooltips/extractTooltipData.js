"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = extractTooltipData;

var _sortBy2 = _interopRequireDefault(require("lodash/sortBy"));

var _some2 = _interopRequireDefault(require("lodash/some"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _head2 = _interopRequireDefault(require("lodash/head"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _getScaleKeyByHash = _interopRequireDefault(require("../plot/getScaleKeyByHash"));

var _getTooltipFormat = _interopRequireDefault(require("../chartCore/getTooltipFormat"));

var ACCESSORS_TOOLTIP_ORDER = {
  y: 1,
  y0: 2,
  y1: 3,
  y2: 4,
  x: 5,
  x0: 6,
  x1: 7,
  x2: 8,
  radius: 9,
  fill: 10,
  stroke: 11,
  lineWidth: 12
};

function getDatum(data) {
  return Array.isArray(data) ? (0, _head2.default)(data) : data;
}

function isDisplayable(value) {
  return value !== 'NaN' && value !== undefined && !(0, _isNaN2.default)(value);
}

var tooltipValuesForStrings = function tooltipValuesForStrings(tooltipExtraDimensions, datum) {
  return (0, _reduce2.default)(tooltipExtraDimensions, function (acc, key) {
    var rawValue = (0, _get2.default)(datum, key);
    var value = rawValue instanceof Date ? rawValue.toDateString() : rawValue;
    if (isDisplayable(value)) acc.push({
      name: key,
      value: value
    });
    return acc;
  }, []);
};

function tooltipValuesForObjects(tooltipExtraDimensions, datum) {
  return (0, _map2.default)(tooltipExtraDimensions, function (obj) {
    var accessor = obj.accessor,
        value = obj.value,
        _obj$format = obj.format,
        format = _obj$format === void 0 ? function (d) {
      return d;
    } : _obj$format,
        name = obj.name;
    return {
      name: name || accessor,
      value: format(value || (0, _get2.default)(datum, accessor))
    };
  });
}

function getExtraTooltipValues(props, datum) {
  var tooltipExtraDimensions = props.tooltipExtraDimensions;
  return (0, _some2.default)(tooltipExtraDimensions, function (dimension) {
    return typeof dimension === 'string';
  }) ? tooltipValuesForStrings(tooltipExtraDimensions, datum) : tooltipValuesForObjects(tooltipExtraDimensions, datum);
}
/* eslint-disable react/destructuring-assignment */


function extractTooltipData(props, hoverData) {
  var localKeys = props.localKeys,
      tooltipKeys = props.tooltipKeys,
      _props$accessorsToolt = props.accessorsTooltipOrder,
      accessorsTooltipOrder = _props$accessorsToolt === void 0 ? ACCESSORS_TOOLTIP_ORDER : _props$accessorsToolt;
  var datum = getDatum(hoverData);
  var tooltipValues = (0, _reduce2.default)(tooltipKeys || localKeys, function (acc, key) {
    var scaleKey = (0, _getScaleKeyByHash.default)(props, key);
    var keyAlias = props[key + "Alias"] || key;
    var name = props[key + "Name"] || props[key];
    var formatter = props[scaleKey + "TooltipFormat"] || (0, _getTooltipFormat.default)(props, scaleKey);
    var value = formatter((0, _get2.default)(datum, props[key]));
    var order = accessorsTooltipOrder[key];
    if (isDisplayable(value)) acc.push({
      key: keyAlias,
      name: name,
      value: value,
      order: order
    });
    return acc;
  }, []);
  var extraTooltipValues = getExtraTooltipValues(props, datum);
  var orderedTooltipValues = (0, _map2.default)((0, _sortBy2.default)(tooltipValues, 'order'), function (values) {
    return (0, _omit2.default)(values, 'order');
  });
  var title = props.titleValue || datum[props.title];
  var values = orderedTooltipValues.concat(extraTooltipValues);
  return {
    title: title,
    values: values
  };
}