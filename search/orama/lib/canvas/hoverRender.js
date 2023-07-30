"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = hoverRender;

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _clearAndClip = _interopRequireDefault(require("./clearAndClip"));

function hoverRender(props, ctx) {
  var renderData = props.renderData,
      theme = props.theme;
  ctx.save();
  ctx.lineJoin = 'round';
  (0, _clearAndClip.default)(props, ctx);
  (0, _forEach2.default)(renderData, function (d) {
    if (!d) return;

    if (d.type === 'line') {
      ctx.globalAlpha = d.hoverAlpha || 0.5;
      ctx.lineWidth = d.hoverLineWidth || theme.plotLineWidth;
      ctx.strokeStyle = d.hoverStroke || theme.textFill;
      ctx.stroke(d.path2D);
    } else if (d.type === 'area') {
      ctx.globalAlpha = d.hoverAlpha || 0.4;
      ctx.fillStyle = d.hoverFill || theme.textFill;
      ctx.fill(d.path2D);
    }
  });
  ctx.restore();
}