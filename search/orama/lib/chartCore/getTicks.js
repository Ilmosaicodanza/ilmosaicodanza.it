"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getTicks;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _defaults = require("../defaults");

var _getScale = _interopRequireDefault(require("./getScale"));

var _getTickFormat = _interopRequireDefault(require("./getTickFormat"));

function getTicks(props, key) {
  if (props[key + "Ticks"]) return props[key + "Ticks"];
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? _defaults.TYPE : _props$,
      _props$2 = props[key + "Domain"],
      domain = _props$2 === void 0 ? _defaults.DOMAIN : _props$2,
      _props$3 = props[key + "TickCount"],
      tickCount = _props$3 === void 0 ? _defaults.TICK_COUNT : _props$3,
      _props$4 = props[key + "Scale"],
      scale = _props$4 === void 0 ? (0, _getScale.default)(props, key) : _props$4;
  if (type === 'ordinal') return (0, _map2.default)(domain, function (d) {
    return {
      value: d,
      text: d
    };
  });
  var tickFormat = (0, _getTickFormat.default)(Object.assign({}, props, {
    scale: scale
  }), key);
  var ticks = scale.ticks(tickCount);
  return (0, _map2.default)(ticks, function (d) {
    return {
      value: d,
      text: tickFormat(d)
    };
  });
}