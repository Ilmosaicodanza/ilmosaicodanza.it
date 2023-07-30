import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
// Copyright 2018 Kensho Technologies, LLC.
import PropTypes from 'prop-types';
import * as React from 'react';
import { createPortal } from 'react-dom';
import isBrowser from '../constants/isBrowser';

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Portal, _React$Component);

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
    if (isBrowser) {
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
    if (isBrowser && this.containerElement) document.body.removeChild(this.containerElement);
  };

  _proto.render = function render() {
    var children = this.props.children;
    var hasMounted = this.state.hasMounted;
    if (!hasMounted) return null;
    return createPortal(children, this.containerElement);
  };

  return Portal;
}(React.Component);

export { Portal as default };
Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  children: PropTypes.node
} : {};