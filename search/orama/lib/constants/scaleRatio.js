"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _isBrowser = _interopRequireDefault(require("./isBrowser"));

// Copyright 2018 Kensho Technologies, LLC.
var devicePixelRatio = _isBrowser.default ? window.devicePixelRatio : 1;
var ctx = _isBrowser.default ? document.createElement('canvas').getContext('2d') : {};
var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1; // the ratio by which a canvas should be scaled to match the display DPI

var _default = devicePixelRatio / backingStoreRatio;

exports.default = _default;