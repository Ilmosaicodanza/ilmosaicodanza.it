"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getMaxY;

var _rectBase = _interopRequireDefault(require("./rectBase"));

// Copyright 2018 Kensho Technologies, LLC.

/**
 * Get the maximum `y` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
function getMaxY(rectInput) {
  var rect = Object.assign({}, _rectBase.default, rectInput);
  return rect.y + rect.height;
}