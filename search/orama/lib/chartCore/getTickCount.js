"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getTickCount;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _defaults = require("../defaults");

function getTickCount(props, key) {
  if ((0, _isNumber2.default)(props[key + "TickCount"])) return props[key + "TickCount"];
  var range = props[key + "Range"],
      _tickSpace = props[key + "TickSpace"];

  if (key === 'y') {
    var xTickSpace = _tickSpace || _defaults.TICK_Y_SPACE;
    return Math.ceil((range[0] - range[1]) / xTickSpace);
  }

  if (key === 'x') {
    var yTickSpace = _tickSpace || _defaults.TICK_X_SPACE;
    return Math.ceil((range[1] - range[0]) / yTickSpace);
  }

  return 0;
}