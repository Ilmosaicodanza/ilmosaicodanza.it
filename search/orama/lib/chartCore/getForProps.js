"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getForProps = getForProps;
exports.getTickFormatters = exports.getScales = exports.getTickCounts = exports.getRanges = exports.getDomains = exports.getTypes = void 0;

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _getDomain = _interopRequireDefault(require("./getDomain"));

var _getRange = _interopRequireDefault(require("./getRange"));

var _getScale = _interopRequireDefault(require("./getScale"));

var _getTickCount = _interopRequireDefault(require("./getTickCount"));

var _getTickFormat = _interopRequireDefault(require("./getTickFormat"));

var _getType = _interopRequireDefault(require("./getType"));

/*
Functions to be used on the Chart props transformation flow.
The transformation flow starts with the <Chart /> props and successively adds the variables needed for plotting, the transformed props are used for generating render data.
*/

/* eslint-disable react/destructuring-assignment */
function getForProps(value, getFunc) {
  return function (props) {
    return (0, _reduce2.default)(props.groupedKeys, function (acc, key) {
      if (!props["" + key + value]) acc["" + key + value] = getFunc(props, key);
      return acc;
    }, {});
  };
}

var getTypes = getForProps('Type', _getType.default);
exports.getTypes = getTypes;
var getDomains = getForProps('Domain', _getDomain.default);
exports.getDomains = getDomains;
var getRanges = getForProps('Range', _getRange.default);
exports.getRanges = getRanges;
var getTickCounts = getForProps('TickCount', _getTickCount.default);
exports.getTickCounts = getTickCounts;
var getScales = getForProps('Scale', _getScale.default);
exports.getScales = getScales;
var getTickFormatters = getForProps('TickFormat', _getTickFormat.default);
exports.getTickFormatters = getTickFormatters;