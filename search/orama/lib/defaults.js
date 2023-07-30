"use strict";

exports.__esModule = true;
exports.THEME = exports.TICK_Y_SPACE = exports.TICK_X_SPACE = exports.TICK_COUNT = exports.NICE = exports.TYPE = exports.DOMAIN = exports.RANGE = exports.ACCESSORS_GROUPS = exports.ACCESSORS_NAMES_NON_SCALABLE = exports.ACCESSORS_NAMES = void 0;
// Copyright 2018 Kensho Technologies, LLC.
var ACCESSORS_NAMES = ['x', 'x0', 'x1', 'x2', 'y', 'y0', 'y1', 'y2', 'radius', 'fill', 'stroke', 'alpha', 'lineWidth', 'lineDash', 'hoverStroke', 'hoverFill'];
exports.ACCESSORS_NAMES = ACCESSORS_NAMES;
var ACCESSORS_NAMES_NON_SCALABLE = ['fillAlpha', 'strokeAlpha', 'hoverAlpha', 'hoverLineWidth', 'text', 'rotate', 'textAlign', 'textBaseline', 'textSnap', 'xOffset', 'yOffset', 'font', 'fontSize'];
exports.ACCESSORS_NAMES_NON_SCALABLE = ACCESSORS_NAMES_NON_SCALABLE;
var ACCESSORS_GROUPS = {
  x: ['x', 'x0', 'x1', 'x2'],
  y: ['y', 'y0', 'y1', 'y2']
};
exports.ACCESSORS_GROUPS = ACCESSORS_GROUPS;
var RANGE = [0, 1];
exports.RANGE = RANGE;
var DOMAIN = [0, 1];
exports.DOMAIN = DOMAIN;
var TYPE = 'linear';
exports.TYPE = TYPE;
var NICE = false;
exports.NICE = NICE;
var TICK_COUNT = 1;
exports.TICK_COUNT = TICK_COUNT;
var TICK_X_SPACE = 150;
exports.TICK_X_SPACE = TICK_X_SPACE;
var TICK_Y_SPACE = 75;
exports.TICK_Y_SPACE = TICK_Y_SPACE;
var THEME = {
  fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
  fontFamilyMono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  titleFontWeight: 'bold',
  fontSize: 14,
  lineHeight: 1.5,
  textFill: 'hsl(0, 0%, 0%)',
  backgroundFill: 'hsla(0, 0%, 100%, 0)',
  plotBackgroundFill: 'hsl(0, 0%, 100%)',
  guideStroke: 'hsl(0, 0%, 80%)',
  guideLineWidth: 1,
  guideZeroStroke: 'hsl(0, 0%, 55%)',
  guideZeroLineWidth: 2,
  axisLabelFontSize: 14,
  axisLabelFontWeight: 'bold',
  axisTickFontSize: 12,
  axisTickTextFill: 'hsl(0, 0%, 0%)',
  tooltipFontSize: 13,
  tooltipTextFill: 'hsl(0, 0%, 0%)',
  tooltipTitleFontSize: 13,
  tooltipTitleFontWeight: 'bold',
  tooltipValueFontSize: 13,
  tooltipBackgroundFill: 'hsl(0, 0%, 80%)',
  tooltipEvenBackgroundFill: 'hsl(0, 0%, 75%)',
  tooltipBoxShadowFill: 'hsla(0, 0%, 0%, 0.5)',
  tooltipKeyBorderStroke: 'hsl(0, 0%, 40%)',
  plotFontSize: 13,
  plotFill: 'hsl(0, 0%, 20%)',
  plotLineWidth: 2,
  plotAlpha: 0.85,
  plotLinearRangeFill: ['#edf8b1', '#2c7fb8'],
  plotOrdinalRangeFill: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666']
};
exports.THEME = THEME;