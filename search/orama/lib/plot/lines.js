"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getPointData = getPointData;
exports.hoverSolver = hoverSolver;
exports.default = lines;

var _some2 = _interopRequireDefault(require("lodash/some"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _head2 = _interopRequireDefault(require("lodash/head"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _notPlotNumber = _interopRequireDefault(require("../utils/notPlotNumber"));

var _plotValue = _interopRequireDefault(require("./plotValue"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

var _splineInterpolation = _interopRequireDefault(require("./splineInterpolation"));

// `points` is used to generate render data for lines and multilines
// it handles `x`, `y`, 'stroke'(color) and 'lineWisdth'
function getPointData(props, datum) {
  var path2D = (0, _getPath2D.default)();
  var x = (0, _plotValue.default)(props, datum, undefined, 'x');
  var y = (0, _plotValue.default)(props, datum, undefined, 'y');
  var r = (0, _plotValue.default)(props, datum, undefined, 'strokeWidth', 2) + 1.5;
  if ((0, _notPlotNumber.default)([x, y, r])) return undefined;
  path2D.arc(x, y, r, 0, 2 * Math.PI);
  return {
    hoverAlpha: 0.8,
    path2D: path2D,
    type: 'area'
  };
}

var getHoverSolverObj = function getHoverSolverObj(props, renderDatum, hoverData) {
  return {
    hoverRenderData: [renderDatum, getPointData(props, hoverData)],
    renderDatum: renderDatum,
    hoverData: hoverData
  };
};
/* eslint-disable react/destructuring-assignment */


function hoverSolver(props, _hoverData, renderDatum, localMouse) {
  var xRaw = props.xScale.invert(localMouse.x);

  if (props.xType === 'ordinal') {
    var _hoverData2 = (0, _find2.default)(_hoverData, function (d) {
      return (0, _get2.default)(d, props.x) === xRaw;
    });

    return getHoverSolverObj(props, renderDatum, _hoverData2);
  }

  var hoverIndex = (0, _findIndex2.default)(_hoverData, function (d) {
    return (0, _get2.default)(d, props.x) > xRaw;
  });

  if (hoverIndex === 0) {
    var _hoverData3 = _hoverData[hoverIndex];
    return getHoverSolverObj(props, renderDatum, _hoverData3);
  }

  if (hoverIndex === -1) {
    var _hoverData4 = (0, _last2.default)(_hoverData);

    return getHoverSolverObj(props, renderDatum, _hoverData4);
  }

  var px = (0, _get2.default)(_hoverData[hoverIndex], props.x);
  var x = (0, _get2.default)(_hoverData[hoverIndex - 1], props.x);

  if (xRaw - px < x - xRaw) {
    var _hoverData5 = _hoverData[hoverIndex - 1];
    return getHoverSolverObj(props, renderDatum, _hoverData5);
  }

  var hoverData = _hoverData[hoverIndex];
  return getHoverSolverObj(props, renderDatum, hoverData);
} // generate the array of render data


function getLineRenderData(props, data, idx) {
  if ((0, _isEmpty2.default)(data)) return undefined;
  var path2D = (0, _getPath2D.default)();
  var values = (0, _getPlotValues.default)(props, (0, _head2.default)(data), idx, {
    hoverAlpha: 0.2
  });

  if (props.interpolate) {
    (0, _splineInterpolation.default)(props, data, path2D);
  } else {
    path2D.moveTo(values.x, values.y);
    (0, _reduce2.default)(data, function (shouldDrawPoint, d) {
      var x = (0, _plotValue.default)(props, d, idx, 'x');
      var y = (0, _plotValue.default)(props, d, idx, 'y');
      if ((0, _notPlotNumber.default)([x, y])) return false;
      if (shouldDrawPoint) path2D.lineTo(x, y);else path2D.moveTo(x, y);
      return true;
    }, true);
  }

  return Object.assign({}, values, {
    data: data,
    hoverSolver: hoverSolver,
    path2D: path2D,
    type: 'line'
  });
}

function lines(props) {
  if (!props.xScale || !props.yScale) return undefined;
  var data = (0, _some2.default)(props.data, Array.isArray) ? props.data : [props.data];
  return (0, _map2.default)(data, function (d, i) {
    return getLineRenderData(props, d, i);
  });
}