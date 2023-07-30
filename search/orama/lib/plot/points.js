"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = points;

var _flatMap2 = _interopRequireDefault(require("lodash/flatMap"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _getMidX = _interopRequireDefault(require("../utils/rect/getMidX"));

var _getMidY = _interopRequireDefault(require("../utils/rect/getMidY"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

/*
`points` is used to generate render data for dots and similar.
it handles `x`, `y`, 'radius' and 'fill'.

@calling logic
points{
  getPointRenderData(retrievePointsData){}
}
*/

/*
generates the array of render data
*/
function getPointRenderData(props, datum, idx) {
  var values = (0, _getPlotValues.default)(props, datum, idx, {
    hoverAlpha: 0.75,
    radius: 4,
    x: (0, _getMidX.default)(props.plotRect),
    y: (0, _getMidY.default)(props.plotRect)
  });
  var path2D = (0, _getPath2D.default)();
  var hover2ndPath2D = (0, _getPath2D.default)();
  path2D.arc(values.x, values.y, values.radius, 0, 2 * Math.PI);
  hover2ndPath2D.arc(values.x, values.y, values.radius + 8, 0, 2 * Math.PI);
  return Object.assign({}, values, {
    hover2ndPath2D: hover2ndPath2D,
    path2D: path2D,
    type: 'area'
  });
} // main entry point, if there's only `xMap` or `yMap` it will output a one dimension plot


function points(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return (0, _flatMap2.default)(props.data, function (datum, idx) {
    return Array.isArray(datum) ? (0, _map2.default)(datum, function (d, i) {
      return getPointRenderData(props, d, i);
    }) : getPointRenderData(props, datum, idx);
  });
}