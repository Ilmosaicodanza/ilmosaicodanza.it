import _maxBy from "lodash/maxBy";
import _countBy from "lodash/countBy";
var JS_TO_VIS_TYPE = {
  string: 'ordinal',
  number: 'linear',
  date: 'time'
};
export function toType(value) {
  if (value instanceof Date) return 'date';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}
export default function getType(props, key) {
  if (props[key + "Type"]) return props[key + "Type"];
  var array = props[key + "Array"];
  if (!array) return undefined;

  var counter = _countBy(array, toType);

  var maxName = _maxBy(Object.keys(counter), function (d) {
    return counter[d];
  });

  return JS_TO_VIS_TYPE[maxName];
}