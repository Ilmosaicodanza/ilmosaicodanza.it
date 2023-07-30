// Copyright 2018 Kensho Technologies, LLC.
import { TICK_COUNT } from '../defaults';
import getScale from './getScale';
export default function getTickFormat(props, key) {
  if (props[key + "TickFormat"]) return props[key + "TickFormat"];
  var type = props[key + "Type"],
      _props$ = props[key + "Scale"],
      scale = _props$ === void 0 ? getScale(props, key) : _props$,
      _props$2 = props[key + "TickCount"],
      tickCount = _props$2 === void 0 ? TICK_COUNT : _props$2;
  if (type === 'time') return scale.tickFormat();
  return scale.tickFormat(tickCount);
}