"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getTooltipFormat;

var _defaults = require("../defaults");

var _getScale = _interopRequireDefault(require("./getScale"));

// Copyright 2018 Kensho Technologies, LLC.
function getTooltipFormat(props, key) {
  if (props[key + "TooltipFormat"]) return props[key + "TooltipFormat"];
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? _defaults.TYPE : _props$,
      _props$2 = props[key + "Scale"],
      scale = _props$2 === void 0 ? (0, _getScale.default)(props, key) : _props$2,
      _props$3 = props[key + "TickCount"],
      tickCount = _props$3 === void 0 ? _defaults.TICK_COUNT : _props$3;

  if (type === 'log') {
    var _Object$assign;

    var linearScale = (0, _getScale.default)(Object.assign({}, props, (_Object$assign = {}, _Object$assign[key + "Type"] = 'linear', _Object$assign)), key);
    return linearScale.tickFormat(tickCount);
  }

  if (type === 'time') return function (d) {
    return d.toDateString();
  };
  if (!scale.tickFormat) return function (d) {
    return d;
  };
  return scale.tickFormat(tickCount);
}