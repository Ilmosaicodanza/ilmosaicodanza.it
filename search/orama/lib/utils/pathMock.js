"use strict";

exports.__esModule = true;
exports.default = pathMock;

// Copyright 2018 Kensho Technologies, LLC.

/**
 * Creates a pathMock object
 *
 * @function pathMock
 * @return {Object}
 */
function pathMock() {
  return {
    addPath: function addPath() {},
    closePath: function closePath() {},
    moveTo: function moveTo() {},
    lineTo: function lineTo() {},
    bezierCurveTo: function bezierCurveTo() {},
    quadraticCurveTo: function quadraticCurveTo() {},
    arc: function arc() {},
    arcTo: function arcTo() {},
    ellipse: function ellipse() {},
    rect: function rect() {}
  };
}