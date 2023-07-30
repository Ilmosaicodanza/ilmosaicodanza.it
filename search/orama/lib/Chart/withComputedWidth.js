"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = withComputedWidth;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _throttle2 = _interopRequireDefault(require("lodash/throttle"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

// Copyright 2018 Kensho Technologies, LLC.
function wrapDisplayName(prefix, Component) {
  var displayName = Component.displayName || Component.name || 'Component';
  return prefix + "(" + displayName + ")";
} // this HOC wraps `BaseComponent` and adds a width prop when it's not present


function withComputedWidth(BaseComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(WithComputedWidth, _React$Component);

    function WithComputedWidth() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.divRef = React.createRef();
      _this.state = {
        measuredWidth: null
      };
      _this.handleResize = (0, _throttle2.default)(function () {
        return _this.updateWidth();
      }, 500);
      return _this;
    }

    var _proto = WithComputedWidth.prototype;

    _proto.componentDidMount = function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.updateWidth();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      this.updateWidth();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    };

    _proto.updateWidth = function updateWidth() {
      if (this.divRef.current) {
        var measuredWidth = this.divRef.current.clientWidth;
        this.setState(function (prevState) {
          return prevState.measuredWidth === measuredWidth ? null : {
            measuredWidth: measuredWidth
          };
        });
      }
    };

    _proto.render = function render() {
      var width = this.props.width;
      var measuredWidth = this.state.measuredWidth;
      var resolvedWidth = width != null ? width : measuredWidth;
      return React.createElement("div", {
        ref: this.divRef
      }, resolvedWidth != null && React.createElement(BaseComponent, Object.assign({}, this.props, {
        width: resolvedWidth
      })));
    };

    return WithComputedWidth;
  }(React.Component), _class.displayName = wrapDisplayName('withComputedWidth', BaseComponent), _class.propTypes = {
    width: _propTypes.default.number
  }, _temp;
}