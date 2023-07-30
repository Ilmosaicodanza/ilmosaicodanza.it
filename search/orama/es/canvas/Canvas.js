import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import scaleRatio from '../constants/scaleRatio';

var Canvas =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Canvas, _React$Component);

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
    ctx.scale(scaleRatio, scaleRatio);
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
      height: height * scaleRatio,
      ref: this.canvasRef,
      style: style,
      width: width * scaleRatio
    });
  };

  return Canvas;
}(React.Component);

export { Canvas as default };
Canvas.propTypes = process.env.NODE_ENV !== "production" ? {
  clip: PropTypes.bool,
  height: PropTypes.number.isRequired,
  plotRect: CustomPropTypes.plotRect,
  render: PropTypes.func.isRequired,
  renderData: PropTypes.array,
  // eslint-disable-line react/forbid-prop-types
  renderLayers: PropTypes.arrayOf(PropTypes.object),
  theme: CustomPropTypes.theme.isRequired,
  width: PropTypes.number.isRequired
} : {};