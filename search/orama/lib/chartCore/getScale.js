"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getOrdinalInvert = getOrdinalInvert;
exports.getAxisScale = getAxisScale;
exports.getDefaultScale = getDefaultScale;
exports.default = getScale;

var _map2 = _interopRequireDefault(require("lodash/map"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _d3Scale = require("d3-scale");

var _defaults = require("../defaults");

// `getScale` returns the scale for a key according to configurations on props object
// e.g. getScale({xType, xDomain, xRange, xTickCount}, 'x') => {...props, xScale}
function createScale(factory, domain, range) {
  return factory().domain(domain).range(range);
} // get a scale with logic for the x and y axis, if the domain starts and finishes on the same
// number returns the mid range value


function getBaseScales(type, domain, range, nice, tickCount) {
  var factory = type === 'time' && _d3Scale.scaleUtc || type === 'log' && _d3Scale.scaleLog || _d3Scale.scaleLinear;
  var scale = createScale(factory, domain, range);
  if (nice) scale.nice(tickCount);
  return scale;
}

function getOrdinalInvert(scale) {
  var mapArray = (0, _map2.default)(scale.domain(), function (raw) {
    return {
      raw: raw,
      mapped: scale(raw)
    };
  });
  return function (input) {
    var hoverIndex = (0, _findIndex2.default)(mapArray, function (d) {
      return (0, _get2.default)(d, 'mapped') > input;
    });

    if (hoverIndex === 0) {
      var _hoverData = mapArray[hoverIndex];
      return _hoverData.raw;
    }

    if (hoverIndex === -1) {
      var _hoverData2 = (0, _last2.default)(mapArray);

      return _hoverData2.raw;
    }

    var px = (0, _get2.default)(mapArray[hoverIndex], 'mapped');
    var x = (0, _get2.default)(mapArray[hoverIndex - 1], 'mapped');

    if (input - px < x - input) {
      var _hoverData3 = mapArray[hoverIndex - 1];
      return _hoverData3.raw;
    }

    var hoverData = mapArray[hoverIndex];
    return hoverData.raw;
  };
}

function getAxisScale(props, key) {
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? _defaults.TYPE : _props$,
      _props$2 = props[key + "Domain"],
      domain = _props$2 === void 0 ? _defaults.DOMAIN : _props$2,
      _props$3 = props[key + "Range"],
      range = _props$3 === void 0 ? _defaults.RANGE : _props$3,
      _props$4 = props[key + "TickCount"],
      tickCount = _props$4 === void 0 ? _defaults.TICK_COUNT : _props$4,
      _props$5 = props[key + "Nice"],
      nice = _props$5 === void 0 ? _defaults.NICE : _props$5;

  if (type === 'ordinal') {
    var ordinalScale = createScale(_d3Scale.scalePoint, domain, range).padding(0.5);
    ordinalScale.invert = getOrdinalInvert(ordinalScale);
    return ordinalScale;
  }

  if (domain[0] === domain[1]) {
    var midRange = range[0] + (range[1] - range[0]) / 2;

    var linearScaleFlatDomain = function linearScaleFlatDomain() {
      return midRange;
    };

    linearScaleFlatDomain.tickFormat = function () {
      return function (d) {
        return d;
      };
    };

    linearScaleFlatDomain.ticks = function () {
      return [domain[0]];
    };

    return linearScaleFlatDomain;
  }

  return getBaseScales(type, domain, range, nice, tickCount);
}

function getDefaultScale(props, key) {
  var _props$6 = props[key + "Type"],
      type = _props$6 === void 0 ? _defaults.TYPE : _props$6,
      _props$7 = props[key + "Domain"],
      domain = _props$7 === void 0 ? _defaults.DOMAIN : _props$7,
      _props$8 = props[key + "Range"],
      range = _props$8 === void 0 ? _defaults.RANGE : _props$8,
      _props$9 = props[key + "TickCount"],
      tickCount = _props$9 === void 0 ? _defaults.TICK_COUNT : _props$9,
      _props$10 = props[key + "Nice"],
      nice = _props$10 === void 0 ? _defaults.NICE : _props$10;
  return type === 'ordinal' ? createScale(_d3Scale.scaleOrdinal, domain, range) : getBaseScales(type, domain, range, nice, tickCount);
} // main exported function, used outside of the module on the Chart props transform flow


function getScale(props, key) {
  return key === 'x' || key === 'y' ? getAxisScale(props, key) : getDefaultScale(props, key);
}