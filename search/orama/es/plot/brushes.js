import _isNumber from "lodash/isNumber";
import _flatten from "lodash/flatten";
import _map from "lodash/map";
import getPath2D from '../utils/getPath2D';
import getPlotValues from './getPlotValues';
var BRUSH_HANDLE_OFFSET = 5;
var HOVER_OFFSET = 10;
var HOVER_OFFSET_X2 = HOVER_OFFSET * 2;

function centerArea(_ref) {
  var x1 = _ref.x1,
      x2 = _ref.x2,
      y1 = _ref.y1,
      y2 = _ref.y2,
      data = _ref.data,
      fillAlpha = _ref.fillAlpha,
      fill = _ref.fill;
  var path2D = getPath2D();
  path2D.rect(x1, y1, x2 - x1, y2 - y1);
  return {
    name: 'brushesCenter',
    fillAlpha: fillAlpha,
    data: data,
    fill: fill,
    hoverAlpha: 0.1,
    path2D: path2D,
    type: 'area'
  };
}

function verticalArea(_ref2) {
  var x1 = _ref2.x1,
      x2 = _ref2.x2,
      plotRect = _ref2.plotRect,
      backgroundOffset = _ref2.backgroundOffset,
      data = _ref2.data,
      fillAlpha = _ref2.fillAlpha,
      fill = _ref2.fill;
  var path2D = getPath2D();
  path2D.rect(x1, plotRect.y - backgroundOffset, x2 - x1, plotRect.height + backgroundOffset * 2);
  return {
    name: 'brushesCenter',
    fillAlpha: fillAlpha,
    data: data,
    fill: fill,
    hoverAlpha: 0.1,
    path2D: path2D,
    type: 'area'
  };
}

function horizontalArea(_ref3) {
  var y1 = _ref3.y1,
      y2 = _ref3.y2,
      plotRect = _ref3.plotRect,
      backgroundOffset = _ref3.backgroundOffset,
      data = _ref3.data,
      fillAlpha = _ref3.fillAlpha,
      fill = _ref3.fill;
  var path2D = getPath2D();
  path2D.rect(plotRect.x - backgroundOffset, y1, plotRect.width + backgroundOffset * 2, y2 - y1);
  return {
    name: 'brushesCenter',
    fillAlpha: fillAlpha,
    data: data,
    fill: fill,
    hoverAlpha: 0.1,
    path2D: path2D,
    type: 'area'
  };
}

function rightTopLine(_ref4) {
  var x2 = _ref4.x2,
      y1 = _ref4.y1,
      data = _ref4.data,
      stroke = _ref4.stroke,
      lineWidth = _ref4.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y1);
  path2D.lineTo(x2, y1);
  path2D.lineTo(x2, y1 + BRUSH_HANDLE_OFFSET);
  hover1stPath2D.rect(x2 - HOVER_OFFSET, y1 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2);
  return {
    name: 'brushesRightTop',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function rightBottomLine(_ref5) {
  var x2 = _ref5.x2,
      y2 = _ref5.y2,
      data = _ref5.data,
      stroke = _ref5.stroke,
      lineWidth = _ref5.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x2 - BRUSH_HANDLE_OFFSET, y2);
  path2D.lineTo(x2, y2);
  path2D.lineTo(x2, y2 - BRUSH_HANDLE_OFFSET);
  hover1stPath2D.rect(x2 - HOVER_OFFSET, y2 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2);
  return {
    name: 'brushesRightBottom',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function leftTopLine(_ref6) {
  var x1 = _ref6.x1,
      y1 = _ref6.y1,
      data = _ref6.data,
      stroke = _ref6.stroke,
      lineWidth = _ref6.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1, y1 + BRUSH_HANDLE_OFFSET);
  path2D.lineTo(x1, y1);
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y1);
  hover1stPath2D.rect(x1 - HOVER_OFFSET, y1 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2);
  return {
    name: 'brushesLeftTop',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function leftBottomLine(_ref7) {
  var x1 = _ref7.x1,
      y2 = _ref7.y2,
      data = _ref7.data,
      stroke = _ref7.stroke,
      lineWidth = _ref7.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1, y2 - BRUSH_HANDLE_OFFSET);
  path2D.lineTo(x1, y2);
  path2D.lineTo(x1 + BRUSH_HANDLE_OFFSET, y2);
  hover1stPath2D.rect(x1 - HOVER_OFFSET, y2 - HOVER_OFFSET, HOVER_OFFSET_X2, HOVER_OFFSET_X2);
  return {
    name: 'brushesLeftBottom',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function leftVerticalLine(_ref8) {
  var x1 = _ref8.x1,
      plotRect = _ref8.plotRect,
      backgroundOffset = _ref8.backgroundOffset,
      data = _ref8.data,
      stroke = _ref8.stroke,
      lineWidth = _ref8.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1, plotRect.y - backgroundOffset);
  path2D.lineTo(x1, plotRect.y + plotRect.height + backgroundOffset);
  hover1stPath2D.rect(x1 - HOVER_OFFSET_X2, plotRect.y - backgroundOffset, HOVER_OFFSET_X2 + 1, plotRect.height + backgroundOffset * 2);
  return {
    name: 'brushesLeft',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function leftCenterLine(_ref9) {
  var x1 = _ref9.x1,
      y1 = _ref9.y1,
      y2 = _ref9.y2,
      data = _ref9.data,
      stroke = _ref9.stroke,
      lineWidth = _ref9.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1, y1 + BRUSH_HANDLE_OFFSET);
  path2D.lineTo(x1, y2 - BRUSH_HANDLE_OFFSET);
  hover1stPath2D.rect(x1 - HOVER_OFFSET, y1 + BRUSH_HANDLE_OFFSET, HOVER_OFFSET_X2, y2 - y1 - BRUSH_HANDLE_OFFSET * 2);
  return {
    name: 'brushesLeft',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function rightVerticalLine(_ref10) {
  var x2 = _ref10.x2,
      plotRect = _ref10.plotRect,
      backgroundOffset = _ref10.backgroundOffset,
      data = _ref10.data,
      stroke = _ref10.stroke,
      lineWidth = _ref10.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x2, plotRect.y - backgroundOffset);
  path2D.lineTo(x2, plotRect.y + plotRect.height + backgroundOffset);
  hover1stPath2D.rect(x2 - 1, plotRect.y - backgroundOffset, HOVER_OFFSET_X2, plotRect.height + backgroundOffset * 2);
  return {
    name: 'brushesRight',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function rightCenterLine(_ref11) {
  var x2 = _ref11.x2,
      y1 = _ref11.y1,
      y2 = _ref11.y2,
      data = _ref11.data,
      stroke = _ref11.stroke,
      lineWidth = _ref11.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x2, y1 + BRUSH_HANDLE_OFFSET);
  path2D.lineTo(x2, y2 - BRUSH_HANDLE_OFFSET);
  hover1stPath2D.rect(x2 - HOVER_OFFSET, y1 + BRUSH_HANDLE_OFFSET, HOVER_OFFSET_X2, y2 - y1 - BRUSH_HANDLE_OFFSET * 2);
  return {
    name: 'brushesRight',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function topHorizontalLine(_ref12) {
  var y1 = _ref12.y1,
      plotRect = _ref12.plotRect,
      backgroundOffset = _ref12.backgroundOffset,
      data = _ref12.data,
      stroke = _ref12.stroke,
      lineWidth = _ref12.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(plotRect.x - backgroundOffset, y1);
  path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y1);
  hover1stPath2D.rect(plotRect.x - backgroundOffset, y1 - HOVER_OFFSET_X2, plotRect.width + backgroundOffset * 2, HOVER_OFFSET_X2 + 1);
  return {
    name: 'brushesTop',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function topCenterLine(_ref13) {
  var x1 = _ref13.x1,
      x2 = _ref13.x2,
      y1 = _ref13.y1,
      data = _ref13.data,
      stroke = _ref13.stroke,
      lineWidth = _ref13.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y1);
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y1);
  hover1stPath2D.rect(x1, y1 - HOVER_OFFSET, x2 - x1, HOVER_OFFSET_X2);
  return {
    name: 'brushesTop',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function bottomHorizontalLine(_ref14) {
  var y2 = _ref14.y2,
      plotRect = _ref14.plotRect,
      backgroundOffset = _ref14.backgroundOffset,
      data = _ref14.data,
      stroke = _ref14.stroke,
      lineWidth = _ref14.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(plotRect.x - backgroundOffset, y2);
  path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y2);
  hover1stPath2D.rect(plotRect.x - backgroundOffset, y2 - 1, plotRect.width + backgroundOffset * 2, HOVER_OFFSET_X2);
  return {
    name: 'brushesBottom',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function bottomCenterLine(_ref15) {
  var x1 = _ref15.x1,
      x2 = _ref15.x2,
      y2 = _ref15.y2,
      data = _ref15.data,
      stroke = _ref15.stroke,
      lineWidth = _ref15.lineWidth;
  var path2D = getPath2D();
  var hover1stPath2D = getPath2D();
  path2D.moveTo(x1 + BRUSH_HANDLE_OFFSET, y2);
  path2D.lineTo(x2 - BRUSH_HANDLE_OFFSET, y2);
  hover1stPath2D.rect(x1, y2 - HOVER_OFFSET, x2 - x1, HOVER_OFFSET_X2);
  return {
    name: 'brushesBottom',
    lineWidth: lineWidth,
    stroke: stroke,
    data: data,
    path2D: path2D,
    hover1stPath2D: hover1stPath2D,
    type: 'line'
  };
}

function brushesRender(props, datum) {
  var backgroundOffset = props.backgroundOffset,
      plotRect = props.plotRect;
  var stroke = props.strokeValue;
  var fill = props.fillValue;
  var fillAlpha = props.fillAlphaValue || 0.4;
  var lineWidth = props.lineWidthValue || 3;
  var values = getPlotValues(props, datum);
  var renderArgs = Object.assign({}, values, {
    plotRect: plotRect,
    backgroundOffset: backgroundOffset,
    stroke: stroke,
    fill: fill,
    fillAlpha: fillAlpha,
    lineWidth: lineWidth
  });

  if (_isNumber(values.x1) && _isNumber(values.x2) && _isNumber(values.y1) && _isNumber(values.y2)) {
    return [centerArea(renderArgs), leftCenterLine(renderArgs), rightCenterLine(renderArgs), topCenterLine(renderArgs), bottomCenterLine(renderArgs), leftTopLine(renderArgs), leftBottomLine(renderArgs), rightTopLine(renderArgs), rightBottomLine(renderArgs)];
  }

  if (_isNumber(values.x1) && _isNumber(values.x2)) {
    return [verticalArea(renderArgs), leftVerticalLine(renderArgs), rightVerticalLine(renderArgs)];
  }

  if (_isNumber(values.y1) && _isNumber(values.y2)) {
    return [horizontalArea(renderArgs), topHorizontalLine(renderArgs), bottomHorizontalLine(renderArgs)];
  }

  return {
    showHover: false,
    type: 'area',
    path2D: getPath2D()
  };
}

export default function brushes(props) {
  if (!props.xScale && !props.yScale) return undefined;
  return _flatten(_map(_flatten(props.data), function (datum) {
    return brushesRender(props, datum);
  }));
}