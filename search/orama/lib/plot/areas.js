"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isPlotNumber = isPlotNumber;
exports.getPointData = getPointData;
exports.hoverSolver = hoverSolver;
exports.default = areas;

var _reject2 = _interopRequireDefault(require("lodash/reject"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isFinite2 = _interopRequireDefault(require("lodash/isFinite"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _head2 = _interopRequireDefault(require("lodash/head"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _eachRight2 = _interopRequireDefault(require("lodash/eachRight"));

var _each2 = _interopRequireDefault(require("lodash/each"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _getMaxY = _interopRequireDefault(require("../utils/rect/getMaxY"));

var _getPath2D = _interopRequireDefault(require("../utils/getPath2D"));

var _notPlotNumber = _interopRequireDefault(require("../utils/notPlotNumber"));

var _splitBy = _interopRequireDefault(require("../utils/splitBy"));

var _getPlotValues = _interopRequireDefault(require("./getPlotValues"));

var _plotValue = _interopRequireDefault(require("./plotValue"));

function isPlotNumber(value) {
  return Array.isArray(value) ? value.some(_isFinite2.default) : (0, _isFinite2.default)(value);
}

function isNullPoint(props) {
  return function (datum, idx) {
    return (0, _plotValue.default)(props, datum, idx, 'x', null) === null || (0, _plotValue.default)(props, datum, idx, 'x0', null) === null || (0, _plotValue.default)(props, datum, idx, 'y', null) === null || (0, _plotValue.default)(props, datum, idx, 'y0', null) === null;
  };
}

function getPointData(props, datum, yKey) {
  var path2D = (0, _getPath2D.default)();
  var x = (0, _plotValue.default)(props, datum, undefined, 'x');
  var y = (0, _plotValue.default)(props, datum, undefined, yKey);
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
    hoverRenderData: [renderDatum, getPointData(props, hoverData, 'y'), getPointData(props, hoverData, 'y0')],
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
}

function getAreaRenderData(props, data, idx) {
  if ((0, _isEmpty2.default)(data)) return {
    showHover: false
  };
  var path2D = (0, _getPath2D.default)();
  path2D.moveTo((0, _plotValue.default)(props, (0, _head2.default)(data), idx, 'x', 0), (0, _plotValue.default)(props, (0, _head2.default)(data), idx, 'y', 0));
  (0, _each2.default)(data, function (d) {
    var x = (0, _plotValue.default)(props, d, idx, 'x');
    var y = (0, _plotValue.default)(props, d, idx, 'y');
    if ((0, _notPlotNumber.default)([x, y])) return;
    path2D.lineTo(x, y);
  });
  var y0 = (0, _plotValue.default)(props, (0, _head2.default)(data), idx, 'y0');
  var x0 = (0, _plotValue.default)(props, (0, _head2.default)(data), idx, 'x0'); // if there's no base position accessors

  if ((0, _notPlotNumber.default)(y0) && (0, _notPlotNumber.default)(x0)) {
    var localY0 = props.yScale(0) || (0, _getMaxY.default)(props.plotRect);
    path2D.lineTo((0, _plotValue.default)(props, (0, _last2.default)(data), idx, 'x', 0), localY0);
    path2D.lineTo((0, _plotValue.default)(props, (0, _head2.default)(data), idx, 'x', 0), localY0); // if the base is on the y axis
  } else if (isPlotNumber(y0) && (0, _notPlotNumber.default)(x0)) {
    (0, _eachRight2.default)(data, function (d) {
      var x = (0, _plotValue.default)(props, d, idx, 'x');
      var localY0 = (0, _plotValue.default)(props, d, idx, 'y0');
      if ((0, _notPlotNumber.default)([x, localY0])) return;
      path2D.lineTo(x, localY0);
    }); // if the base is on the x axis
  } else if ((0, _notPlotNumber.default)(y0) && isPlotNumber(x0)) {
    (0, _eachRight2.default)(data, function (d) {
      var localX0 = (0, _plotValue.default)(props, d, idx, 'x0');
      var y = (0, _plotValue.default)(props, d, idx, 'y');
      if ((0, _notPlotNumber.default)([localX0, y])) return;
      path2D.lineTo(localX0, y);
    });
  }

  path2D.closePath();
  var values = (0, _getPlotValues.default)(props, (0, _head2.default)(data), idx, {
    hoverAlpha: 0.25
  });
  return Object.assign({}, values, {
    data: data,
    hoverSolver: hoverSolver,
    path2D: path2D,
    type: 'area'
  });
}

function splitDataAtNulls(props, data) {
  var checkNullPoint = isNullPoint(props);
  return (0, _reject2.default)((0, _splitBy.default)(data, checkNullPoint).map(function (arr) {
    return (0, _reject2.default)(arr, checkNullPoint);
  }), _isEmpty2.default);
}

function areas(props) {
  if (!props.xScale || !props.yScale) return undefined;
  var data = splitDataAtNulls(props, props.data);

  if (Array.isArray((0, _head2.default)(data))) {
    return data.reduce(function (acc, datum, idx) {
      return acc.concat(getAreaRenderData(props, datum, idx));
    }, []);
  }

  return [getAreaRenderData(props, props.data)];
}