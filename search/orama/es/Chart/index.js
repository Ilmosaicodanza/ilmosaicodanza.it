import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import { THEME } from '../defaults';
import safeInvoke from '../utils/safeInvoke';
import chartTransformFlow from '../chartCore/chartTransformFlow';
import getLayers from '../chartCore/getLayers';
import getLocalKeys from '../chartCore/getLocalKeys';
import CanvasInput from '../CanvasInput';
import { getMemoizeDimArrays, getMemoizeDomains, getMemoizePlotRect, getMemoizeRanges, getMemoizeRenderLayers, getMemoizeScales, getMemoizeTickCounts, getMemoizeTypes } from '../chartCore/memoize';
import withComputedWidth from './withComputedWidth';
import Background from './Background';
import Layers from './Layers';

function getTheme(props) {
  var theme = Object.assign({}, THEME, props.theme);
  return {
    theme: theme
  };
}

var Chart =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Chart, _React$Component);

  function Chart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleUpdate = function (childProps) {
      var onUpdate = _this.props.onUpdate;
      safeInvoke(onUpdate, childProps);
    };

    _this.getDimArrays = getMemoizeDimArrays();
    _this.getTypes = getMemoizeTypes();
    _this.getDomains = getMemoizeDomains();
    _this.getPlotRect = getMemoizePlotRect();
    _this.getRanges = getMemoizeRanges();
    _this.getTickCounts = getMemoizeTickCounts();
    _this.getScales = getMemoizeScales();
    _this.getRenderLayers = getMemoizeRenderLayers();
    return _this;
  }

  var _proto = Chart.prototype;

  _proto.render = function render() {
    var rootProps = chartTransformFlow(this.props, getTheme, getLayers, getLocalKeys, this.getDimArrays, this.getTypes, this.getDomains, this.getPlotRect, this.getRanges, this.getTickCounts, this.getScales);
    var renderLayers = this.getRenderLayers(rootProps);
    var height = rootProps.height,
        theme = rootProps.theme,
        width = rootProps.width;
    var style = {
      background: theme.backgroundFill,
      color: theme.textFill,
      fontFamily: theme.fontFamily,
      height: height,
      position: 'relative',
      userSelect: 'none',
      width: width,
      willChange: 'transform'
    };
    return React.createElement("div", {
      style: style
    }, React.createElement(Background, rootProps), React.createElement(Layers, Object.assign({}, rootProps, {
      renderLayers: renderLayers
    })), React.createElement(CanvasInput, {
      onUpdate: this.handleUpdate,
      renderLayers: renderLayers,
      rootProps: rootProps,
      theme: theme
    }));
  };

  return Chart;
}(React.Component);

Chart.defaultProps = {
  backgroundShow: true,
  backgroundOffset: 15,
  margin: {},
  proportion: 0.5,
  xShowLabel: true,
  xShowTicks: true,
  yShowLabel: true,
  yShowTicks: true
};
Chart.propTypes = process.env.NODE_ENV !== "production" ? {
  backgroundShow: PropTypes.bool,
  backgroundOffset: PropTypes.number,
  height: PropTypes.number,
  margin: CustomPropTypes.margin,
  onUpdate: PropTypes.func,
  proportion: PropTypes.number,
  theme: CustomPropTypes.theme,
  width: PropTypes.number.isRequired,
  xShowLabel: PropTypes.bool,
  xShowTicks: PropTypes.bool,
  yShowLabel: PropTypes.bool,
  yShowTicks: PropTypes.bool
} : {};
export default withComputedWidth(Chart);