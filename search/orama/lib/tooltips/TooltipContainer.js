"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

var _isBrowser = _interopRequireDefault(require("../constants/isBrowser"));

var _Portal = _interopRequireDefault(require("./Portal"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _MeasuredContainer = _interopRequireDefault(require("./MeasuredContainer"));

// Copyright 2018 Kensho Technologies, LLC.
var TooltipContainer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TooltipContainer, _React$Component);

  function TooltipContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      hasEverMounted: false,
      height: null,
      width: null
    };

    _this.handleMeasure = function (height, width) {
      _this.setState(function (prevState) {
        if (height === prevState.height && width === prevState.width) return null;
        return {
          height: height,
          width: width
        };
      });
    };

    return _this;
  }

  TooltipContainer.getDerivedStateFromProps = function getDerivedStateFromProps(props) {
    return props.mouse && props.hoverData ? {
      hasEverMounted: true
    } : null;
  };

  var _proto = TooltipContainer.prototype;

  _proto.getTranslation = function getTranslation() {
    var _this$state = this.state,
        height = _this$state.height,
        width = _this$state.width;
    var _this$props = this.props,
        margin = _this$props.margin,
        mouse = _this$props.mouse;
    if (!width || !height) return undefined;
    var innerHeight = _isBrowser.default ? window.innerHeight : 1000;
    var innerWidth = _isBrowser.default ? window.innerWidth : 1000;
    var x;

    if (mouse.x + width + margin * 2 + 1 > innerWidth) {
      if (width + margin * 2 > mouse.x) x = margin;else x = mouse.x - width - margin;
    } else x = mouse.x + margin;

    var y;

    if (mouse.y + height + margin * 2 + 1 > innerHeight) {
      if (height + margin * 2 > mouse.y) y = margin;else y = mouse.y - height - margin;
    } else y = mouse.y + margin;

    return "translate(" + x + "px, " + y + "px)";
  };

  _proto.renderTooltip = function renderTooltip() {
    var _this$props2 = this.props,
        hoverData = _this$props2.hoverData,
        layerProps = _this$props2.layerProps,
        theme = _this$props2.theme;
    var _layerProps$Tooltip = layerProps.Tooltip,
        Tooltip = _layerProps$Tooltip === void 0 ? _Tooltip.default : _layerProps$Tooltip;
    var style = {
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 999999,
      transform: this.getTranslation()
    };
    return React.createElement("div", {
      style: style
    }, React.createElement(_MeasuredContainer.default, {
      onMeasure: this.handleMeasure
    }, React.createElement(Tooltip, {
      hoverData: hoverData,
      layerProps: layerProps,
      theme: theme
    })));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        hoverData = _this$props3.hoverData,
        mouse = _this$props3.mouse;
    var hasEverMounted = this.state.hasEverMounted; // only mount the Portal if we've ever needed to render the tooltip

    return hasEverMounted && React.createElement(_Portal.default, null, !!mouse && !!hoverData && this.renderTooltip());
  };

  return TooltipContainer;
}(React.Component);

exports.default = TooltipContainer;
TooltipContainer.defaultProps = {
  margin: 15
};
TooltipContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  hoverData: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  layerProps: _propTypes.default.object,
  // eslint-disable-line react/forbid-prop-types
  margin: _propTypes.default.number,
  mouse: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  theme: CustomPropTypes.theme
} : {};