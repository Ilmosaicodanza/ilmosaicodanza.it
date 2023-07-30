import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _sum from "lodash/sum";
import _map from "lodash/map";
import _includes from "lodash/includes";
import _flatten from "lodash/flatten";
import _filter from "lodash/filter";
import _findLast from "lodash/findLast";
import _compact from "lodash/compact";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import getPath2D from '../utils/getPath2D';
import getTicks from '../chartCore/getTicks';
import inset from '../utils/rect/inset';
import Canvas from '../canvas/Canvas';
import basicRender from '../canvas/basicRender';
import LabelBottom from './LabelBottom';
import LabelLeft from './LabelLeft';

var Background =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Background, _React$Component);

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

    var _inset = inset(-backgroundOffset, plotRect),
        height = _inset.height,
        width = _inset.width,
        x = _inset.x,
        y = _inset.y;

    var path2D = getPath2D();
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
    if (!_includes(groupedKeys, 'x')) return undefined;
    if (xShowGuides === false) return undefined;
    return _map(xTicks, function (d) {
      var path2D = getPath2D();
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
    if (!_includes(groupedKeys, 'y')) return undefined;
    if (yShowGuides === false) return undefined;
    return _map(yTicks, function (d) {
      var path2D = getPath2D();
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
    if (!_includes(groupedKeys, 'x')) return undefined;
    if (xShowTicks === false) return undefined;
    var defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1);
    var _this$props5 = this.props,
        backgroundOffset = _this$props5.backgroundOffset,
        plotRect = _this$props5.plotRect,
        xScale = _this$props5.xScale,
        _this$props5$xTickOff = _this$props5.xTickOffset,
        xTickOffset = _this$props5$xTickOff === void 0 ? defaultOffset : _this$props5$xTickOff;
    return _map(xTicks, function (d) {
      return {
        type: 'text',
        text: d.text,
        x: xScale(d.value),
        y: _sum([backgroundOffset, plotRect.y, plotRect.height, xTickOffset]),
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
    if (!_includes(groupedKeys, 'y')) return undefined;
    if (yShowTicks === false) return undefined;
    var defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1);
    var _this$props7 = this.props,
        backgroundOffset = _this$props7.backgroundOffset,
        plotRect = _this$props7.plotRect,
        yScale = _this$props7.yScale,
        _this$props7$yTickOff = _this$props7.yTickOffset,
        yTickOffset = _this$props7$yTickOff === void 0 ? defaultOffset : _this$props7$yTickOff;
    return _map(yTicks, function (d) {
      return {
        type: 'text',
        text: d.text,
        x: _sum([plotRect.x, -backgroundOffset, -yTickOffset]),
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
    var computedXTicks = xTicks || getTicks(this.props, 'x');
    var computedYTicks = yTicks || getTicks(this.props, 'y');
    var xGuides = this.getXGuides(computedXTicks);
    var yGuides = this.getYGuides(computedYTicks);
    var xText = this.getXText(computedXTicks);
    var yText = this.getYText(computedYTicks);
    var thickXGuide = this.getXGuides(_filter(computedXTicks, function (d) {
      return d.value === 0;
    }), true);
    var thickYGuide = this.getYGuides(_filter(computedYTicks, function (d) {
      return d.value === 0;
    }), true);
    return _flatten(_compact([background, xGuides, yGuides, thickXGuide, thickYGuide, xText, yText]));
  };

  _proto.getLabelText = function getLabelText(key) {
    var layers = this.props.layers;
    var keyName = key + "Name"; // eslint-disable-next-line react/destructuring-assignment

    var text = this.props[keyName] || this.props[key];
    if (text) return text;

    var layer = _findLast(layers, function (d) {
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
    return React.createElement(React.Fragment, null, React.createElement(Canvas, {
      height: height,
      plotRect: plotRect,
      render: basicRender,
      renderData: this.getBackgroundRenderData(),
      theme: theme,
      width: width
    }), yShowLabel && React.createElement(LabelLeft, {
      plotRect: plotRect,
      text: this.getLabelText('y'),
      theme: theme
    }), xShowLabel && React.createElement(LabelBottom, {
      plotRect: plotRect,
      text: this.getLabelText('x'),
      theme: theme
    }));
  };

  return Background;
}(React.Component);

export { Background as default };
Background.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundShow: PropTypes.bool.isRequired,
  backgroundOffset: PropTypes.number.isRequired,
  groupedKeys: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
  layers: PropTypes.arrayOf(PropTypes.object),
  plotRect: CustomPropTypes.plotRect.isRequired,
  theme: CustomPropTypes.theme.isRequired,
  width: PropTypes.number,
  x: PropTypes.string,
  xName: PropTypes.string,
  xScale: PropTypes.func,
  xShowGuides: PropTypes.bool,
  xShowLabel: PropTypes.bool.isRequired,
  xShowTicks: PropTypes.bool,
  xTicks: PropTypes.arrayOf(PropTypes.object),
  xTickOffset: PropTypes.number,
  y: PropTypes.string,
  yName: PropTypes.string,
  yScale: PropTypes.func,
  yShowGuides: PropTypes.bool,
  yShowLabel: PropTypes.bool.isRequired,
  yShowTicks: PropTypes.bool,
  yTicks: PropTypes.arrayOf(PropTypes.object),
  yTickOffset: PropTypes.number
} : {};