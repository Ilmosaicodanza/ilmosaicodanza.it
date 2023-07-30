"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = guides;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _getMinX = _interopRequireDefault(require("../utils/rect/getMinX"));

var _getMaxX = _interopRequireDefault(require("../utils/rect/getMaxX"));

var _getMinY = _interopRequireDefault(require("../utils/rect/getMinY"));

var _getMaxY = _interopRequireDefault(require("../utils/rect/getMaxY"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

function getGuideRenderData(props, datum, idx) {
  var backgroundOffset = props.backgroundOffset,
      plotRect = props.plotRect;
  var path2D = (0, _getPath2D.default)();
  var values = (0, _getPlotValues.default)(props, datum, idx);

  if ((0, _isNumber2.default)(values.x)) {
    path2D.moveTo(values.x, (0, _getMinY.default)(plotRect) - backgroundOffset);
    path2D.lineTo(values.x, (0, _getMaxY.default)(plotRect) + backgroundOffset);
  } else if ((0, _isNumber2.default)(values.y)) {
    path2D.moveTo((0, _getMinX.default)(plotRect) - backgroundOffset, values.y);
    path2D.lineTo((0, _getMaxX.default)(plotRect) + backgroundOffset, values.y);
  }

  return Object.assign({}, values, {
    path2D: path2D,
    type: 'line'
  });
}

function guides(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return (0, _map2.default)((0, _flatten2.default)(props.data), function (datum, idx) {
    return getGuideRenderData(props, datum, idx);
  });
}