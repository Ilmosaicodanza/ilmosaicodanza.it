"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = withCachedContext;

var _isBrowser = _interopRequireDefault(require("../constants/isBrowser"));

// Copyright 2018 Kensho Technologies, LLC.
// a shared, cached offscreen canvas
var ctx = _isBrowser.default && document.createElement('canvas').getContext('2d');

function withCachedContext(fn) {
  if (!ctx) return fn();
  ctx.save();
  var result = fn(ctx);
  ctx.restore();
  return result;
}