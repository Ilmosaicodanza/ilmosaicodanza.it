"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = marginInset;

var _rectBase = _interopRequireDefault(require("./rectBase"));

// Copyright 2018 Kensho Technologies, LLC.
var MARGIN_BASE = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
  /**
   * Inset a `Rect | Size` by a margin
   * @memberOf  /utils/rectUtils
   *
   * @param  {Margin} marginInput {left: number, right: number, top: number, bottom: number}
   * @param  {Rect | Size} rectInput
   * @return {Rect}
   */

};

function marginInset(marginInput, rectInput) {
  var rect = Object.assign({}, _rectBase.default, rectInput);
  var margin = Object.assign({}, MARGIN_BASE, marginInput);
  return {
    x: rect.x + margin.left,
    y: rect.y + margin.top,
    width: rect.width - margin.left - margin.right,
    height: rect.height - margin.top - margin.bottom
  };
}