"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _sum2 = _interopRequireDefault(require("lodash/sum"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _findLast2 = _interopRequireDefault(require("lodash/findLast"));

var _compact2 = _interopRequireDefault(require("lodash/compact"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _getTicks = _interopRequireDefault(require("../chartCore/getTicks"));

var _inset2 = _interopRequireDefault(require("../utils/rect/inset"));

var _Canvas = _interopRequireDefault(require("../canvas/Canvas"));

var _basicRender = _interopRequireDefault(require("../canvas/basicRender"));

var _LabelBottom = _interopRequireDefault(require("./LabelBottom"));

var _LabelLeft = _interopRequireDefault(require("./LabelLeft"));

// Copyright 2018 Kensho Technologies, LLC.
var Background =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Background, _React$Component);

  function Background() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Background.prototype;

  _proto.getBackground = function getBackground() {
    var _this$props = this.props,
        backgroundShow = _this$props.backgroundShow,
        backgroundOffset = _this$props.backgroundOffset,
        plotRect = _this$props.plotRect,
        theme = _this$props.theme;
    if (!backgroundShow) return undefined;

    var _inset = (0, _inset2.default)(-backgroundOffset, plotRect),
        height = _inset.height,
        width = _inset.width,
        x = _inset.x,
        y = _inset.y;

    var path2D = (0, _getPath2D.default)();
    path2D.rect(x, y, width, height);
    return {
      fill: theme.plotBackgroundFill,
      path2D: path2D,
      stroke: 'transparent',
      type: 'area'
    };
  };

  _proto.getXGuides = function getXGuides(xTicks, thick) {
    var _this$props2 = this.props,
        backgroundOffset = _this$props2.backgroundOffset,
        groupedKeys = _this$props2.groupedKeys,
        plotRect = _this$props2.plotRect,
        theme = _this$props2.theme,
        xScale = _this$props2.xScale,
        xShowGuides = _this$props2.xShowGuides;
    if (!(0, _includes2.default)(groupedKeys, 'x')) return undefined;
    if (xShowGuides === false) return undefined;
    return (0, _map2.default)(xTicks, function (d) {
      var path2D = (0, _getPath2D.default)();
      var x = xScale(d.value);
      path2D.moveTo(x, plotRect.y - backgroundOffset);
      path2D.lineTo(x, plotRect.y + plotRect.height + backgroundOffset);
      return {
        path2D: path2D,
        type: 'line',
        lineWidth: thick ? theme.guideZeroLineWidth : theme.guideLineWidth,
        stroke: thick ? theme.guideZeroStroke : theme.guideStroke
      };
    });
  };

  _proto.getYGuides = function getYGuides(yTicks, thick) {
    var _this$props3 = this.props,
        backgroundOffset = _this$props3.backgroundOffset,
        groupedKeys = _this$props3.groupedKeys,
        plotRect = _this$props3.plotRect,
        theme = _this$props3.theme,
        yScale = _this$props3.yScale,
        yShowGuides = _this$props3.yShowGuides;
    if (!(0, _includes2.default)(groupedKeys, 'y')) return undefined;
    if (yShowGuides === false) return undefined;
    return (0, _map2.default)(yTicks, function (d) {
      var path2D = (0, _getPath2D.default)();
      var y = yScale(d.value);
      path2D.moveTo(plotRect.x - backgroundOffset, y);
      path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y);
      return {
        path2D: path2D,
        type: 'line',
        lineWidth: thick ? theme.guideZeroLineWidth : theme.guideLineWidth,
        stroke: thick ? theme.guideZeroStroke : theme.guideStroke
      };
    });
  };

  _proto.getXText = function getXText(xTicks) {
    var _this$props4 = this.props,
        groupedKeys = _this$props4.groupedKeys,
        theme = _this$props4.theme,
        xShowTicks = _this$props4.xShowTicks;
    if (!(0, _includes2.default)(groupedKeys, 'x')) return undefined;
    if (xShowTicks === false) return undefined;
    var defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1);
    var _this$props5 = this.props,
        backgroundOffset = _this$props5.backgroundOffset,
        plotRect = _this$props5.plotRect,
        xScale = _this$props5.xScale,
        _this$props5$xTickOff = _this$props5.xTickOffset,
        xTickOffset = _this$props5$xTickOff === void 0 ? defaultOffset : _this$props5$xTickOff;
    return (0, _map2.default)(xTicks, function (d) {
      return {
        type: 'text',
        text: d.text,
        x: xScale(d.value),
        y: (0, _sum2.default)([backgroundOffset, plotRect.y, plotRect.height, xTickOffset]),
        textBaseline: 'top',
        textAlign: 'center',
        font: theme.axisTickFontSize + "px " + theme.fontFamilyMono
      };
    });
  };

  _proto.getYText = function getYText(yTicks) {
    var _this$props6 = this.props,
        groupedKeys = _this$props6.groupedKeys,
        theme = _this$props6.theme,
        yShowTicks = _this$props6.yShowTicks;
    if (!(0, _includes2.default)(groupedKeys, 'y')) return undefined;
    if (yShowTicks === false) return undefined;
    var defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1);
    var _this$props7 = this.props,
        backgroundOffset = _this$props7.backgroundOffset,
        plotRect = _this$props7.plotRect,
        yScale = _this$props7.yScale,
        _this$props7$yTickOff = _this$props7.yTickOffset,
        yTickOffset = _this$props7$yTickOff === void 0 ? defaultOffset : _this$props7$yTickOff;
    return (0, _map2.default)(yTicks, function (d) {
      return {
        type: 'text',
        text: d.text,
        x: (0, _sum2.default)([plotRect.x, -backgroundOffset, -yTickOffset]),
        y: yScale(d.value),
        textAlign: 'right',
        textBaseline: 'middle',
        fill: theme.textFill,
        font: theme.axisTickFontSize + "px " + theme.fontFamilyMono
      };
    });
  };

  _proto.getBackgroundRenderData = function getBackgroundRenderData() {
    var _this$props8 = this.props,
        xTicks = _this$props8.xTicks,
        yTicks = _this$props8.yTicks;
    var background = this.getBackground();
    var computedXTicks = xTicks || (0, _getTicks.default)(this.props, 'x');
    var computedYTicks = yTicks || (0, _getTicks.default)(this.props, 'y');
    var xGuides = this.getXGuides(computedXTicks);
    var yGuides = this.getYGuides(computedYTicks);
    var xText = this.getXText(computedXTicks);
    var yText = this.getYText(computedYTicks);
    var thickXGuide = this.getXGuides((0, _filter2.default)(computedXTicks, function (d) {
      return d.value === 0;
    }), true);
    var thickYGuide = this.getYGuides((0, _filter2.default)(computedYTicks, function (d) {
      return d.value === 0;
    }), true);
    return (0, _flatten2.default)((0, _compact2.default)([background, xGuides, yGuides, thickXGuide, thickYGuide, xText, yText]));
  };

  _proto.getLabelText = function getLabelText(key) {
    var layers = this.props.layers;
    var keyName = key + "Name"; // eslint-disable-next-line react/destructuring-assignment

    var text = this.props[keyName] || this.props[key];
    if (text) return text;
    var layer = (0, _findLast2.default)(layers, function (d) {
      return d[keyName] || d[key];
    });
    if (layer) return layer[keyName] || layer[key];
    return undefined;
  };

  _proto.render = function render() {
    var _this$props9 = this.props,
        height = _this$props9.height,
        plotRect = _this$props9.plotRect,
        theme = _this$props9.theme,
        width = _this$props9.width,
        xShowLabel = _this$props9.xShowLabel,
        yShowLabel = _this$props9.yShowLabel;
    return React.createElement(React.Fragment, null, React.createElement(_Canvas.default, {
      height: height,
      plotRect: plotRect,
      render: _basicRender.default,
      renderData: this.getBackgroundRenderData(),
      theme: theme,
      width: width
    }), yShowLabel && React.createElement(_LabelLeft.default, {
      plotRect: plotRect,
      text: this.getLabelText('y'),
      theme: theme
    }), xShowLabel && React.createElement(_LabelBottom.default, {
      plotRect: plotRect,
      text: this.getLabelText('x'),
      theme: theme
    }));
  };

  return Background;
}(React.Component);

exports.default = Background;
Background.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundShow: _propTypes.default.bool.isRequired,
  backgroundOffset: _propTypes.default.number.isRequired,
  groupedKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  height: _propTypes.default.number,
  layers: _propTypes.default.arrayOf(_propTypes.default.object),
  plotRect: CustomPropTypes.plotRect.isRequired,
  theme: CustomPropTypes.theme.isRequired,
  width: _propTypes.default.number,
  x: _propTypes.default.string,
  xName: _propTypes.default.string,
  xScale: _propTypes.default.func,
  xShowGuides: _propTypes.default.bool,
  xShowLabel: _propTypes.default.bool.isRequired,
  xShowTicks: _propTypes.default.bool,
  xTicks: _propTypes.default.arrayOf(_propTypes.default.object),
  xTickOffset: _propTypes.default.number,
  y: _propTypes.default.string,
  yName: _propTypes.default.string,
  yScale: _propTypes.default.func,
  yShowGuides: _propTypes.default.bool,
  yShowLabel: _propTypes.default.bool.isRequired,
  yShowTicks: _propTypes.default.bool,
  yTicks: _propTypes.default.arrayOf(_propTypes.default.object),
  yTickOffset: _propTypes.default.number
} : {};