"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = basicRender;

var _flatMap2 = _interopRequireDefault(require("lodash/flatMap"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _isDatum = _interopRequireDefault(require("../utils/isDatum"));

var _clearAndClip = _interopRequireDefault(require("./clearAndClip"));

function getRenderObjects(props) {
  var renderData = props.renderData,
      renderLayers = props.renderLayers;
  if (renderData) return renderData;
  if (renderLayers) return (0, _flatMap2.default)(renderLayers, 'renderData');
  return [];
}

function stroke(theme, ctx, d) {
  ctx.globalAlpha = d.strokeAlpha || d.alpha || theme.plotAlpha;
  ctx.lineWidth = d.lineWidth || theme.plotLineWidth;
  ctx.strokeStyle = d.stroke || theme.plotFill;
  if (d.lineDash) ctx.setLineDash(d.lineDash);
  ctx.stroke(d.path2D);
}

function basicRender(props, ctx) {
  var theme = props.theme;
  ctx.save();
  ctx.lineJoin = 'round';
  (0, _clearAndClip.default)(props, ctx);
  (0, _forEach2.default)(getRenderObjects(props), function (d) {
    if (!d) return;

    if (d.type === 'line') {
      stroke(theme, ctx, d);
    } else if (d.type === 'area') {
      ctx.globalAlpha = d.fillAlpha || d.alpha || theme.plotAlpha;
      ctx.fillStyle = d.fill || theme.plotFill;
      ctx.fill(d.path2D);
      if (d.stroke) stroke(theme, ctx, d);
    } else if (d.type === 'text') {
      if (!(0, _isDatum.default)(d.text)) return;
      ctx.save();
      ctx.globalAlpha = d.alpha;
      ctx.font = d.font || (d.fontSize || theme.plotFontSize) + "px " + theme.fontFamilyMono;
      ctx.fillStyle = d.fill || theme.textFill;
      ctx.textAlign = d.textAlign || 'left';
      ctx.textBaseline = d.textBaseline || 'alphabetic';
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rotate);
      ctx.fillText(d.text, 0, 0);
      ctx.restore();
    }
  });
  ctx.restore();
}