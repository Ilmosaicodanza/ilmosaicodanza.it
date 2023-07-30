"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = LabelLeft;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("../CustomPropTypes"));

// Copyright 2018 Kensho Technologies, LLC.
// component that positions and styles the left label of the `Chart` component
function LabelLeft(props) {
  var plotRect = props.plotRect,
      text = props.text,
      theme = props.theme;
  var style = {
    fontSize: theme.axisLabelFontSize,
    fontWeight: theme.axisLabelFontWeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    top: plotRect.y,
    transform: 'translate(-100%) rotate(-90deg)',
    transformOrigin: '100% 0',
    whiteSpace: 'nowrap',
    width: plotRect.height
  };
  return React.createElement("div", {
    style: style
  }, text);
}

LabelLeft.propTypes = process.env.NODE_ENV !== "production" ? {
  plotRect: CustomPropTypes.plotRect.isRequired,
  text: _propTypes.default.string,
  theme: CustomPropTypes.theme.isRequired
} : {};