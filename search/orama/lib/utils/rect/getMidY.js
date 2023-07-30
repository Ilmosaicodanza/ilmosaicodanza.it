"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getMidY;

var _rectBase = _interopRequireDefault(require("./rectBase"));

// Copyright 2018 Kensho Technologies, LLC.

/**
 * Get the medium `y` of a `Rect`
 * @memberOf  /utils/rectUtils
 *
 * @param  {Rect} rectInput
 * @return {number}
 */
function getMidY(rectInput) {
  var rect = Object.assign({}, _rectBase.default, rectInput);
  return rect.y + rect.height / 2;
}