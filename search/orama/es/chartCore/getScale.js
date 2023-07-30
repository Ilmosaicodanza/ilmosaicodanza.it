import _map from "lodash/map";
import _last from "lodash/last";
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import { scaleLinear, scaleLog, scaleOrdinal, scalePoint, scaleUtc } from 'd3-scale';
import { DOMAIN, NICE, RANGE, TICK_COUNT, TYPE } from '../defaults'; // `getScale` returns the scale for a key according to configurations on props object
// e.g. getScale({xType, xDomain, xRange, xTickCount}, 'x') => {...props, xScale}

function createScale(factory, domain, range) {
  return factory().domain(domain).range(range);
} // get a scale with logic for the x and y axis, if the domain starts and finishes on the same
// number returns the mid range value


function getBaseScales(type, domain, range, nice, tickCount) {
  var factory = type === 'time' && scaleUtc || type === 'log' && scaleLog || scaleLinear;
  var scale = createScale(factory, domain, range);
  if (nice) scale.nice(tickCount);
  return scale;
}

export function getOrdinalInvert(scale) {
  var mapArray = _map(scale.domain(), function (raw) {
    return {
      raw: raw,
      mapped: scale(raw)
    };
  });

  return function (input) {
    var hoverIndex = _findIndex(mapArray, function (d) {
      return _get(d, 'mapped') > input;
    });

    if (hoverIndex === 0) {
      var _hoverData = mapArray[hoverIndex];
      return _hoverData.raw;
    }

    if (hoverIndex === -1) {
      var _hoverData2 = _last(mapArray);

      return _hoverData2.raw;
    }

    var px = _get(mapArray[hoverIndex], 'mapped');

    var x = _get(mapArray[hoverIndex - 1], 'mapped');

    if (input - px < x - input) {
      var _hoverData3 = mapArray[hoverIndex - 1];
      return _hoverData3.raw;
    }

    var hoverData = mapArray[hoverIndex];
    return hoverData.raw;
  };
}
export function getAxisScale(props, key) {
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? TYPE : _props$,
      _props$2 = props[key + "Domain"],
      domain = _props$2 === void 0 ? DOMAIN : _props$2,
      _props$3 = props[key + "Range"],
      range = _props$3 === void 0 ? RANGE : _props$3,
      _props$4 = props[key + "TickCount"],
      tickCount = _props$4 === void 0 ? TICK_COUNT : _props$4,
      _props$5 = props[key + "Nice"],
      nice = _props$5 === void 0 ? NICE : _props$5;

  if (type === 'ordinal') {
    var ordinalScale = createScale(scalePoint, domain, range).padding(0.5);
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
export function getDefaultScale(props, key) {
  var _props$6 = props[key + "Type"],
      type = _props$6 === void 0 ? TYPE : _props$6,
      _props$7 = props[key + "Domain"],
      domain = _props$7 === void 0 ? DOMAIN : _props$7,
      _props$8 = props[key + "Range"],
      range = _props$8 === void 0 ? RANGE : _props$8,
      _props$9 = props[key + "TickCount"],
      tickCount = _props$9 === void 0 ? TICK_COUNT : _props$9,
      _props$10 = props[key + "Nice"],
      nice = _props$10 === void 0 ? NICE : _props$10;
  return type === 'ordinal' ? createScale(scaleOrdinal, domain, range) : getBaseScales(type, domain, range, nice, tickCount);
} // main exported function, used outside of the module on the Chart props transform flow

export default function getScale(props, key) {
  return key === 'x' || key === 'y' ? getAxisScale(props, key) : getDefaultScale(props, key);
}