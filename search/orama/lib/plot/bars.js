"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = bars;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

var GUTTER = 1;

function getBarsRenderData(props, datum, idx) {
  var _props$barsGutter = props.barsGutter,
      gutter = _props$barsGutter === void 0 ? GUTTER : _props$barsGutter;
  var path2D = (0, _getPath2D.default)();
  var values = (0, _getPlotValues.default)(props, datum, idx, {
    x: props.plotRect.x,
    y: props.plotRect.y
  });

  if ((0, _isNumber2.default)(values.x1) && (0, _isNumber2.default)(values.x2)) {
    // when `x1` or `y1` is present, this means the bars are been positioned on a linear scale,
    // and their position has been previously calculated
    var y0 = props.yScale(0);
    path2D.rect(values.x1 + gutter, y0, values.x2 - values.x1 - gutter * 2, values.y - y0);
  } else if ((0, _isNumber2.default)(values.y1) && (0, _isNumber2.default)(values.y2)) {
    var x0 = props.xScale(0);
    path2D.rect(x0, values.y1 - gutter, values.x - x0, values.y2 - values.y1 + gutter * 2);
  } else if (props.yType === 'ordinal' || props.xType === 'ordinal') {
    // one of the axis is ordinal, so the width of the bar is calculated by the number of itens on
    // the domain
    if (props.xType === 'ordinal' || props.barOrientation === 'vertical') {
      var width = props.plotRect.width / props.xDomain.length;

      var _y = props.yScale(0);

      path2D.rect(values.x - width / 2 + gutter, _y, width - gutter * 2, values.y - _y);
    } else {
      var height = props.plotRect.height / props.yDomain.length;

      var _x = props.xScale(0);

      path2D.rect(_x, values.y - height / 2, values.x - _x, height - 2);
    }
  } else {
    // fallback for the previous cases, bar with constant width
    var _width = 10;

    if (props.barOrientation === 'horizontal') {
      var _x2 = props.xScale(0);

      path2D.rect(_x2, values.y - _width / 2, values.x - _x2, _width - 2);
    } else {
      var _y2 = props.yScale(0);

      path2D.rect(values.x - _width / 2, _y2, _width, values.y - _y2);
    }
  }

  return Object.assign({}, values, {
    path2D: path2D,
    type: 'area'
  });
}

function bars(props) {
  if (!props.xScale || !props.yScale) return undefined;
  return (0, _map2.default)((0, _flatten2.default)(props.data), function (datum, idx) {
    return getBarsRenderData(props, datum, idx);
  });
}