"use strict";

exports.__esModule = true;
exports.default = clearAndClip;

// Copyright 2018 Kensho Technologies, LLC.
function clearAndClip(props, ctx) {
  var width = props.width,
      height = props.height,
      backgroundOffset = props.backgroundOffset;
  ctx.clearRect(0, 0, width, height);
  if (props.layerProps && props.layerProps.clipPlot === false) return;

  if (props.plotRect && props.clip) {
    ctx.beginPath();
    ctx.rect(props.plotRect.x - backgroundOffset, props.plotRect.y - backgroundOffset, props.plotRect.width + backgroundOffset * 2, props.plotRect.height + backgroundOffset * 2);
    ctx.clip();
  }
}