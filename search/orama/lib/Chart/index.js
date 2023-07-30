"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

var _defaults = require("../defaults");

var _safeInvoke = _interopRequireDefault(require("../utils/safeInvoke"));

var _chartTransformFlow = _interopRequireDefault(require("../chartCore/chartTransformFlow"));

var _getLayers = _interopRequireDefault(require("../chartCore/getLayers"));

var _getLocalKeys = _interopRequireDefault(require("../chartCore/getLocalKeys"));

var _CanvasInput = _interopRequireDefault(require("../CanvasInput"));

var _memoize = require("../chartCore/memoize");

var _withComputedWidth = _interopRequireDefault(require("./withComputedWidth"));

var _Background = _interopRequireDefault(require("./Background"));

var _Layers = _interopRequireDefault(require("./Layers"));

// Copyright 2018 Kensho Technologies, LLC.
function getTheme(props) {
  var theme = Object.assign({}, _defaults.THEME, props.theme);
  return {
    theme: theme
  };
}

var Chart =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Chart, _React$Component);

  function Chart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleUpdate = function (childProps) {
      var onUpdate = _this.props.onUpdate;
      (0, _safeInvoke.default)(onUpdate, childProps);
    };

    _this.getDimArrays = (0, _memoize.getMemoizeDimArrays)();
    _this.getTypes = (0, _memoize.getMemoizeTypes)();
    _this.getDomains = (0, _memoize.getMemoizeDomains)();
    _this.getPlotRect = (0, _memoize.getMemoizePlotRect)();
    _this.getRanges = (0, _memoize.getMemoizeRanges)();
    _this.getTickCounts = (0, _memoize.getMemoizeTickCounts)();
    _this.getScales = (0, _memoize.getMemoizeScales)();
    _this.getRenderLayers = (0, _memoize.getMemoizeRenderLayers)();
    return _this;
  }

  var _proto = Chart.prototype;

  _proto.render = function render() {
    var rootProps = (0, _chartTransformFlow.default)(this.props, getTheme, _getLayers.default, _getLocalKeys.default, this.getDimArrays, this.getTypes, this.getDomains, this.getPlotRect, this.getRanges, this.getTickCounts, this.getScales);
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
    }, React.createElement(_Background.default, rootProps), React.createElement(_Layers.default, Object.assign({}, rootProps, {
      renderLayers: renderLayers
    })), React.createElement(_CanvasInput.default, {
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
  backgroundShow: _propTypes.default.bool,
  backgroundOffset: _propTypes.default.number,
  height: _propTypes.default.number,
  margin: CustomPropTypes.margin,
  onUpdate: _propTypes.default.func,
  proportion: _propTypes.default.number,
  theme: CustomPropTypes.theme,
  width: _propTypes.default.number.isRequired,
  xShowLabel: _propTypes.default.bool,
  xShowTicks: _propTypes.default.bool,
  yShowLabel: _propTypes.default.bool,
  yShowTicks: _propTypes.default.bool
} : {};

var _default = (0, _withComputedWidth.default)(Chart);

exports.default = _default;