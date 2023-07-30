"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getPath2D;

var _pathMock = _interopRequireDefault(require("./pathMock"));

// Copyright 2018 Kensho Technologies, LLC.

/**
 * Returns a Path2D object if the constructor exists, otherwise returns a mocking object.
 * This way we can keep running and testing on node code that uses Path2D
 */

/**
 * According to the environments, creates a new `Path2D` object or a `pathMock`.
 * @memberOf /utils/path
 *
 * @function DEFAULT
 * @return {Path2D | pathMock}
 */
function getPath2D() {
  if (typeof Path2D === 'function') return new Path2D();
  return (0, _pathMock.default)();
}