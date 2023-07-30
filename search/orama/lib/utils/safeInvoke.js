"use strict";

exports.__esModule = true;
exports.default = safeInvoke;

// Copyright 2018 Kensho Technologies, LLC.
function safeInvoke(fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn ? fn.apply(void 0, args) : undefined;
}