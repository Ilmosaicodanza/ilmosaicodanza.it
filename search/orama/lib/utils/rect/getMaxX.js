"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getMaxX;

var _rectBase = _interopRequireDefault(require("./rectBase"));

// Copyright 2018 Kensho Technologies, LLC.

/**
 * Get the maximum `x` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
function getMaxX(rectInput) {
  var rect = Object.assign({}, _rectBase.default, rectInput);
  return rect.x + rect.width;
}