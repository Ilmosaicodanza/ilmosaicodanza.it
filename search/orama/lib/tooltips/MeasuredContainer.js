"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var MeasuredContainer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(MeasuredContainer, _React$Component);

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

exports.default = MeasuredContainer;
MeasuredContainer.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node,
  onMeasure: _propTypes.default.func.isRequired
} : {};