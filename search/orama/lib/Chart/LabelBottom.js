"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = LabelBottom;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

// Copyright 2018 Kensho Technologies, LLC.
// component that positions and styles the bottom label of the `Chart` component
function LabelBottom(props) {
  var plotRect = props.plotRect,
      text = props.text,
      theme = props.theme;
  var style = {
    bottom: 0,
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: plotRect.x,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: plotRect.width
  };
  return React.createElement("div", {
    style: style
  }, text);
}

LabelBottom.propTypes = process.env.NODE_ENV !== "production" ? {
  plotRect: CustomPropTypes.plotRect.isRequired,
  text: _propTypes.default.string,
  theme: CustomPropTypes.theme.isRequired
} : {};