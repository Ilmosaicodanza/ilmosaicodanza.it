"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = ranges;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

function rangesRender(props, datum, idx) {
  var backgroundOffset = props.backgroundOffset,
      plotRect = props.plotRect;
  var path2D = (0, _getPath2D.default)();
  var values = (0, _getPlotValues.default)(props, datum, idx);

  if ((0, _isNumber2.default)(values.x1) && (0, _isNumber2.default)(values.x2) && (0, _isNumber2.default)(values.y1) && (0, _isNumber2.default)(values.y2)) {
    path2D.rect(values.x1, values.y1, values.x2 - values.x1, values.y2 - values.y1);
  } else if ((0, _isNumber2.default)(values.x1) && (0, _isNumber2.default)(values.x2)) {
    path2D.rect(values.x1, plotRect.y - backgroundOffset, values.x2 - values.x1, plotRect.height + backgroundOffset * 2);
  } else if ((0, _isNumber2.default)(values.y1) && (0, _isNumber2.default)(values.y2)) {
    path2D.rect(plotRect.x - backgroundOffset, values.y1, plotRect.width + backgroundOffset * 2, values.y2 - values.y1);
  }

  return Object.assign({}, values, {
    path2D: path2D,
    type: 'area'
  });
}

function ranges(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return (0, _map2.default)((0, _flatten2.default)(props.data), function (datum, idx) {
    return rangesRender(props, datum, idx);
  });
}