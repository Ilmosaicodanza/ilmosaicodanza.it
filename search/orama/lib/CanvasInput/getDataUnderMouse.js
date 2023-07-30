"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.findFirstPass = findFirstPass;
exports.findSecondPass = findSecondPass;
exports.findInRenderLayers = findInRenderLayers;
exports.default = getDataUnderMouse;

var _findLast2 = _interopRequireDefault(require("lodash/findLast"));

function findFirstPass(ctx, localMouse, renderData) {
  var x = localMouse.x,
      y = localMouse.y;
  ctx.lineJoin = 'round';
  return (0, _findLast2.default)(renderData, function (d) {
    if (!d) return false;
    if (d.showHover === false) return false;
    if (d.hover1stPath2D) return ctx.isPointInPath(d.hover1stPath2D, x, y);
    if (d.type === 'text') return false;
    if (d.type === 'area') return ctx.isPointInPath(d.path2D, x, y);
    if (d.type === 'line') return ctx.isPointInStroke(d.path2D, x, y);
    return false;
  });
}

function findSecondPass(ctx, localMouse, renderData) {
  var x = localMouse.x,
      y = localMouse.y;
  ctx.lineJoin = 'round';
  return (0, _findLast2.default)(renderData, function (d) {
    if (!d) return false;
    if (d.showHover === false) return false;
    if (d.hover2ndPath2D) return ctx.isPointInPath(d.hover2ndPath2D, x, y);
    if (d.type === 'text') return false;
    return ctx.isPointInStroke(d.path2D, x, y);
  });
}

function findInRenderLayers(ctx, localMouse, renderLayers, findFunc) {
  var renderDatum;
  var layer = (0, _findLast2.default)(renderLayers, function (_layer) {
    if (_layer.layerProps.showHover === false) return false;
    renderDatum = findFunc(ctx, localMouse, _layer.renderData);
    return renderDatum;
  });
  if (!layer) return undefined;
  return {
    renderDatum: renderDatum,
    hoverRenderData: [renderDatum],
    hoverData: renderDatum.data,
    layerProps: layer.layerProps
  };
} // format return for getDataUnderMouse


var formatReturnData = function formatReturnData(foundData, localMouse) {
  return {
    layerProps: foundData.layerProps,
    renderDatum: foundData.renderDatum,
    hoverRenderData: foundData.hoverRenderData,
    hoverData: foundData.hoverData,
    localMouse: localMouse
  };
}; // find on the render data the geom that intersects with the mouse position


function getDataUnderMouse(props, mouse, canvasNode) {
  if (!canvasNode) return {};
  var renderLayers = props.renderLayers;
  var canvasRect = canvasNode.getBoundingClientRect();
  var ctx = canvasNode.getContext('2d');
  var localMouse = {
    x: mouse.x - canvasRect.left,
    y: mouse.y - canvasRect.top
  };
  ctx.lineWidth = 10;
  var inPathData = findInRenderLayers(ctx, localMouse, renderLayers, findFirstPass);
  if (inPathData) return formatReturnData(inPathData, localMouse);
  ctx.lineWidth = 18;
  var inStrokeData = findInRenderLayers(ctx, localMouse, renderLayers, findSecondPass);
  if (inStrokeData) return formatReturnData(inStrokeData, localMouse);
  return {
    localMouse: localMouse
  };
}