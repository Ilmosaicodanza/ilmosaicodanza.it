"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = text;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _getMinX = _interopRequireDefault(require("../utils/rect/getMinX"));

var _getMinY = _interopRequireDefault(require("../utils/rect/getMinY"));

var _getMidX = _interopRequireDefault(require("../utils/rect/getMidX"));

var _getMidY = _interopRequireDefault(require("../utils/rect/getMidY"));

var _getMaxX = _interopRequireDefault(require("../utils/rect/getMaxX"));

var _getMaxY = _interopRequireDefault(require("../utils/rect/getMaxY"));

var _fitCheckText = _interopRequireDefault(require("../utils/fitCheckText"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

// generate the array of render data
function getTextRenderData(props, datum, idx) {
  var plotRect = props.plotRect,
      theme = props.theme,
      width = props.width,
      height = props.height;
  var values = (0, _getPlotValues.default)(props, datum, idx, {
    x: (0, _getMidX.default)(props.plotRect),
    y: (0, _getMidY.default)(props.plotRect)
  });
  if (values.textSnap === 'top') values.y = (0, _getMinY.default)(plotRect);
  if (values.textSnap === 'bottom') values.y = (0, _getMaxY.default)(plotRect);
  if (values.textSnap === 'left') values.x = (0, _getMinX.default)(plotRect);
  if (values.textSnap === 'right') values.x = (0, _getMaxX.default)(plotRect);

  if (values.textSnap === 'topLeft') {
    values.x = (0, _getMinX.default)(plotRect);
    values.y = (0, _getMinY.default)(plotRect);
  }

  if (values.textSnap === 'topRight') {
    values.x = (0, _getMaxX.default)(plotRect);
    values.y = (0, _getMinY.default)(plotRect);
  }

  if (values.textSnap === 'bottomLeft') {
    values.x = (0, _getMinX.default)(plotRect);
    values.y = (0, _getMaxY.default)(plotRect);
  }

  if (values.textSnap === 'bottomRight') {
    values.x = (0, _getMaxX.default)(plotRect);
    values.y = (0, _getMaxY.default)(plotRect);
  }

  var newValues = (0, _fitCheckText.default)(values, width, height, theme);
  return Object.assign({}, newValues, {
    type: 'text'
  });
} // if there's only `xMap` or `yMap`, output a one-dimensional plot


function text(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return (0, _map2.default)((0, _flatten2.default)(props.data), function (datum, idx) {
    return getTextRenderData(props, datum, idx);
  });
}