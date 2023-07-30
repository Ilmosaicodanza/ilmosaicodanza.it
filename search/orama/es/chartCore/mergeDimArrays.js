import _values from "lodash/values";
import _reduce from "lodash/reduce";
import _omit from "lodash/omit";
import _flatten from "lodash/flatten";
import { ACCESSORS_GROUPS } from '../defaults';
import compactData from '../utils/compactData';
export function omitGroups(dimArrays, accessorsGroups) {
  return _omit(dimArrays, _flatten(_values(accessorsGroups)));
} // merge keys according to their groups, e.g. 'x', 'x0', 'x1' get merged into one xArray

export default function mergeDimArrays(dimArrays, accessorsGroups) {
  if (accessorsGroups === void 0) {
    accessorsGroups = ACCESSORS_GROUPS;
  }

  return _reduce(accessorsGroups, function (acc, group, key) {
    var _Object$assign;

    var mergedDimArray = _reduce(group, function (acc2, d) {
      return compactData(acc2.concat(dimArrays[d]));
    }, []);

    if (mergedDimArray.length === 0) return acc;
    return Object.assign({}, acc, (_Object$assign = {}, _Object$assign[key] = mergedDimArray, _Object$assign));
  }, omitGroups(dimArrays, accessorsGroups));
}