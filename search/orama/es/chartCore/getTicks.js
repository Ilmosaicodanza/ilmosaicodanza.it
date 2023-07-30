import _map from "lodash/map";
import { DOMAIN, TICK_COUNT, TYPE } from '../defaults';
import getScale from './getScale';
import getTickFormat from './getTickFormat';
export default function getTicks(props, key) {
  if (props[key + "Ticks"]) return props[key + "Ticks"];
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? TYPE : _props$,
      _props$2 = props[key + "Domain"],
      domain = _props$2 === void 0 ? DOMAIN : _props$2,
      _props$3 = props[key + "TickCount"],
      tickCount = _props$3 === void 0 ? TICK_COUNT : _props$3,
      _props$4 = props[key + "Scale"],
      scale = _props$4 === void 0 ? getScale(props, key) : _props$4;
  if (type === 'ordinal') return _map(domain, function (d) {
    return {
      value: d,
      text: d
    };
  });
  var tickFormat = getTickFormat(Object.assign({}, props, {
    scale: scale
  }), key);
  var ticks = scale.ticks(tickCount);
  return _map(ticks, function (d) {
    return {
      value: d,
      text: tickFormat(d)
    };
  });
}