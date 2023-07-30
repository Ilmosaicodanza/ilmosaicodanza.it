import _uniq from "lodash/uniq";
import _min from "lodash/min";
import _max from "lodash/max";
import { TYPE } from '../defaults';
export default function getDomain(props, key) {
  if (props[key + "Domain"]) return props[key + "Domain"];
  var array = props[key + "Array"],
      _props$ = props[key + "Type"],
      type = _props$ === void 0 ? TYPE : _props$,
      zeroBased = props[key + "ZeroBased"];
  if (type === 'ordinal') return _uniq(array);
  if (zeroBased) return [Math.min(_min(array), 0), Math.max(_max(array), 0)];
  return [_min(array), _max(array)];
}