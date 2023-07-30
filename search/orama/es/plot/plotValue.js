import _get from "lodash/get";
import isDatum from '../utils/isDatum';
import getScaleKeyByHash from './getScaleKeyByHash';
/*
`plotValue` is a helper to get back the mapped value plotted from a object.
It's used inside of the plotFunctions.
According to the configuration on the props provided it has different behaviours.

Plot values returns the value to be plotted from the input.
It has the following resolution order:
1. ${key}Value on the props
2. scaled data accessed with the accessor
3. ${key}Value on the data
4. defaultValue from arguments
5. value of datum[accessor] (can be undefined)
*/

export default function plotValue(props, datum, idx, key, defaultValue) {
  var scaleKey = getScaleKeyByHash(props, key);
  var accessor = props[key],
      value = props[key + "Value"],
      scale = props[scaleKey + "Scale"];
  if (typeof value === 'function') return value(props, datum, idx);
  if (isDatum(value)) return value;

  var objValue = _get(datum, accessor);

  if (scale) {
    var mappedValue = scale(objValue);
    if (isDatum(mappedValue) && isDatum(objValue)) return mappedValue;
  }

  if (isDatum(objValue)) return objValue;

  var objKeyValue = _get(datum, key + "Value");

  if (isDatum(objKeyValue)) return objKeyValue;
  return defaultValue || objValue;
}