// Copyright 2018 Kensho Technologies, LLC.
import { TICK_COUNT, TYPE } from '../defaults';
import getScale from './getScale';
export default function getTooltipFormat(props, key) {
  if (props[key + "TooltipFormat"]) return props[key + "TooltipFormat"];
  var _props$ = props[key + "Type"],
      type = _props$ === void 0 ? TYPE : _props$,
      _props$2 = props[key + "Scale"],
      scale = _props$2 === void 0 ? getScale(props, key) : _props$2,
      _props$3 = props[key + "TickCount"],
      tickCount = _props$3 === void 0 ? TICK_COUNT : _props$3;

  if (type === 'log') {
    var _Object$assign;

    var linearScale = getScale(Object.assign({}, props, (_Object$assign = {}, _Object$assign[key + "Type"] = 'linear', _Object$assign)), key);
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