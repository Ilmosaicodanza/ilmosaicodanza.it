"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _isBrowser = _interopRequireDefault(require("../constants/isBrowser"));

// Copyright 2018 Kensho Technologies, LLC.
var Portal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Portal, _React$Component);

  function Portal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      hasMounted: false
    };
    return _this;
  }

  var _proto = Portal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (_isBrowser.default) {
      var containerElement = document.createElement('div');
      containerElement.style.position = 'absolute';
      containerElement.style.top = 0;
      containerElement.style.left = 0;
      containerElement.style.right = 0;
      document.body.appendChild(containerElement);
      this.containerElement = containerElement;
      this.setState({
        hasMounted: true
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (_isBrowser.default && this.containerElement) document.body.removeChild(this.containerElement);
  };

  _proto.render = function render() {
    var children = this.props.children;
    var hasMounted = this.state.hasMounted;
    if (!hasMounted) return null;
    return (0, _reactDom.createPortal)(children, this.containerElement);
  };

  return Portal;
}(React.Component);

exports.default = Portal;
Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: _propTypes.default.node
} : {};