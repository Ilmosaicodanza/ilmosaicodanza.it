"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.theme = exports.plotRect = exports.margin = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

// Copyright 2018 Kensho Technologies, LLC.
var margin = _propTypes.default.shape({
  bottom: _propTypes.default.number,
  left: _propTypes.default.number,
  right: _propTypes.default.number,
  top: _propTypes.default.number
});

exports.margin = margin;

var plotRect = _propTypes.default.shape({
  height: _propTypes.default.number,
  width: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
});

exports.plotRect = plotRect;

var theme = _propTypes.default.shape({
  fontFamily: _propTypes.default.string,
  fontFamilyMono: _propTypes.default.string,
  titleFontWeight: _propTypes.default.string,
  fontSize: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  textFill: _propTypes.default.string,
  backgroundFill: _propTypes.default.string,
  plotBackgroundFill: _propTypes.default.string,
  guideStroke: _propTypes.default.string,
  guideLineWidth: _propTypes.default.number,
  guideZeroStroke: _propTypes.default.string,
  guideZeroLineWidth: _propTypes.default.number,
  axisLabelFontSize: _propTypes.default.number,
  axisLabelFontWeight: _propTypes.default.string,
  axisTickFontSize: _propTypes.default.number,
  axisTickTextFill: _propTypes.default.string,
  tooltipFontSize: _propTypes.default.number,
  tooltipTextFill: _propTypes.default.string,
  tooltipTitleFontSize: _propTypes.default.number,
  tooltipTitleFontWeight: _propTypes.default.string,
  tooltipValueFontSize: _propTypes.default.number,
  tooltipBackgroundFill: _propTypes.default.string,
  tooltipEvenBackgroundFill: _propTypes.default.string,
  tooltipBoxShadowFill: _propTypes.default.string,
  tooltipKeyBorderStroke: _propTypes.default.string,
  plotFontSize: _propTypes.default.number,
  plotFill: _propTypes.default.string,
  plotLineWidth: _propTypes.default.number,
  plotAlpha: _propTypes.default.number,
  plotLinearRangeFill: _propTypes.default.arrayOf(_propTypes.default.string),
  plotOrdinalRangeFill: _propTypes.default.arrayOf(_propTypes.default.string)
});

exports.theme = theme;