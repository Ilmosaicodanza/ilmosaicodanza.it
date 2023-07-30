import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';

var MeasuredContainer =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MeasuredContainer, _React$Component);

  function MeasuredContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.wrapperRef = React.createRef();
    return _this;
  }

  var _proto = MeasuredContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.measure();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.measure();
  };

  _proto.measure = function measure() {
    var onMeasure = this.props.onMeasure;
    if (!this.wrapperRef.current) return;
    var _this$wrapperRef$curr = this.wrapperRef.current,
        height = _this$wrapperRef$curr.offsetHeight,
        width = _this$wrapperRef$curr.offsetWidth;
    onMeasure(height, width);
  };

  _proto.render = function render() {
    var children = this.props.children;
    return React.createElement("div", {
      ref: this.wrapperRef
    }, children);
  };

  return MeasuredContainer;
}(React.Component);

export { MeasuredContainer as default };
MeasuredContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node,
  onMeasure: PropTypes.func.isRequired
} : {};