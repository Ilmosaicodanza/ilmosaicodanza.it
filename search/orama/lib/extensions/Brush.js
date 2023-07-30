"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Brushes = _interopRequireDefault(require("../layers/Brushes"));

// Copyright 2018 Kensho Technologies, LLC.
var BRUSH_ELEMENT_NAMES = new Set(['brushesCenter', 'brushesLeft', 'brushesRight', 'brushesTop', 'brushesBottom', 'brushesLeftTop', 'brushesRightTop', 'brushesRightBottom', 'brushesLeftBottom']);

function isOutOfBounds(bounds, plotRect) {
  return bounds.x1 < plotRect.x || bounds.x2 > plotRect.x + plotRect.width || bounds.y1 < plotRect.y || bounds.y2 > plotRect.y + plotRect.height;
}

function reorder(bounds) {
  var x1 = bounds.x1,
      x2 = bounds.x2,
      y1 = bounds.y1,
      y2 = bounds.y2;
  return {
    x1: Math.min(x1, x2),
    x2: Math.max(x1, x2),
    y1: Math.min(y1, y2),
    y2: Math.max(y1, y2)
  };
}

function constrainToPlotRect(bounds, plotRect) {
  var height = plotRect.height,
      width = plotRect.width,
      x = plotRect.x,
      y = plotRect.y;
  var x1 = bounds.x1,
      x2 = bounds.x2,
      y1 = bounds.y1,
      y2 = bounds.y2;
  return {
    x1: Math.max(x1, x),
    x2: Math.min(x2, x + width),
    y1: Math.max(y1, y),
    y2: Math.min(y2, y + height)
  };
}

function domainToBounds(rootProps, xDomain, yDomain) {
  var xScale = rootProps.xScale,
      yScale = rootProps.yScale;
  var x1 = xDomain[0],
      x2 = xDomain[1];
  var y1 = yDomain[0],
      y2 = yDomain[1];
  return {
    x1: xScale(x1),
    x2: xScale(x2),
    y1: yScale(y1),
    y2: yScale(y2)
  };
}

function boundsToDomain(bounds, xScale, yScale) {
  var x1 = bounds.x1,
      x2 = bounds.x2,
      y1 = bounds.y1,
      y2 = bounds.y2;
  return {
    xDomain: [xScale.invert(x1), xScale.invert(x2)],
    yDomain: [yScale.invert(y1), yScale.invert(y2)]
  };
}

var Brush =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Brush, _React$Component);

  function Brush() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {};

    _this.handleUpdate = function (childProps) {
      if (childProps.action === 'mouseDown') _this.handleMouseDown(childProps);else if (childProps.action === 'mouseDrag') _this.handleMouseDrag(childProps);
    };

    return _this;
  }

  var _proto = Brush.prototype;

  _proto.handleMouseDown = function handleMouseDown(childProps) {
    var localMouse = childProps.localMouse,
        renderDatum = childProps.renderDatum,
        rootProps = childProps.rootProps;
    var _this$props = this.props,
        onUpdate = _this$props.onUpdate,
        xDomain = _this$props.xDomain,
        yDomain = _this$props.yDomain;
    var brushElementName = renderDatum && renderDatum.name;

    if (BRUSH_ELEMENT_NAMES.has(brushElementName)) {
      var bounds = domainToBounds(rootProps, xDomain, yDomain);
      this.setState({
        bounds: bounds,
        brushElementName: brushElementName
      });
    } else {
      var _bounds = {
        x1: localMouse.x,
        y1: localMouse.y
      };
      this.setState({
        bounds: _bounds,
        brushElementName: brushElementName
      });
      onUpdate({
        xDomain: undefined,
        yDomain: undefined
      });
    }
  };

  _proto.handleMouseDrag = function handleMouseDrag(childProps) {
    var localMouse = childProps.localMouse,
        mouseDelta = childProps.mouseDelta,
        rootProps = childProps.rootProps;
    var nextBounds = this.getNextBounds(localMouse, mouseDelta, rootProps);
    this.updateBounds(nextBounds, rootProps);
  };

  _proto.getNextBounds = function getNextBounds(localMouse, delta, rootProps) {
    var brushElementName = this.state.brushElementName;
    var x = localMouse.x,
        y = localMouse.y;
    if (brushElementName === 'brushesLeft') return {
      x1: x
    };
    if (brushElementName === 'brushesRight') return {
      x2: x
    };
    if (brushElementName === 'brushesTop') return {
      y1: y
    };
    if (brushElementName === 'brushesBottom') return {
      y2: y
    };
    if (brushElementName === 'brushesLeftTop') return {
      x1: x,
      y1: y
    };
    if (brushElementName === 'brushesRightTop') return {
      x2: x,
      y1: y
    };
    if (brushElementName === 'brushesLeftBottom') return {
      x1: x,
      y2: y
    };
    if (brushElementName === 'brushesRightBottom') return {
      x2: x,
      y2: y
    };

    if (brushElementName === 'brushesCenter') {
      var _this$props2 = this.props,
          xDomain = _this$props2.xDomain,
          yDomain = _this$props2.yDomain;

      var _domainToBounds = domainToBounds(rootProps, xDomain, yDomain),
          x1 = _domainToBounds.x1,
          x2 = _domainToBounds.x2,
          y1 = _domainToBounds.y1,
          y2 = _domainToBounds.y2;

      var nextBounds = {
        x1: x1 - delta.x,
        x2: x2 - delta.x,
        y1: y1 - delta.y,
        y2: y2 - delta.y
      };
      return isOutOfBounds(nextBounds, rootProps.plotRect) ? {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
      } : nextBounds;
    }

    return {
      x2: x,
      y2: y
    };
  };

  _proto.updateBounds = function updateBounds(nextBounds, rootProps) {
    var onUpdate = this.props.onUpdate;
    var bounds = this.state.bounds;
    var plotRect = rootProps.plotRect,
        xScale = rootProps.xScale,
        yScale = rootProps.yScale;
    var orderedBounds = reorder(Object.assign({}, bounds, nextBounds));
    var constrainedBounds = constrainToPlotRect(orderedBounds, plotRect);
    onUpdate(boundsToDomain(constrainedBounds, xScale, yScale));
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        xDomain = _this$props3.xDomain,
        yDomain = _this$props3.yDomain,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props3, ["children", "xDomain", "yDomain"]);
    var x1 = xDomain[0],
        x2 = xDomain[1];
    var y1 = yDomain[0],
        y2 = yDomain[1];
    var child = React.Children.only(children);
    var brushElement = React.createElement(_Brushes.default, Object.assign({}, rest, {
      data: [{
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2
      }],
      key: "brushes",
      skipExtractArrays: true,
      tooltipShowKeys: false,
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2"
    }));
    var layers = React.Children.toArray(child.props.children).concat([brushElement]);
    return React.cloneElement(child, {
      onUpdate: this.handleUpdate
    }, layers);
  };

  return Brush;
}(React.Component);

exports.default = Brush;
Brush.defaultProps = {
  xDomain: [],
  yDomain: []
};
Brush.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node,
  onUpdate: _propTypes.default.func.isRequired,
  xDomain: _propTypes.default.array,
  // eslint-disable-line react/forbid-prop-types
  yDomain: _propTypes.default.array // eslint-disable-line react/forbid-prop-types

} : {};