"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getTickFormat;

var _defaults = require("../defaults");

var _getScale = _interopRequireDefault(require("./getScale"));

// Copyright 2018 Kensho Technologies, LLC.
function getTickFormat(props, key) {
  if (props[key + "TickFormat"]) return props[key + "TickFormat"];
  var type = props[key + "Type"],
      _props$ = props[key + "Scale"],
      scale = _props$ === void 0 ? (0, _getScale.default)(props, key) : _props$,
      _props$2 = props[key + "TickCount"],
      tickCount = _props$2 === void 0 ? _defaults.TICK_COUNT : _props$2;
  if (type === 'time') return scale.tickFormat();
  return scale.tickFormat(tickCount);
}