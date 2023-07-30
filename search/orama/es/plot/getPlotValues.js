import _zipObject from "lodash/zipObject";
import _map from "lodash/map";
import { ACCESSORS_NAMES, ACCESSORS_NAMES_NON_SCALABLE } from '../defaults';
import plotValue from './plotValue';
var keys = ACCESSORS_NAMES.concat(ACCESSORS_NAMES_NON_SCALABLE);
export default function getPlotValues(props, datum, idx, defaults) {
  if (props === void 0) {
    props = {};
  }

  if (datum === void 0) {
    datum = {};
  }

  if (defaults === void 0) {
    defaults = {};
  }

  var values = _map(keys, function (key) {
    return plotValue(props, datum, idx, key, defaults[key]);
  });

  var result = _zipObject(keys, values);

  result.data = datum;
  return result;
}