import _mapKeys from "lodash/mapKeys";
import _keys from "lodash/keys";
import getDimArraysForRoot from './getDimArraysForRoot';
import mergeDimArrays from './mergeDimArrays';
/*
Dimension arrays are lists with the values extracted from the data for a certain dimension, eg. xArray: [1, 2, 3, 4, 5]
According to the accessors (`{x, y, fill}`) defined on the props.layers the dimArrays are created and assigned to a new props object.
Dimension arrays are also grouped according to accessorsGroups
*/
// add 'Array' sufix to dimArrays, add groupedKeys props

export var wrapUpNewProps = function wrapUpNewProps(dimArrays) {
  return Object.assign({}, _mapKeys(dimArrays, function (value, key) {
    return key + "Array";
  }), {
    groupedKeys: _keys(dimArrays)
  });
}; // used outside of the module on the Chart props transform flow

export default function getDimArrays(props) {
  if (props.groupedKeys) return {};
  return wrapUpNewProps(mergeDimArrays(getDimArraysForRoot(props), props.accessorsGroups));
}