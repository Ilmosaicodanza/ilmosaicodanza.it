"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getRange;

var _getMaxX = _interopRequireDefault(require("../utils/rect/getMaxX"));

var _getMaxY = _interopRequireDefault(require("../utils/rect/getMaxY"));

var _defaults = require("../defaults");

// Copyright 2018 Kensho Technologies, LLC.
function getRange(props, key) {
  if (props[key + "Range"]) return props[key + "Range"];
  var plotRect = props.plotRect,
      _props$ = props[key + "Type"],
      type = _props$ === void 0 ? _defaults.TYPE : _props$;

  switch (key) {
    case 'y':
      return [(0, _getMaxY.default)(plotRect), plotRect.y];

    case 'radius':
      return type === 'ordinal' ? [2, 4, 8, 12, 16, 20] : [2, 20];

    case 'lineWidth':
      return type === 'ordinal' ? [1, 2, 3, 4] : [0.5, 4];

    case 'lineDash':
      return [[2], [4], [8], [7, 4, 2, 4]];

    case 'fill':
    case 'stroke':
    case 'hoverStroke':
      return type === 'ordinal' ? props.theme.plotOrdinalRangeFill : props.theme.plotLinearRangeFill;

    case 'x':
    default:
      return [plotRect.x, (0, _getMaxX.default)(plotRect)];
  }
}