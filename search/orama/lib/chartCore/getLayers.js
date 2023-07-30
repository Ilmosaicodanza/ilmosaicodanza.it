"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = getLayers;

var React = _interopRequireWildcard(require("react"));

// Copyright 2018 Kensho Technologies, LLC.
function getLayers(props) {
  var layers = React.Children.map(props.children, function (child) {
    return child && child.props.plot ? child.props : undefined;
  });
  return {
    layers: layers
  };
}