import _reduce from "lodash/reduce";
import _memoize from "lodash/memoize";
import _each from "lodash/each";
import { ACCESSORS_GROUPS } from '../defaults';

var generateAccessorGroupHash = _memoize(function (accessorsGroups) {
  return _reduce(accessorsGroups, function (acc, values, key) {
    _each(values, function (d) {
      acc[d] = key; // eslint-disable-line no-param-reassign
    });

    return acc;
  }, {});
}); // used to return the main key for a group of accessors
// for example, x, x0, x1 and x2 all will return 'x'


export default function getScaleKeyByHash(props, key) {
  var _props$accessorsGroup = props.accessorsGroups,
      accessorsGroups = _props$accessorsGroup === void 0 ? ACCESSORS_GROUPS : _props$accessorsGroup;
  var hash = generateAccessorGroupHash(accessorsGroups);
  return hash[key] || key;
}