import _reduce from "lodash/reduce";
import getDomain from './getDomain';
import getRange from './getRange';
import getScale from './getScale';
import getTickCount from './getTickCount';
import getTickFormat from './getTickFormat';
import getType from './getType';
/*
Functions to be used on the Chart props transformation flow.
The transformation flow starts with the <Chart /> props and successively adds the variables needed for plotting, the transformed props are used for generating render data.
*/

/* eslint-disable react/destructuring-assignment */

export function getForProps(value, getFunc) {
  return function (props) {
    return _reduce(props.groupedKeys, function (acc, key) {
      if (!props["" + key + value]) acc["" + key + value] = getFunc(props, key);
      return acc;
    }, {});
  };
}
export var getTypes = getForProps('Type', getType);
export var getDomains = getForProps('Domain', getDomain);
export var getRanges = getForProps('Range', getRange);
export var getTickCounts = getForProps('TickCount', getTickCount);
export var getScales = getForProps('Scale', getScale);
export var getTickFormatters = getForProps('TickFormat', getTickFormat);