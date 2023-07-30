"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = fitCheckText;

var _update2 = _interopRequireDefault(require("lodash/update"));

var _withCachedContext = _interopRequireDefault(require("./withCachedContext"));

function getTextWidth(theme, string) {
  return (0, _withCachedContext.default)(function (ctx) {
    if (!ctx) return string.length;
    ctx.font = theme.axisTickFontSize + "px " + theme.fontFamilyMono;
    return ctx.measureText(string).width;
  });
}

function getTextBounds(textObj, isRotated, theme) {
  var textAlign = textObj.textAlign || 'left';
  var textWidth = getTextWidth(theme, textObj.text) * (textAlign === 'center' ? 0.5 : 1);
  var initialCoord = isRotated ? textObj.y : textObj.x;
  var rightAligned = ['right', 'end'].includes(textAlign);
  var leftAligned = ['left', 'start'].includes(textAlign);
  /* eslint-disable no-bitwise */

  return {
    textStart: !(isRotated ^ leftAligned) ? initialCoord - textWidth : initialCoord,
    textEnd: !(isRotated ^ rightAligned) ? initialCoord + textWidth : initialCoord
    /* eslint-enable no-bitwise */

  };
}

function fitCheckText(textObj, canvasWidth, canvasHeight, theme) {
  var updateTextObj = function updateTextObj(key, toAdd) {
    return (0, _update2.default)(textObj, key, function (val) {
      return val + toAdd;
    });
  };

  updateTextObj('x', textObj.xOffset || 0);
  updateTextObj('y', textObj.yOffset || 0);
  var isRotated = Boolean(textObj.rotate);

  var _getTextBounds = getTextBounds(textObj, isRotated, theme),
      textStart = _getTextBounds.textStart,
      textEnd = _getTextBounds.textEnd;

  var overFlow = textEnd - (isRotated ? canvasHeight : canvasWidth);
  var underFlow = -textStart;
  var shift = overFlow > 0 && -overFlow || underFlow > 0 && underFlow || 0;
  return updateTextObj(isRotated ? 'y' : 'x', shift);
}