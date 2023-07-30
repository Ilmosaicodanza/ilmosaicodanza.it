"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

var _scaleRatio = _interopRequireDefault(require("../constants/scaleRatio"));

// Copyright 2018 Kensho Technologies, LLC.
var Canvas =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Canvas, _React$Component);

  function Canvas() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.canvasRef = React.createRef();
    return _this;
  }

  var _proto = Canvas.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.handleUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.handleUpdate();
  };

  _proto.handleUpdate = function handleUpdate() {
    if (!this.canvasRef.current) return;
    var render = this.props.render;
    var ctx = this.canvasRef.current.getContext('2d');
    ctx.save();
    ctx.scale(_scaleRatio.default, _scaleRatio.default);
    render(this.props, ctx);
    ctx.restore();
  };

  _proto.render = function render() {
    var _this$props = this.props,
        height = _this$props.height,
        width = _this$props.width;
    var style = {
      display: 'block',
      position: 'absolute',
      height: height,
      width: width
    };
    return React.createElement("canvas", {
      height: height * _scaleRatio.default,
      ref: this.canvasRef,
      style: style,
      width: width * _scaleRatio.default
    });
  };

  return Canvas;
}(React.Component);

exports.default = Canvas;
Canvas.propTypes = process.env.NODE_ENV !== "production" ? {
  clip: _propTypes.default.bool,
  height: _propTypes.default.number.isRequired,
  plotRect: CustomPropTypes.plotRect,
  render: _propTypes.default.func.isRequired,
  renderData: _propTypes.default.array,
  // eslint-disable-line react/forbid-prop-types
  renderLayers: _propTypes.default.arrayOf(_propTypes.default.object),
  theme: CustomPropTypes.theme.isRequired,
  width: _propTypes.default.number.isRequired
} : {};