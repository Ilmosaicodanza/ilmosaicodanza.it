import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
// Copyright 2018 Kensho Technologies, LLC.
import * as React from 'react';
import PropTypes from 'prop-types';
import * as CustomPropTypes from '../CustomPropTypes';
import Canvas from '../canvas/Canvas';
import hoverRender from '../canvas/hoverRender';
import TooltipContainer from '../tooltips/TooltipContainer';
import getDataUnderMouse from './getDataUnderMouse';
import runHoverSolverOn from './runHoverSolverOn';
export function getMouseFromEvent(event) {
  var _ref = event.touches ? event.touches[0] : event,
      clientX = _ref.clientX,
      clientY = _ref.clientY;

  return {
    x: clientX,
    y: clientY
  };
}
/*
Usually used inside of <ChartRender />
Get hovered and clicked data on renderData using a <canvas /> element
*/

var CanvasInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CanvasInput, _React$Component);

  function CanvasInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.canvasRef = React.createRef();
    _this.state = {
      mouse: null,
      hoverRenderData: null,
      hoverData: null,
      layerProps: null,
      mouseLeave: false
    };

    _this.handleClick = function (event) {
      var _this$props = _this.props,
          onUpdate = _this$props.onUpdate,
          rootProps = _this$props.rootProps;
      var mouseDrag = _this.state.mouseDrag;
      event.stopPropagation();
      event.preventDefault();

      if (!mouseDrag) {
        var mouse = getMouseFromEvent(event);
        var solvedData = runHoverSolverOn(getDataUnderMouse(_this.props, mouse, _this.canvasRef.current));
        onUpdate(Object.assign({
          action: 'mouseClick',
          mouse: mouse
        }, solvedData, {
          rootProps: rootProps
        }));
      }

      _this.setState({
        mouseDrag: false
      });
    };

    _this.handleDoubleClick = function () {
      var onUpdate = _this.props.onUpdate;
      onUpdate({
        action: 'mouseDoubleClick'
      });
    };

    _this.handleMouseDown = function (event) {
      var _this$props2 = _this.props,
          onUpdate = _this$props2.onUpdate,
          rootProps = _this$props2.rootProps;
      var mouse = getMouseFromEvent(event);
      var solvedData = runHoverSolverOn(getDataUnderMouse(_this.props, mouse, _this.canvasRef.current));
      onUpdate(Object.assign({
        action: 'mouseDown',
        mouse: mouse
      }, solvedData, {
        rootProps: rootProps
      }));

      _this.setState({
        mouseDown: true,
        mouse: mouse,
        hoverRenderData: solvedData.hoverRenderData,
        hoverData: solvedData.hoverData,
        layerProps: solvedData.layerProps
      });
    };

    _this.handleMouseMove = function (event) {
      var mouse = getMouseFromEvent(event);
      var solvedData = runHoverSolverOn(getDataUnderMouse(_this.props, mouse, _this.canvasRef.current));

      _this.setState(function (prevState) {
        var mouseDelta = prevState.mouse ? {
          x: prevState.mouse.x - mouse.x,
          y: prevState.mouse.y - mouse.y
        } : {
          x: 0,
          y: 0
        };
        return {
          mouseDrag: !!prevState.mouseDown,
          mouse: mouse,
          mouseDelta: mouseDelta,
          hoverRenderData: solvedData.hoverRenderData,
          hoverData: solvedData.hoverData,
          layerProps: solvedData.layerProps,
          mouseLeave: false
        };
      }, function () {
        var _this$props3 = _this.props,
            onUpdate = _this$props3.onUpdate,
            rootProps = _this$props3.rootProps;
        var _this$state = _this.state,
            mouseDrag = _this$state.mouseDrag,
            mouseDelta = _this$state.mouseDelta;
        onUpdate(Object.assign({
          action: mouseDrag ? 'mouseDrag' : 'mouseMove',
          mouse: mouse,
          mouseDelta: mouseDelta
        }, solvedData, {
          rootProps: rootProps
        }));
      });
    };

    _this.handleMouseUp = function (event) {
      var _this$props4 = _this.props,
          onUpdate = _this$props4.onUpdate,
          rootProps = _this$props4.rootProps;
      event.stopPropagation();
      event.preventDefault();
      var mouse = getMouseFromEvent(event);
      var solvedData = runHoverSolverOn(getDataUnderMouse(_this.props, mouse, _this.canvasRef.current, event));
      onUpdate(Object.assign({
        action: 'mouseUp',
        mouse: mouse
      }, solvedData, {
        rootProps: rootProps
      }));

      _this.setState({
        mouseDrag: false,
        mouseDown: false
      });
    };

    _this.handleMouseLeave = function () {
      var onUpdate = _this.props.onUpdate;
      onUpdate({
        action: 'mouseLeave'
      });

      _this.setState({
        hoverRenderData: null,
        hoverData: null,
        layerProps: null,
        mouseLeave: true
      });
    };

    return _this;
  }

  var _proto = CanvasInput.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    this.setState(function (prevState) {
      if (!prevState.mouse || prevState.mouseLeave) return null;
      var solvedData = runHoverSolverOn(getDataUnderMouse(nextProps, prevState.mouse, _this2.canvasRef.current));
      return Object.assign({}, solvedData);
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var mouseDrag = this.state.mouseDrag;

    if (mouseDrag && !prevState.mouseDrag) {
      document.addEventListener('mouseup', this.handleMouseUp);
    } else if (!mouseDrag && prevState.mouseDrag) {
      document.removeEventListener('mouseup', this.handleMouseUp);
    }
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        rootProps = _this$props5.rootProps,
        theme = _this$props5.theme;
    var _this$state2 = this.state,
        hoverRenderData = _this$state2.hoverRenderData,
        hoverData = _this$state2.hoverData,
        layerProps = _this$state2.layerProps,
        mouse = _this$state2.mouse;
    return React.createElement(React.Fragment, null, React.createElement(Canvas, Object.assign({}, rootProps, {
      clip: true,
      render: hoverRender,
      renderData: hoverRenderData
    })), React.createElement("canvas", {
      height: rootProps.height,
      onClick: this.handleClick,
      onDoubleClick: this.handleDoubleClick,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      onTouchEnd: this.handleMouseLeave,
      onTouchMove: this.handleMouseMove,
      onTouchStart: this.handleMouseDown,
      ref: this.canvasRef,
      style: {
        cursor: 'pointer',
        display: 'block',
        position: 'absolute',
        userSelect: 'none',
        width: rootProps.width,
        height: rootProps.height
      },
      width: rootProps.width
    }), React.createElement(TooltipContainer, {
      hoverData: hoverData,
      layerProps: layerProps,
      mouse: mouse,
      theme: theme
    }));
  };

  return CanvasInput;
}(React.Component);

CanvasInput.defaultProps = {
  renderLayers: []
};
export { CanvasInput as default };
CanvasInput.propTypes = process.env.NODE_ENV !== "production" ? {
  onUpdate: PropTypes.func.isRequired,
  renderLayers: PropTypes.arrayOf(PropTypes.object),
  rootProps: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  theme: CustomPropTypes.theme
} : {};