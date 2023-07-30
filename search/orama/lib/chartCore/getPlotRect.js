"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getMaxTextWidth = getMaxTextWidth;
exports.default = getPlotRect;

var _sum2 = _interopRequireDefault(require("lodash/sum"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _withCachedContext = _interopRequireDefault(require("../utils/withCachedContext"));

var _marginInset = _interopRequireDefault(require("../utils/rect/marginInset"));

var _getRange = _interopRequireDefault(require("./getRange"));

var _getTicks = _interopRequireDefault(require("./getTicks"));

var _getTickCount = _interopRequireDefault(require("./getTickCount"));

/*
`addPlotRect` calculate and assign the plotRect to a new props.
props.size gets insetted by props.margin to generate the plotRect.
when props.margin is not defined (or only partially defined), addPlotRect smartly calculates the margins, by taking into consideration axis label, ticks width and backgroundOffset.

@example
addPlotRect({size})
returns {size, plotRect}
*/
// get the maximum width of the strings contained in `ticks`
// uses a offscreen canvas for doing the measure and takes into consideration the theme object
function getMaxTextWidth(theme, ticks) {
  return (0, _withCachedContext.default)(function (ctx) {
    if (!ctx) return Math.max.apply(Math, ticks.map(function (d) {
      return d.text.length;
    }));
    ctx.font = theme.axisTickFontSize + "px " + theme.fontFamilyMono;
    return Math.max.apply(Math, ticks.map(function (d) {
      return ctx.measureText(d.text).width;
    }));
  });
}

function getTopMargin(props) {
  var backgroundOffset = props.backgroundOffset,
      margin = props.margin,
      theme = props.theme,
      y = props.y,
      yShowTicks = props.yShowTicks;
  if (margin.top !== undefined) return margin.top + backgroundOffset;
  if (yShowTicks === false || !y) return backgroundOffset;
  return Math.max(backgroundOffset, theme.axisTickFontSize / 2);
}

function getBottomMargin(props) {
  var theme = props.theme;
  var backgroundOffset = props.backgroundOffset,
      groupedKeys = props.groupedKeys,
      margin = props.margin,
      xShowTicks = props.xShowTicks,
      xShowLabel = props.xShowLabel,
      _props$xTickOffset = props.xTickOffset,
      xTickOffset = _props$xTickOffset === void 0 ? theme.axisTickFontSize * (theme.lineHeight - 0.75) : _props$xTickOffset,
      _props$xLabelOffset = props.xLabelOffset,
      xLabelOffset = _props$xLabelOffset === void 0 ? theme.axisLabelFontSize * (theme.lineHeight - 0.75) : _props$xLabelOffset;
  if (margin.bottom !== undefined) return margin.bottom + backgroundOffset;
  if (!(0, _includes2.default)(groupedKeys, 'x')) return backgroundOffset;
  return (0, _sum2.default)([backgroundOffset, xShowTicks ? xTickOffset + theme.axisTickFontSize : 0, xShowLabel ? xLabelOffset + theme.axisLabelFontSize : 0]);
}

function getLeftMargin(props) {
  var theme = props.theme;
  var backgroundOffset = props.backgroundOffset,
      groupedKeys = props.groupedKeys,
      margin = props.margin,
      yShowTicks = props.yShowTicks,
      yShowLabel = props.yShowLabel,
      _props$yTickOffset = props.yTickOffset,
      yTickOffset = _props$yTickOffset === void 0 ? theme.axisTickFontSize * (theme.lineHeight - 0.75) : _props$yTickOffset,
      _props$yLabelOffset = props.yLabelOffset,
      yLabelOffset = _props$yLabelOffset === void 0 ? theme.axisLabelFontSize * (theme.lineHeight - 0.75) : _props$yLabelOffset;
  if (margin.left !== undefined) return margin.left + backgroundOffset;
  if (!(0, _includes2.default)(groupedKeys, 'y')) return backgroundOffset;

  if (!yShowTicks) {
    return (0, _sum2.default)([backgroundOffset, yShowLabel ? yLabelOffset + theme.axisLabelFontSize : 0]);
  }

  var yRange = props.yRange || (0, _getRange.default)(props, 'y');
  var yTickCount = props.yTickCount || (0, _getTickCount.default)(Object.assign({}, props, {
    yRange: yRange
  }), 'y');
  var yTicks = props.yTicks || (0, _getTicks.default)(Object.assign({}, props, {
    yTickCount: yTickCount
  }), 'y');
  var yMaxTickWidth = getMaxTextWidth(theme, yTicks);
  return (0, _sum2.default)([backgroundOffset, yMaxTickWidth, yShowTicks ? yTickOffset : 0, yShowLabel ? yLabelOffset + 5 + theme.axisLabelFontSize : 0]);
}

function getRightMargin(props) {
  var backgroundOffset = props.backgroundOffset,
      margin = props.margin,
      x = props.x,
      xShowTicks = props.xShowTicks;
  if (margin.right !== undefined) return margin.right + backgroundOffset;
  if (!x || !xShowTicks) return backgroundOffset;
  return backgroundOffset;
}

function getPlotRect(props) {
  if (props.plotRect) return props;
  var backgroundOffset = props.backgroundOffset,
      groupedKeys = props.groupedKeys,
      width = props.width,
      _props$height = props.height,
      height = _props$height === void 0 ? props.width * props.proportion : _props$height;
  var top = getTopMargin(props);
  var bottom = getBottomMargin(props);
  var partialPlotRect = (0, _marginInset.default)({
    bottom: bottom,
    top: top
  }, {
    width: width,
    height: height
  });
  var left = getLeftMargin(Object.assign({}, props, {
    plotRect: partialPlotRect
  }));
  partialPlotRect = (0, _marginInset.default)({
    bottom: bottom,
    top: top,
    left: left
  }, {
    width: width,
    height: height
  });
  var right = getRightMargin(Object.assign({}, props, {
    plotRect: partialPlotRect
  }));
  var margin = {
    left: left,
    bottom: bottom,
    top: top,
    right: right
  };
  var newWidth = width;
  var newHeight = height;
  var plotRect = (0, _marginInset.default)(margin, {
    width: width,
    height: height
  });

  if (!(0, _includes2.default)(groupedKeys, 'x')) {
    newWidth -= plotRect.width;
    plotRect.width = 0;
  }

  if (!(0, _includes2.default)(groupedKeys, 'y')) {
    newHeight -= plotRect.height;
    plotRect.height = 0;
  }

  if (plotRect.height < 0) {
    plotRect.height = 0;
    newHeight = top + bottom;
  }

  if (plotRect.width < 0) {
    plotRect.width = 0;
    newWidth = left + right;
  }

  return {
    backgroundOffset: backgroundOffset,
    margin: margin,
    plotRect: plotRect,
    width: newWidth,
    height: newHeight
  };
}